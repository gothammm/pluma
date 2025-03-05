import { MiniTransactionList } from "@/components/mini-transaction-list";
import mockTransactions, { Transaction } from "@/mocks/transactions";
import { CaretRight } from "@phosphor-icons/react";
import { Button, Card, Text } from "@radix-ui/themes";
import { createFileRoute } from "@tanstack/react-router";
import { DateTime } from "luxon";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

export const Route = createFileRoute("/_auth/transactions")({
  component: RouteComponent,
});

//

function RouteComponent() {
  const transactions = mockTransactions;

  const groupedByDate = transactions.reduce((acc, transaction) => {
    const date = transaction.date;
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date] = [...acc[date], transaction];
    return acc;
  }, {} as Record<string, Transaction[]>);

  const dateKeys = Object.keys(groupedByDate).sort((a, b) => {
    return DateTime.fromISO(b).toMillis() - DateTime.fromISO(a).toMillis();
  });

  return (
    <div className="flex flex-1 flex-col p-5 md:p-10 gap-10">
      <div className="flex">
        <Text size="6" className="px-1" weight="bold">
          Transactions
        </Text>
      </div>
      <div className="flex flex-col gap-5">
        {dateKeys.map((date) => {
          const [isExpanded, setIsExpanded] = useState(false);
          return (
            <Card key={date} className="flex flex-col gap-4">
              <div
                className="flex items-center gap-5 p-1 cursor-pointer"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                <motion.div
                  className="flex items-center gap-2"
                  animate={{ rotate: isExpanded ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <CaretRight size={"20"} />
                </motion.div>
                <Text size="3" weight="medium">
                  {DateTime.fromISO(date).toFormat("dd LLL yyyy")}
                </Text>
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    style={{ overflow: "hidden" }}
                  >
                    <MiniTransactionList />
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
