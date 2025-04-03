import * as React from "react";
import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useThemeContext } from "@radix-ui/themes";
import { motion } from "motion/react";
import { PageTransition } from "@/components/page-transition";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  const theme = useThemeContext();
  return (
    <div className="flex flex-col flex-1 h-screen">
      <PageTransition>
        <Outlet />
      </PageTransition>
      <TanStackRouterDevtools position="bottom-left" />
    </div>
  );
}
