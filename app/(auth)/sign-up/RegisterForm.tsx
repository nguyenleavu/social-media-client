import { useRegisterMutation } from "@/apis/auth/useRegisterMutation";
import Button from "@/components/Button";
import DatePicker from "@/components/DatePicker";
import Input from "@/components/Input";
import { authSchema, RegisterForm } from "@/validation/auth";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

const RegisterForm = () => {
  const [date, setDate] = useState<Date>();

  const router = useRouter();

  const {
    register,
    setValue,
    setError,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>({ resolver: yupResolver(authSchema) });

  const { mutate: registerAccount, isPending } = useRegisterMutation(
    setError,
    router
  );

  const onSubmit = handleSubmit((data) => {
    registerAccount(data);
  });

  return (
    <form className="w-full mt-4" onSubmit={onSubmit}>
      <Input
        name="email"
        placeholder="Email"
        fullWidth
        register={register}
        error={errors.email?.message}
      />
      <Input
        name="name"
        placeholder="Name"
        fullWidth
        register={register}
        error={errors.name?.message}
      />
      <DatePicker
        error={errors.date_of_birth?.message}
        value={date}
        onChange={([date]: Date[]) => {
          setValue("date_of_birth", date?.toISOString());
          setDate(date);
        }}
      />
      <Input
        name="password"
        placeholder="Password"
        fullWidth
        register={register}
        error={errors.password?.message}
      />
      <Input
        fullWidth
        placeholder="Confirm password"
        name="confirm_password"
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
        Sign Up
      </Button>
    </form>
  );
};

export default RegisterForm;
