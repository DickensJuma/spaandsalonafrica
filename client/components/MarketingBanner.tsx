/**
 * Marketing Banner Component
 * 
 * Promotional banner section for promoting other businesses
 * Features:
 * - Responsive design
 * - Clean, professional styling
 * - Supports image, text, and CTA
 * - Customizable appearance
 */

import { cn } from "@/lib/utils";
import { ExternalLink } from "lucide-react";

export interface MarketingBannerProps {
  businessName: string;
  description: string;
  imageUrl?: string;
  ctaText?: string;
  ctaUrl?: string;
  backgroundColor?: string;
  textColor?: string;
}

export default function MarketingBanner({
  businessName,
  description,
  imageUrl,
  ctaText = "Learn More",
  ctaUrl,
  backgroundColor = "bg-black/5",
  textColor = "text-foreground",
}: MarketingBannerProps) {
  return (
    <section className={cn(
      "w-full py-24 md:py-32 px-4 sm:px-6 lg:px-8",
      backgroundColor
    )}>
      <div className="max-w-7xl mx-auto">
        <div className={cn(
          "grid gap-16 items-center",
          imageUrl ? "md:grid-cols-2" : "max-w-3xl mx-auto"
        )}>
          {/* Business Image (optional) - Why Choose Us style */}
          {imageUrl && (
            <div className="order-2 md:order-1">
              <div className="rounded-lg overflow-hidden shadow-2xl group">
                <img
                  src={imageUrl}
                  alt={businessName}
                  className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          )}

          {/* Content - Why Choose Us style */}
          <div className={cn(
            "order-1 md:order-2 space-y-8",
            imageUrl ? "" : "text-center"
          )}>
            <div>
              <span className={cn(
                "text-xs uppercase tracking-widest font-semibold",
                "text-foreground/50"
              )}>
                Partner Business
              </span>
            </div>
            <h2 className={cn(
              "font-display text-5xl md:text-6xl font-bold",
              "tracking-tight",
              textColor
            )}>
              {businessName}
            </h2>
            <p className={cn(
              "text-foreground/70 text-lg md:text-xl",
              "font-light leading-relaxed",
              imageUrl ? "" : "mx-auto"
            )}>
              {description}
            </p>
            {ctaUrl && ctaUrl !== "#" && (
              <a
                href={ctaUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "inline-flex items-center gap-2 mt-10 px-8 py-4 rounded-sm font-semibold text-lg",
                  "bg-black text-white hover:bg-black/90",
                  "transition-all duration-300 hover:scale-105 hover:shadow-xl",
                  "active:scale-95"
                )}
                aria-label={`Visit ${businessName} website`}
              >
                {ctaText}
                <ExternalLink className="w-5 h-5" aria-hidden="true" />
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
