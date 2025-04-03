import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { Suspense } from "react";
import { Spinner } from "@radix-ui/themes";
import { PageTransition } from "@/components/page-transition";

function AuthLayoutComponent() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <div className="flex flex-1">
        <Suspense
          fallback={
            <div className="flex flex-1 items-center justify-center">
              <Spinner />
            </div>
          }
        >
          <PageTransition>
            <Outlet />
          </PageTransition>
        </Suspense>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/_auth")({
  component: AuthLayoutComponent,
});
