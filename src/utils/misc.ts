export const getGoogleRecaptchaSiteKey = () => {
  const siteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY;
  if (!siteKey) {
    throw new Error(
      "Google reCAPTCHA site key is not defined in environment variables."
    );
  }
  return siteKey;
};
