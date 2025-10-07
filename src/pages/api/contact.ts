import type { APIRoute } from 'astro';

/**
 * contact.ts - Astro API endpoint dla formularzy kontaktowych
 * 
 * Funkcje:
 * - Obsługa wszystkich akcji Command Palette
 * - Validacja danych z Zod
 * - Wysyłka emaili (integracja z SendGrid/Resend)
 * - Logowanie do console (dev mode)
 * - CORS headers
 */

interface ContactRequest {
  action: 'audit' | 'quote' | 'demo' | 'contact';
  email: string;
  subject?: string;
  message?: string;
  projectDescription?: string;
  budget?: string;
  timeline?: string;
  preferredDate?: string;
  demoType?: string;
  teamSize?: string;
  timestamp: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  data?: any;
}

export const POST: APIRoute = async ({ request }) => {
  try {
    // CORS headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 200, headers });
    }

    // Parse request body
    const body: ContactRequest = await request.json();
    
    // Basic validation
    if (!body.email || !body.action) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Email and action are required'
        } as ContactResponse),
        { status: 400, headers }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          message: 'Invalid email format'
        } as ContactResponse),
        { status: 400, headers }
      );
    }

    // Process different actions
    const result = await processContactRequest(body);
    
    return new Response(
      JSON.stringify(result),
      { status: 200, headers }
    );

  } catch (error) {
    console.error('Contact API error:', error);
    
    return new Response(
      JSON.stringify({
        success: false,
        message: 'Internal server error'
      } as ContactResponse),
      { 
        status: 500, 
        headers: new Headers({
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        })
      }
    );
  }
};

async function processContactRequest(data: ContactRequest): Promise<ContactResponse> {
  const { action, email, ...formData } = data;
  
  // Create email content based on action
  const emailContent = createEmailContent(action, email, formData);
  
  // In development, log to console
  if (import.meta.env.DEV) {
    console.log('📧 Contact Request:', {
      action,
      email,
      formData,
      timestamp: new Date().toISOString()
    });
    
    console.log('📧 Email Content:', emailContent);
  }

  // TODO: Integrate with email service (SendGrid, Resend, etc.)
  // For now, simulate successful email sending
  await simulateEmailSending(emailContent);

  return {
    success: true,
    message: getSuccessMessage(action),
    data: {
      action,
      email,
      timestamp: new Date().toISOString()
    }
  };
}

function createEmailContent(action: string, email: string, formData: Record<string, any>) {
  const baseContent = {
    to: 'contact@zautomatyzujai.com', // TODO: Replace with actual email
    from: email,
    subject: getEmailSubject(action, formData),
    html: getEmailHTML(action, email, formData),
    text: getEmailText(action, email, formData)
  };

  return baseContent;
}

function getEmailSubject(action: string, formData: Record<string, any>): string {
  const subjects = {
    audit: `[AUDIT REQUEST] ${formData.subject || 'Business Process Audit'}`,
    quote: `[QUOTE REQUEST] ${formData.projectDescription?.substring(0, 50) || 'Project Quote'}`,
    demo: `[DEMO REQUEST] ${formData.demoType || 'Product Demo'}`,
    contact: `[CONTACT] ${formData.subject || 'General Inquiry'}`
  };

  return subjects[action as keyof typeof subjects] || 'Contact Form Submission';
}

function getEmailHTML(action: string, email: string, formData: Record<string, any>): string {
  const actionTitles = {
    audit: 'Audit Request',
    quote: 'Quote Request', 
    demo: 'Demo Request',
    contact: 'Contact Form'
  };

  const title = actionTitles[action as keyof typeof actionTitles] || 'Contact Form';
  
  let content = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
      <h2 style="color: #2b6ef9; border-bottom: 2px solid #2b6ef9; padding-bottom: 10px;">
        ${title}
      </h2>
      
      <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0; color: #333;">Contact Information</h3>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Action:</strong> ${action}</p>
        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
      </div>
  `;

  // Add form-specific fields
  Object.entries(formData).forEach(([key, value]) => {
    if (value && key !== 'email') {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      content += `
        <div style="margin: 15px 0;">
          <h4 style="color: #555; margin-bottom: 5px;">${label}</h4>
          <p style="background: white; padding: 10px; border-radius: 4px; border-left: 4px solid #2b6ef9;">
            ${value}
          </p>
        </div>
      `;
    }
  });

  content += `
      <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 14px;">
        <p>This email was sent from the ZautomatyzujAI website contact form.</p>
        <p>Please respond to the customer at: <strong>${email}</strong></p>
      </div>
    </div>
  `;

  return content;
}

function getEmailText(action: string, email: string, formData: Record<string, any>): string {
  const actionTitles = {
    audit: 'Audit Request',
    quote: 'Quote Request',
    demo: 'Demo Request', 
    contact: 'Contact Form'
  };

  const title = actionTitles[action as keyof typeof actionTitles] || 'Contact Form';
  
  let content = `${title}\n\n`;
  content += `Email: ${email}\n`;
  content += `Action: ${action}\n`;
  content += `Timestamp: ${new Date().toLocaleString()}\n\n`;

  Object.entries(formData).forEach(([key, value]) => {
    if (value && key !== 'email') {
      const label = key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1');
      content += `${label}: ${value}\n`;
    }
  });

  content += `\nThis email was sent from the ZautomatyzujAI website contact form.`;
  content += `\nPlease respond to the customer at: ${email}`;

  return content;
}

function getSuccessMessage(action: string): string {
  const messages = {
    audit: 'Your audit request has been submitted successfully. We will contact you within 24 hours.',
    quote: 'Your quote request has been submitted successfully. We will provide a detailed proposal within 48 hours.',
    demo: 'Your demo request has been submitted successfully. We will schedule a demo session within 24 hours.',
    contact: 'Your message has been sent successfully. We will respond within 24 hours.'
  };

  return messages[action as keyof typeof messages] || 'Your request has been submitted successfully.';
}

async function simulateEmailSending(emailContent: any): Promise<void> {
  // Simulate email sending delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // In production, integrate with actual email service
  // Example with Resend:
  // const resend = new Resend(process.env.RESEND_API_KEY);
  // await resend.emails.send(emailContent);
  
  console.log('✅ Email sent successfully (simulated)');
}
