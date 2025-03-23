import { MagnifyingGlass } from "@phosphor-icons/react";
import { Dialog, Text, TextField } from "@radix-ui/themes";
import React from "react";

export const SearchDialog = () => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div
          className="w-full flex flex-row gap-2 p-2 items-center cursor-pointer shadow-border rounded-default bg-text-field"
          style={{
            height: "var(--space-6)",
            color: "var(--gray-11)",
          }}
        >
          <MagnifyingGlass height="16" width="16" />
          <Text
            color="gray"
            size={"2"}
            style={{
              color: "var(--gray-a10)",
            }}
          >
            Search...
          </Text>
        </div>
      </Dialog.Trigger>
      <Dialog.Content>
        <TextField.Root
          type="search"
          placeholder="Search..."
          className="w-full"
        >
          <TextField.Slot>
            <MagnifyingGlass height="16" width="16" />
          </TextField.Slot>
        </TextField.Root>
      </Dialog.Content>
    </Dialog.Root>
  );
};
