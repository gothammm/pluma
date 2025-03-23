import { Theme } from "@radix-ui/themes";
import { useThemeStore } from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { useLayoutEffect } from "react";
import { IconContext } from "@phosphor-icons/react";

const queryClient = new QueryClient();

export const App = ({ children }: { children: React.ReactNode }) => {
  const { darkMode } = useThemeStore();
  useLayoutEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);
  return (
    <QueryClientProvider client={queryClient}>
      <Theme
        accentColor="bronze"
        grayColor="sage"
        radius="large"
        scaling="90%"
        appearance={darkMode ? "dark" : "light"}
      >
        <IconContext.Provider
          value={{
            size: 18,
          }}
        >
          <Toaster
            theme={darkMode ? "dark" : "light"}
            toastOptions={{
              className: "rounded-lg",
            }}
          />
          {children}
        </IconContext.Provider>
      </Theme>
    </QueryClientProvider>
  );
};
