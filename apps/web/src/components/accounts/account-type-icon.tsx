import { AccountType } from "@/types/account";
import { Backpack, CreditCard, PiggyBank } from "@phosphor-icons/react";

interface AccountTypeIconProps {
  type: AccountType;
  className?: string;
}

export const AccountTypeIcon = ({ type, className }: AccountTypeIconProps) => {
  const icons = {
    checking: <Backpack className={className} />,
    savings: <PiggyBank className={className} />,
    credit: <CreditCard className={className} />,
  };

  return icons[type] || null;
};
