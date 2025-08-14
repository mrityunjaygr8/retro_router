import Header from "@/components/header";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(loggedIn)")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="max-w-7xl mx-auto">
        <Header />
        <Outlet />
      </div>
    </>
  );
}
