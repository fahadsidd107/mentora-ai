import Link from "next/link";
import { ArrowRight, AudioLines, Bookmark, BrainCircuit, Check, Database, Github, Linkedin, Mail, MessageCircleMore, Mic2, Phone, ShieldCheck, Sparkles } from "lucide-react";
import LearningConstellation from "@/components/LearningConstellation";

const contact = {
  name: "Muhammad Fahad Siddiqui",
  email: "fahad@anue.eu",
  github: "https://github.com/fahadsidd107",
  linkedin: "https://www.linkedin.com/in/muhammad-fahad-siddiqui-595484176/",
};

const stack = ["Next.js", "Clerk", "Supabase", "Vapi", "Sentry"];

export default function LandingPage() {
  return (
    <div className="landing-shell">
      <section className="landing-hero">
        <div className="hero-noise" />
        <div className="landing-container hero-layout">
          <div className="hero-copy">
            <p className="landing-eyebrow"><span /> Voice-first learning, shaped around you</p>
            <h1 className="landing-title">A tutor that meets you <em>where your curiosity lives.</em></h1>
            <p className="hero-lede">Build a personal AI mentor with its own subject, voice and teaching style—then learn through natural, real-time conversation.</p>
            <div className="hero-actions">
              <Link className="landing-primary" href="/dashboard">Enter your dashboard <ArrowRight size={17} /></Link>
              <Link className="landing-secondary" href="/companions">Explore companions</Link>
            </div>
            <p className="hero-status"><span className="status-dot" /> Live voice sessions · Persistent progress · Your pace</p>
          </div>
          <LearningConstellation />
        </div>
        <div className="landing-container proof-strip" aria-label="Product capabilities">
          <div><strong>01</strong><span>Real-time</span><p>Voice dialogue that feels immediate.</p></div>
          <div><strong>02</strong><span>Personal</span><p>A mentor configured around your goals.</p></div>
          <div><strong>03</strong><span>Continuous</span><p>Learning history that keeps momentum.</p></div>
        </div>
      </section>

      <section className="landing-section how-section">
        <div className="landing-container">
          <div className="section-heading"><p className="landing-eyebrow dark">How Mentora works</p><h2>From an idea to an <em>actual conversation.</em></h2></div>
          <div className="steps-editorial">
            <article className="step step-primary"><span>01</span><BrainCircuit /><h3>Create your mentor</h3><p>Choose a subject, topic, personality and session length. Mentora turns your preferences into a focused learning companion.</p><div className="mini-config"><b>SUBJECT</b><i>Neural networks</i><b>STYLE</b><i>Patient · visual</i></div></article>
            <article className="step"><span>02</span><Mic2 /><h3>Talk naturally</h3><p>Ask, interrupt, explore and clarify. The tutor adapts in real time, like a great conversation should.</p><div className="voice-line"><i/><i/><i/><i/><i/><i/><i/></div></article>
            <article className="step"><span>03</span><Bookmark /><h3>Keep momentum</h3><p>Revisit companions, bookmark what works, and see the learning sessions that brought you forward.</p><div className="progress-line"><i /><b>SESSION SAVED</b><Check size={15}/></div></article>
          </div>
        </div>
      </section>

      <section className="landing-section feature-section">
        <div className="landing-container feature-story">
          <div className="voice-console">
            <div className="console-top"><span><i/> LIVE SESSION</span><small>04:26</small></div>
            <div className="sound-orb"><AudioLines size={38}/></div>
            <p className="console-speaker">Your mentor is speaking</p>
            <blockquote>“Let’s break this into one simple idea, then build from there.”</blockquote>
            <div className="console-wave">{Array.from({length: 19}).map((_, i) => <i key={i}/>)}</div>
          </div>
          <div className="story-copy"><p className="landing-eyebrow dark">Conversation, not content</p><h2>Learning becomes vivid when it <em>talks back.</em></h2><p>Mentora combines low-latency voice with a tutor prompt designed to explain in small, understandable pieces—checking in as you go.</p><ul><li><MessageCircleMore/>Short, conversational responses</li><li><Sparkles/>Teaching style that matches you</li><li><ShieldCheck/>Focused on the subject you chose</li></ul></div>
        </div>
      </section>

      <section className="landing-section build-section">
        <div className="landing-container build-layout">
          <div><p className="landing-eyebrow">Built as a real product</p><h2>Thoughtful experience.<br/><em>Serious engineering.</em></h2><p className="build-copy">Mentora AI is a full-stack exploration of what personalized education can feel like—authentication, persisted data, observability and real-time AI voice composed into one coherent product.</p><div className="stack-list">{stack.map((item, i) => <span key={item}><b>0{i+1}</b>{item}</span>)}</div></div>
          <div className="system-map"><div className="map-card user-map"><span>LEARNER</span><b>Authenticated experience</b></div><div className="map-line"/><div className="map-card core-map"><BrainCircuit/><span>MENTORA CORE</span><b>Adaptive tutor orchestration</b></div><div className="map-branches"><i/><i/><i/></div><div className="map-services"><span><Mic2/>Voice</span><span><Database/>Data</span><span><ShieldCheck/>Telemetry</span></div></div>
        </div>
      </section>

      <section className="final-cta"><div className="landing-container"><span className="cta-orbit"/><p className="landing-eyebrow">Your next question is waiting</p><h2>Build the mentor you wish<br/>you always had.</h2><Link href="/dashboard" className="landing-primary light">Start learning <ArrowRight size={18}/></Link></div></section>

      <footer className="landing-footer"><div className="landing-container footer-grid"><div><Link href="/" className="footer-brand">Mentora <span>AI</span></Link><p>Personalized learning through real conversation.</p></div><div><b>PRODUCT</b><Link href="/dashboard">Dashboard</Link><Link href="/companions">Companions</Link><Link href="/my-journey">My Journey</Link></div><div><b>CREATED BY</b><p className="creator-name">{contact.name}</p><a href={`mailto:${contact.email}`}><Mail/> {contact.email}</a><span><Phone/> Phone — available on request</span></div><div><b>CONNECT</b><a href={contact.linkedin} target="_blank" rel="noreferrer"><Linkedin/> LinkedIn</a><a href={contact.github} target="_blank" rel="noreferrer"><Github/> GitHub</a></div></div><div className="landing-container footer-base"><span>© {new Date().getFullYear()} Mentora AI</span><span>Designed & engineered with intent.</span></div></footer>
    </div>
  );
}
