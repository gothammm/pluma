import { Flex } from "@radix-ui/themes";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";

export const Route = createFileRoute("/_auth")({
  component: AuthLayoutComponent,
});

function AuthLayoutComponent() {
  return (
    <Flex direction={"row"} height={"100vh"}>
      <Sidebar />
      <div className="flex flex-1">
        <Outlet />
      </div>
    </Flex>
  );
}
