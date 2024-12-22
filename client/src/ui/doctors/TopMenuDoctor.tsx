'use client'

import { SvgCalendar, SvgNotifications, SvgPerfil } from '@/components'
import Link from 'next/link'
import React, { useState } from 'react'
import Logo from '/public/logo_full.png'
import Image from 'next/image'
import { DoctorFromResponse } from '@/interfaces/user'
import { logoutUser } from "@/actions/auth/login-action";

export function TopMenuDoctor({ user }: { user: DoctorFromResponse }) {
    const [menuOpen, setMenuOpen] = useState(false);

    const icons = [
        { icon: <SvgCalendar />, title: "Mi agenda", url: '/doctor/schedule' },
        { icon: <SvgPerfil />, title: "Mi perfil", url: '/doctor/profile/' + user.id },
        { icon: <SvgNotifications />, name: "notificación", url: '#' }
    ];

    return (
        <div className="py-8">
            <nav className="flex justify-between items-center px-4 md:px-20 mx-auto text-[#004784]">
                <Link href={"/doctor/calendar"} className="text-3xl font-semibold">
                    <Image src={Logo} alt="logo" width={250} height={50} priority />
                </Link>
                <div className="md:hidden">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-3xl">
                        ☰
                    </button>
                </div>
                <div className={`md:flex gap-8 items-center ${menuOpen ? 'block' : 'hidden'} md:block`}>
                    <ul className="flex flex-col md:flex-row gap-8 items-center">
                        {icons.map((item, index) => (
                            <li key={index}>
                                <Link
                                    className={`flex gap-2 justify-center items-center ${item.name && "bg-blue-500 p-2 rounded-full"}`}
                                    href={item.url}
                                >
                                    <span>{item.icon}</span> {item.title && <span>{item.title}</span>}
                                </Link>
                            </li>
                        ))}
                        <li>
                            <Link
                                className="border-2 border-[#004784] rounded-full px-6 py-2 font-semibold"
                                href={"/"}
                                onClick={async () => { await logoutUser() }}
                            >
                                Salir
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
}
