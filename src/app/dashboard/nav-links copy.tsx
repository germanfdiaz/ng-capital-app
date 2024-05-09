 import Link from "next/link";
const links = [
    { name: 'Home', href: '/home', icon: 'HomeIcon' },
    { name: 'Dashboard', href: '/dashboard', icon: 'HomeIcon' },
    { name: 'Cotizaciones', href: '/dashboard/iol-cotizaciones', icon: 'HomeIcon' }
]

export default function NavLinks() {
    return (
        <>
        { links.map((link) =>{
            const linkIcon = link.icon;
            return (
                <Link
                    key={ link.name }
                    href={ link.href }
                >
                    { link.name }
                </Link>
            );
        })}
        </>
    );
}