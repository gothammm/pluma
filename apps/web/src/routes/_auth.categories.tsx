import { fetchData, useApiMutation } from "@/api";
import { getContrastingColor } from "@/color";
import { ColorPicker } from "@/components/color-picker";
import { SidebarToggleButton } from "@/components/sidebar-toggle-button";
import { ListResponse } from "@/types/api-response";
import { Category } from "@/types/category";
import { MagnifyingGlass, Pencil, Trash } from "@phosphor-icons/react";
import {
  Avatar,
  Button,
  Card,
  Dialog,
  Flex,
  Separator,
  Text,
  TextField,
} from "@radix-ui/themes";
import { useForm } from "@tanstack/react-form";
import { useSuspenseQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/_auth/categories")({
  component: CategoryPageComponent,
});

function CategoryPageComponent() {
  const [search, setSearch] = useState("");

  const { data: categories, refetch } = useSuspenseQuery<
    ListResponse<Category>
  >({
    queryKey: ["categories"],
    queryFn: fetchData("/categories"),
    queryHash: "categories",
  });
  // Filter categories based on search
  const filteredCategories = useMemo(() => {
    if (search.trim() === "") return categories.results;

    return categories.results.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase()),
    );
  }, [categories.results, search]);
  const ModifyDialog = ({ category }: { category?: Category }) => {
    const [open, setOpen] = useState(false);
    const mutation = useApiMutation<Category>({
      url: category ? `/categories/${category.id}` : "/categories",
      method: category ? "PUT" : "POST",
      mutationOptions: {
        onSuccess: () => {
          refetch();
          setOpen(false); // Close dialog on success
        },
        onError: (error) => {
          console.error(error);
        },
      },
    });
    const form = useForm<Omit<Category, "id">>({
      defaultValues: category
        ? {
            name: category.name,
            color: category.color,
          }
        : {
            name: "",
            color: "#000000",
          },
      onSubmit: async (values) => {
        try {
          await mutation.mutateAsync({
            ...values.value,
            id: category?.id,
          });
        } catch (error) {
          console.error(error);
        }
      },
    });
    return (
      <Dialog.Root
        open={open}
        onOpenChange={(isOpen) => {
          if (!isOpen) {
            form.reset();
            mutation.reset();
          }
          return setOpen(isOpen);
        }}
      >
        <Dialog.Trigger>
          <Button>
            <Pencil />
          </Button>
        </Dialog.Trigger>
        <Dialog.Content maxWidth="450px">
          <Dialog.Title>Edit category</Dialog.Title>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              void form.handleSubmit();
            }}
          >
            <Flex direction="column" gap="3">
              <form.Field
                name="name"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) {
                      return "Category name is required";
                    }
                  },
                }}
              >
                {(field) => (
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Name
                    </Text>
                    <TextField.Root
                      placeholder="Category name"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors && (
                      <Text color="red" size="1">
                        {field.state.meta.errors.join(", ")}
                      </Text>
                    )}
                  </label>
                )}
              </form.Field>
              <form.Field name="color">
                {(field) => (
                  <label>
                    <Text as="div" size="2" mb="1" weight="bold">
                      Name
                    </Text>
                    <ColorPicker
                      selectedColor={field.state.value}
                      onColorChange={(value) => field.handleChange(value)}
                    />
                    {field.state.meta.errors && (
                      <Text color="red" size="1">
                        {field.state.meta.errors.join(", ")}
                      </Text>
                    )}
                  </label>
                )}
              </form.Field>
            </Flex>

            <Flex gap="3" mt="4" justify="end">
              <Dialog.Close>
                <Button variant="soft" color="gray">
                  Cancel
                </Button>
              </Dialog.Close>
              <Button type="submit">Save</Button>
            </Flex>
          </form>
        </Dialog.Content>
      </Dialog.Root>
    );
  };

  return (
    <div className="flex flex-1 flex-col p-5 md:p-10 gap-10">
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <SidebarToggleButton />
          <Text size="6" className="px-1" weight="bold">
            Categories
          </Text>
        </div>
      </div>

      <Card>
        <div className="flex flex-col p-4 md:p-2">
          <div className="flex gap-4 mb-5">
            <TextField.Root
              placeholder="Find categories.."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1"
            >
              <TextField.Slot>
                <MagnifyingGlass height="16" width="16" />
              </TextField.Slot>
            </TextField.Root>
          </div>
          <AnimatePresence initial={false}>
            {filteredCategories.length === 0 ? (
              <Text
                as="div"
                size="2"
                weight="medium"
                className="py-8 flex justify-center items-center"
              >
                No categories found
              </Text>
            ) : (
              filteredCategories.map((category, index) => {
                return (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <div className="flex gap-5 items-center justify-between">
                      <div className="flex gap-3 items-center">
                        <Avatar
                          fallback={category.name.slice(0, 1)}
                          style={
                            category.color
                              ? ({
                                  background: category.color,
                                  "--avatar-text": getContrastingColor(
                                    category.color,
                                  ),
                                } as React.CSSProperties)
                              : {}
                          }
                          className="[&_.rt-AvatarFallback:where(.rt-one-letter)]:!text-[var(--avatar-text)]"
                        />
                        <Text size="2" weight="medium" className="capitalize">
                          {category.name}
                        </Text>
                      </div>
                      <div className="flex gap-3 items-center">
                        <ModifyDialog category={category} />
                        <Button color="red" variant="soft">
                          <Trash />
                        </Button>
                      </div>
                    </div>
                    {index < filteredCategories.length - 1 && (
                      <Separator my="3" size="4" />
                    )}
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </div>
      </Card>
    </div>
  );
}
