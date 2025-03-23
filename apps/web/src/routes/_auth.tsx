import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";

export const Route = createFileRoute("/_auth")({
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex flex-1">
        <Outlet />
      </div>
    </div>
  );
}
