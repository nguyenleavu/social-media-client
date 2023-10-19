import { useLoginMutation } from "@/apis/auth/useLoginMutation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { LoginForm, loginSchema } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginForm>({ resolver: yupResolver(loginSchema) });

  const { mutate: login, isPending } = useLoginMutation(setError, router);

  const onSubmit = handleSubmit((data) => {
    login(data);
  });

  return (
    <form action="" className="w-full my-4" onSubmit={onSubmit}>
      <Input
        fullWidth
        name="email"
        placeholder="Email"
        register={register}
        error={errors.email?.message}
      />
      <Input
        placeholder="Password"
        fullWidth
        name="password"
        // type="password"
        register={register}
        error={errors.password?.message}
      />

      <Button
        type="submit"
        size="fullWidth"
        className="mt-4"
        disable={isPending}
        loading={isPending}
      >
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
