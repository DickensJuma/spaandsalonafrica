import * as nodemailer from "nodemailer";

/**
 * Email service using Nodemailer with SMTP
 */
class EmailService {
  private transporter: nodemailer.Transporter | null;
  private sender: {
    name: string;
    email: string;
  };
  private webinarPublicUrl: string;
  private webinarImageUrl: string;
  private webinarPaybill: string;
  private webinarPaybillAccount: string;
  private webinarAmountKes: number;

  constructor() {
    this.sender = {
      name: "Spa & Salon Africa",
      email: process.env.SENDER_EMAIL || "noreply@spaandsalonafrica.com",
    };
    this.webinarPublicUrl =
      process.env.WEBINAR_PUBLIC_URL ||
      `${process.env.FRONTEND_URL || "http://localhost:8080"}/events/the-bottom-line-webinar`;
    this.webinarImageUrl =
      process.env.WEBINAR_IMAGE_URL ||
      `${process.env.FRONTEND_URL || "http://localhost:8080"}/assets/thebottomline.jpeg`;
    this.webinarPaybill = process.env.WEBINAR_PAYBILL || "247247";
    this.webinarPaybillAccount = process.env.WEBINAR_PAYBILL_ACCOUNT || "769860";
    this.webinarAmountKes = parseInt(process.env.WEBINAR_AMOUNT_KES || "2500", 10);

    // Initialize SMTP transporter
    const smtpConfig = {
      host: process.env.MAIL_HOST || "smtp-relay.brevo.com",
      port: parseInt(process.env.MAIL_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    };

    // Check if SMTP credentials are available
    if (!smtpConfig.auth.user || !smtpConfig.auth.pass) {
      console.warn("⚠️  SMTP credentials not set - email service will be disabled");
      this.transporter = null;
    } else {
      try {
        this.transporter = nodemailer.createTransport(smtpConfig);
        console.log("✅ Email service initialized with SMTP");
      } catch (error) {
        console.error("❌ Failed to initialize email transporter:", error);
        this.transporter = null;
      }
    }
  }

  /**
   * Send contact form notification to admin
   */
  async sendContactNotification(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Contact notification would be sent:", data);
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: adminEmail,
        subject: `New Contact Form Submission: ${data.subject}`,
        html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        <p><strong>Subject:</strong> ${data.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${data.message.replace(/\n/g, "<br>")}</p>
      `,
        text: `
        New Contact Form Submission
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        Subject: ${data.subject}
        Message: ${data.message}
      `,
      });
      console.log("✅ Contact notification email sent");
    } catch (error) {
      console.error("❌ Error sending contact notification email:", error);
      throw error;
    }
  }

  /**
   * Send confirmation email to contact form submitter
   */
  async sendContactConfirmation(data: {
    name: string;
    email: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Contact confirmation would be sent to:", data.email);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: `${data.name} <${data.email}>`,
        subject: "Thank you for contacting Spa & Salon Africa",
        html: `
        <h2>Thank you for reaching out, ${data.name}!</h2>
        <p>We've received your message and will get back to you within 24-48 hours.</p>
        <p>Our team is committed to helping beauty business owners across Africa grow and succeed.</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        text: `
        Thank you for reaching out, ${data.name}!
        
        We've received your message and will get back to you within 24-48 hours.
        
        Our team is committed to helping beauty business owners across Africa grow and succeed.
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      });
      console.log("✅ Contact confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending contact confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send event registration confirmation
   */
  async sendEventRegistrationConfirmation(data: {
    name: string;
    email: string;
    eventTitle: string;
    eventDate: string;
    eventTime: string;
    eventLocation: string;
    registrationId: string;
    paymentStatus?: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Event registration confirmation would be sent to:", data.email);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: `${data.name} <${data.email}>`,
        subject: `Event Registration Confirmed: ${data.eventTitle}`,
        html: `
        <h2>Registration Confirmed!</h2>
        <p>Hi ${data.name},</p>
        <p>Your registration for <strong>${data.eventTitle}</strong> has been confirmed.</p>
        <div style="background: #f5f5f5; padding: 15px; margin: 20px 0; border-radius: 5px;">
          <p><strong>Event Details:</strong></p>
          <p>Date: ${data.eventDate}</p>
          <p>Time: ${data.eventTime}</p>
          <p>Location: ${data.eventLocation}</p>
          <p>Registration ID: ${data.registrationId}</p>
          ${data.paymentStatus === "paid" ? "<p style='color: green;'><strong>✓ Payment Confirmed</strong></p>" : ""}
        </div>
        <p>We look forward to seeing you at the event!</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        text: `
        Registration Confirmed!
        
        Hi ${data.name},
        
        Your registration for ${data.eventTitle} has been confirmed.
        
        Event Details:
        Date: ${data.eventDate}
        Time: ${data.eventTime}
        Location: ${data.eventLocation}
        Registration ID: ${data.registrationId}
        ${data.paymentStatus === "paid" ? "✓ Payment Confirmed" : ""}
        
        We look forward to seeing you at the event!
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      });
      console.log("✅ Event registration confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending event registration confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send event registration notification to admin
   */
  async sendEventRegistrationNotification(data: {
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    eventTitle: string;
    registrationId: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Event registration notification would be sent:", data);
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: adminEmail,
        subject: `New Event Registration: ${data.eventTitle}`,
        html: `
        <h2>New Event Registration</h2>
        <p><strong>Event:</strong> ${data.eventTitle}</p>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.businessName ? `<p><strong>Business:</strong> ${data.businessName}</p>` : ""}
        <p><strong>Registration ID:</strong> ${data.registrationId}</p>
      `,
        text: `
        New Event Registration
        Event: ${data.eventTitle}
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        ${data.businessName ? `Business: ${data.businessName}` : ""}
        Registration ID: ${data.registrationId}
      `,
      });
      console.log("✅ Event registration notification email sent");
    } catch (error) {
      console.error("❌ Error sending event registration notification email:", error);
      throw error;
    }
  }

  /**
   * Send service inquiry notification to admin
   */
  async sendServiceInquiryNotification(data: {
    serviceName: string;
    serviceCategory?: string;
    name: string;
    email: string;
    phone?: string;
    businessName?: string;
    message?: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Service inquiry notification would be sent:", data);
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: adminEmail,
        subject: `New Service Inquiry: ${data.serviceName}`,
        html: `
        <h2>New Service Inquiry</h2>
        <p><strong>Service:</strong> ${data.serviceName}</p>
        ${data.serviceCategory ? `<p><strong>Category:</strong> ${data.serviceCategory}</p>` : ""}
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
        ${data.businessName ? `<p><strong>Business:</strong> ${data.businessName}</p>` : ""}
        ${data.message ? `<p><strong>Message:</strong><br>${data.message.replace(/\n/g, "<br>")}</p>` : ""}
      `,
        text: `
        New Service Inquiry
        Service: ${data.serviceName}
        ${data.serviceCategory ? `Category: ${data.serviceCategory}` : ""}
        Name: ${data.name}
        Email: ${data.email}
        ${data.phone ? `Phone: ${data.phone}` : ""}
        ${data.businessName ? `Business: ${data.businessName}` : ""}
        ${data.message ? `Message: ${data.message}` : ""}
      `,
      });
      console.log("✅ Service inquiry notification email sent");
    } catch (error) {
      console.error("❌ Error sending service inquiry notification email:", error);
      throw error;
    }
  }

  /**
   * Send service inquiry confirmation to user
   */
  async sendServiceInquiryConfirmation(data: {
    name: string;
    email: string;
    serviceName: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Service inquiry confirmation would be sent to:", data.email);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: `${data.name} <${data.email}>`,
        subject: `Thank you for your interest in ${data.serviceName}`,
        html: `
        <h2>Thank you for your interest, ${data.name}!</h2>
        <p>We've received your inquiry about <strong>${data.serviceName}</strong> and our team will get back to you within 24 hours.</p>
        <p>We're excited to help you grow your beauty business!</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        text: `
        Thank you for your interest, ${data.name}!
        
        We've received your inquiry about ${data.serviceName} and our team will get back to you within 24 hours.
        
        We're excited to help you grow your beauty business!
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      });
      console.log("✅ Service inquiry confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending service inquiry confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send webinar registration confirmation to user
   */
  async sendWebinarRegistrationConfirmation(data: {
    name: string;
    email: string;
    businessName: string;
    registrationId: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Webinar registration confirmation would be sent to:", data.email);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: `${data.name} <${data.email}>`,
        subject: "You're Almost There! – The Bottom Line webinar",
        html: `
        <div style="max-width:600px;margin:0 auto;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif;font-size:15px;line-height:1.55;color:#111111;background-color:#ffffff;">
          <div style="border-bottom:3px solid #000000;padding-bottom:18px;margin-bottom:26px;">
            <h2 style="margin:0;font-size:24px;font-weight:700;color:#000000;letter-spacing:-0.02em;">You're Almost There!</h2>
            <p style="margin:10px 0 0;font-size:12px;font-weight:600;color:#000000;text-transform:uppercase;letter-spacing:0.12em;">The Bottom Line webinar</p>
          </div>
          <p style="margin:0 0 14px;">Hi ${data.name},</p>
          <p style="margin:0 0 14px;color:#333333;">We appreciate your interest in <strong style="color:#000000;">"The Bottom Line: Profitability webinar for spa, salon and barbershop owners"</strong>.</p>
          <p style="margin:0 0 18px;color:#333333;">To complete your registration, use <strong style="color:#000000;">Buy Ticket</strong> on our site:</p>
          <div style="margin:0 0 22px;">
            <a href="${this.webinarPublicUrl}" target="_blank" rel="noopener noreferrer" style="display:inline-block;padding:14px 22px;background-color:#000000;color:#ffffff;text-decoration:none;font-weight:600;font-size:14px;border-radius:2px;">Buy Ticket — complete registration</a>
          </div>
          <p style="margin:0 0 6px;font-size:12px;color:#666666;word-break:break-all;">${this.webinarPublicUrl}</p>
          <p style="margin:28px 0 12px;font-weight:600;color:#000000;">Alternatively, pay via Paybill:</p>
          <div style="background-color:#fafafa;border:1px solid #e5e5e5;padding:18px 20px;margin:0 0 22px;border-radius:2px;">
            <p style="margin:6px 0;color:#111111;"><strong style="color:#000000;">Paybill:</strong> ${this.webinarPaybill}</p>
            <p style="margin:6px 0;color:#111111;"><strong style="color:#000000;">Account Number:</strong> ${this.webinarPaybillAccount}</p>
            <p style="margin:6px 0;color:#111111;"><strong style="color:#000000;">Amount:</strong> KSh ${this.webinarAmountKes.toLocaleString()}</p>
          </div>
          <div style="background-color:#ffffff;border:1px solid #000000;padding:20px 22px;margin:0 0 22px;border-radius:2px;">
            <h3 style="margin:0 0 14px;font-size:14px;font-weight:700;color:#000000;text-transform:uppercase;letter-spacing:0.08em;">Webinar details</h3>
            <p style="margin:8px 0;color:#333333;"><strong style="color:#000000;">Date:</strong> 20th & 21st April</p>
            <p style="margin:8px 0;color:#333333;"><strong style="color:#000000;">Time:</strong> 6:00 PM - 8:00 PM EAT</p>
            <p style="margin:8px 0;color:#333333;"><strong style="color:#000000;">Format:</strong> Online Webinar</p>
            <p style="margin:8px 0;color:#333333;"><strong style="color:#000000;">Registration ID:</strong> ${data.registrationId}</p>
          </div>
          <p style="margin:0 0 8px;font-weight:600;color:#000000;">Share this webinar</p>
          <p style="margin:0 0 22px;"><a href="${this.webinarPublicUrl}" target="_blank" rel="noopener noreferrer" style="color:#000000;text-decoration:underline;">${this.webinarPublicUrl}</a></p>
          <p style="margin:0 0 12px;color:#333333;">You'll receive the webinar link and access instructions 24 hours before the event.</p>
          <p style="margin:0 0 28px;color:#333333;">Get ready to transform your salon business!</p>
          <p style="margin:0;padding-top:22px;border-top:1px solid #e5e5e5;color:#000000;">Best regards,<br><span style="color:#333333;">The Spa & Salon Africa Team</span></p>
        </div>
      `,
        text: `
You're Almost There!

The Bottom Line webinar

Hi ${data.name},

We appreciate your interest in "The Bottom Line: Profitability webinar for spa, salon and barbershop owners".

In order to complete your registration please go to "buy a ticket" on the link below:

${this.webinarPublicUrl}

Alternatively, you can pay for your ticket using the Paybill below:

Paybill: ${this.webinarPaybill}
Account Number: ${this.webinarPaybillAccount}
Amount: KSh ${this.webinarAmountKes.toLocaleString()}

Webinar Details:
Date: 20th & 21st April
Time: 6:00 PM - 8:00 PM EAT
Format: Online Webinar
Registration ID: ${data.registrationId}

Share this webinar: ${this.webinarPublicUrl}

You'll receive webinar link and access instructions 24 hours before the event.

Get ready to transform your salon business!

Best regards,
The Spa & Salon Africa Team
      `,
      });
      console.log("✅ Webinar registration confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending webinar registration confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send webinar registration notification to admin
   */
  async sendWebinarRegistrationNotification(data: {
    name: string;
    email: string;
    phone: string;
    businessName: string;
    questions?: string;
    registrationId: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Webinar registration notification would be sent to admin");
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: adminEmail,
        subject: `New Webinar Registration: ${data.name}`,
        html: `
        <h2>New Webinar Registration! 🎯</h2>
        <img src="${this.webinarImageUrl}" alt="The Bottom Line webinar" style="width:100%; max-width:600px; border-radius: 8px; margin: 12px 0 20px 0; display:block;" />
        <p>A new participant has registered for the "The Bottom Line: Spa, Salon & Barbershop Profitability" webinar:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Participant Details:</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Business:</strong> ${data.businessName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Registration ID:</strong> ${data.registrationId}</p>
          ${data.questions ? `<p><strong>Questions/Topics of Interest:</strong><br>${data.questions.replace(/\n/g, '<br>')}</p>` : ''}
        </div>
        <p>This registration is for the 20th & 21st April webinar.</p>
        <p><strong>Public share link:</strong> <a href="${this.webinarPublicUrl}" target="_blank" rel="noopener noreferrer">${this.webinarPublicUrl}</a></p>
      `,
        text: `
        New Webinar Registration! 🎯
        
        A new participant has registered for the "The Bottom Line: Spa, Salon & Barbershop Profitability" webinar:
        
        Participant Details:
        Name: ${data.name}
        Business: ${data.businessName}
        Email: ${data.email}
        Phone: ${data.phone}
        Registration ID: ${data.registrationId}
        ${data.questions ? `Questions/Topics of Interest:\n${data.questions}` : ''}
        
        This registration is for the 20th & 21st April webinar.
        Public share link: ${this.webinarPublicUrl}
      `,
      });
      console.log("✅ Webinar registration notification email sent to admin");
    } catch (error) {
      console.error("❌ Error sending webinar registration notification email:", error);
      throw error;
    }
  }

