export const SAMPLE_CARDS = {
  // ✅ Successful payments
  visa: "4242 4242 4242 4242",
  visaDebit: "4000 0566 5566 5556",
  mastercard: "5555 5555 5555 4444",
  amex: "3782 822463 10005",

  // ❌ Declined payments
  declined: "4000 0000 0000 0002",
  insufficientFunds: "4000 0000 0000 9995",
  lostCard: "4000 0000 0000 9987",

  // 🔐 3D Secure (requires authentication)
  threeDSecure: "4000 0025 0000 3155",

  // 🌍 International cards
  india: "4000 0000 0000 0036",
  brazil: "4000 0000 0000 0077",
};
