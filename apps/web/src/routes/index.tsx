import { Bookmark } from "@phosphor-icons/react";
import { Button } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: DashboardComponent,
});

function DashboardComponent() {
  return (
    <div className="p-2">
      <h3>Welcome to Dashboard!</h3>
      <Button variant="classic">
        <Bookmark /> Bookmark
      </Button>
    </div>
  );
}
