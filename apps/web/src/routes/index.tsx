import { Logo } from "@/components/logo";
import { useThemeStore } from "@/theme";
import { Bookmark, Sun } from "@phosphor-icons/react";
import { Button, Text } from "@radix-ui/themes";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  const { toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();
  const words = ["Finance,", "made", "simple."];
  return (
    <div className="h-full flex-1 bg-background flex flex-col">
      <header className="flex items-center justify-around bg-background py-2 border-gray-a5 border-b">
        <div className="flex flex-1 justify-start items-center px-5">
          <Logo />
        </div>
        <div className="flex flex-1 justify-end items-end px-5">
          <Button color="gray" variant="ghost" onClick={toggleDarkMode}>
            <Sun />
          </Button>
        </div>
      </header>

      <main className="flex flex-grow container mx-auto px-4 py-8">
        {/* Add the background blur element */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[200px] rounded-full bg-gradient-to-r from-accent-9/10 to-accent-9/10 blur-[100px] pointer-events-none" />
        {/* Equalizer-like gradient background */}
        <div className="fixed bottom-0 left-0 right-0 w-screen h-[25vh] flex justify-evenly items-end gap-0 px-4">
          {[...Array(16)].map((_, i) => (
            <div
              key={i}
              className={`w-full h-full bg-gradient-to-t 
                from-accent-9/30 
                via-accent-9/10 
                to-transparent 
                rounded-t-xl
                blur-[20px]
                origin-bottom
                ${i % 3 === 0 ? "animate-equalizer1" : i % 2 === 1 ? "animate-equalizer2" : "animate-equalizer3"}`}
            />
          ))}
        </div>
        <section className="flex flex-col justify-center items-center flex-1 gap-4">
          <h1 className="flex flex-col md:flex-row justify-center items-center md:items-baseline gap-x-2 text-center">
            {words.map((word, i) => (
              <motion.div
                key={i}
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.4,
                  delay: i * 0.1,
                  ease: "easeOut",
                }}
              >
                <Text size="9" weight="medium" className="text-primary">
                  {word}
                </Text>
              </motion.div>
            ))}
          </h1>
          <h2 className="flex items-center justify-center text-[var(--gray-a11)]">
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.4,
                delay: 0.1,
                ease: "easeOut",
              }}
            >
              <Text size="5" weight="medium">
                A dead straight finance app for day-to-day purpose.
              </Text>
            </motion.div>
          </h2>
          <Button
            size="3"
            variant="soft"
            onClick={() => {
              navigate({
                to: "/dashboard",
              });
            }}
          >
            Get Started
          </Button>
        </section>
      </main>
    </div>
  );
}
