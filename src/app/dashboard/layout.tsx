import NavLinks from "./nav-links"

export default function LayoutDashboard (
    { children } : { children: React.ReactNode }
) {
    return (
        <section>
            <NavLinks/>
            { children }
        </section>
    )
}