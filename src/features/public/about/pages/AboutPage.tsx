import { Link } from "react-router";
import {
  ShieldCheck,
  HeartPulse,
  Award,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

const values = [
  {
    icon: ShieldCheck,
    title: "Patient-First Care",
    description:
      "Every decision we make is guided by what is best for your long-term health and functional recovery. We put your goals at the center of your treatment plan.",
  },
  {
    icon: Award,
    title: "Evidence-Based Rehab",
    description:
      "We reject trends and temporary fixes. Our treatment protocols are strictly grounded in peer-reviewed clinical research and proven biomechanical principles.",
  },
  {
    icon: HeartPulse,
    title: "Transparent Progress",
    description:
      "We believe you should always know where you stand. We use objective, quantifiable metrics to track your range of motion, strength, and milestone progression.",
  },
];

const team = [
  {
    name: "Dr. Evelyn Vance, PT, DPT",
    role: "Clinical Director & Founder",
    specialty: "Orthopaedic Manual Therapy & Post-Op Recovery",
    bio: "With over 14 years of clinical experience in elite orthopaedic settings, Evelyn founded Reviva to bring a higher standard of structured, one-on-one rehabilitation to the community.",
  },
  {
    name: "Marcus Sterling, PT, MSPT",
    role: "Senior Sports Physiotherapist",
    specialty: "Sports Injury Rehabilitation & Gait Analysis",
    bio: "Marcus has worked with collegiate and professional athletes across multiple sports. He specialises in biomechanical movement screening and return-to-play conditioning.",
  },
  {
    name: "Sarah Jenkins, PT, DPT",
    role: "Neurological Rehab Specialist",
    specialty: "Balance, Vestibular, & Gait Training",
    bio: "Sarah holds advanced certifications in vestibular rehabilitation and stroke recovery. She is passionate about helping patients reclaim their balance and mobility.",
  },
];

export function AboutPage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-foreground)/0.04,transparent_50%)]" />
        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
            About Reviva
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            Restoring Movement. <br />
            <span className="text-accent">Rebuilding Confidence.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            Reviva is a premium physiotherapy and rehabilitation clinic built around one core belief: recovery should feel structured, supportive, and measurable.
          </p>
        </div>
      </section>

      {/* Our Story & Mission Section */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28 space-y-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">
              Our Vision
            </span>
            <h2 className="text-3xl font-serif tracking-tight text-foreground">
              A Modern Approach to Physical Rehabilitation
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              We founded Reviva out of a desire to change the traditional physical therapy experience. We saw a system where patients were often double-booked, passed off to assistants, or left to perform exercises unsupervised.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              At Reviva, we do things differently. We provide dedicated, one-on-one sessions with highly credentialed senior physiotherapists. We combine advanced clinical reasoning, hands-on manual therapy, and objective progress tracking to ensure your recovery is permanent.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-card p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-serif font-semibold text-foreground">Our Clinical Promise</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">No Double-Booking</h4>
                  <p className="text-xs text-muted-foreground">Your session is entirely yours. 100% dedicated time with your physiotherapist.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Objective Measurement</h4>
                  <p className="text-xs text-muted-foreground">We measure your progress using precise clinical instruments, not guesswork.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="size-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Evidence-Based Treatment</h4>
                  <p className="text-xs text-muted-foreground">We only use protocols proven by clinical research to be safe and effective.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="border-t border-b border-border/80 bg-card/50 py-20 lg:py-28">
        <div className="mx-auto max-w-5xl px-6 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">
              Our Values
            </span>
            <h2 className="text-3xl font-serif tracking-tight text-foreground">
              The Principles That Guide Our Practice
            </h2>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {values.map((val) => {
              const IconComponent = val.icon;
              return (
                <div
                  key={val.title}
                  className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-accent/30 transition-all duration-300 space-y-4"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary">
                    <IconComponent className="size-5" />
                  </div>
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {val.title}
                  </h3>
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    {val.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="mx-auto max-w-5xl px-6 py-20 lg:py-28 space-y-16">
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase">
            Clinical Leadership
          </span>
          <h2 className="text-3xl font-serif tracking-tight text-foreground">
            Meet Our Senior Clinicians
          </h2>
          <p className="text-sm text-muted-foreground">
            Our team of licensed physical therapists holds advanced postgraduate training and is dedicated to your complete recovery.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          {team.map((member) => (
            <div
              key={member.name}
              className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-accent/30 transition-all duration-300 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs font-medium text-accent">{member.role}</p>
                  <p className="text-[11px] text-muted-foreground italic">{member.specialty}</p>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">
                  {member.bio}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="border-t border-border/80 bg-card">
        <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-6 px-6 py-12 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground max-w-xl">
            Are you a healthcare provider or clinician? Access your patient schedules, session logs, and clinic analytics via the Reviva staff portal.
          </p>
          <div className="flex flex-wrap gap-3 shrink-0">
            <Button asChild variant="outline" className="rounded-full px-6">
              <Link to="/">Back to Home</Link>
            </Button>
            <Button asChild className="rounded-full px-6">
              <Link to="/admin/dashboard" className="flex items-center gap-2">
                Staff Portal <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
