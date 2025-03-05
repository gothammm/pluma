import { PlusIcon } from "@radix-ui/react-icons";
import { Button, Card, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { MiniTransactionList } from "../components/mini-transaction-list";

export const Route = createFileRoute("/_auth/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex flex-1 flex-col p-10 gap-10">
      <div className="flex justify-between">
        <Text size="6" className="px-1" weight="bold">
          Dashboard
        </Text>
        <Button variant="classic">
          <PlusIcon /> New Account
        </Button>
      </div>
      <div className="flex w-full gap-4">
        <Card className="flex flex-1">
          <Text size="3" weight="medium">
            Net Worth
          </Text>
        </Card>
        <Card className="flex flex-1 flex-col gap-3" variant="ghost">
          <Text size="3" weight="medium">
            Recent Transactions
          </Text>

          <MiniTransactionList />
        </Card>
      </div>
    </div>
  );
}
