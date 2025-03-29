import { createFileRoute, Outlet } from "@tanstack/react-router";
import { Sidebar } from "../components/sidebar";
import { Suspense } from "react";
import { Spinner } from "@radix-ui/themes";
import { motion } from "motion/react";

const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 0.2,
      ease: "easeOut",
    }}
    className="flex flex-1"
  >
    {children}
  </motion.div>
);

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
