import { VerifyCode } from "@/ui/auth/LoginVerifyCode";
import { Suspense } from "react";

export default function VerifiedLogin() {
  return (
    <Suspense fallback={'Cargando ...'}>
      <VerifyCode />
    </Suspense>
  );
}