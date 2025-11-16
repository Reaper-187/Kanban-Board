import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  InputOTP,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import z from "zod";

const formOtpSchema = z.object({
  otpSent: z
    .string()
    .length(6, { message: "Your one-time password must be 6 digits." })
    .regex(/^\d+$/, { message: "Only numbers are allowed." }),
});

type FormOtp = z.infer<typeof formOtpSchema>;

export const OneTimeOtp = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormOtp>({
    resolver: zodResolver(formOtpSchema),
    defaultValues: {
      otpSent: "",
    },
  });

  const onSubmit = (data: FormOtp) => {
    console.log(data);
  };

  return (
    <>
      <div className="min-h-screen flex justify-center items-center">
        <Card className="w-full p-5 space-y-4 max-w-md">
          <h1 className="text-center text-2xl font-semibold">
            OTP-Authentication
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Controller
              name="otpSent"
              control={control}
              render={({ field }) => (
                <>
                  <InputOTP
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={6}
                  >
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSeparator />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} className="rounded-r-md" />
                  </InputOTP>
                  {errors.otpSent && (
                    <p className="text-sm text-red-500">
                      {errors.otpSent.message}
                    </p>
                  )}
                </>
              )}
            />

            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </>
  );
};
