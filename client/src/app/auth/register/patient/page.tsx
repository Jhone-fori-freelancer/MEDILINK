import { AuthStepsForm } from "@/ui/auth/stepsForm";

export default function RegisterPatientPage() {
  return (
    <div className=" my-8">
      <AuthStepsForm isDoctor={false} />
    </div>
  );
}