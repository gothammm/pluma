import { motion } from "motion/react";

export const PageTransition = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{
      duration: 0.3,
      ease: [0.4, 0, 0.2, 1], // custom easing curve for smoother feel
    }}
    className="flex flex-1"
  >
    {children}
  </motion.div>
);
