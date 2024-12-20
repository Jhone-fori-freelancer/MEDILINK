"use client"
import { useState } from "react";
import { LoginForm } from "./LoginForm";
import { LoginTwoFactor } from "./LoginTwoFactor";

export function LoginSelect() {
  const [loginType, setLoginType] = useState<string>('twoFactor')

  return (
    <>
      {loginType === 'twoFactor' ? <LoginTwoFactor /> : <LoginForm />}
      <div className="flex justify-center mt-4">
        <button
          className="text-blue-500 hover:text-blue-700"
          onClick={() => setLoginType(loginType === 'twoFactor' ? 'login' : 'twoFactor')}
        >
          {loginType === 'twoFactor' ? (<p className="underline">Prefiero inicio de sesión tradicional (email y contraseña)</p>) : (<p className="underline">Prefiero inicio de sesión por código (DNI y/o Teléfono)</p>)}
        </button>
      </div>
    </>
  )
}