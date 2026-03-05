import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import { cn } from "@/lib/utils";
import { Calendar, User, ArrowLeft } from "lucide-react";

// Shared article data - in a real app this would come from an API
const ARTICLES: Record<string, { title: string; excerpt: string; image: string; author: string; date: string; category: string; content: string }> = {
  "from-chair-to-ceo": {
    title: "From Chair to CEO: Systems that Free Up the Owner",
    excerpt: "Discover the key systems that allow African salon, spa & barbershop owners to work on the business, not in it.",
    image: "https://images.unsplash.com/photo-1658092967527-4e140d9bdaea?q=80&w=2070&auto=format&fit=crop",
    author: "Amara Okafor",
    date: "March 15, 2026",
    category: "Business Tips",
    content: `
      Running a salon, spa or barbershop is rewarding — but it can also feel overwhelming. Between client appointments, staff management, marketing and finances, many owners find themselves working in the business instead of on it.

      The shift from stylist or technician to CEO requires intentional systems. Here are the key areas that free up your time and energy:

      **1. Booking & scheduling** — Automate appointments so you're not juggling WhatsApp and walk-ins. Tools like Spark or similar platforms reduce no-shows and give you a clear view of your week.

      **2. Financial clarity** — Know your numbers. Simple tracking of revenue, expenses and profit margins helps you make confident decisions about pricing, hiring and growth.

      **3. Staff systems** — Clear roles, training paths and performance expectations reduce daily firefighting. When your team knows what success looks like, they can operate without constant oversight.

      **4. Marketing on autopilot** — Create content that works while you sleep. Batch social posts, email sequences and loyalty programs that keep clients coming back without daily hustle.

      The goal isn't to eliminate your presence — it's to choose where your presence matters most. When systems handle the repeatable work, you can focus on strategy, culture and the clients who need you most.

      *Join the Spa & Salon Africa Business Club for workshops, templates and community support as you build these systems.*
    `,
  },
  "marketing-playbook": {
    title: "Marketing Playbook for African Salons",
    excerpt: "A simple weekly content plan to stay visible online and attract ideal clients.",
    image: "https://images.unsplash.com/photo-1652095319417-4bf8a0de1a3d?q=80&w=927&auto=format&fit=crop",
    author: "Zainab Hassan",
    date: "March 12, 2026",
    category: "Marketing",
    content: "A simple weekly content plan helps you stay visible online without burning out. Batch your content creation, schedule posts in advance, and focus on what resonates with your ideal clients. Full article coming soon.",
  },
  "pricing-with-confidence": {
    title: "Pricing with Confidence in Any City",
    excerpt: "How to charge what you're worth while staying competitive in your local market.",
    image: "https://images.unsplash.com/photo-1761233585177-73b12a61ea4d?q=80&w=986&auto=format&fit=crop",
    author: "Kwame Asante",
    date: "March 10, 2026",
    category: "Revenue",
    content: "Pricing is one of the biggest challenges for salon and spa owners. This article explores how to set prices that reflect your value while remaining competitive. Full article coming soon.",
  },
  "hiring-keeping-team": {
    title: "Hiring & Keeping the Right Team",
    excerpt: "Practical advice for recruiting, onboarding and retaining staff who grow with you.",
    image: "https://images.unsplash.com/photo-1688302583595-5482083f6843?q=80&w=1543&auto=format&fit=crop",
    author: "Dr. Naledi Mvubu",
    date: "March 8, 2026",
    category: "Team",
    content: "Building a great team starts with clarity on what you need and who fits your culture. Full article coming soon.",
  },
  "building-brand-clients-talk-about": {
    title: "Building a Brand Clients Talk About",
    excerpt: "Turn your salon, spa or barbershop into a local love brand clients proudly recommend.",
    image: "https://plus.unsplash.com/premium_photo-1729702169709-87c1e287a2a5?q=80&w=2070&auto=format&fit=crop",
    author: "Fatima Diallo",
    date: "March 5, 2026",
    category: "Branding",
    content: "Your brand is what people say about you when you're not in the room. Full article coming soon.",
  },
  "money-management-beauty-entrepreneurs": {
    title: "Money Management for Beauty Entrepreneurs",
    excerpt: "Simple financial habits to manage cash flow, profit and growth without an accounting degree.",
    image: "https://images.unsplash.com/photo-1740501813766-067394db5b64?q=80&w=2070&auto=format&fit=crop",
    author: "Prof. Kwesi Mensah",
    date: "March 1, 2026",
    category: "Finance",
    content: "Cash flow and profit are two different things. Learn the basics every beauty business owner needs. Full article coming soon.",
  },
  "expanding-one-location-many": {
    title: "Expanding from One Location to Many",
    excerpt: "Lessons from African owners who successfully opened second and third branches.",
    image: "https://images.unsplash.com/photo-1765607476252-19010772800e?q=80&w=1065&auto=format&fit=crop",
    author: "Kwame Asante",
    date: "February 28, 2026",
    category: "Growth",
    content: "Scaling to multiple locations requires systems, delegation and the right timing. Full article coming soon.",
  },
};

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? ARTICLES[slug] : null;

  if (!article) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <h1 className="font-display text-2xl font-bold mb-4">Article not found</h1>
          <Link to="/magazine" className="text-black font-semibold hover:underline inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" /> Back to Magazine
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <article className="py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Link
            to="/magazine"
            className={cn(
              "inline-flex items-center gap-2 text-sm font-medium text-foreground/70",
              "hover:text-foreground mb-8 transition-colors"
            )}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Magazine
          </Link>

          <span className={cn(
            "inline-block px-3 py-1 rounded-full text-xs font-semibold uppercase mb-6",
            "bg-black text-white"
          )}>
            {article.category}
          </span>

          <h1 className={cn(
            "font-display text-4xl md:text-5xl font-bold mb-6",
            "text-foreground leading-tight"
          )}>
            {article.title}
          </h1>

          <div className="flex items-center gap-6 text-foreground/60 mb-10">
            <span className="flex items-center gap-2">
              <User className="w-4 h-4" />
              {article.author}
            </span>
            <span className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {article.date}
            </span>
          </div>

          <div className="rounded-lg overflow-hidden mb-12">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-[400px] object-cover"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            {article.content.split("\n\n").map((para, i) => (
              <p key={i} className="text-foreground/80 font-light leading-relaxed mb-6">
                {para.replace(/\*\*(.+?)\*\*/g, "$1").replace(/\*(.+?)\*/g, "$1")}
              </p>
            ))}
          </div>

          <Link
            to="/magazine"
            className={cn(
              "inline-flex items-center gap-2 mt-12 px-6 py-3 rounded-sm font-semibold",
              "bg-black text-white hover:bg-black/90 transition-colors"
            )}
          >
            <ArrowLeft className="w-4 h-4" /> Back to Magazine
          </Link>
        </div>
      </article>
    </div>
  );
}
