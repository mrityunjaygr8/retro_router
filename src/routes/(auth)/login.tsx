import { Card } from "@/components/retroui/Card";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/retroui/Input";
import { Label } from "@/components/retroui/Label";
import { Button } from "@/components/retroui/Button";
import api, { setHeader } from "@/api";
import { useAtom } from "jotai/react";
import tokenAtom from "@/stores/token";
import userAtom from "@/stores/user";

export const Route = createFileRoute("/(auth)/login")({
  component: RouteComponent,
});

interface LoginRequest {
  email: string;
  password: string;
}
const defaultLoginRequest: LoginRequest = { email: "", password: "" };

function RouteComponent() {
  const [_token, setToken] = useAtom(tokenAtom);
  const [_user, setUser] = useAtom(userAtom);
  const form = useForm({
    defaultValues: defaultLoginRequest,
    onSubmit: async ({ value }) => {
      console.log(value);
      api.post("/api/v1/auth/token/login", value).then((res) => {
        setToken(res.data.auth_token);
        setHeader("Authorization", `Token ${res.data.auth_token}`);
        api.get("/api/v1/auth/users/me/").then((res) => {
          setUser(res.data);
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
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
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
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
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
