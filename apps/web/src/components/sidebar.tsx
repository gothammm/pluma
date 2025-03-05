import {
  BarChartIcon,
  CubeIcon,
  FileTextIcon,
  GearIcon,
  LayersIcon,
  SunIcon,
  Cross1Icon,
  HamburgerMenuIcon,
} from "@radix-ui/react-icons";
import { Button, IconButton, Separator, Text } from "@radix-ui/themes";
import { ButterIcon } from "./illustrations/butter-icon";
import { Link } from "@tanstack/react-router";
import { useThemeStore } from "../theme";
import { SearchDialog } from "./search-dialog";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";

const NavigationItems = [
  {
    name: "Dashboard",
    icon: <BarChartIcon />,
    href: "/dashboard",
  },
  {
    name: "Accounts",
    icon: <CubeIcon />,
    href: "/accounts",
  },
  {
    name: "Transactions",
    icon: <FileTextIcon />,
    href: "/transactions",
  },
  {
    name: "Tags",
    icon: <LayersIcon />,
    href: "/tags",
  },
  {
    name: "Settings",
    icon: <GearIcon />,
    href: "/settings",
  },
];

export const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { toggleDarkMode } = useThemeStore();

  return (
    <div>
      {/* Mobile Menu Button */}
      <IconButton
        radius="full"
        className="fixed bottom-4 p-2 right-4 z-50 md:hidden"
        variant="ghost"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HamburgerMenuIcon />
      </IconButton>

      {/* Overlay for mobile */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 bg-[var(--color-overlay)] z-40 md:hidden"
            onClick={() => setIsOpen(false)}
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
            isOpen
              ? "max-w-80 w-full translate-x-0"
              : "w-64 border-gray-a5 border-r -translate-x-full md:translate-x-0"
          }
        `}
      >
        <div
          className={`flex flex-1 flex-col gap-4 bg-[var(--color-background)] p-4 ${
            isOpen ? "shadow-border rounded-default" : ""
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
                <SunIcon />
              </Button>
            </div>
          </div>
          <Separator size="4" my="4" />
          <SearchDialog />
          <Separator size="4" my="4" />
          <div className="flex flex-col gap-2">
            {NavigationItems.map((item) => (
              <Link
                key={item.name}
                activeProps={{ className: "bg-accent-3" }}
                to={item.href}
                className="flex flex-row items-center gap-2 p-2 hover:bg-accent-3 rounded-lg hover:cursor-pointer hover:shadow-classic"
                onClick={() => setIsOpen(false)}
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
