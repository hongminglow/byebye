// services/googleAuth.ts
interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture: string;
  given_name: string;
  family_name: string;
}

interface GoogleAuthResponse {
  access_token: string;
  id_token: string;
  scope: string;
  token_type: string;
  expires_in: number;
}

class GoogleAuthService {
  private clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  private clientSecret = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
  private redirectUri = import.meta.env.VITE_REDIRECT_URI;

  getAuthUrl(): string {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: "openid profile email",
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });

    return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
  }

  // ✅ New popup method
  openPopup(): Promise<string> {
    return new Promise((resolve, reject) => {
      const authUrl = this.getAuthUrl();

      // Open popup window
      const popup = window.open(
        authUrl,
        "google-auth",
        "width=500,height=600,scrollbars=yes,resizable=yes"
      );

      if (!popup) {
        reject(new Error("Popup blocked. Please allow popups for this site."));
        return;
      }

      // Listen for popup to close or receive message
      const checkClosed = setInterval(() => {
        if (popup.closed) {
          clearInterval(checkClosed);
          reject(new Error("Authentication cancelled"));
        }
      }, 1000);

      // Listen for messages from popup
      const messageListener = (event: MessageEvent) => {
        if (event.origin !== window.location.origin) return;

        if (event.data.type === "GOOGLE_AUTH_SUCCESS") {
          clearInterval(checkClosed);
          window.removeEventListener("message", messageListener);
          popup.close();
          resolve(event.data.code);
        } else if (event.data.type === "GOOGLE_AUTH_ERROR") {
          clearInterval(checkClosed);
          window.removeEventListener("message", messageListener);
          popup.close();
          reject(new Error(event.data.error || "Authentication failed"));
        }
      };

      window.addEventListener("message", messageListener);
    });
  }

  // Exchange authorization code for tokens
  async exchangeCodeForTokens(code: string): Promise<GoogleAuthResponse> {
    const response = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: this.clientId,
        client_secret: this.clientSecret!,
        code,
        grant_type: "authorization_code",
        redirect_uri: this.redirectUri,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to exchange code for tokens");
    }

    return response.json();
  }

  // Get user info from Google
  async getUserInfo(accessToken: string): Promise<GoogleUser> {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v2/userinfo?access_token=${accessToken}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch user info");
    }

    return response.json();
  }

  // Decode JWT token to get user info
  parseIdToken(idToken: string): GoogleUser {
    const base64Url = idToken.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );

    return JSON.parse(jsonPayload);
  }
}

export const googleAuthService = new GoogleAuthService();
