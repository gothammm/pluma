import { useSidebarStore } from "@/store";
import { List } from "@phosphor-icons/react";
import { IconButton } from "@radix-ui/themes";

export const SidebarToggleButton = () => {
  const { setOpen } = useSidebarStore();
  return (
    <div className="md:hidden">
      <IconButton
        radius="full"
        variant="ghost"
        className="p-4"
        onClick={() => setOpen(true)}
      >
        <List weight="bold" />
      </IconButton>
    </div>
  );
};
