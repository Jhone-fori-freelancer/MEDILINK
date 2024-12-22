import { TopMenu } from "@/ui";
import { cookies } from 'next/headers'
import { redirect } from "next/navigation";


export default function LayoutDashboard({
    children
}: {
    children: React.ReactNode;
}) {
    const userCookie = cookies().get('user');
    const user = userCookie ? JSON.parse(userCookie.value) : null;

    if (!user || (user.rol !== 'PATIENT' && user.rol !== 'ADMIN')) {
        redirect('/')
    }
    return (
        <div className="min-h-screen">
            <TopMenu user={user} />
            <div className="w-full max-w-[1480px] mx-auto px-4 text-[#1A2C33]">
                {children}
            </div>
        </div>
    );
}