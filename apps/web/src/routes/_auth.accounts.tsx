import { CubeIcon, DotsVerticalIcon, PlusIcon } from "@radix-ui/react-icons";
import {
  Avatar,
  Box,
  Button,
  Card,
  Em,
  Flex,
  Grid,
  IconButton,
  Skeleton,
  Strong,
  Text,
  useThemeContext,
} from "@radix-ui/themes";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { fetchData, useApiMutation } from "@/api";
import type { ListResponse } from "@/types/api-response";
import type { Account } from "@/types/account";
import { AccountForm } from "@/components/accounts/account-form";
import { toast } from "sonner";
import { AccountTypeIcon } from "@/components/accounts/account-type-icon";
import { EmptyAccountState } from "@/components/illustrations/empty-account-state";
import { AccountDropdownActions } from "@/components/accounts/account-dropdown-actions";
import { CurrencyText } from "@/components/currency-text";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const accountsQueryOptions = queryOptions<ListResponse<Account>>({
  queryKey: ["accounts"],
  queryFn: fetchData("/accounts"),
});

export const Route = createFileRoute("/_auth/accounts")({
  component: AccountPageComponent,
});

function AccountPageComponent() {
  const {
    data: accountsResult,
    isLoading,
    refetch,
  } = useSuspenseQuery(accountsQueryOptions);

  const [open, setOpen] = useState(false);
  const [activeAccount, setActiveAccount] = useState<Account | undefined>();

  const updateStatusMutation = useApiMutation<
    Account & {
      params: {
        id: string;
      };
    }
  >({
    url: "/accounts/:id",
    method: "PUT",
    mutationOptions: {
      onSuccess: () => {
        refetch();
        toast.success("Account status updated successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  });
  const deleteMutation = useApiMutation<{
    params: {
      id: string;
    };
  }>({
    url: "/accounts/:id",
    method: "DELETE",
    mutationOptions: {
      onSuccess: () => {
        refetch();
        toast.success("Account deleted successfully");
      },
      onError: (error) => {
        toast.error(error.message);
      },
    },
  });

  const onSuccess = () => {
    const isUpdate = !!activeAccount;
    setActiveAccount(undefined);
    setOpen(false);
    toast.success(
      isUpdate ? "Account updated successfully" : "Account created successfully"
    );
  };

  return (
    <div className="flex flex-1 flex-col p-5 md:p-10 gap-10">
      <div className="flex justify-between">
        <Text size="6" className="px-1" weight="bold">
          Accounts
        </Text>
        <AccountForm
          open={open}
          onOpen={() => setOpen(true)}
          account={activeAccount}
          onSuccess={onSuccess}
          onClose={() => {
            setOpen(false);
            setActiveAccount(undefined);
          }}
        >
          <Button variant="classic">
            <PlusIcon /> Account
          </Button>
        </AccountForm>
      </div>
      {isLoading ? (
        <Grid
          columns={{ initial: "1", sm: "2", md: "3" }}
          gap={{
            initial: "4",
            sm: "5",
            md: "7",
          }}
          width="auto"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} loading={isLoading}>
              <Card className="flex flex-1 flex-col gap-3 min-h-[120px]">
                <Text size="3" weight="medium">
                  Skeleton
                </Text>
              </Card>
            </Skeleton>
          ))}
        </Grid>
      ) : accountsResult.results.length <= 0 ? (
        <>
          <Card
            variant="ghost"
            className="flex flex-1 flex-col justify-center items-center gap-5"
          >
            <EmptyAccountState className="h-40 w-40 fill-[var(--accent-11)]" />
            <div className="flex flex-col items-center gap-5">
              <div className="flex flex-col items-center gap-2">
                <Text as="div" size="6" weight="medium">
                  No accounts have been set up yet. Let's get started on your
                  financial journey!
                </Text>
                <Text as="div" size="3" weight="light" color="gray">
                  Get started by creating a new account. Click the "Add Account"
                  button below to manage your financial transactions
                  effortlessly.
                </Text>
              </div>
              <AccountForm onOpen={() => setOpen(true)} onSuccess={onSuccess}>
                <Button variant="classic">
                  <PlusIcon /> Add Account
                </Button>
              </AccountForm>
            </div>
          </Card>
        </>
      ) : (
        <Grid
          columns={{ initial: "1", sm: "2", md: "3" }}
          gap={{
            initial: "4",
            sm: "5",
            md: "7",
          }}
          rows="repeat(2)"
          width="auto"
          asChild
        >
          <motion.div>
            <AnimatePresence mode="popLayout">
              {accountsResult.results.map((account) => {
                return (
                  <motion.div
                    key={account.id}
                    layout
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: {
                        opacity: 1,
                        x: 0,
                        transition: {
                          type: "spring",
                          stiffness: 70,
                          damping: 12,
                        },
                      },
                      exit: {
                        opacity: 0,
                        x: -20,
                        transition: {
                          duration: 0.2,
                          ease: "easeOut",
                        },
                      },
                    }}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                  >
                    <Card
                      className={`${
                        account.status === "inactive" ? "opacity-[0.65]" : ""
                      }`}
                      size="2"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-center gap-2">
                            <AccountTypeIcon type={account.account_type} />
                            <Text size="3" weight="bold">
                              {account.name}
                            </Text>
                          </div>
                          <div className="flex">
                            <Text
                              size="2"
                              weight="medium"
                              color="gray"
                              className={`capitalize ${
                                account.status === "active"
                                  ? "text-grass"
                                  : "text-red"
                              }`}
                            >
                              {account.status}
                            </Text>
                          </div>
                          <CurrencyText
                            value={account.balance}
                            currency={account.currency}
                            as="div"
                            color="grass"
                            size="6"
                            weight="bold"
                            className="mt-2"
                          />
                        </div>
                        <div className="px-1">
                          <AccountDropdownActions
                            account={account}
                            onEditClick={() => {
                              setActiveAccount(account);
                              setOpen(true);
                            }}
                            onDeleteClick={() => {
                              deleteMutation.mutate({
                                params: {
                                  id: account.id,
                                },
                              });
                            }}
                            onStatusClick={(status) => {
                              updateStatusMutation.mutate({
                                ...account,
                                status,
                                params: {
                                  id: account.id,
                                },
                              });
                            }}
                          >
                            <Button variant="ghost" className="py-2">
                              <DotsVerticalIcon />
                            </Button>
                          </AccountDropdownActions>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </motion.div>
        </Grid>
      )}
    </div>
  );
}
