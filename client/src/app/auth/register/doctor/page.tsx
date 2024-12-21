import { AuthStepsForm } from "@/ui/auth/stepsForm";

export default function RegisterDoctorPage() {
  return (
    <div className=" my-8">
      <AuthStepsForm isDoctor />
    </div>
  );
}