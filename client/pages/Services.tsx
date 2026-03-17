import { useState } from "react";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Sparkles, Scissors, Droplet, Wind } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ServiceInquiryRequest, ServiceInquiryResponse } from "@shared/api";

export default function Services() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<{
    name: string;
    category?: string;
  } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessName: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleOpenModal = (serviceName: string, category?: string) => {
    setSelectedService({ name: serviceName, category });
    setIsModalOpen(true);
    setSubmitStatus({ type: null, message: "" });
    setFormData({
      name: "",
      email: "",
      phone: "",
      businessName: "",
      message: "",
    });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedService) return;

    // Validate required fields
    if (!formData.name || !formData.email) {
      setSubmitStatus({
        type: "error",
        message: "Please fill in all required fields.",
      });
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus({
        type: "error",
        message: "Please enter a valid email address.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const requestData: ServiceInquiryRequest = {
        serviceName: selectedService.name,
        serviceCategory: selectedService.category,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        businessName: formData.businessName || undefined,
        message: formData.message || undefined,
      };

      const response = await fetch("/api/services/inquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      });

      const data: ServiceInquiryResponse = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message: data.message,
        });
        // Reset form after successful submission
        setFormData({
          name: "",
          email: "",
          phone: "",
          businessName: "",
          message: "",
        });
        // Close modal after 2 seconds
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "An error occurred. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting service inquiry:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const services = [
    {
      category: "Business Coaching",
      icon: Scissors,
      image: "/assets/29.jpg",
      description: "One-on-one and group coaching for salon, spa & barbershop owners",
      items: [
        { name: "Business Foundations Audit", price: "" },
        { name: "Pricing & Profit Strategy Session", price: "" },
        { name: "Team & Operations Coaching", price: "" },
        { name: "Monthly CEO Accountability", price: "" }
      ]
    },
    {
      category: "Marketing & Brand Growth",
      icon: Sparkles,
      image: "/assets/4.jpg",
      description: "Marketing systems tailored for African beauty businesses",
      items: [
        { name: "Social Media Content Playbook", price: "" },
        { name: "Brand Positioning & Messaging", price: "" },
        { name: "Client Retention & Loyalty Design", price: "" },
        { name: "Launch Campaign Strategy", price: "" }
      ]
    },
    {
      category: "Operations & Systems",
      icon: Droplet,
      image: "/assets/3.jpg",
      description: "Back-end systems that keep your business running smoothly",
      items: [
        { name: "Booking & Scheduling Systems", price: "" },
        { name: "Standard Operating Procedures Kit", price: "" },
        { name: "Retail & Inventory Setup", price: "" },
        { name: "Staff Onboarding Framework", price: "" }
      ]
    },
    {
      category: "Guest Experience Strategy & Implementation",
      icon: Wind,
      image: "/assets/7.jpg",
      description: "Design and implement memorable guest experiences that keep clients returning",
      items: [
        { name: "Guest Journey Mapping & Design", price: "" },
        { name: "Front Desk & Client Experience Training", price: "" },
        { name: "Service Standards & Scripts", price: "" },
        { name: "Feedback & Recovery Systems", price: "" }
      ]
    },
    {
      category: "Education & Training",
      icon: Wind,
      image: "/assets/33.jpg",
      description: "Training for owners and teams to level up skills and service",
      items: [
        { name: "New Owner Bootcamp", price: "" },
        { name: "Retail Sales Training", price: "" },
        { name: "Leadership for Salon Managers", price: "" },
        { name: "Team Education & Workshops", price: "" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <h1
            className={cn(
              "font-display text-5xl md:text-6xl font-bold mb-6",
              "text-foreground"
            )}
          >
            How We Help Your Business Grow
          </h1>
          <p
            className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light max-w-2xl mx-auto"
            )}
          >
            Practical programs, coaching and systems for salon, spa & barbershop
            owners across Africa focused on business, marketing, growth and
            community.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.category}
                  className="rounded-lg border border-border overflow-hidden hover:shadow-lg transition-shadow bg-white"
                >
                  <div className="flex flex-col md:flex-row">
                    {/* Image on the left */}
                    {("image" in service && service.image) && (
                      <div className="md:w-40 lg:w-48 flex-shrink-0">
                        <img
                          src={service.image}
                          alt={service.category}
                          className="w-full h-full object-cover object-center"
                        />
                      </div>
                    )}

                    {/* Content on the right */}
                    <div className="flex-1 flex flex-col">
                      {/* Header */}
                      <div className="p-6 border-b border-border flex items-start gap-4">
                        <Icon className="w-8 h-8 text-black flex-shrink-0" />
                        <div>
                          <h3
                            className={cn(
                              "font-display text-xl font-semibold",
                              "text-foreground"
                            )}
                          >
                            {service.category}
                          </h3>
                          <p className="text-foreground/60 text-sm font-light">
                            {service.description}
                          </p>
                        </div>
                      </div>

                      {/* Service Items */}
                      <div className="divide-y divide-border">
                        {service.items.map((item) => (
                          <div
                            key={item.name}
                            className="p-4 flex items-center justify-between hover:bg-secondary/20 transition-colors"
                          >
                            <h4 className="font-medium text-foreground">
                              {item.name}
                            </h4>
                            <span className="text-black font-semibold text-sm">
                              {item.price}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <div className="p-4 bg-secondary/20 mt-auto">
                        <button
                          onClick={() =>
                            handleOpenModal(service.category, service.category)
                          }
                          className={cn(
                            "w-full px-4 py-2 rounded-sm font-semibold",
                            "bg-black text-white hover:bg-black/90",
                            "transition-colors duration-200 text-sm"
                          )}
                        >
                          Talk to Our Team
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Packages */}
      {/* <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-6xl mx-auto">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-12 text-center",
              "text-foreground"
            )}
          >
            Growth Packages
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Launch Ready",
                price: "KES 50,000",
                services: [
                  "Brand & positioning workshop",
                  "Pricing & menu design",
                  "Launch marketing plan",
                  "30-day support check-in",
                ],
              },
              {
                name: "Scale & Systemise",
                price: "KES 35,000",
                services: [
                  "Operations & SOP review",
                  "Team roles & responsibilities map",
                  "Client journey optimisation",
                  "Basic financial dashboard setup",
                ],
              },
              {
                name: "Market Leader",
                price: "KES 60,000",
                services: [
                  "Advanced marketing strategy",
                  "Membership & loyalty design",
                  "Leadership coaching",
                  "Quarterly strategy reviews",
                ],
              },
            ].map((pkg) => (
              <div
                key={pkg.name}
                className="rounded-lg bg-white p-6 border border-border hover:shadow-lg transition-shadow"
              >
                <h3 className={cn(
                  "font-display text-2xl font-bold mb-2",
                  "text-foreground"
                )}>
                  {pkg.name}
                </h3>
                <p className={cn(
                  "font-display text-3xl font-bold mb-6",
                  "text-black"
                )}>
                  {pkg.price}
                </p>
                <ul className="space-y-3 mb-6">
                  {pkg.services.map((service) => (
                    <li key={service} className="flex items-center gap-2 text-foreground/70">
                      <div className="w-2 h-2 rounded-full bg-black" />
                      <span className="text-sm font-light">{service}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handleOpenModal(pkg.name)}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm font-semibold",
                    "bg-black text-white hover:bg-black/90",
                    "transition-colors duration-200"
                  )}
                >
                  Request More Details
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

      {/* Service Inquiry Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-display">
              {selectedService?.category
                ? `Talk to Our Team - ${selectedService.name}`
                : `Request More Details - ${selectedService?.name}`}
            </DialogTitle>
            <DialogDescription>
              Fill out the form below and our team will get back to you within 24 hours.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium text-foreground">
                Name <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your full name"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium text-foreground">
                Phone
              </label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+254 700 000 000"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="businessName" className="text-sm font-medium text-foreground">
                Business Name
              </label>
              <Input
                id="businessName"
                name="businessName"
                type="text"
                value={formData.businessName}
                onChange={handleChange}
                placeholder="Your business name (optional)"
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium text-foreground">
                Message
              </label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us more about your needs or questions..."
                rows={4}
                disabled={isSubmitting}
              />
            </div>

            {submitStatus.type && (
              <div
                className={cn(
                  "p-3 rounded-md text-sm",
                  submitStatus.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                )}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseModal}
                disabled={isSubmitting}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 bg-black text-white hover:bg-black/90"
              >
                {isSubmitting ? "Submitting..." : "Submit Inquiry"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
