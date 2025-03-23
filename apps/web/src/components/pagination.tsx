import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { Button } from "@radix-ui/themes";

export const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-5">
      <Button variant="soft" className="p-2">
        <ArrowLeft />
      </Button>
      <div className="flex gap-2">
        <Button variant="ghost" className="p-2">
          1
        </Button>
      </div>
      <Button variant="soft" className="p-2">
        <ArrowRight />
      </Button>
    </div>
  );
};
