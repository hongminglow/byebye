// components/ui/input/PasswordInput.tsx
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/Button";
import { Eye, EyeOff } from "lucide-react";
import { useState, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface PasswordInputProps extends React.ComponentProps<typeof Input> {
  label?: string;
  error?: string;
  hint?: string;
  showToggle?: boolean;
}

export const PasswordInput = forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ label, error, hint, showToggle = true, className, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const errorId = error ? `${id}-error` : undefined;
    const hintId = hint ? `${id}-hint` : undefined;

    return (
      <div className="grid w-full items-center gap-1.5">
        {label && (
          <label
            htmlFor={id}
            className="text-sm font-medium justify-self-start"
          >
            {label}
          </label>
        )}

        <div className="relative">
          <Input
            ref={ref}
            id={id}
            type={showPassword ? "text" : "password"}
            className={cn(
              "pr-10", // Space for toggle button
              error && "border-destructive focus-visible:ring-destructive",
              className
            )}
            aria-invalid={error ? "true" : "false"}
            aria-describedby={cn(errorId && errorId, hintId && hintId)}
            {...props}
          />

          {showToggle && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="absolute right-0 cursor-pointer ho hover:opacity-30 top-0 h-full px-3 py-2 hover:bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Eye className="h-4 w-4 text-muted-foreground" />
              )}
            </Button>
          )}
        </div>

        {hint && !error && (
          <p id={hintId} className="text-xs text-muted-foreground">
            {hint}
          </p>
        )}

        {error && (
          <p id={errorId} className="text-xs text-destructive">
            {error}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";
