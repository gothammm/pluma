import { Theme } from "@radix-ui/themes";
import { useThemeStore } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

export const App = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useThemeStore();
  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="bronze"
        grayColor="sage"
        radius="large"
        scaling="90%"
        appearance={darkMode ? "dark" : "light"}
      >
        <Toaster
          theme={darkMode ? "dark" : "light"}
          toastOptions={{
            className: "bg-panel-solid",
          }}
        />
        {children}
      </Theme>
    </QueryClientProvider>
  );
};
