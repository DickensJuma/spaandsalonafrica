import { useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, Users, ArrowRight, Video } from "lucide-react";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { CURRENT_WEBINAR } from "@/shared/events";

export default function Webinar() {
  const [shareMessage, setShareMessage] = useState("");

  const handleShare = async () => {
    const shareUrl = window.location.href;
    const shareTitle = CURRENT_WEBINAR.title;
    const shareText = `${CURRENT_WEBINAR.title} - ${CURRENT_WEBINAR.date}, ${CURRENT_WEBINAR.time}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl,
        });
        setShareMessage("Thanks for sharing!");
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage("Share link copied.");
      }
    } catch {
      setShareMessage("Unable to share right now.");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-secondary/30">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black text-white text-sm font-semibold mb-6">
            <Video className="w-4 h-4" />
            Live Webinar
          </span>
          <h1
            className={cn(
              "font-display text-4xl md:text-6xl font-bold mb-6",
              "text-foreground",
            )}
          >
            {CURRENT_WEBINAR.title}
          </h1>
          <p
            className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light max-w-3xl mx-auto",
            )}
          >
            {CURRENT_WEBINAR.description}
          </p>
        </div>
      </section>

      <section className="py-14 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
          <div className="rounded-lg overflow-hidden border border-border bg-white">
            <div className="p-4 sm:p-5 space-y-4 bg-secondary/20">
              <div className="rounded-md border border-border bg-white overflow-hidden">
                <img
                  src={CURRENT_WEBINAR.image}
                  alt={CURRENT_WEBINAR.title}
                  className="w-full max-h-[420px] object-contain bg-black/5"
                />
              </div>
              {CURRENT_WEBINAR.ticketImage && (
                <div className="rounded-md border border-border bg-white overflow-hidden">
                  <img
                    src={CURRENT_WEBINAR.ticketImage}
                    alt={`${CURRENT_WEBINAR.title} ticket visual`}
                    className="w-full max-h-[380px] object-contain bg-black/5"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="bg-white p-2 sm:p-4 lg:pt-8">
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-6">
              Webinar Details
            </h2>

            <div className="space-y-4 text-foreground/70 mb-10">
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-black" />
                <span>{CURRENT_WEBINAR.date}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-black" />
                <span>{CURRENT_WEBINAR.time} EAT</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-black" />
                <span>{CURRENT_WEBINAR.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-black" />
                <span>{CURRENT_WEBINAR.attendees} attendees</span>
              </div>
            </div>

            <h3 className="font-display text-3xl font-bold text-foreground mb-4">
              KSh {CURRENT_WEBINAR.amount.toLocaleString()}
            </h3>
            <p className="text-foreground/70 font-light mb-10 leading-relaxed max-w-md">
              Reserve your spot and get practical strategies on pricing, profit,
              and sustainable growth for your beauty business.
            </p>

            <div className="space-y-4 max-w-sm">
              <Link
                to="/events"
                className={cn(
                  "w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-sm font-semibold",
                  "bg-black text-white hover:bg-black/90 transition-colors",
                )}
              >
                Register Now
                <ArrowRight className="w-5 h-5" />
              </Link>
              <button
                type="button"
                onClick={handleShare}
                className={cn(
                  "w-full inline-flex items-center justify-center px-6 py-3 rounded-sm font-medium",
                  "border border-black/20 text-foreground hover:bg-black/5 transition-colors",
                )}
              >
                Share Webinar
              </button>
              <p className="text-xs text-foreground/60">
                {shareMessage || "Share this page with your team and network."}
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
