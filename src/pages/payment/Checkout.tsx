import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { publicRoutes } from "@/types/routes";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // ✅ Use confirmPayment for Payment Element
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        // return_url: `${window.location.origin}/payment-success`,
        return_url: `${window.location.origin}${publicRoutes.TRANSACTION_RESULT}`,
      },
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        console.log(error.message);
      } else {
        console.log("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6">
      <h2 className="text-2xl mb-4">Complete Your Payment</h2>

      {/* ✅ Payment Element handles all payment methods automatically */}
      <div className="mb-6">
        <PaymentElement
          options={{
            layout: "tabs",
            // This will show tabs for different payment methods
          }}
        />
      </div>

      <button
        type="submit"
        disabled={!stripe || !elements || isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {isLoading ? "Processing..." : "Pay Now"}
      </button>
    </form>
  );
};

export const Checkout = () => {
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 🎯 NO SERVER: Direct Stripe API call from browser (TEST MODE ONLY!)
    const createPaymentIntent = async () => {
      try {
        const response = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${import.meta.env.VITE_STRIPE_SECRET_KEY}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              amount: "1000",
              currency: "myr",
              "automatic_payment_methods[enabled]": "true",
            }),
          }
        );

        if (!response.ok) {
          const errorData = await response.json();
          console.error("Stripe API Error:", errorData);
          throw new Error(
            errorData.error?.message || "Failed to create payment intent"
          );
        }

        const paymentIntent = await response.json();
        setClientSecret(paymentIntent.client_secret);
      } catch (err) {
        console.error("Payment intent creation failed:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize payment"
        );
      }
    };

    createPaymentIntent();
  }, []);

  const options = {
    clientSecret,
    appearance: {
      theme: "stripe" as const,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      {error && (
        <div className="max-w-md mx-auto mb-4 p-4 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      {!clientSecret && !error && (
        <div className="max-w-md mx-auto p-6 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment form...</p>
        </div>
      )}

      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
};
