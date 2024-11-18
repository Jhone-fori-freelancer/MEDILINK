'use client'

import Link from "next/link";
import { ButtonComponent } from "@/ui";
import Logo from '/public/logo_full.png'
import Image from "next/image";
import { DoctorFromResponse } from "@/interfaces/user";
import { logoutUser } from "@/actions/auth/login-action";


export function Header({ user }: { user?: DoctorFromResponse }) {
  return (

    <header className="flex justify-between items-center py-11 px-24 border-b-[6px] border-b-[#004784]">

      <Link href={user ? "/dashboard" : '/'} className="text-lg font-bold">
        <Image src={Logo} alt="logo" width={250} height={50} />
      </Link>

      {!user ? (
        <nav>
          <ul className="flex gap-8 items-center">
            <li className="flex gap-[30px]" >
              <Link
                href={"/auth/login"}>
                <ButtonComponent size="normal" text="Iniciar sesión" variant="light" />
              </Link>
              <Link
                href={"/auth/register"}>
                <ButtonComponent size="normal" text="Registrarse" variant="dark" />
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <nav>
          <ul className="flex gap-8 items-center">
            <li className="flex gap-[30px]" >
              <Link
                href={"/auth/login"}>
                <ButtonComponent size="normal" text="Cerrar sesión" variant="light" onClick={async () => { await logoutUser() }} />
              </Link>

            </li>
          </ul>
        </nav>
      )}

    </header>
  )
}
