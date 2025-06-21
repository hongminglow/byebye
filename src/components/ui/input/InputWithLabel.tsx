import { Input } from "@/components/ui/input";

type TInputLabelProps = React.ComponentProps<"input"> & {
  label: string;
  error?: string;
};

export function InputWithLabel({
  id,
  label,
  error,
  ...props
}: TInputLabelProps) {
  return (
    <div className="grid w-full gap-3">
      <label
        htmlFor={id}
        className="text-sm justify-self-start font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
      <Input id={id} {...props} />

      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
