import Image from "next/image";
import Link from "next/link";

const Cta = () => {
    return (
        <section className="cta-section">
            <div className="cta-badge">Start learning your way.</div>
            <h2 className="text-3xl font-bold">
                Build your Mentora AI companion
            </h2>
            <p>Pick a name, subject, voice, and personality—then learn through conversations shaped around you.</p>
            <Image src="/images/cta.svg" alt="Personalized voice learning with Mentora AI" width={362} height={232} />
            <Link href="/companions/new" className="btn-primary">
                <Image src="/icons/plus.svg" alt="plus" width={12} height={12}/>
                <span>Build a New Companion</span>
            </Link>
        </section>
    )
}
export default Cta
