import Link from "next/link";
import Image from "next/image";
import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import NavItems from "@/components/NavItems";

const Navbar = () => {
    return (
        <nav className="navbar">
            <Link href="/" aria-label="Mentora AI home">
                <div className="flex items-center gap-2.5 cursor-pointer">
                    <Image
                        src="/images/logo.svg"
                        alt="Mentora AI logo"
                        width={46}
                        height={44}
                    />
                    <div className="hidden sm:flex flex-col leading-none">
                        <span className="flex items-baseline gap-1 text-lg font-bold tracking-[-0.04em] text-foreground">
                            Mentora
                            <span className="text-[0.64em] font-extrabold tracking-[0.08em] text-primary">AI</span>
                        </span>
                        <span className="mt-1 text-[8px] font-semibold tracking-[0.16em] text-foreground/60">LEARN YOUR WAY</span>
                    </div>
                </div>
            </Link>
            <div className="flex items-center gap-8 max-sm:gap-3">
                <NavItems />
                <SignedOut>
                    <SignInButton>
                        <button className="btn-signin">Sign In</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}

export default Navbar
