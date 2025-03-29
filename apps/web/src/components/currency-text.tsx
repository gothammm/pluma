import { Text, type TextProps } from "@radix-ui/themes";
import { useMemo } from "react";

export const CurrencyText = ({
  value,
  className,
  currency,
  ...props
}: { value: number; currency: string } & TextProps) => {
  const formattedAmount = useMemo(() => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value);
  }, [value]);
  return (
    <Text {...props} className={className}>
      {formattedAmount}
    </Text>
  );
};
