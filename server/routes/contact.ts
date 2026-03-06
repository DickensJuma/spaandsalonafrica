import { RequestHandler } from "express";
import { ContactFormRequest, ContactFormResponse } from "@shared/api";
import { Contact } from "../db/models/Contact";
import { emailService } from "../services/email";

/**
 * Handle contact form submission
 * POST /api/contact
 */
export const handleContact: RequestHandler = async (req, res) => {
  try {
    const body = req.body as ContactFormRequest;

    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      } as ContactFormResponse);
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      } as ContactFormResponse);
    }

    try {
      const contact = new Contact({
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      });
      await contact.save();
    } catch (dbError: any) {
      // If database is not connected, log but continue
      if (dbError.name === "MongoServerError" || dbError.message?.includes("Mongo")) {
        console.warn("⚠️  Database not available, skipping save:", dbError.message);
      } else {
        throw dbError;
      }
    }

    // Send emails asynchronously (don't wait for them to complete)
    Promise.all([
      emailService.sendContactNotification({
        name: body.name,
        email: body.email,
        phone: body.phone,
        subject: body.subject,
        message: body.message,
      }),
      emailService.sendContactConfirmation({
        name: body.name,
        email: body.email,
      }),
    ]).catch((error) => {
      console.error("Error sending contact emails:", error);
      // Don't fail the request if emails fail
    });

    const response: ContactFormResponse = {
      success: true,
      message: "Thank you for your message. We'll get back to you soon!",
    };

    res.status(200).json(response);
  } catch (error) {
    console.error("Error processing contact form:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing your request. Please try again later.",
    } as ContactFormResponse);
  }
};
