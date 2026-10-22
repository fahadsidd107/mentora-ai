'use client';

import Link from "next/link";
import {usePathname} from "next/navigation";
import {cn} from "@/lib/utils";
import {useState} from "react";

const navItems = [
    { label:'Home', href: '/' },
    { label: 'Companions', href: '/companions' },
    { label: 'My Journey', href: '/my-journey' },
]

const NavItems = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const links = navItems.map(({ label, href }) => (
        <Link
            href={href}
            key={label}
            onClick={() => setIsOpen(false)}
            aria-current={pathname === href ? 'page' : undefined}
            className={cn(
                'rounded-lg px-2 py-1.5 transition-colors hover:bg-secondary hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                pathname === href && 'text-primary font-semibold bg-secondary'
            )}
        >
            {label}
        </Link>
    ));

    return (
        <div className="relative">
            <div className="hidden sm:flex items-center gap-1" aria-label="Primary navigation">
                {links}
            </div>
            <button
                type="button"
                className="sm:hidden flex size-10 items-center justify-center rounded-xl border border-foreground bg-card text-xl font-semibold transition-colors hover:bg-secondary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                onClick={() => setIsOpen((open) => !open)}
            >
                <span aria-hidden="true">{isOpen ? '×' : '☰'}</span>
            </button>
            {isOpen && (
                <div
                    id="mobile-navigation"
                    className="absolute right-0 top-12 z-50 flex min-w-44 flex-col gap-1 rounded-2xl border border-foreground bg-card p-2 shadow-[5px_6px_0_rgba(17,24,58,0.14)] sm:hidden"
                    aria-label="Mobile navigation"
                >
                    {links}
                </div>
            )}
        </div>
    )
}

export default NavItems
