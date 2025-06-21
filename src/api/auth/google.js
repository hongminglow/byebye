// /api/auth/google (Node.js/Express example)
app.post("/api/auth/google", async (req, res) => {
  try {
    const { googleUser, idToken } = req.body;

    // Verify the ID token with Google
    const ticket = await client.verifyIdToken({
      idToken: idToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    // Check if user exists or create new user
    let user = await User.findOne({ email: payload.email });

    if (!user) {
      user = await User.create({
        email: payload.email,
        name: payload.name,
        picture: payload.picture,
        provider: "google",
        googleId: payload.sub,
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { userId: user._id },
      process.env.JWT_REFRESH_SECRET,
      { expiresIn: "30d" }
    );

    res.json({
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        picture: user.picture,
      },
      token,
      refreshToken,
    });
  } catch (error) {
    console.error("Google auth error:", error);
    res.status(400).json({ error: "Authentication failed" });
  }
});
