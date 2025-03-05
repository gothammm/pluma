type TransactionType = "credit" | "debit";
type TransactionStatus = "pending" | "completed" | "failed";

export interface Transaction {
  id: string;
  accountId: string;
  date: string; // ISO format "YYYY-MM-DD"
  amount: string; // Using string for precision (BigDecimal-like)
  currency: string; // ISO 4217 (e.g., "EUR", "USD")
  category: string;
  description?: string;
  type: TransactionType;
  status: TransactionStatus;
  tags?: string[];
}

const mockTransactions: Transaction[] = [
  {
    id: "txn_001",
    accountId: "acc_001",
    date: "2025-03-01",
    amount: "2500.00",
    currency: "EUR",
    category: "Salary",
    description: "March salary from company",
    type: "credit",
    status: "completed",
    tags: ["income", "salary"],
  },
  {
    id: "txn_002",
    accountId: "acc_001",
    date: "2025-03-02",
    amount: "-75.99",
    currency: "EUR",
    category: "Groceries",
    description: "Supermarket shopping",
    type: "debit",
    status: "completed",
    tags: ["food", "essentials"],
  },
  {
    id: "txn_003",
    accountId: "acc_002",
    date: "2025-03-03",
    amount: "-1200.00",
    currency: "EUR",
    category: "Rent",
    description: "Monthly rent payment",
    type: "debit",
    status: "completed",
    tags: ["housing"],
  },
  {
    id: "txn_004",
    accountId: "acc_001",
    date: "2025-03-04",
    amount: "-49.99",
    currency: "EUR",
    category: "Entertainment",
    description: "Netflix subscription",
    type: "debit",
    status: "completed",
    tags: ["subscriptions", "leisure"],
  },
  {
    id: "txn_005",
    accountId: "acc_001",
    date: "2025-03-05",
    amount: "-19.99",
    currency: "EUR",
    category: "Dining",
    description: "Lunch at a restaurant",
    type: "debit",
    status: "completed",
    tags: ["food", "social"],
  },
  {
    id: "txn_006",
    accountId: "acc_002",
    date: "2025-03-06",
    amount: "150.00",
    currency: "EUR",
    category: "Freelance",
    description: "Payment for a side project",
    type: "credit",
    status: "completed",
    tags: ["side income", "freelance"],
  },
  {
    id: "txn_007",
    accountId: "acc_001",
    date: "2025-03-07",
    amount: "-35.50",
    currency: "EUR",
    category: "Transport",
    description: "Monthly public transport pass",
    type: "debit",
    status: "completed",
    tags: ["commute"],
  },
  {
    id: "txn_008",
    accountId: "acc_001",
    date: "2025-03-08",
    amount: "-15.00",
    currency: "EUR",
    category: "Healthcare",
    description: "Pharmacy expense",
    type: "debit",
    status: "completed",
    tags: ["health", "medicine"],
  },
  {
    id: "txn_009",
    accountId: "acc_001",
    date: "2025-03-09",
    amount: "-100.00",
    currency: "EUR",
    category: "Savings",
    description: "Transferred to savings account",
    type: "debit",
    status: "pending",
    tags: ["savings", "investment"],
  },
  {
    id: "txn_010",
    accountId: "acc_001",
    date: "2025-03-10",
    amount: "-45.00",
    currency: "EUR",
    category: "Utilities",
    description: "Electricity bill payment",
    type: "debit",
    status: "completed",
    tags: ["bills", "utilities"],
  },
];

export default mockTransactions;
