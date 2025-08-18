import { Card } from "@/components/retroui/Card";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Button } from "@/components/retroui/Button";
import api from "@/lib/api";
import { useAtom } from "jotai/react";
import tokenAtom from "@/lib/stores/token";
import userAtom from "@/lib/stores/user";
import * as z from "zod";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

const LoginRequestSchema = z.object({
  email: z.email().min(8, "Email must be at least 8 charecters long"),
  password: z.string().min(8, "Password must be at least 8 charecters long"),
});

function RouteComponent() {
  const [_token, setToken] = useAtom(tokenAtom);
  const [_user, setUser] = useAtom(userAtom);
  const navigate = useNavigate({ from: "/login" });
  const form = useForm({
    defaultValues: { email: "", password: "" },
    validators: { onChange: LoginRequestSchema },
    onSubmit: async ({ value }) => {
      api.post("/api/v1/auth/token/login", value).then((res) => {
        setToken(res.data.auth_token);
        // setHeader("Authorization", `Token ${res.data.auth_token}`);
        api.get("/api/v1/auth/users/me/").then((res) => {
          setUser(res.data);
          if (res.data.level === "EGT") {
            navigate({ to: "/orgs" });
          } else {
            navigate({
              to: "/org/$orgId",
              params: { orgId: res.data.extra.org_id },
            });
          }
        });
      });
    },
  });
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Card>
        <Card.Header className="border-solid border-b-2">
          <Card.Title className="text-center">Login</Card.Title>
        </Card.Header>
        <Card.Content>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              children={(field) => {
                return (
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={!field.state.meta.isValid}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <div className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.map((e, idx) => (
                          <p key={idx}>{e?.message}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }}
            ></form.Field>
            <form.Field
              name="password"
              children={(field) => {
                return (
                  <div className="mt-4">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      aria-invalid={!field.state.meta.isValid}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <div className="text-red-500 text-sm mt-1">
                        {field.state.meta.errors.map((e, idx) => (
                          <p key={idx}>{e?.message}</p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }}
            ></form.Field>
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <div className="mt-4">
                  <Button
                    type="submit"
                    disabled={!canSubmit}
                    className="w-full text-center"
                  >
                    {isSubmitting ? "..." : "Login"}
                  </Button>
                </div>
              )}
            />
          </form>
        </Card.Content>
      </Card>
    </div>
  );
}