  /**
   * Send webinar payment confirmation to user
   */
  async sendWebinarPaymentConfirmation(data: {
    name: string;
    email: string;
    businessName: string;
    registrationId: string;
    amount: number;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Webinar payment confirmation would be sent to:", data.email);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: `${data.name} <${data.email}>`,
        subject: "Payment Confirmed - Your Webinar Spot is Secured! 🎉",
        html: `
        <h2>Payment Confirmed! 🎉</h2>
        <img src="${this.webinarImageUrl}" alt="The Bottom Line webinar" style="width:100%; max-width:600px; border-radius: 8px; margin: 12px 0 20px 0; display:block;" />
        <p>Hi ${data.name},</p>
        <p>Thank you! Your payment of <strong>KSh ${data.amount.toLocaleString()}</strong> has been successfully processed.</p>
        <p>Your spot for webinar <strong>"The Bottom Line: Spa, Salon & Barbershop Profitability"</strong> is now confirmed!</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Webinar Details:</h3>
          <p><strong>Date:</strong> 20th & 21st April</p>
          <p><strong>Time:</strong> 6:00 PM - 8:00 PM EAT</p>
          <p><strong>Format:</strong> Online Webinar</p>
          <p><strong>Registration ID:</strong> ${data.registrationId}</p>
          <p><strong>Amount Paid:</strong> KSh ${data.amount.toLocaleString()}</p>
        </div>
        <p><strong>Share this webinar:</strong> <a href="${this.webinarPublicUrl}" target="_blank" rel="noopener noreferrer">${this.webinarPublicUrl}</a></p>
        <p>You'll receive webinar link and access instructions 24 hours before event.</p>
        <p>Get ready to transform your salon business!</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        text: `
        Payment Confirmed! 🎉
        
        Hi ${data.name},
        
        Thank you! Your payment of KSh ${data.amount.toLocaleString()} has been successfully processed.
        
        Your spot for webinar "The Bottom Line: Spa, Salon & Barbershop Profitability" is now confirmed!
        
        Webinar Details:
        Date: 20th & 21st April
        Time: 6:00 PM - 8:00 PM EAT
        Format: Online Webinar
        Registration ID: ${data.registrationId}
        Amount Paid: KSh ${data.amount.toLocaleString()}
        Share this webinar: ${this.webinarPublicUrl}
        
        You'll receive webinar link and access instructions 24 hours before event.
        
        Get ready to transform your salon business!
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      });
      console.log("✅ Webinar payment confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending webinar payment confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send business club registration confirmation to user
   */
  async sendBusinessClubRegistrationConfirmation(data: {
    name: string;
    email: string;
    businessName: string;
    registrationId: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Business club registration confirmation would be sent to:", data.email);
      return;
    }

    try {
      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: `${data.name} <${data.email}>`,
        subject: "Business Club Application Received - Spa & Salon Africa",
        html: `
        <h2>Application Received! 🎉</h2>
        <p>Hi ${data.name},</p>
        <p>Thank you for applying to join <strong>Spa & Salon Africa Business Club</strong>!</p>
        <p>We've received your application for <strong>${data.businessName}</strong> and our team will review it carefully.</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Application Details:</h3>
          <p><strong>Business:</strong> ${data.businessName}</p>
          <p><strong>Application ID:</strong> ${data.registrationId}</p>
        </div>
        <p>We'll be in touch within 24-48 hours with next steps.</p>
        <p>We're excited to potentially welcome you to our community of successful salon and spa owners!</p>
        <p>Best regards,<br>The Spa & Salon Africa Team</p>
      `,
        text: `
        Application Received! 🎉
        
        Hi ${data.name},
        
        Thank you for applying to join Spa & Salon Africa Business Club!
        
        We've received your application for ${data.businessName} and our team will review it carefully.
        
        Application Details:
        Business: ${data.businessName}
        Application ID: ${data.registrationId}
        
        We'll be in touch within 24-48 hours with next steps.
        
        We're excited to potentially welcome you to our community of successful salon and spa owners!
        
        Best regards,
        The Spa & Salon Africa Team
      `,
      });
      console.log("✅ Business club registration confirmation email sent");
    } catch (error) {
      console.error("❌ Error sending business club registration confirmation email:", error);
      throw error;
    }
  }

  /**
   * Send business club registration notification to admin
   */
  async sendBusinessClubRegistrationNotification(data: {
    fullName: string;
    email: string;
    phone: string;
    businessName: string;
    businessType: string;
    businessLocation: string;
    yearsInBusiness: string;
    numberOfEmployees: string;
    businessRealities: string[];
    expectations: string;
    focusAreas: string[];
    howDidYouHear: string;
    registrationId: string;
  }): Promise<void> {
    if (!this.transporter) {
      console.log("📧 [Email Service Disabled] Business club registration notification would be sent to admin");
      return;
    }

    try {
      const adminEmail = process.env.ADMIN_EMAIL || "admin@spaandsalonafrica.com";

      await this.transporter.sendMail({
        from: `"${this.sender.name}" <${this.sender.email}>`,
        to: adminEmail,
        subject: `New Business Club Application: ${data.fullName}`,
        html: `
        <h2>New Business Club Application! 🎯</h2>
        <p>A new application has been submitted for Spa & Salon Africa Business Club:</p>
        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3>Applicant Details:</h3>
          <p><strong>Name:</strong> ${data.fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone}</p>
          <p><strong>Business:</strong> ${data.businessName}</p>
          <p><strong>Business Type:</strong> ${data.businessType}</p>
          <p><strong>Location:</strong> ${data.businessLocation}</p>
          <p><strong>Years in Business:</strong> ${data.yearsInBusiness}</p>
          <p><strong>Number of Employees:</strong> ${data.numberOfEmployees}</p>
          <p><strong>How they heard:</strong> ${data.howDidYouHear}</p>
          <p><strong>Application ID:</strong> ${data.registrationId}</p>
          
          <h4>Business Realities:</h4>
          <ul>${data.businessRealities.map(reality => `<li>${reality}</li>`).join('')}</ul>
          
          <h4>Focus Areas:</h4>
          <ul>${data.focusAreas.map(area => `<li>${area}</li>`).join('')}</ul>
          
          <h4>Expectations:</h4>
          <p>${data.expectations.replace(/\n/g, '<br>')}</p>
        </div>
        <p>This application requires review and follow-up within 24-48 hours.</p>
      `,
        text: `
        New Business Club Application! 🎯
        
        A new application has been submitted for Spa & Salon Africa Business Club:
        
        Applicant Details:
        Name: ${data.fullName}
        Email: ${data.email}
        Phone: ${data.phone}
        Business: ${data.businessName}
        Business Type: ${data.businessType}
        Location: ${data.businessLocation}
        Years in Business: ${data.yearsInBusiness}
        Number of Employees: ${data.numberOfEmployees}
        How they heard: ${data.howDidYouHear}
        Application ID: ${data.registrationId}
        
        Business Realities:
        ${data.businessRealities.map(reality => `- ${reality}`).join('\n')}
        
        Focus Areas:
        ${data.focusAreas.map(area => `- ${area}`).join('\n')}
        
        Expectations:
        ${data.expectations}
        
        This application requires review and follow-up within 24-48 hours.
      `,
      });
      console.log("✅ Business club registration notification email sent to admin");
    } catch (error) {
      console.error("❌ Error sending business club registration notification email:", error);
      throw error;
    }
  }
}

