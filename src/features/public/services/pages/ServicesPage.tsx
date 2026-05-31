import { Link } from "react-router";
import {
  Activity,
  HeartPulse,
  Sparkles,
  Accessibility,
  Layers,
  Dumbbell,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/shared/ui/button";

const services = [
  {
    icon: Activity,
    title: "Sports Injury Rehabilitation",
    description:
      "Precision-engineered recovery for athletes of all levels. We combine biomechanical analysis with targeted manual therapy and functional strength training to get you back to peak performance safely and efficiently.",
    benefits: [
      "Biomechanical movement screening",
      "Sport-specific conditioning",
      "Joint stability & agility training",
      "Injury prevention education",
    ],
  },
  {
    icon: HeartPulse,
    title: "Post-Operative Recovery",
    description:
      "A structured, milestone-driven rehabilitation programme following orthopaedic surgeries (ACL reconstruction, joint replacements, arthroscopy). We coordinate closely with your surgeon's protocols.",
    benefits: [
      "Controlled swelling & pain management",
      "Early range-of-motion restoration",
      "Progressive strength rebuilding",
      "Milestone-based progression tracking",
    ],
  },
  {
    icon: Sparkles,
    title: "Chronic Pain Management",
    description:
      "Evidence-based treatment for persistent back, neck, shoulder, and joint pain. We focus on desensitising the nervous system, correcting movement patterns, and empowering you with self-management strategies.",
    benefits: [
      "Postural & ergonomic assessment",
      "Myofascial release & dry needling",
      "Graduated activity exposure",
      "Long-term movement strategies",
    ],
  },
  {
    icon: Accessibility,
    title: "Mobility & Gait Training",
    description:
      "Tailored programmes to improve balance, coordination, posture, and walking mechanics. Ideal for post-stroke recovery, neurological conditions, or age-related mobility decline.",
    benefits: [
      "Fall risk assessment & prevention",
      "Balance & vestibular training",
      "Gait analysis & correction",
      "Assistive device optimization",
    ],
  },
  {
    icon: Layers,
    title: "Manual Therapy & Joint Mobilisation",
    description:
      "Hands-on clinical techniques designed to reduce pain, improve joint glide, and restore soft tissue extensibility. Our clinicians use precise, evidence-based manual interventions.",
    benefits: [
      "Maitland & Mulligan joint mobilisations",
      "Instrument-assisted soft tissue mobilisation",
      "Neuromuscular facilitation",
      "Targeted stretching & manipulation",
    ],
  },
  {
    icon: Dumbbell,
    title: "Custom Exercise Prescription",
    description:
      "Individualised exercise programming tailored to your unique anatomy, lifestyle, and recovery goals. Delivered via our digital tracking portal so you can confidently train at home.",
    benefits: [
      "Tailored home exercise plans",
      "Video-guided movement library",
      "Progressive overload scheduling",
      "Direct clinician feedback loop",
    ],
  },
];

export function ServicesPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border/60 py-20 lg:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,var(--accent-foreground)/0.05,transparent_50%)]" />
        <div className="mx-auto max-w-5xl px-6 relative z-10 text-center space-y-6">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs font-semibold tracking-wider text-accent uppercase">
            Our Clinical Expertise
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif tracking-tight text-foreground max-w-3xl mx-auto leading-tight">
            Specialised Care for Lasting Recovery
          </h1>
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-muted-foreground leading-relaxed">
            At Reviva, we combine advanced clinical reasoning, hands-on manual therapy, and evidence-based exercise prescription to restore your body’s natural movement.
          </p>
        </div>
      </section>

      {/* Services Grid Section */}
      <section className="mx-auto max-w-6xl px-6 py-20 lg:py-28">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const IconComponent = service.icon;
            return (
              <div
                key={service.title}
                className="group relative flex flex-col justify-between rounded-2xl border border-border/80 bg-card p-6 shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300"
              >
                <div className="space-y-4">
                  <div className="inline-flex size-12 items-center justify-center rounded-xl bg-primary/5 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <IconComponent className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                  <h4 className="text-xs font-semibold tracking-wider text-accent uppercase">
                    What we focus on:
                  </h4>
                  <ul className="space-y-2">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-xs text-muted-foreground">
                        <CheckCircle2 className="size-3.5 shrink-0 text-primary mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Patient Journey Section */}
      <section className="bg-card border-t border-b border-border/80 py-20 lg:py-28 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,var(--primary)/0.03,transparent_40%)]" />
        <div className="mx-auto max-w-5xl px-6 relative z-10">
          <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase">
              The Path to Wellness
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-foreground">
              Your Recovery Journey
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              We believe recovery should be structured, transparent, and measurable. Here is what you can expect when you partner with Reviva.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-4 relative">
            {/* Step 1 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-serif text-accent/20 font-bold">01</div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Comprehensive Assessment</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We begin with a thorough physical examination, diagnostic screening, and history review to pinpoint the root cause of your discomfort.
              </p>
            </div>

            {/* Step 2 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-serif text-accent/20 font-bold">02</div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Personalised Treatment</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                Using manual therapy, joint mobilisation, and soft tissue release, we focus on relieving acute pain and restoring early joint mobility.
              </p>
            </div>

            {/* Step 3 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-serif text-accent/20 font-bold">03</div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Active Rehabilitation</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We transition you into customized, progressive strength and mobility exercises to rebuild tissue resilience and restore function.
              </p>
            </div>

            {/* Step 4 */}
            <div className="space-y-4 relative">
              <div className="text-5xl font-serif text-accent/20 font-bold">04</div>
              <h3 className="text-lg font-semibold tracking-tight text-foreground">Empowered Discharge</h3>
              <p className="text-xs leading-relaxed text-muted-foreground">
                We equip you with personalized home programs, biomechanical advice, and preventative strategies to ensure your recovery is permanent.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 lg:py-28 text-center">
        <div className="mx-auto max-w-3xl px-6 space-y-8">
          <h2 className="text-3xl sm:text-4xl font-serif tracking-tight text-foreground">
            Ready to Reclaim Your Movement?
          </h2>
          <p className="text-base text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Schedule an initial consultation with one of our senior physiotherapists. Let's build your roadmap to a pain-free life.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild className="rounded-full px-8 py-6 text-sm font-medium">
              <Link to="/about" className="flex items-center gap-2">
                Learn About Our Clinic <ArrowRight className="size-4" />
              </Link>
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
