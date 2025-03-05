import { BookmarkIcon } from "@radix-ui/react-icons";
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
        <BookmarkIcon /> Bookmark
      </Button>
    </div>
  );
}
