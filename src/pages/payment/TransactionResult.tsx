import { parseAsString, parseAsStringEnum, useQueryStates } from "nuqs";
import { TRANSACTION_STATUS } from "@/types/payment";
import { ReactNode } from "react";
import { Button } from "@/components/ui/button/Button";
import { useNavigate } from "react-router";
import { publicRoutes } from "@/types/routes";
import { CircleX, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

type TPaymentStatusProps = {
  title: string;
  className?: string;
  indicator: ReactNode;
};

export const TransactionResult = () => {
  const [queryParams] = useQueryStates({
    payment_intent: parseAsString.withDefault(""),
    payment_intent_client_secret: parseAsString.withDefault(""),
    redirect_status: parseAsStringEnum([...TRANSACTION_STATUS]),
  });

  if (queryParams.redirect_status === "succeeded")
    return (
      <PaymentStatus
        title="Payment Success"
        className="text-green-400"
        indicator={<ShieldCheck className="size-20 text-green-500" />}
      />
    );

  if (queryParams.redirect_status === "processing")
    return (
      <PaymentStatus
        title="Payment Processing"
        className="text-blue-400"
        indicator={
          <div className="animate-spin rounded-full size-20 border-b-2 border-blue-600 mx-auto mb-4" />
        }
      />
    );

  return (
    <PaymentStatus
      title="Payment Failed"
      className="text-red-400"
      indicator={<CircleX className="size-20 text-red-500" />}
    />
  );
};

const PaymentStatus = ({
  title,
  className,
  indicator,
}: TPaymentStatusProps) => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-[60svh] items-center justify-center p-4 space-y-6">
      <h2
        className={cn(
          "font-integral-cf text-4xl text-black font-bold",
          className
        )}
      >
        {title}
      </h2>

      {indicator}

      <Button
        className="mt-2"
        onClick={() => {
          navigate(publicRoutes.HOME, { replace: true });
        }}
      >
        Back To Home
      </Button>
    </div>
  );
};
