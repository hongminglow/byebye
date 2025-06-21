// pages/auth/Login.tsx
import { useAuthStore } from "@/store/useAuthStore";
import { InputWithLabel } from "@/components/ui/input/InputWithLabel";
import { PasswordInput } from "@/components/ui/input/PasswordInput";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router";
import { publicRoutes } from "@/types/routes";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button/Button";
import { LogIn } from "lucide-react";
import { useLoginForm } from "@/hooks/form/useLoginForm";

export const Login = () => {
  return (
    <div className="relative">
      <div className="h-80 bg-black w-full" />
      <div className="-translate-y-20 border-gray-300 shadow border flex flex-col p-4 mx-auto justify-center items-center w-1/3 bg-gray-100 rounded-xl">
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>

        <LoginForm />
      </div>
    </div>
  );
};

const LoginForm = () => {
  const navigate = useNavigate();
  const { form, onSubmit } = useLoginForm();
  const { loginWithGoogle } = useAuthStore();

  const handleGoogleSuccessCallback = async (
    credentialResponse: CredentialResponse
  ) => {
    if (credentialResponse.credential) {
      try {
        const result = await loginWithGoogle(credentialResponse.credential);
        if (result) navigate(publicRoutes.DASHBOARD);
      } catch (error) {
        console.error("Error during Google login:", error);
      }
    }
  };

  return (
    <form id="login-form" onSubmit={form.handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-2 px-2 w-full mt-6 items-center justify-center">
        <Controller
          name="email"
          control={form.control}
          render={({ field, fieldState }) => (
            <InputWithLabel
              id="email"
              label="Email"
              placeholder="Enter your email"
              error={fieldState.error ? fieldState.error.message : undefined}
              {...field}
              {...field}
            />
          )}
        />

        <Controller
          name="password"
          control={form.control}
          render={({ field, fieldState }) => (
            <PasswordInput
              id="password"
              label="Password"
              placeholder="Enter your password"
              error={fieldState.error ? fieldState.error.message : undefined}
              {...field}
            />
          )}
        />

        <Button type="submit" variant="ghost" className="text-blue-500 px-5 ">
          <LogIn />
          Sign In
        </Button>

        <div className="my-1">
          <GoogleLogin
            onSuccess={handleGoogleSuccessCallback}
            useOneTap={false}
          />
        </div>
      </div>
    </form>
  );
};
