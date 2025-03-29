import { useApiMutation } from "@/api";
import { AccountType, type Account } from "@/types/account";
import {
  Button,
  Dialog,
  Flex,
  Select,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useMemo, useState } from "react";

interface AccountFormProps {
  account?: Account;
  onSuccess?: () => void;
  children: React.ReactNode;
  open?: boolean;
  onClose?: () => void;
  onOpen: () => void;
}

type AccountFormData = Omit<Account, "id"> & Partial<Pick<Account, "id">>;

export const AccountForm = ({
  account,
  onSuccess,
  open,
  children,
  onClose,
  onOpen,
}: AccountFormProps) => {
  const queryClient = useQueryClient();
  const isEditMode = !!account;

  const isOpen = useMemo(() => open ?? false, [open]);
  const form = useForm<AccountFormData>({
    defaultValues: {
      name: account?.name ?? "",
      balance: account?.balance ?? 0,
      account_type: account?.account_type ?? "savings",
      currency: account?.currency ?? "EUR",
      status: account?.status ?? "active",
    },
    onSubmit: async (values) => {
      await mutation.mutateAsync({
        ...values.value,
        ...(isEditMode && { id: account.id }),
      });
    },
  });
  const mutation = useApiMutation<Account>({
    url: isEditMode ? `/accounts/${account.id}` : "/accounts",
    method: isEditMode ? "PUT" : "POST",
    mutationOptions: {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["accounts"] });
        form.reset();
        mutation.reset();
        onSuccess?.();
      },
    },
  });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(isOpen) => {
        if (!isOpen) {
          form.reset();
          mutation.reset();
          onClose?.();
        }
      }}
    >
      <Dialog.Trigger onClick={() => onOpen()}>{children}</Dialog.Trigger>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>
          {isEditMode ? "Edit Account" : "Add Account"}
        </Dialog.Title>
        <Dialog.Description size="2">
          {isEditMode
            ? "Update your account details"
            : "Create a new account to manage your financial transactions."}
        </Dialog.Description>
        <form
          className="flex flex-col gap-2.5 mt-5"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <div>
            <form.Field
              name="name"
              validators={{
                onChange: ({ value }) => {
                  if (!value) {
                    return "Account name is required";
                  }
                },
              }}
            >
              {(field) => (
                <>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Account Name
                  </Text>
                  <TextField.Root
                    placeholder="Enter your account name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  {field.state.meta.errors && (
                    <Text color="red" size="1">
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <div>
            <form.Field
              name="balance"
              validators={{
                onChange: ({ value }) => {
                  if (isNaN(value) || value == null) {
                    return "Account balance is required";
                  }
                },
              }}
            >
              {(field) => (
                <>
                  <Text as="div" size="2" mb="2" weight="bold">
                    Balance
                  </Text>
                  <TextField.Root
                    type="number"
                    placeholder="Enter your account balance"
                    value={field.state.value}
                    onChange={(e) => {
                      field.handleChange(parseFloat(e.target.value));
                    }}
                  />
                  {field.state.meta.errors && (
                    <Text color="red" size="1">
                      {field.state.meta.errors.join(", ")}
                    </Text>
                  )}
                </>
              )}
            </form.Field>
          </div>
          <div>
            <form.Field name="account_type">
              {(field) => (
                <Flex direction="column">
                  <Text as="div" size="2" mb="2" weight="bold">
                    Account Type
                  </Text>
                  <Select.Root
                    value={field.state.value?.toString()}
                    onValueChange={(value: AccountType) => {
                      field.handleChange(value);
                    }}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Label>Select an account type</Select.Label>
                        <Select.Item value="savings">Savings</Select.Item>
                        <Select.Item value="checking">Checking</Select.Item>
                        <Select.Item value="credit">Credit</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              )}
            </form.Field>
          </div>
          <div>
            <form.Field name="currency">
              {(field) => (
                <Flex direction="column">
                  <Text as="div" size="2" mb="2" weight="bold">
                    Currency
                  </Text>
                  <Select.Root
                    value={field.state.value?.toString()}
                    onValueChange={(value: Account["currency"]) => {
                      field.handleChange(value);
                    }}
                  >
                    <Select.Trigger />
                    <Select.Content>
                      <Select.Group>
                        <Select.Label>Select a currency</Select.Label>
                        <Select.Item value="USD">USD</Select.Item>
                        <Select.Item value="EUR">EUR</Select.Item>
                        <Select.Item value="GBP">GBP</Select.Item>
                        <Select.Item value="INR">INR</Select.Item>
                      </Select.Group>
                    </Select.Content>
                  </Select.Root>
                </Flex>
              )}
            </form.Field>
          </div>

          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button type="submit" loading={mutation.isPending}>
              {isEditMode ? "Save Changes" : "Create Account"}
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
};
