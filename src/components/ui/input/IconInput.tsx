import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input/Input";
import React from "react";

type TIconInputProps = React.ComponentProps<"input"> & {
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  className?: string;
  inputClassName?: string;
  iconClassName?: string;
};

export const IconInput = ({
  startIcon,
  endIcon,
  className,
  iconClassName,
  inputClassName,
  ...props
}: TIconInputProps) => {
  return (
    <div
      className={cn(
        "border-input bg-gray-100 flex h-9 w-full min-w-0 rounded-md border  transition-[color,box-shadow] has-[:focus-visible]:border-ring has-[:focus-visible]:ring-ring/50 has-[:focus-visible]:ring-[3px] has-[:disabled]:pointer-events-none has-[:disabled]:cursor-not-allowed has-[:disabled]:opacity-50",
        "has-[:invalid]:ring-destructive/20 dark:has-[:invalid]:ring-destructive/40 has-[:invalid]:border-destructive",
        className
      )}
    >
      {/* Start Icon */}
      {startIcon && (
        <div
          className={cn(
            "flex items-center justify-center px-3 text-muted-foreground",
            iconClassName
          )}
        >
          {startIcon}
        </div>
      )}

      <Input
        className={cn(
          "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 flex h-full w-full min-w-0 bg-transparent py-1 text-base shadow-xs outline-none file:border-0 border-0 file:bg-transparent file:text-sm file:font-medium md:text-sm",
          startIcon ? "pl-0" : "pl-3",
          endIcon ? "pr-0" : "pr-3",
          inputClassName
        )}
        {...props}
      />

      {endIcon && (
        <div
          className={cn(
            "flex items-center justify-center px-3 text-muted-foreground",
            iconClassName
          )}
        >
          {endIcon}
        </div>
      )}
    </div>
  );
};
