import jsonServer from "json-server";
import jwt from "jsonwebtoken";
import Stripe from "stripe";
import dotenv from "dotenv";
import cors from "cors";
// ✅ Load environment variables
dotenv.config();

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

console.log("Environment Variables Test:");
console.log("- VITE_STRIPE_SECRET_KEY:", process.env.VITE_STRIPE_SECRET_KEY);
console.log("- STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY);
console.log(
  "- All env keys:",
  Object.keys(process.env).filter((key) => key.includes("STRIPE"))
);

server.use(
  cors({
    origin: process.env.VITE_WEB_APPLICATION_URL,
    credentials: true,
  })
);
server.use(middlewares);
server.use(jsonServer.bodyParser);

// ✅ Initialize Stripe with import syntax
const stripe = new Stripe(process.env.VITE_STRIPE_SECRET_KEY);

// ✅ Custom login endpoint with server-side logic
server.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const db = router.db;

    // Find user in database
    const user = db.get("users").find({ email }).value();

    if (!user) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "User not found",
      });
    }

    // Check password (you can use bcrypt for real hashing)
    const isValidPassword = password === user.password; // Simple check for demo

    if (!isValidPassword) {
      return res.status(401).json({
        error: "Invalid credentials",
        message: "Wrong password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      "your-secret-key",
      { expiresIn: "24h" }
    );

    // Remove password from response
    const { password: _, ...safeUser } = user;

    res.json({
      message: "Login successful",
      success: true,
      data: {
        user: safeUser,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

server.post("/api/create-payment-intent", async (req, res) => {
  const { amount, currency = "myr" } = req.body;

  try {
    // Create a PaymentIntent with automatic payment methods
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount, // Amount in cents
      currency: currency,
      payment_method_types: [
        "card", // Credit/debit cards
        "fpx", // Malaysian online banking
        "grabpay", // GrabPay (Southeast Asia)
        "alipay", // Alipay
      ],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(400).send({
      error: {
        message: error.message,
      },
    });
  }
});

// ✅ Custom protected route middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access token required" });
  }

  try {
    const decoded = jwt.verify(token, "your-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token" });
  }
};

// ✅ Protected endpoint - Get current user
server.get("/api/auth/me", authenticateToken, (req, res) => {
  const db = router.db;
  const user = db.get("users").find({ id: req.user.userId }).value();

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  const { password, ...safeUser } = user;
  res.json(safeUser);
});

server.post("/api/auth/logout", (req, res) => {
  return res.status(200).json({ message: "Logout successful" });
});

// Use default router for other routes

server.use("/api", router);

const PORT = process.env.PORT || 3002;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
