export interface WebinarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  amount: number;
  paymentUrl: string;
  cta: string;
  description: string;
  image: string;
  ticketImage?: string;
}

export const CURRENT_WEBINAR: WebinarEvent = {
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
  image: "/assets/thebottomline.jpeg",
  ticketImage: "/assets/thebottomline2.jpeg",
};

