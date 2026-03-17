import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  X,
  Loader2,
  ArrowRight,
  Video,
} from "lucide-react";
import {
  EventRegistrationRequest,
  EventRegistrationResponse,
  PaymentVerificationRequest,
} from "@shared/api";

interface Event {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  description: string;
  amount?: number;
  paymentUrl?: string;
  cta: string;
  image?: string;
}

interface WebinarRegistrationData {
  name: string;
  businessName: string;
  phone: string;
  email: string;
  questions: string;
}

interface EventRegistrationData {
  name: string;
  email: string;
  phone: string;
  businessName: string;
  additionalInfo: string;
}

export default function Events() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isWebinarModalOpen, setIsWebinarModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const [eventRegistrationData, setEventRegistrationData] =
    useState<EventRegistrationData>({
      name: "",
      email: "",
      phone: "",
      businessName: "",
      additionalInfo: "",
    });

  const [webinarRegistrationData, setWebinarRegistrationData] =
    useState<WebinarRegistrationData>({
      name: "",
      businessName: "",
      phone: "",
      email: "",
      questions: "",
    });

  // Handle payment verification on return from Paystack
  useEffect(() => {
    const reference = searchParams.get("reference");
    const paymentStatus = searchParams.get("payment");

    if (reference && paymentStatus === "success") {
      verifyPayment(reference);
      // Clean up URL
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  const verifyPayment = async (reference: string) => {
    try {
      const requestBody: PaymentVerificationRequest = { reference };

      // Try webinar verification first, fallback to events verification
      let response = await fetch("/api/webinar/verify-payment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // If webinar endpoint fails, try events endpoint
      if (!response.ok) {
        response = await fetch("/api/events/verify-payment", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        });
      }

      const data = await response.json();

      if (data.success) {
        setSubmitStatus({
          type: "success",
          message:
            "Payment confirmed! Your registration is complete. You'll receive a confirmation email shortly.",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message:
            data.message ||
            "Payment verification failed. Please contact support.",
        });
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      setSubmitStatus({
        type: "error",
        message:
          "An error occurred while verifying payment. Please contact support.",
      });
    }
  };

  const handleRegisterClick = (event: Event) => {
    setSelectedEvent(event);

    // Check if this is a webinar event (has amount and paymentUrl)
    if (event.amount && event.paymentUrl) {
      setIsWebinarModalOpen(true);
      setWebinarRegistrationData({
        name: "",
        businessName: "",
        phone: "",
        email: "",
        questions: "",
      });
    } else {
      setIsModalOpen(true);
      setEventRegistrationData({
        name: "",
        email: "",
        phone: "",
        businessName: "",
        additionalInfo: "",
      });
    }

    setSubmitStatus({ type: null, message: "" });
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleCloseWebinarModal = () => {
    setIsWebinarModalOpen(false);
    setSelectedEvent(null);
    setSubmitStatus({ type: null, message: "" });
  };

  const handleEventRegistrationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setEventRegistrationData({
      ...eventRegistrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleWebinarRegistrationChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setWebinarRegistrationData({
      ...webinarRegistrationData,
      [e.target.name]: e.target.value,
    });
  };

  const handleEventRegistrationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedEvent) return;

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const requestBody: EventRegistrationRequest = {
        eventId: selectedEvent.id,
        name: eventRegistrationData.name,
        email: eventRegistrationData.email,
        phone: eventRegistrationData.phone || undefined,
        businessName: eventRegistrationData.businessName || undefined,
        additionalInfo: eventRegistrationData.additionalInfo || undefined,
      };

      const response = await fetch("/api/events/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data: EventRegistrationResponse = await response.json();

      if (data.success) {
        // If payment URL is provided, redirect to payment
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
          return;
        }

        setSubmitStatus({
          type: "success",
          message: data.message,
        });
        // Reset form after successful submission
        setTimeout(() => {
          handleCloseModal();
        }, 2000);
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to register. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting event registration:", error);
      setSubmitStatus({
        type: "error",
        message: "An error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
        body: JSON.stringify(webinarRegistrationData),
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

  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: "The Bottom Line: Spa, Salon & Barbershop Profitability",
      date: "20th & 21st April",
      time: "6:00 PM - 8:00 PM",
      location: "Online Webinar",
      attendees: 100,
      amount: 2500,
      paymentUrl: "https://paystack.com/pay/scaling-your-salon",
      cta: "Buy Ticket",
      description:
        "Live webinar with Fiona and guest experts on pricing, profit and sustainable growth for spa, salon & barbershop owners.",
      image: "/assets/30.jpg",
    },
    // {
    //   id: 2,
    //   title: "Salon Profitability Bootcamp",
    //   date: "April 15, 2026",
    //   time: "2:00 PM - 5:00 PM",
    //   location: "Spa & Salon Africa - Main Studio",
    //   attendees: 25,
    //   cta: "Register Now",
    //   description:
    //     "Understand your numbers, set profitable prices and design packages that work in your market.",
    // },
    // {
    //   id: 3,
    //   title: "Owner Networking Mixer",
    //   date: "April 22, 2026",
    //   time: "6:00 PM - 8:00 PM",
    //   location: "Spa & Salon Africa - Lounge",
    //   attendees: 40,
    //   cta: "Register Now",
    //   description:
    //     "Connect with salon, spa & barbershop owners from your city and share real-world strategies.",
    // },
    // {
    //   id: 4,
    //   title: "Marketing Made Simple for Salons",
    //   date: "May 5, 2026",
    //   time: "3:00 PM - 5:30 PM",
    //   location: "Spa & Salon Africa - Main Studio",
    //   attendees: 30,
    //   cta: "Register Now",
    //   description:
    //     "A step-by-step plan to attract and retain ideal clients using social media and referrals.",
    // },
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
              "text-foreground",
            )}
          >
            Events for Salon, Spa & Barbershop Owners
          </h1>
          <p
            className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light max-w-2xl mx-auto",
            )}
          >
            Join workshops, clinics and networking experiences designed to help
            you grow your beauty business across Africa.
          </p>
        </div>
      </section>

      {/* Events List */}
      <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-6">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="border border-border rounded-lg p-6 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex flex-col md:flex-row md:items-stretch md:justify-between gap-6">
                  {/* Event Image */}
                  {event.image && (
                    <div className="w-full md:w-48 flex-shrink-0 overflow-hidden rounded-md">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-40 md:h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Event Info */}
                  <div className="flex-1">
                    {event.amount && (
                      <div className="mb-3">
                        <span className="inline-flex items-center gap-2 px-3 py-1 bg-black text-white rounded-full text-sm font-semibold">
                          <Video className="w-4 h-4" />
                          Live Webinar
                        </span>
                      </div>
                    )}
                    <h3
                      className={cn(
                        "font-display text-2xl font-semibold mb-4",
                        "text-foreground",
                      )}
                    >
                      {event.title}
                    </h3>
                    <p className="text-foreground/70 mb-6 font-light">
                      {event.description}
                    </p>

                    {/* Details Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Calendar className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">{event.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Clock className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">{event.time}</span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <MapPin className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">
                          {event.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 text-foreground/60">
                        <Users className="w-5 h-5 text-black flex-shrink-0" />
                        <span className="text-sm font-light">
                          {event.attendees} attendees
                        </span>
                      </div>
                    </div>

                    {event.amount && (
                      <div className="mt-4 text-2xl font-bold text-black">
                        KSh {event.amount.toLocaleString()}
                      </div>
                    )}
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => handleRegisterClick(event)}
                      className={cn(
                        "px-6 py-3 rounded-sm font-semibold whitespace-nowrap",
                        "bg-black text-white hover:bg-black/90",
                        "transition-all duration-200 hover:scale-105 hover:shadow-lg",
                        "active:scale-95",
                      )}
                    >
                      {event.cta}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section
        className={cn("py-16 md:py-24 px-4 sm:px-6 lg:px-8", "bg-secondary/50")}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-4",
              "text-foreground",
            )}
          >
            Stay Updated
          </h2>
          <p className={cn("text-foreground/70 text-lg mb-8 font-light")}>
            Subscribe to receive event updates, registration links and exclusive
            invitations for owners and managers.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-1 px-4 py-3 rounded-sm",
                "bg-background border border-border",
                "text-foreground placeholder:text-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-black",
              )}
            />
            <button
              type="submit"
              className={cn(
                "px-6 py-3 rounded-sm font-semibold",
                "bg-black text-white hover:bg-black/90",
                "transition-colors duration-200",
              )}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Regular Event Registration Modal */}
      {isModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={handleCloseModal}
        >
          <div
            className={cn(
              "bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
              "border-2 border-black/10",
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b border-black/10 px-6 py-4 flex items-center justify-between">
              <div>
                <h3
                  className={cn(
                    "font-display text-2xl font-bold",
                    "text-foreground",
                  )}
                >
                  {selectedEvent.cta} for {selectedEvent.title}
                </h3>
                <p className="text-sm text-foreground/60 mt-1">
                  {selectedEvent.date} • {selectedEvent.time}
                </p>
              </div>
              <button
                onClick={handleCloseModal}
                className="p-2 text-black/70 hover:text-black hover:bg-black/5 rounded-sm transition-colors"
                aria-label="Close modal"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Content */}
            <form
              onSubmit={handleEventRegistrationSubmit}
              className="p-6 space-y-6"
            >
              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={cn(
                    "p-4 rounded-sm text-sm",
                    submitStatus.type === "success"
                      ? "bg-black/10 text-black border border-black/20"
                      : "bg-red-50 text-red-700 border border-red-200",
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
                  value={eventRegistrationData.name}
                  onChange={handleEventRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black",
                  )}
                  placeholder="Your full name"
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
                  value={eventRegistrationData.email}
                  onChange={handleEventRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black",
                  )}
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={eventRegistrationData.phone}
                  onChange={handleEventRegistrationChange}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black",
                  )}
                  placeholder="+254 712 345 678"
                />
              </div>

              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  name="businessName"
                  value={eventRegistrationData.businessName}
                  onChange={handleEventRegistrationChange}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black",
                  )}
                  placeholder="Your salon, spa or barbershop name"
                />
              </div>

              {/* Additional Info */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Additional Information
                </label>
                <textarea
                  name="additionalInfo"
                  value={eventRegistrationData.additionalInfo}
                  onChange={handleEventRegistrationChange}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-2 rounded-sm resize-none",
                    "bg-secondary border border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black",
                  )}
                  placeholder="Any questions or special requirements?"
                />
              </div>

              {/* Submit Button */}
              <div className="flex gap-4 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className={cn(
                    "flex-1 px-6 py-3 rounded-sm font-semibold",
                    "bg-secondary text-foreground border border-border",
                    "hover:bg-secondary/80 transition-colors duration-200",
                  )}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cn(
                    "flex-1 px-6 py-3 rounded-sm font-semibold",
                    "bg-black text-white hover:bg-black/90",
                    "transition-all duration-200",
                    "disabled:opacity-50 disabled:cursor-not-allowed",
                    "flex items-center justify-center gap-2",
                  )}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Registering...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Webinar Registration Modal */}
      {isWebinarModalOpen && selectedEvent && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={handleCloseWebinarModal}
        >
          <div
            className={cn(
              "bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto",
              "border-2 border-black/10",
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
                    {selectedEvent.date} • {selectedEvent.time}
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
            <form onSubmit={handleWebinarSubmit} className="p-6 space-y-6">
              {/* Event Info Banner */}
              <div className="bg-black/5 border-l-4 border-black p-4 rounded-sm">
                <h4 className="font-bold text-foreground mb-2">
                  {selectedEvent.title}
                </h4>
                <p className="text-sm text-foreground/70 font-light">
                  {selectedEvent.description}
                </p>
                <div className="mt-3 flex items-center gap-4 text-sm flex-wrap">
                  <div className="flex items-center gap-2 text-foreground/60">
                    <Calendar className="w-4 h-4" />
                    <span>{selectedEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-foreground/60">
                    <Clock className="w-4 h-4" />
                    <span>{selectedEvent.time}</span>
                  </div>
                </div>
                {selectedEvent.amount && (
                  <div className="mt-3 text-2xl font-bold text-black">
                    KSh {selectedEvent.amount.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Status Message */}
              {submitStatus.type && (
                <div
                  className={cn(
                    "p-4 rounded-sm text-sm",
                    submitStatus.type === "success"
                      ? "bg-black/10 text-black border border-black/20"
                      : "bg-red-50 text-red-700 border border-red-200",
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
                  value={webinarRegistrationData.name}
                  onChange={handleWebinarRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
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
                  value={webinarRegistrationData.businessName}
                  onChange={handleWebinarRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
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
                  value={webinarRegistrationData.phone}
                  onChange={handleWebinarRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
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
                  value={webinarRegistrationData.email}
                  onChange={handleWebinarRegistrationChange}
                  required
                  className={cn(
                    "w-full px-4 py-3 rounded-sm",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
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
                  value={webinarRegistrationData.questions}
                  onChange={handleWebinarRegistrationChange}
                  rows={4}
                  className={cn(
                    "w-full px-4 py-3 rounded-sm resize-none",
                    "bg-secondary border-2 border-border",
                    "text-foreground placeholder:text-foreground/50",
                    "focus:outline-none focus:ring-2 focus:ring-black focus:border-black",
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
                    "hover:bg-secondary/80 transition-colors duration-200",
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
                    "flex items-center justify-center gap-2",
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
                You will be redirected to Paystack to complete your payment
                securely
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer
        className={cn(
          "border-t border-border bg-background",
          "py-12 px-4 sm:px-6 lg:px-8",
        )}
      >
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2026 Spa & Salon Africa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
