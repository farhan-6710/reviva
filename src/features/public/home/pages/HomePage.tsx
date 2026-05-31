import { Link } from "react-router";
import {
  Activity,
  HeartPulse,
  Sparkles,
  Accessibility,
  ArrowRight,
  CheckCircle2,
  Shield,
  Award,
  Clock,
  Users,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

const features = [
  {
    icon: Shield,
    title: "Evidence-Based Practice",
    description:
      "Every treatment protocol we prescribe is backed by the latest clinical research and peer-reviewed studies in physical therapy.",
  },
  {
    icon: Award,
    title: "Elite Clinical Standards",
    description:
      "Our senior physiotherapists hold advanced postgraduate certifications in orthopaedics, sports medicine, and manual therapy.",
  },
  {
    icon: Clock,
    title: "Dedicated One-on-One Care",
    description:
      "We never double-book. Your session is a dedicated, private, one-on-one consultation with your primary therapist.",
  },
  {
    icon: Users,
    title: "Collaborative Approach",
    description:
      "We work hand-in-hand with your orthopaedic surgeons, sports coaches, and personal trainers to ensure seamless continuity of care.",
  },
];

const services = [
  {
    icon: Activity,
    title: "Sports Injury Rehab",
    description:
      "Structured return-to-play plans for sprains, strains, and performance-related injuries.",
  },
  {
    icon: HeartPulse,
    title: "Post-Operative Recovery",
    description:
      "Guided rehabilitation after surgery with progressive strength and mobility milestones.",
  },
  {
    icon: Sparkles,
    title: "Chronic Pain Management",
    description:
      "Evidence-based treatment for back, neck, and joint pain with long-term movement strategies.",
  },
  {
    icon: Accessibility,
    title: "Mobility & Gait Training",
    description:
      "Balance, posture, and walking programmes tailored to each patient’s daily goals.",
  },
];

export function HomePage() {
  return (
    <div className="bg-background min-h-screen text-foreground">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 py-20 lg:py-32">
        {/* Subtle background glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-foreground)/0.04,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary)/0.03,transparent_40%)]" />

        <div className="mx-auto max-w-6xl px-6 relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-8">
          {/* Left Column: Text */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-3.5 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
              <span className="size-1.5 rounded-full bg-accent animate-pulse" />
              Physiotherapy & Rehabilitation Clinic
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-foreground leading-[1.1]">
              Recover Stronger. <br />
              <span className="text-accent">Move Without Limits.</span>
            </h1>
            <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed">
              Expert-led rehabilitation for sports injuries, post-operative recovery, chronic pain, and mobility restoration. Delivered with clinical precision, care, and measurable progress.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button asChild className="rounded-full px-8 py-6 text-sm font-medium shadow-md">
                <Link to="/services" className="flex items-center gap-2">
                  Explore Our Services <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-8 py-6 text-sm font-medium">
                <Link to="/about">Our Philosophy</Link>
              </Button>
            </div>
          </div>

          {/* Right Column: Premium Visual Card */}
          <div className="relative">
            <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-accent/20 to-primary/10 blur-lg opacity-40" />
            <div className="relative rounded-2xl border border-border/80 bg-card p-8 shadow-xl space-y-8">
              <div className="flex items-center justify-between border-b border-border/50 pb-6">
                <div>
                  <h3 className="text-lg font-serif font-semibold text-foreground">Reviva Clinical Standards</h3>
                  <p className="text-xs text-muted-foreground">Patient-centric recovery metrics</p>
                </div>
                <span className="text-xs font-semibold tracking-wider text-accent bg-accent/10 px-2.5 py-1 rounded-md uppercase">
                  Verified
                </span>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Monthly Sessions</span>
                  <div className="text-3xl font-serif font-bold text-foreground">180+</div>
                  <p className="text-[10px] text-muted-foreground">Active clinical hours</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Satisfaction</span>
                  <div className="text-3xl font-serif font-bold text-foreground">96%</div>
                  <p className="text-[10px] text-muted-foreground">Patient recovery rate</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Avg. Program</span>
                  <div className="text-3xl font-serif font-bold text-foreground">6-8 Wks</div>
                  <p className="text-[10px] text-muted-foreground">To full functional return</p>
                </div>
                <div className="space-y-1">
                  <span className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Clinical Staff</span>
                  <div className="text-3xl font-serif font-bold text-foreground">12</div>
                  <p className="text-[10px] text-muted-foreground">Licensed therapists</p>
                </div>
              </div>

              <div className="rounded-xl bg-muted/40 p-4 border border-border/50 flex items-start gap-3">
                <CheckCircle2 className="size-5 shrink-0 text-primary mt-0.5" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Every treatment plan is backed by objective clinical measurements, regular range-of-motion assessments, and functional milestone tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Philosophy Section */}
      <section className="mx-auto max-w-6xl px-6 py-24 lg:px-8 lg:py-32 space-y-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="space-y-6">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">
              Our Clinical Philosophy
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-foreground">
              We believe recovery should be structured, supportive, and measurable.
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
              At Reviva, we don't believe in temporary fixes. We look at the body as an interconnected system. By combining advanced manual therapy with progressive, evidence-based exercise prescription, we address the root cause of your physical limitations.
            </p>
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>Thorough biomechanical assessments</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>Personalised milestone-driven recovery roadmaps</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-foreground">
                <CheckCircle2 className="size-4 text-primary shrink-0" />
                <span>Direct communication with your medical team</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feat) => {
              const IconComponent = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:border-accent/30 transition-all duration-300"
                >
                  <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary mb-4">
                    <IconComponent className="size-5" />
                  </div>
                  <h3 className="text-base font-semibold tracking-tight text-foreground">
                    {feat.title}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    {feat.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Highlights Section */}
      <section className="border-t border-border/50 bg-card/50 py-24 lg:py-32">
        <div className="mx-auto max-w-6xl px-6 lg:px-8 space-y-16">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <span className="text-xs font-semibold tracking-wider text-accent uppercase">
                Clinical Services
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-foreground">
                Rehabilitation Programmes Tailored to Your Goals
              </h2>
            </div>
            <Button asChild variant="outline" className="rounded-full px-6 shrink-0">
              <Link to="/services" className="flex items-center gap-2">
                View All Services <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((service) => {
              const IconComponent = service.icon;
              return (
                <div
                  key={service.title}
                  className="group rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="inline-flex size-10 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      <IconComponent className="size-5" />
                    </div>
                    <h3 className="text-lg font-semibold tracking-tight text-foreground">
                      {service.title}
                    </h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                  </div>
                  <div className="mt-6">
                    <Link
                      to="/services"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-accent group-hover:text-primary transition-colors"
                    >
                      Learn more <ArrowRight className="size-3" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="border-t border-border/80 bg-card relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--accent-foreground)/0.03,transparent_60%)]" />
        <div className="mx-auto max-w-5xl px-6 py-20 lg:py-28 relative z-10 text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif tracking-tight text-foreground max-w-2xl mx-auto leading-tight">
            Ready to Take the First Step in Your Recovery?
          </h2>
          <p className="max-w-xl mx-auto text-sm sm:text-base text-muted-foreground leading-relaxed">
            Schedule an assessment with one of our senior physiotherapists today. Let's build a clear, structured roadmap to restore your strength and movement.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button asChild className="rounded-full px-8 py-6 text-sm font-medium">
              <Link to="/about">About Our Clinic</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full px-8 py-6 text-sm font-medium">
              <Link to="/admin/dashboard">Staff Portal</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
