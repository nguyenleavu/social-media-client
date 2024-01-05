import { useForgotPassword } from "@/apis/auth/useForgotPassword";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ForgotPasswordForm, forgotPasswordSchema } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const ForgotForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ForgotPasswordForm>({
    resolver: yupResolver(forgotPasswordSchema),
  });

  const {
    mutate: forgotPassword,
    isPending,
    data,
    isSuccess,
  } = useForgotPassword(setError);

  const onSubmit = handleSubmit((data) => {
    forgotPassword(data);
  });

  return isSuccess ? (
    <div className="my-5 flex flex-col items-center border border-primary p-3 rounded">
      <h1 className="text-2xl font-bold">{data?.data.message}</h1>
      <div className="py-4">
        <i className="text-5xl text-primary fa-thin fa-envelope-circle-check"></i>
      </div>
    </div>
  ) : (
    <form className="my-4 w-full" onSubmit={onSubmit}>
      <Input
        placeholder="Email"
        error={errors.email?.message}
        name="email"
        fullWidth
        register={register}
      />
      <Button
        type="submit"
        size="fullWidth"
        className="mt-4"
        disable={isPending}
        loading={isPending}
      >
        Send email
      </Button>
    </form>
  );
};

export default ForgotForm;
