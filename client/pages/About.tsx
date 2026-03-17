import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero / Welcome Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className={cn(
              "font-display text-5xl md:text-6xl font-bold mb-8",
              "text-foreground"
            )}>
              Welcome to Spa &amp; Salon Africa
            </h1>
            <p
              className={cn(
                "text-foreground/70 text-base md:text-lg mb-6",
                "font-light leading-relaxed"
              )}
            >
              The spa, salon and barbershop industry is one of the most dynamic,
              customer-focused and fast-growing sectors in Africa. It&apos;s
              creative. It&apos;s powerful. It&apos;s deeply personal.
            </p>
            <p
              className={cn(
                "text-foreground/70 text-base md:text-lg mb-6",
                "font-light leading-relaxed"
              )}
            >
              But behind every flawless fade, glowing facial and perfect weave is
              a business owner navigating staffing challenges, rising costs,
              marketing demands, taxes, customer retention and cash flow
              pressures.
            </p>
            <p
              className={cn(
                "text-foreground/70 text-base md:text-lg font-medium",
                "leading-relaxed"
              )}
            >
              Spa &amp; Salon Africa exists to support the business side of
              things.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden shadow-2xl">
            <img
              src="/assets/25.jpg"
              alt="About Spa & Salon Africa"
              className="w-full h-[320px] md:h-[380px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-8",
              "text-foreground"
            )}
          >
            What We Do
          </h2>
          <p
            className={cn(
              "text-foreground/70 text-base md:text-lg mb-12",
              "font-light leading-relaxed"
            )}
          >
            Spa &amp; Salon Africa is a community-driven platform dedicated to
            empowering spa, salon and barbershop owners with the tools,
            knowledge and support they need to build sustainable, profitable
            businesses.
          </p>
          <p className="text-foreground/80 font-medium mb-6">
            We provide:
          </p>
          <ul className="space-y-6">
            {[
              {
                title: "Business Education & Training",
                desc: "Through webinars, workshops, interviews and expert-led sessions, we tackle real industry challenges. We cover everything from pricing and profitability to staffing systems, customer experience and financial management.",
              },
              {
                title: "The Business Club",
                desc: "A growing community where owners connect, learn, network and solve problems together. We recognised the challenges of building a business in isolation and set out to build a supportive community.",
              },
              {
                title: "Marketing & Branding Support",
                desc: "We help beauty businesses position themselves strategically through consulting, digital marketing services and content creation that attracts the right clients.",
              },
              {
                title: "Industry Conversations",
                desc: "Through interviews with leading founders, coaches, product manufacturers and strategists, we bring practical insights directly to owners.",
              },
              {
                title: "Media & Advertising Platform",
                desc: "Via our social media platforms, newsletter and quarterly magazine, we spotlight businesses, brands and opportunities within the industry.",
              },
            ].map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="text-black font-bold flex-shrink-0">▸</span>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-foreground/70 text-sm md:text-base font-light leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why Community Matters */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/20">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-6",
              "text-foreground"
            )}
          >
            Why Community Matters
          </h2>
          <p
            className={cn(
              "text-foreground/70 text-base md:text-lg mb-4",
              "font-light leading-relaxed"
            )}
          >
            Running a spa, salon or barbershop can be tough. Spa &amp; Salon
            Africa creates a space where owners can learn from each other,
            collaborate, network and grow not as competitors, but as a thriving
            ecosystem.
          </p>
          <p
            className={cn(
              "text-foreground/70 text-base md:text-lg",
              "font-light leading-relaxed"
            )}
          >
            We believe that when one business grows sustainably, the entire
            industry becomes stronger.
          </p>
        </div>
      </section>

      {/* Our Vision */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-6",
              "text-foreground"
            )}
          >
            Our Vision
          </h2>
          <p
            className={cn(
              "text-foreground/70 text-base md:text-lg mb-6",
              "font-light leading-relaxed"
            )}
          >
            To elevate African spas, salons and barbershops into globally
            respected, profitable and professionally run enterprises powered by
            knowledge, systems and community.
          </p>
          <p
            className={cn(
              "text-foreground/80 text-base md:text-lg font-medium",
              "leading-relaxed"
            )}
          >
            If you own a spa, salon or barbershop, you are part of the movement.
          </p>
          <p
            className={cn(
              "font-display text-xl md:text-2xl font-bold mt-10",
              "text-foreground"
            )}
          >
            Welcome to Spa &amp; Salon Africa.
          </p>
        </div>
      </section>

      {/* Team Section */}
      {/* <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Meet Our Team
          </h2>
          <p className={cn(
            "text-foreground/70 text-center mb-12 text-lg",
            "font-light max-w-2xl mx-auto"
          )}>
            Our team blends experience in salon ownership, marketing, education
            and technology to serve beauty entrepreneurs across the continent.
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { name: "Amara Okafor", role: "Founder & Salon Growth Strategist" },
              { name: "Zainab Hassan", role: "Marketing & Community Lead" },
              { name: "Kwame Asante", role: "Education & Programs Director" }
            ].map((member) => (
              <div key={member.name} className="text-center p-6 rounded-lg bg-secondary/30">
                <div className="bg-gradient-to-br from-black/10 to-black/5 h-32 rounded-lg mb-4" />
                <h3 className={cn(
                  "font-display text-lg font-semibold mb-1",
                  "text-foreground"
                )}>
                  {member.name}
                </h3>
                <p className="text-foreground/60 text-sm font-light">
                  {member.role}
                </p>
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
