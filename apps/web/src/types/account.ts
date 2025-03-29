export interface Account {
  name: string;
  id: string;
  balance: number;
  account_type: AccountType;
  currency: "USD" | "EUR" | "GBP" | "INR";
  status: "active" | "inactive" | "closed";
}

export type AccountType = "checking" | "savings" | "credit";
