import { LoginSendCode } from "@/ui/auth/LoginSendCode";
import { Suspense } from "react";

export default function VerifiedLogin() {
  return (
    <div className="h-full grid place-content-center">
      <Suspense fallback={'Cargando ...'}>
        <LoginSendCode />
      </Suspense>
    </div>
  );
}