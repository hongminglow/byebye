// Cookie utility functions
export const cookieStorage = {
  get: (name: string): string | null => {
    if (typeof document === "undefined") return null;

    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      const cookieValue = parts.pop()?.split(";").shift();
      return cookieValue || null;
    }
    return null;
  },

  set: (
    name: string,
    value: string,
    options: {
      expires?: number; // days
      httpOnly?: boolean;
      secure?: boolean;
      sameSite?: "Strict" | "Lax" | "None";
      domain?: string;
      path?: string;
    } = {}
  ) => {
    if (typeof document === "undefined") return;

    const {
      expires = 7, // 7 days default
      secure = window.location.protocol === "https:",
      sameSite = "Lax",
      path = "/",
    } = options;

    let cookieString = `${name}=${value}; Path=${path}; SameSite=${sameSite}`;

    if (expires > 0) {
      const date = new Date();
      date.setTime(date.getTime() + expires * 24 * 60 * 60 * 1000);
      cookieString += `; Expires=${date.toUTCString()}`;
    }

    if (secure) {
      cookieString += "; Secure";
    }

    if (options.domain) {
      cookieString += `; Domain=${options.domain}`;
    }

    document.cookie = cookieString;
  },

  remove: (name: string, options: { path?: string; domain?: string } = {}) => {
    if (typeof document === "undefined") return;

    const { path = "/", domain } = options;
    let cookieString = `${name}=; Path=${path}; Expires=Thu, 01 Jan 1970 00:00:01 GMT`;

    if (domain) {
      cookieString += `; Domain=${domain}`;
    }

    document.cookie = cookieString;
  },
};
