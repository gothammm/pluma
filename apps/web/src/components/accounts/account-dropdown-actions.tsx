import { Account } from "@/types/account";
import { DropdownMenu, Button } from "@radix-ui/themes";
import { on } from "events";

export const AccountDropdownActions = ({
  children,
  onEditClick,
  onStatusClick,
  onDeleteClick,
  account,
}: {
  children: React.ReactNode;
  account: Account;
  onEditClick: () => void;
  onStatusClick: (status: string) => void;
  onDeleteClick: () => void;
}) => {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>{children}</DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Item onClick={onEditClick}>Edit</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.Item
          color={account.status === "active" ? `red` : `green`}
          onClick={() => {
            onStatusClick(account.status === "active" ? "inactive" : "active");
          }}
        >
          Mark Account as {account.status === "active" ? `Inactive` : `Active`}
        </DropdownMenu.Item>
        <DropdownMenu.Item color="red" onClick={onDeleteClick}>
          Delete Account
        </DropdownMenu.Item>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
