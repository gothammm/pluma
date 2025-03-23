import { Button, Card, Checkbox, Table, Text } from "@radix-ui/themes";
import mockTransactions, { Transaction } from "@/mocks/transactions";
import { DateTime } from "luxon";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CaretRight, Plus } from "@phosphor-icons/react";
import React from "react";
import { EmptyBills } from "@/components/illustrations/empty-bills";

export const TransactionsList = () => {
  const groupedByDate = [].reduce((acc, transaction: Transaction) => {
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
    <div className="flex flex-1 flex-col gap-3">
      <Table.Root size="1" variant="surface" className="w-full h-full [&_.rt-TableRootTable]:!h-full">
        <Table.Header>
          <Table.Row className="leading-5">
            <Table.ColumnHeaderCell width={"3%"} justify={"center"}>
              <Checkbox className="!align-middle" />
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"32%"}>
              Transaction
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"20%"}>
              Category
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"20%"}>
              Account
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={"20%"}>
              Amount
            </Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>
        {dateKeys.length <= 0 ? (
          <Table.Body>
            <Table.Row>
              <Table.Cell
                colSpan={5}
              >
                <Card
                  variant="ghost"
                  className="!flex h-full flex-col gap-5"
                >
                  <div className="flex flex-col flex-1 items-center justify-center gap-5 p-10">
                    <div className="flex flex-col items-center gap-2">
                      <EmptyBills className="fill-accent-track h-40 w-40" />
                      <Text as="div" size="6" weight="medium">
                        No Transactions Found
                      </Text>
                      <Text as="div" size="3" weight="light" color="gray">
                        Your transactions list is currently empty. Add your first account 
                        and start tracking your financial activity. Click the "Add Transaction" 
                        button below to begin managing your finances efficiently.
                      </Text>
                    </div>
                    <Button variant="classic">
                      <Plus /> Add Transaction
                    </Button>
                  </div>
                </Card>
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        ) : (
          <Table.Body>
            {dateKeys.map((date) => {
              const [isExpanded, setIsExpanded] = useState(true);
              return (
                <React.Fragment key={date}>
                  <Table.Row className="bg-accent-1 dark:bg-accent-4 leading-8">
                    <Table.Cell justify={"center"}>
                      <Checkbox className="!align-middle" />
                    </Table.Cell>
                    <Table.RowHeaderCell
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      <div className="flex items-center gap-2 h-full !align-middle">
                        <Text size="2" weight="bold" color="gray">
                          {DateTime.fromISO(date).toFormat("dd LLL yyyy")}
                        </Text>
                        <motion.div
                          initial={{
                            rotate: isExpanded ? 90 : 0,
                          }}
                          animate={{ rotate: isExpanded ? 90 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <CaretRight size={16} />
                        </motion.div>
                      </div>
                    </Table.RowHeaderCell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                    <Table.Cell></Table.Cell>
                  </Table.Row>
                  <AnimatePresence>
                    {isExpanded &&
                      groupedByDate[date].map((transaction) => (
                        <motion.tr
                          key={transaction.id}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.2 }}
                          className="leading-7"
                        >
                          <Table.Cell justify={"center"}>
                            <Checkbox className="!align-middle" />
                          </Table.Cell>
                          <Table.RowHeaderCell>
                            {transaction.description}
                          </Table.RowHeaderCell>
                          <Table.Cell>{transaction.category}</Table.Cell>
                          <Table.Cell>{transaction.accountId}</Table.Cell>
                          <Table.Cell>{transaction.amount}</Table.Cell>
                        </motion.tr>
                      ))}
                  </AnimatePresence>
                  {/* {groupedByDate[date].map((transaction) => {
                  return (
                    <Table.Row key={transaction.id} className="leading-7">
                      <Table.Cell justify={"center"}>
                        <Checkbox className="!align-middle" />
                      </Table.Cell>
                      <Table.RowHeaderCell>
                        {transaction.description}
                      </Table.RowHeaderCell>
                      <Table.Cell>{transaction.category}</Table.Cell>
                      <Table.Cell>{transaction.accountId}</Table.Cell>
                      <Table.Cell>{transaction.amount}</Table.Cell>
                    </Table.Row>
                  );
                })} */}
                </React.Fragment>
              );
            })}
          </Table.Body>
        )}
      </Table.Root>
    </div>
  );
};
