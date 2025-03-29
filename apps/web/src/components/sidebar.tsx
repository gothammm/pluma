import { Button, IconButton, Separator, Text } from "@radix-ui/themes";
import { ButterIcon } from "./illustrations/butter-icon";
import { Link } from "@tanstack/react-router";
import { useThemeStore } from "../theme";
import { SearchDialog } from "./search-dialog";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  CashRegister,
  ChartBar,
  Cube,
  Gear,
  List,
  Sun,
  Tag,
} from "@phosphor-icons/react";
import { useSidebarStore } from "@/store";

const NavigationItems = [
  {
    name: "Dashboard",
    icon: <ChartBar />,
    href: "/dashboard",
  },
  {
    name: "Accounts",
    icon: <Cube />,
    href: "/accounts",
  },
  {
    name: "Transactions",
    icon: <CashRegister />,
    href: "/transactions",
  },
  {
    name: "Categories",
    icon: <Tag />,
    href: "/categories",
  },
  {
    name: "Settings",
    icon: <Gear />,
    href: "/settings",
  },
];

export const Sidebar = () => {
  const { open, setOpen } = useSidebarStore();
  const { toggleDarkMode } = useThemeStore();

  return (
    <div>
      {/* Overlay for mobile */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[var(--color-overlay)] z-40 md:hidden"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div
        className={`
          fixed md:static
          inset-y-0 left-0
          flex flex-col p-2 h-full
          transition-transform duration-300
          z-50 md:z-0
          ${
            open
              ? "max-w-80 w-full translate-x-0"
              : "w-64 border-gray-a5 border-r -translate-x-full md:translate-x-0"
          }
        `}
      >
        <div
          className={`flex flex-1 flex-col gap-4 bg-[var(--color-background)] p-4 ${
            open ? "shadow-border rounded-default" : ""
          }`}
        >
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row gap-2 items-center">
              <ButterIcon />
              <Text className="lowercase" size="4" weight="medium">
                Butter.finance
              </Text>
            </div>
            <div className="flex gap-2">
              <Button
                color="gray"
                variant="ghost"
                className="p-2"
                onClick={toggleDarkMode}
              >
                <Sun />
              </Button>
            </div>
          </div>
          <Separator size="4" />
          <SearchDialog />
          <Separator size="4" />
          <div className="flex flex-col gap-2">
            {NavigationItems.map((item) => (
              <Link
                key={item.name}
                activeProps={{ className: "bg-accent-3" }}
                to={item.href}
                className="flex flex-row items-center gap-2 p-2 hover:bg-accent-3 rounded-lg hover:cursor-pointer hover:shadow-classic"
                onClick={() => setOpen(false)}
              >
                {item.icon}
                <Text size="2" weight="medium">
                  {item.name}
                </Text>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
