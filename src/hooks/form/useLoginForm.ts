import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useLogin } from "@/hooks/useAuth";

const LoginFormValidation = z
  .object({
    email: z.string().trim().min(1, "Email is required"),
    //   .email("Invalid email format"),
    password: z
      .string()
      .trim()
      .min(1, "Password is required")
      .min(6, "Password must be ast least 6 characters"),
  })
  .required();

type TLoginFormSchema = z.infer<typeof LoginFormValidation>;

export const useLoginForm = () => {
  const loginMutation = useLogin();

  const form = useForm<TLoginFormSchema>({
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onBlur",
    reValidateMode: "onChange",
    resolver: zodResolver(LoginFormValidation),
  });

  const onSubmit = async (data: TLoginFormSchema) => {
    console.log("form values.." + JSON.stringify(data, null, 2));

    // const result = await loginWithCredentials(data.email, data.password);
    // if (result) navigate(publicRoutes.DASHBOARD);
    loginMutation.mutate({
      email: data.email,
      password: data.password,
    });
  };

  return { form, onSubmit };
};
