import { SidebarToggleButton } from "@/components/sidebar-toggle-button";
import { TransactionsList } from "@/components/transactions/transactions-list";
import mockTransactions, { Transaction } from "@/mocks/transactions";
import { useSidebarStore } from "@/store";
import { MagnifyingGlass, Plus, Sliders } from "@phosphor-icons/react";
import { Button, Text, TextField } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";

export const Route = createFileRoute("/_auth/transactions")({
  component: RouteComponent,
});

//

function RouteComponent() {
  const { setOpen } = useSidebarStore();
  const transactions = mockTransactions;

  const groupedByDate = transactions.reduce(
    (acc, transaction) => {
      const date = transaction.date;
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date] = [...acc[date], transaction];
      return acc;
    },
    {} as Record<string, Transaction[]>,
  );

  const dateKeys = Object.keys(groupedByDate).sort((a, b) => {
    return DateTime.fromISO(b).toMillis() - DateTime.fromISO(a).toMillis();
  });

  return (
    <div className="flex flex-1 flex-col p-5 md:p-10 gap-10">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <SidebarToggleButton />
          <Text size="6" className="px-1" weight="bold">
            Transactions
          </Text>
        </div>
        <Button variant="classic" onClick={() => setOpen(true)}>
          <Plus /> Add Transaction
        </Button>
      </div>
      <div className="flex flex-col flex-1 gap-5">
        <div className="flex gap-4">
          <TextField.Root
            placeholder="Search transactions.."
            className="flex-1"
          >
            <TextField.Slot>
              <MagnifyingGlass height="16" width="16" />
            </TextField.Slot>
          </TextField.Root>
          <Button variant="outline">
            <Sliders /> Filters
          </Button>
        </div>
        <TransactionsList />
      </div>
    </div>
  );
}
