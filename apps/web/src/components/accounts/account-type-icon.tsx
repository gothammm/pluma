import { AccountType } from "@/types/account";
import {
  CardStackIcon,
  DrawingPinIcon,
  BackpackIcon,
} from "@radix-ui/react-icons";

interface AccountTypeIconProps {
  type: AccountType;
  className?: string;
}

export const AccountTypeIcon = ({ type, className }: AccountTypeIconProps) => {
  const icons = {
    checking: <BackpackIcon className={className} />,
    savings: <DrawingPinIcon className={className} />,
    credit: <CardStackIcon className={className} />,
  };

  return icons[type] || null;
};