// Lazy-loaded singleton instance
let emailServiceInstance: EmailService | null = null;

export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService();
  }
  return emailServiceInstance;
}

// Export for convenience (but it's lazy-loaded)
export const emailService = {
  sendContactNotification: (data: Parameters<EmailService["sendContactNotification"]>[0]) =>
    getEmailService().sendContactNotification(data),
  sendContactConfirmation: (data: Parameters<EmailService["sendContactConfirmation"]>[0]) =>
    getEmailService().sendContactConfirmation(data),
  sendEventRegistrationConfirmation: (data: Parameters<EmailService["sendEventRegistrationConfirmation"]>[0]) =>
    getEmailService().sendEventRegistrationConfirmation(data),
  sendEventRegistrationNotification: (data: Parameters<EmailService["sendEventRegistrationNotification"]>[0]) =>
    getEmailService().sendEventRegistrationNotification(data),
  sendServiceInquiryNotification: (data: Parameters<EmailService["sendServiceInquiryNotification"]>[0]) =>
    getEmailService().sendServiceInquiryNotification(data),
  sendServiceInquiryConfirmation: (data: Parameters<EmailService["sendServiceInquiryConfirmation"]>[0]) =>
    getEmailService().sendServiceInquiryConfirmation(data),
  sendWebinarRegistrationConfirmation: (data: Parameters<EmailService["sendWebinarRegistrationConfirmation"]>[0]) =>
    getEmailService().sendWebinarRegistrationConfirmation(data),
  sendWebinarRegistrationNotification: (data: Parameters<EmailService["sendWebinarRegistrationNotification"]>[0]) =>
    getEmailService().sendWebinarRegistrationNotification(data),
  sendWebinarPaymentConfirmation: (data: Parameters<EmailService["sendWebinarPaymentConfirmation"]>[0]) =>
    getEmailService().sendWebinarPaymentConfirmation(data),
  sendBusinessClubRegistrationConfirmation: (data: Parameters<EmailService["sendBusinessClubRegistrationConfirmation"]>[0]) =>
    getEmailService().sendBusinessClubRegistrationConfirmation(data),
  sendBusinessClubRegistrationNotification: (data: Parameters<EmailService["sendBusinessClubRegistrationNotification"]>[0]) =>
    getEmailService().sendBusinessClubRegistrationNotification(data),
};
