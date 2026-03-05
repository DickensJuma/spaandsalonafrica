import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

export default function Magazine() {
  const featuredArticle = {
    title: "From Chair to CEO: Systems that Free Up the Owner",
    excerpt:
      "Discover the key systems that allow African salon, spa & barbershop owners to work on the business, not in it.",
    image: "https://images.unsplash.com/photo-1658092967527-4e140d9bdaea?q=80&w=2070&auto=format&fit=crop",
    author: "Amara Okafor",
    date: "March 15, 2026",
    category: "Business Tips"
  };

  const articles = [
    {
      id: 1,
      slug: "marketing-playbook",
      title: "Marketing Playbook for African Salons",
      excerpt:
        "A simple weekly content plan to stay visible online and attract ideal clients.",
      image: "https://images.unsplash.com/photo-1652095319417-4bf8a0de1a3d?q=80&w=927&auto=format&fit=crop",
      author: "Zainab Hassan",
      date: "March 12, 2026",
      category: "Marketing",
      readTime: "5 min read"
    },
    {
      id: 2,
      slug: "pricing-with-confidence",
      title: "Pricing with Confidence in Any City",
      excerpt:
        "How to charge what you’re worth while staying competitive in your local market.",
      image: "https://images.unsplash.com/photo-1761233585177-73b12a61ea4d?q=80&w=986&auto=format&fit=crop",
      author: "Kwame Asante",
      date: "March 10, 2026",
      category: "Revenue",
      readTime: "6 min read"
    },
    {
      id: 3,
      slug: "hiring-keeping-team",
      title: "Hiring & Keeping the Right Team",
      excerpt:
        "Practical advice for recruiting, onboarding and retaining staff who grow with you.",
      image: "https://images.unsplash.com/photo-1688302583595-5482083f6843?q=80&w=1543&auto=format&fit=crop",
      author: "Dr. Naledi Mvubu",
      date: "March 8, 2026",
      category: "Team",
      readTime: "7 min read"
    },
    {
      id: 4,
      slug: "building-brand-clients-talk-about",
      title: "Building a Brand Clients Talk About",
      excerpt:
        "Turn your salon, spa or barbershop into a local love brand clients proudly recommend.",
      image: "https://plus.unsplash.com/premium_photo-1729702169709-87c1e287a2a5?q=80&w=2070&auto=format&fit=crop",
      author: "Fatima Diallo",
      date: "March 5, 2026",
      category: "Branding",
      readTime: "8 min read"
    },
    {
      id: 5,
      slug: "money-management-beauty-entrepreneurs",
      title: "Money Management for Beauty Entrepreneurs",
      excerpt:
        "Simple financial habits to manage cash flow, profit and growth without an accounting degree.",
      image: "https://images.unsplash.com/photo-1740501813766-067394db5b64?q=80&w=2070&auto=format&fit=crop",
      author: "Prof. Kwesi Mensah",
      date: "March 1, 2026",
      category: "Finance",
      readTime: "9 min read"
    },
    {
      id: 6,
      slug: "expanding-one-location-many",
      title: "Expanding from One Location to Many",
      excerpt:
        "Lessons from African owners who successfully opened second and third branches.",
      image: "https://images.unsplash.com/photo-1765607476252-19010772800e?q=80&w=1065&auto=format&fit=crop",
      author: "Kwame Asante",
      date: "February 28, 2026",
      category: "Growth",
      readTime: "6 min read"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Magazine Header */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1
                className={cn(
                  "font-display text-4xl md:text-5xl font-bold mb-2",
                  "text-foreground"
                )}
              >
                Spa &amp; Salon Africa Magazine
              </h1>
              <p
                className={cn(
                  "text-foreground/60 text-lg",
                  "font-light"
                )}
              >
                Business tips, marketing, growth strategies and community for
                African salon, spa &amp; barbershop owners.
              </p>
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm text-foreground/50 uppercase tracking-widest">
                Latest Issue
              </p>
              <p className="text-4xl font-bold text-black">March 2026</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className={cn(
            "font-display text-2xl font-semibold mb-8 uppercase tracking-wider",
            "text-foreground/70"
          )}>
            Featured Story
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden h-96">
              <img
                src={featuredArticle.image}
                alt={featuredArticle.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            <div className="space-y-6">
              <div>
                <span className={cn(
                  "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase",
                  "bg-black text-white mb-4"
                )}>
                  {featuredArticle.category}
                </span>
                <h3 className={cn(
                  "font-display text-4xl font-bold mb-4",
                  "text-foreground"
                )}>
                  {featuredArticle.title}
                </h3>
              </div>
              
              <p className={cn(
                "text-foreground/70 text-lg leading-relaxed",
                "font-light"
              )}>
                {featuredArticle.excerpt}
              </p>
              
              <div className="flex items-center gap-6 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <User className="w-4 h-4" />
                  {featuredArticle.author}
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground/60">
                  <Calendar className="w-4 h-4" />
                  {featuredArticle.date}
                </div>
              </div>
              
              <Link
                to="/magazine/article/from-chair-to-ceo"
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 rounded-sm font-semibold",
                  "bg-black text-white hover:bg-black/90",
                  "transition-colors duration-200"
                )}
              >
                Read Full Article <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles Grid */}
      <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-secondary/10">
        <div className="max-w-7xl mx-auto">
          <h2 className={cn(
            "font-display text-2xl font-semibold mb-12 uppercase tracking-wider",
            "text-foreground/70"
          )}>
            Latest Articles
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Link
                key={article.id}
                to={`/magazine/article/${article.slug}`}
                className="block group"
              >
              <article
                className="rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 cursor-pointer"
              >
                {/* Image */}
                <div className="relative overflow-hidden h-56 bg-gray-200">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                </div>
                
                {/* Content */}
                <div className="p-6 bg-background">
                  <div className="flex items-center justify-between mb-3">
                    <span className={cn(
                      "text-xs font-semibold uppercase tracking-wider",
                      "text-black"
                    )}>
                      {article.category}
                    </span>
                    <span className="text-xs text-foreground/50">
                      {article.readTime}
                    </span>
                  </div>
                  
                  <h3 className={cn(
                    "font-display text-lg font-bold mb-3 line-clamp-2",
                    "text-foreground group-hover:text-black transition-colors"
                  )}>
                    {article.title}
                  </h3>
                  
                  <p className={cn(
                    "text-foreground/60 text-sm mb-4 line-clamp-2",
                    "font-light"
                  )}>
                    {article.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-border/50">
                    <div className="text-xs text-foreground/50">
                      {article.date}
                    </div>
                    <span className="text-xs font-semibold text-black">
                      {article.author}
                    </span>
                  </div>
                </div>
              </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className={cn(
        "py-16 md:py-20 px-4 sm:px-6 lg:px-8",
        "bg-black/5"
      )}>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className={cn(
              "font-display text-3xl md:text-4xl font-bold mb-4",
              "text-foreground"
            )}
          >
            Never Miss an Issue
          </h2>
          <p className={cn(
            "text-foreground/70 text-lg mb-8 font-light"
          )}>
            Subscribe to receive the latest business tips, growth stories and
            practical tools for beauty entrepreneurs.
          </p>
          <form className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className={cn(
                "flex-1 px-4 py-3 rounded-sm",
                "bg-background border border-border",
                "text-foreground placeholder:text-foreground/50",
                "focus:outline-none focus:ring-2 focus:ring-black"
              )}
            />
            <button
              type="submit"
              className={cn(
                "px-6 py-3 rounded-sm font-semibold",
                "bg-black text-white hover:bg-black/90",
                "transition-colors duration-200"
              )}
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className={cn(
        "border-t border-border bg-background",
        "py-12 px-4 sm:px-6 lg:px-8"
      )}>
        <div className="max-w-7xl mx-auto text-center text-sm text-foreground/50">
          <p>&copy; 2026 Spa &amp; Salon Africa Magazine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
