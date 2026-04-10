import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { ContactSection } from "@/components/ContactSection";
import MarketingBanner from "@/components/MarketingBanner";
import FeaturedSection from "@/components/FeaturedSection";
import {  ArrowRight, Star, Calendar, Clock, Video, X, Loader2, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import { CURRENT_WEBINAR } from "@/shared/events";

interface WebinarRegistrationData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  questions: string;
}

export default function Landing() {
  const webinarFormRef = useRef<HTMLDivElement | null>(null);
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [registrationData, setRegistrationData] = useState<WebinarRegistrationData>({
    name: "",
    businessName: "",
    phone: "",
    email: "",
    questions: "",
  });

  const handleOpenWebinarModal = () => {
    setIsWebinarModalOpen(true);
    setSubmitStatus({ type: null, message: "" });
    setRegistrationData({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      questions: "",
    });
  };

  const handleCloseWebinarModal = () => {
    setIsWebinarModalOpen(false);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleRegistrationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRegistrationData({
      ...registrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWebinarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/webinar/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();

      if (data.success && data.paymentUrl) {
        // Redirect to Paystack payment page
        window.location.href = data.paymentUrl;
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to register. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting webinar registration:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Webinar Event Banner */}
      {/* <section className="bg-gradient-to-r from-black via-black/95 to-black/90 text-white py-6 px-4 sm:px-6 lg:px-8 border-b-4 border-white/20">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4 flex-1">
              <div className="bg-white/10 p-3 rounded-lg backdrop-blur-sm">
                <Video className="w-8 h-8 text-white" />
              </div>
              <div className="text-left">
                <div className="flex items-center gap-3 mb-1">
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                    Live Webinar
                  </span>
                  <span className="text-white/80 text-sm font-light">March 15, 2026</span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-bold mb-1">
                  Scaling Your Salon: From Survival to 7 Figures
                </h3>
                <p className="text-white/70 text-sm md:text-base font-light">
                  Join leading salon owners & business experts for actionable growth strategies
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="text-center sm:text-right">
                <div className="flex items-center gap-2 text-white/90 mb-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm font-light">3:00 PM - 5:30 PM EAT</span>
                </div>
                <div className="text-2xl font-bold">KSh 2,500</div>
                <div className="text-xs text-white/60 font-light">Limited spots available</div>
              </div>
              <button
                onClick={handleOpenWebinarModal}
                className={cn(
                  "px-8 py-4 rounded-sm font-bold text-base whitespace-nowrap",
                  "bg-white text-black hover:bg-white/90",
                  "transition-all duration-300 hover:scale-105 hover:shadow-2xl",
                  "active:scale-95"
                )}
              >
                Buy Ticket
              </button>
            </div>
          </div>
        </div>
      </section> */}

      {/* Hero Section - Three Columns (ELLE-inspired compact layout) */}
      <section className="py-10 md:py-14 lg:py-16 px-4 sm:px-6 lg:px-8 xl:px-12 bg-white">
        <div className="max-w-[1600px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">
            {/* Column 1: Hero Image (left) */}
            <div className="md:col-span-5 order-2 md:order-1">
              <div className="relative h-[340px] sm:h-[420px] md:h-[480px] lg:h-[520px] rounded-lg overflow-hidden shadow-lg group">
                <img
                  src="/assets/1.jpg"
                  alt="Empowering spa, salon & barbershop business owners in Africa"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </div>

            {/* Column 2: Hero Copy */}
            <div className="md:col-span-4 order-1 md:order-2 flex flex-col justify-center py-6 md:py-0 md:pl-2 lg:pl-6 text-center md:text-left space-y-4">
              <div className="inline-block">
                <span
                  className={cn(
                    "px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-widest",
                    "bg-black/10 text-black border border-black/20",
                    "hover:bg-black/20 transition-colors duration-200"
                  )}
                >
                  Spa &amp; Salon Africa
                </span>
              </div>

              <h1
                className={cn(
                  "font-display text-3xl sm:text-4xl md:text-4xl lg:text-5xl font-bold leading-[1.1]",
                  "text-foreground tracking-tight max-w-lg md:max-w-none"
                )}
              >
                Empowering spa, salon &amp; barbershop
                <br />
                <span className="text-black">business owners in Africa</span>
              </h1>

              <p
                className={cn(
                  "text-foreground/70 text-base md:text-lg max-w-xl",
                  "font-light leading-relaxed"
                )}
              >
                Business tips | Marketing | Growth | Community
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                <Link
                  to="/business-club"
                  className={cn(
                    "px-6 py-3 rounded-sm font-semibold text-sm",
                    "bg-black text-white hover:bg-black/90",
                    "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                    "text-center active:scale-95 inline-flex items-center justify-center gap-2"
                  )}
                >
                  Join the Business Club
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/services"
                  className={cn(
                    "px-6 py-3 rounded-sm font-semibold text-sm",
                    "bg-white text-black hover:bg-black/5",
                    "transition-all duration-300 border-2 border-black",
                    "text-center hover:shadow-lg active:scale-95"
                  )}
                >
                  Explore Growth Programs
                </Link>
              </div>
            </div>

            {/* Column 3: Latest Event, Article, Webinar */}
            <div className="md:col-span-3 order-3 flex flex-col gap-3 md:pl-2">
              {/* Upcoming Webinar (first) */}
              <button
                type="button"
                onClick={handleOpenWebinarModal}
                className={cn(
                  "flex w-full text-left overflow-hidden rounded-lg border border-black/10 bg-white",
                  "hover:border-black/20 hover:shadow-lg transition-all duration-300 group"
                )}
              >
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-l-lg">
                  <img
                    src={CURRENT_WEBINAR.image}
                    alt="Upcoming Spa & Salon Africa webinar"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Video className="w-4 h-4 text-black flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Upcoming Webinar
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-black transition-colors leading-tight">
                    The Bottom Line: Spa, Salon &amp; Barbershop Profitability
                  </h3>
                  <p className="text-xs text-foreground/60 font-light mb-2">
                    {CURRENT_WEBINAR.date} • {CURRENT_WEBINAR.time}
                  </p>
                  <span className="text-xs font-medium text-black inline-flex items-center gap-1">
                    Buy ticket <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </button>

              {/* Business Breakfast (second) */}
              <Link
                to="/events"
                className={cn(
                  "flex overflow-hidden rounded-lg border border-black/10 bg-white",
                  "hover:border-black/20 hover:shadow-lg transition-all duration-300 group"
                )}
              >
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-l-lg">
                  <img
                    src="/assets/31.jpg"
                    alt="The Business Breakfast event"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Calendar className="w-4 h-4 text-black flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Business Breakfast
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-black transition-colors leading-tight">
                    The Business Breakfast
                  </h3>
                  <p className="text-xs text-foreground/60 font-light mb-2">
                    {CURRENT_WEBINAR.date} • {CURRENT_WEBINAR.time}
                  </p>
                  <span className="text-xs font-medium text-black inline-flex items-center gap-1">
                    View event <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>

              {/* Latest Article (last) */}
              <Link
                to="/magazine/article/why-professional-products-essential-growth"
                className={cn(
                  "flex overflow-hidden rounded-lg border border-black/10 bg-white",
                  "hover:border-black/20 hover:shadow-lg transition-all duration-300 group"
                )}
              >
                <div className="relative w-28 h-28 flex-shrink-0 overflow-hidden rounded-l-lg">
                  <img
                    src="/assets/2.jpg"
                    alt="Why professional products are essential for business growth"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 text-black flex-shrink-0" />
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      Latest Article
                    </span>
                  </div>
                  <h3 className="font-semibold text-foreground text-sm mb-0.5 group-hover:text-black transition-colors leading-tight">
                    Why professional products are essential for business growth
                  </h3>
                  <p className="text-xs text-foreground/60 font-light mb-2">
                    Business Strategy &amp; Management • March 15, 2026
                  </p>
                  <span className="text-xs font-medium text-black inline-flex items-center gap-1">
                    Read article <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

     

      {/* Why Choose Us */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-black/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1">
              <div className="rounded-lg overflow-hidden shadow-2xl group">
                <img
                  src="/assets/10.jpg"
                  alt="Why Spa & Salon Africa"
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>

            <div className="order-1 md:order-2 space-y-8">
              <h2
                className={cn(
                  "font-display text-5xl md:text-6xl font-bold mb-8",
                  "text-foreground tracking-tight"
                )}
              >
                Why Spa &amp; Salon Africa?
              </h2>

              <div className="space-y-8">
                {[
                  {
                    title: "Built for African Owners",
                    description:
                      "Content, tools and programs created specifically for salons, spas & barbershops operating on the continent.",
                  },
                  {
                    title: "Business, Not Just Beauty",
                    description:
                      "We focus on pricing, marketing, systems and leadership so your passion can actually pay you.",
                  },
                  {
                    title: "Learn from Real Experience",
                    description:
                      "Insights and frameworks shaped by owners, coaches and experts who understand your day-to-day reality.",
                  },
                  {
                    title: "Community & Accountability",
                    description:
                      "You're not building alone — connect with other ambitious owners to share wins, challenges and support.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-5 group/item">
                    <Star className="w-7 h-7 text-black flex-shrink-0 mt-1 transition-transform duration-300 group-hover/item:scale-110" />
                    <div>
                      <h3
                        className={cn(
                          "font-bold text-xl mb-2",
                          "text-foreground"
                        )}
                      >
                        {item.title}
                      </h3>
                      <p className="text-foreground/60 font-light text-base leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Link
                to="/about"
                className={cn(
                  "inline-block mt-10 px-8 py-4 rounded-sm font-semibold text-lg",
                  "bg-black text-white hover:bg-black/90",
                  "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                  "active:scale-95"
                )}
              >
                Explore How We Help
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className={cn(
              "font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6",
              "text-foreground tracking-tight"
            )}>
              What Our Members Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                name: "Zainab Hassan",
                role: "Salon Owner, Lagos",
                text: "For the first time in 8 years I understand my numbers and have a clear growth plan for my salon.",
                rating: 5
              },
              {
                name: "Kwame Asante",
                role: "Barbershop Founder, Accra",
                text: "The marketing playbooks helped us stay fully booked without discounting our prices every month.",
                rating: 5
              },
              {
                name: "Amara Okafor",
                role: "Spa Director, Nairobi",
                text: "Being part of this community means I never feel like I'm building alone. The workshops and support are priceless.",
                rating: 5
              }
            ].map((testimonial) => (
              <div
                key={testimonial.name}
                className={cn(
                  "p-8 rounded-lg border-2 border-black/10",
                  "bg-white hover:border-black hover:shadow-2xl",
                  "transition-all duration-300 hover:-translate-y-2 group"
                )}
              >
                <div className="flex gap-1 mb-6" aria-label={`${testimonial.rating} out of 5 stars`}>
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={`star-${i}`} className="w-5 h-5 fill-black text-black" aria-hidden="true" />
                  ))}
                </div>

                <p className={cn(
                  "text-foreground/70 mb-8 text-lg",
                  "font-light leading-relaxed"
                )}>
                  "{testimonial.text}"
                </p>

                <div className="border-t border-black/10 pt-6">
                  <p className="font-bold text-foreground text-lg mb-1">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-foreground/60 font-light">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}
        {/* Marketing Banner - Promote Other Businesses */}
        <MarketingBanner
        businessName="Spark — Salon Management System"
        description="Spark helps salons, barbershops, spas, and beauty businesses run smarter with bookings, POS, staff, inventory, and analytics in one platform."
        imageUrl="/assets/spark_image.jpeg"
        ctaText="Visit Spark"
        ctaUrl="https://spark.co.ke/"
        backgroundColor="bg-white"
      />
       {/* Featured - Article Slider */}
       <FeaturedSection
        articles={[
          {
            id: 1,
            title: "Why professional products are essential for business growth",
            excerpt:
              "How the right professional products protect your reputation, improve client results and unlock sustainable growth.",
            image: "/assets/2.jpg",
            author: "Spa & Salon Africa Editorial Team",
            date: "March 15, 2026",
            category: "Business Strategy & Management",
            readTime: "6 min read",
          },
          {
            id: 2,
            title: "Marketing Playbook for African Salons",
            excerpt:
              "A simple weekly content plan to stay visible online and attract ideal clients.",
            image: "/assets/28.jpg",
            author: "Zainab Hassan",
            date: "March 12, 2026",
            category: "Marketing",
            readTime: "5 min read",
          },
          {
            id: 3,
            title: "Pricing with Confidence in Any City",
            excerpt:
              "How to charge what you're worth while staying competitive in your local market.",
            image: "/assets/14.jpg",
            author: "Kwame Asante",
            date: "March 10, 2026",
            category: "Guest Experience",
            readTime: "6 min read",
          },
          {
            id: 4,
            title: "Hiring & Keeping the Right Team",
            excerpt:
              "Practical advice for recruiting, onboarding and retaining staff who grow with you.",
            image: "/assets/8.jpg",
            author: "Dr. Naledi Mvubu",
            date: "March 8, 2026",
            category: "Staffing",
            readTime: "7 min read",
          },
          {
            id: 5,
            title: "Building a Brand Clients Talk About",
            excerpt:
              "Turn your salon, spa or barbershop into a local love brand clients proudly recommend.",
            image: "/assets/34.jpg",
            author: "Fatima Diallo",
            date: "March 5, 2026",
            category: "Finance",
            readTime: "8 min read",
          },
        ]}
      />

    
      

      {/* CTA Section */}
      <section className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className={cn(
            "font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-8",
            "text-foreground tracking-tight"
          )}>
            Ready to Grow Your Beauty Business?
          </h2>

          <p className={cn(
            "text-foreground/70 text-xl md:text-2xl mb-12 max-w-3xl mx-auto",
            "font-light leading-relaxed"
          )}>
            Take the next step toward a stronger, more profitable salon, spa or
            barbershop with the support of Spa &amp; Salon Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <Link
              to="/business-club"
              className={cn(
                "px-10 py-5 rounded-sm font-semibold text-lg",
                "bg-black text-white hover:bg-black/90",
                "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                "active:scale-95"
              )}
            >
              Join the Business Club
            </Link>
            <Link
              to="/services"
              className={cn(
                "px-10 py-5 rounded-sm font-semibold text-lg",
                "bg-white text-black hover:bg-black/5",
                "transition-all duration-300 border-2 border-black",
                "hover:shadow-lg active:scale-95"
              )}
            >
              Explore Growth Programs
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section (Home, with full form) */}
      <ContactSection />

      {/* Webinar Registration Modal */}
      {isWebinarModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleCloseWebinarModal}
        >
          <div
            className={cn(
              "bg-white rounded-lg shadow-2xl max-w-3xl lg:max-w-4xl w-full max-h-[90vh] overflow-y-auto",
              "border-2 border-black/10"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-black to-black/95 text-white px-6 py-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Video className="w-6 h-6" />
                <div>
                  <h3 className="font-display text-2xl font-bold">
                    Webinar Registration
                  </h3>
                  <p className="text-sm text-white/70 mt-1">
                    {CURRENT_WEBINAR.date} • {CURRENT_WEBINAR.time} EAT
                  </p>
                </div>
              </div>
              <button
                onClick={handleCloseWebinarModal}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form onSubmit={handleWebinarSubmit} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
                <div className="bg-black/5 border-l-4 border-black p-4 rounded-sm md:sticky md:top-4">
                  {CURRENT_WEBINAR.ticketImage && (
                    <img
                      src={CURRENT_WEBINAR.ticketImage}
                      alt={CURRENT_WEBINAR.title}
                      className="w-full h-auto object-contain rounded-sm mb-4 bg-black/5"
                    />
                  )}
                  <h4 className="font-bold text-foreground mb-2">
                    The Bottom Line: Spa, Salon &amp; Barbershop Profitability
                  </h4>
                  <p className="text-sm text-foreground/70 font-light">
                    Join leading salon owners & business experts for actionable growth strategies
                  </p>
                  <div className="mt-3 flex items-center gap-4 text-sm flex-wrap">
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Calendar className="w-4 h-4" />
                      <span>{CURRENT_WEBINAR.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-foreground/60">
                      <Clock className="w-4 h-4" />
                      <span>{CURRENT_WEBINAR.time} EAT</span>
                    </div>
                  </div>
                  <div className="mt-3 text-2xl font-bold text-black">
                    KSh {CURRENT_WEBINAR.amount.toLocaleString()}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      webinarFormRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      })
                    }
                    className="md:hidden mt-4 w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-sm border border-black/20 text-sm font-medium text-foreground hover:bg-black/5 transition-colors"
                  >
                    Continue to Form
                    <ChevronDown className="w-4 h-4" />
                  </button>
                </div>

                <div ref={webinarFormRef} className="space-y-6">
                  {/* Status Message */}
                  {submitStatus.type && (
                    <div
                      className={cn(
                        "p-4 rounded-sm text-sm",
                        submitStatus.type === "success"
                          ? "bg-black/10 text-black border border-black/20"
                          : "bg-red-50 text-red-700 border border-red-200"
                      )}
                    >
                      {submitStatus.message}
                    </div>
                  )}

                  {/* Name */}
                  <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={registrationData.name}
                  onChange={handleRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  )}
                  placeholder="Your full name"
                />
                  </div>

                  {/* Business Name */}
                  <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name of Business <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={registrationData.businessName}
                  onChange={handleRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  )}
                  placeholder="Your salon, spa or barbershop name"
                />
                  </div>

                  {/* Phone */}
                  <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={registrationData.phone}
                  onChange={handleRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  )}
                  placeholder="+254 712 345 678"
                />
                  </div>

                  {/* Email */}
                  <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={registrationData.email}
                  onChange={handleRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  )}
                  placeholder="you@example.com"
                />
                  </div>

                  {/* Questions for Speakers */}
                  <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Any questions for the keynote speakers?
                </label>
                <textarea
                  name="questions"
                  value={registrationData.questions}
                  onChange={handleRegistrationChange}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-sm resize-none",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black"
                  )}
                  placeholder="What would you like to see addressed during the webinar?"
                />
                  </div>

                  {/* Submit Button */}
                  <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseWebinarModal}
                  className={cn(
                    "flex-1 px-6 py-4 rounded-sm font-semibold",
                    "bg-secondary text-foreground border-2 border-border",
                    "hover:bg-secondary/80 transition-colors duration-200"
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "flex-1 px-6 py-4 rounded-sm font-semibold",
                    "bg-black text-white hover:bg-black/90",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center justify-center gap-2"
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Proceed to Payment
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>
                  </div>

                  {/* Payment Info */}
                  <div className="text-xs text-foreground/60 text-center pt-2 border-t border-border">
                    You will be redirected to Paystack to complete your payment securely
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

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