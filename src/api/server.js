import jsonServer from "json-server";
import jwt from "jsonwebtoken";

const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(jsonServer.bodyParser);

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
      user: safeUser,
      token,
      message: "Login successful",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
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

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`JSON Server is running on http://localhost:${PORT}`);
});
