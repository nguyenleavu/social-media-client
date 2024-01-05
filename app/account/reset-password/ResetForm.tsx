import { useResetPasswordMutation } from "@/apis/auth/useResetPasswordMutation";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { ResetPasswordForm, resetPasswordSchema } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const ResetForm = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<ResetPasswordForm>({
    resolver: yupResolver(resetPasswordSchema),
  });

  const {
    mutate: resetPassword,
    data,
    isPending,
    isSuccess,
  } = useResetPasswordMutation(setError);

  const onSubmit = handleSubmit((data) => {
    const forgot_password_token = localStorage.getItem("forgot_password_token");
    if (forgot_password_token) {
      resetPassword({ ...data, forgot_password_token });
    }
  });

  return isSuccess ? (
    <div className="w-full my-5 flex flex-col items-center border border-primary p-3 rounded">
      <h1 className="text-2xl font-bold">{data?.data.message}</h1>
      <div className="py-4">
        <i className="text-5xl text-primary fa-thin fa-circle-check"></i>
      </div>
    </div>
  ) : (
    <form className="my-4 w-full" onSubmit={onSubmit}>
      <Input
        fullWidth
        name="password"
        register={register}
        placeholder="Password"
        error={errors.password?.message}
      />
      <Input
        fullWidth
        name="confirm_password"
        placeholder="Confirm password"
        register={register}
        error={errors.confirm_password?.message}
      />
      <Button
        type="submit"
        size="fullWidth"
        className="mt-4"
        disable={isPending}
        loading={isPending}
      >
        Reset
      </Button>
    </form>
  );
};

export default ResetForm;
