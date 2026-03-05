/**
 * Featured Section - Article slider
 *
 * Displays a horizontal carousel of featured articles.
 * Clicking an article navigates to the Magazine page.
 */

import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { ArrowRight, Calendar } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export interface FeaturedArticle {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  category: string;
  readTime?: string;
}

interface FeaturedSectionProps {
  articles: FeaturedArticle[];
}

export default function FeaturedSection({ articles }: FeaturedSectionProps) {
  return (
    <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-10">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold",
              "text-foreground tracking-tight"
            )}
          >
            Featured
          </h2>
          <Link
            to="/magazine"
            className={cn(
              "text-sm font-semibold text-black inline-flex items-center gap-1.5",
              "hover:underline transition-colors"
            )}
          >
            View all <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {articles.map((article) => (
              <CarouselItem
                key={article.id}
                className={cn(
                  "pl-4 basis-full sm:basis-[85%] md:basis-[45%] lg:basis-[32%]"
                )}
              >
                <Link
                  to="/magazine"
                  className={cn(
                    "block group overflow-hidden rounded-lg border border-black/10 bg-white",
                    "hover:border-black/20 hover:shadow-xl transition-all duration-300"
                  )}
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground/60">
                      {article.category}
                    </span>
                    <h3 className="font-semibold text-foreground mt-2 mb-2 group-hover:text-black transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-foreground/60 font-light line-clamp-2 mb-4">
                      {article.excerpt}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-foreground/50">
                      <Calendar className="w-3.5 h-3.5 flex-shrink-0" />
                      <span>
                        {article.author} · {article.date}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-black">
                      Read article <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="-left-4 md:-left-12 border-black/20 hover:bg-black/5 hover:border-black/30" />
          <CarouselNext className="-right-4 md:-right-12 border-black/20 hover:bg-black/5 hover:border-black/30" />
        </Carousel>
      </div>
    </section>
  );
}
