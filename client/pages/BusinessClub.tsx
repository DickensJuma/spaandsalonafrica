import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Check, Gift, Users, TrendingUp } from "lucide-react";

export default function BusinessClub() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black/5">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className={cn(
              "font-display text-5xl md:text-6xl font-bold mb-8",
              "text-foreground"
            )}>
              The Spa &amp; Salon Africa Business Club
            </h1>
          <p className={cn(
            "text-foreground/70 text-base md:text-lg mb-6",
            "font-light leading-relaxed"
          )}>
            Running a spa, salon or barbershop can sometimes feel like
            you&apos;re figuring everything out alone. One day it&apos;s staffing
            drama, the next it&apos;s cash flow stress, slow bookings, marketing
            confusion or tax questions.
          </p>
          <p className={cn(
            "text-foreground/70 text-base md:text-lg mb-6",
            "font-light leading-relaxed"
          )}>
            The Spa &amp; Salon Africa Business Club was created so you don&apos;t
            have to navigate it all by yourself.
          </p>
          <p className={cn(
            "text-foreground/80 text-base md:text-lg font-medium",
            "leading-relaxed"
          )}>
            This is a supportive community of spa, salon and barbershop owners
            who are serious about building profitable, well-run businesses while
            still enjoying the journey.
          </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/assets/31.jpg"
              alt="Spa & Salon Africa Business Club"
              className="w-full h-[320px] md:h-[380px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Inside the Business Club */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Inside the Business Club, you can expect:
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                icon: Gift,
                title: "Business Resources",
                description:
                  "Access templates, checklists and tools for pricing, marketing, hiring and growth.",
              },
              {
                icon: Users,
                title: "Owner Community",
                description:
                  "Connect with salon, spa & barbershop owners facing the same challenges you are.",
              },
              {
                icon: TrendingUp,
                title: "Growth Workshops",
                description:
                  "Monthly live sessions on marketing, leadership, finances and operations.",
              },
              {
                icon: Check,
                title: "Accountability",
                description:
                  "Regular check-ins and challenges to help you actually implement what you learn.",
              },
              {
                icon: Gift,
                title: "Partner Offers",
                description:
                  "Exclusive deals from product brands, software tools and service providers.",
              },
              {
                icon: Users,
                title: "Regional Meetups",
                description:
                  "In-person networking opportunities with owners in your city and region.",
              },
            ].map((benefit, index) => (
              <div key={index} className="flex gap-4 p-6 rounded-lg bg-secondary/30">
                <benefit.icon className="w-8 h-8 text-black flex-shrink-0 mt-1" />
                <div>
                  <h3 className={cn(
                    "font-display font-semibold mb-2",
                    "text-foreground"
                  )}>
                    {benefit.title}
                  </h3>
                  <p className="text-foreground/60 text-sm font-light">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <p className={cn(
            "text-foreground/80 text-center text-lg md:text-xl mt-12 font-medium",
            "leading-relaxed max-w-2xl mx-auto"
          )}>
            If you&apos;re ready to move from surviving to scaling and you want
            to do it alongside other ambitious beauty business owners, the Spa
            &amp; Salon Africa Business Club is for you.
          </p>
        </div>
      </section>

      {/* Membership Tiers */}
      {/* <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Choose Your Tier
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Starter",
                price: "KES 9,900",
                period: "/year",
                features: [
                  "Access to private community",
                  "Monthly group Q&A calls",
                  "Resource library (templates & checklists)",
                ],
              },
              {
                name: "Growth",
                price: "KES 19,900",
                period: "/year",
                features: [
                  "Everything in Starter",
                  "Monthly live workshops",
                  "Quarterly 1:1 strategy call",
                  "Priority access to events",
                ],
                featured: true,
              },
              {
                name: "Leader",
                price: "KES 39,900",
                period: "/year",
                features: [
                  "Everything in Growth",
                  "Done-with-you implementation sprints",
                  "Exclusive mastermind group",
                  "Launch and campaign support",
                ],
              },
            ].map((tier) => (
              <div
                key={tier.name}
                className={cn(
                  "rounded-lg p-8 transition-transform hover:scale-105",
                  tier.featured
                    ? "bg-black/10 border-2 border-black"
                    : "bg-secondary/30"
                )}
              >
                <h3 className={cn(
                  "font-display text-2xl font-bold mb-2",
                  "text-foreground"
                )}>
                  {tier.name}
                </h3>
                <div className="mb-6">
                  <span className={cn(
                    "font-display text-4xl font-bold",
                    "text-foreground"
                  )}>
                    {tier.price}
                  </span>
                  <span className="text-foreground/60 text-sm ml-2">
                    {tier.period}
                  </span>
                </div>
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-foreground/70">
                      <Check className="w-4 h-4 text-black" />
                      <span className="text-sm font-light">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={cn(
                  "w-full py-2 rounded-sm font-semibold transition-colors",
                  tier.featured
                    ? "bg-black text-white hover:bg-black/90"
                    : "bg-secondary text-foreground hover:bg-secondary/80"
                )}>
                  Join Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Footer */}
      <footer className={cn(
        "border-t border-border bg-background",
        "py-12 px-4 sm:px-6 lg:px-8"
      )}>
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2026 Spa & Salon Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
