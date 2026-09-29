import { Injectable } from '@angular/core';
import { ContactFormValue } from '../models/portfolio.models';

/**
 * Fill these in with your EmailJS credentials to send real emails.
 * See https://www.emailjs.com — Public Key / Service ID / Template ID.
 * Until then, submit() resolves in "demo mode" after a short delay.
 */
const EMAILJS_PUBLIC_KEY = 'YOUR_PUBLIC_KEY';
const EMAILJS_SERVICE_ID = 'YOUR_SERVICE_ID';
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';

@Injectable({ providedIn: 'root' })
export class ContactService {
  get isConfigured(): boolean {
    return (
      !EMAILJS_PUBLIC_KEY.includes('YOUR') &&
      !EMAILJS_SERVICE_ID.includes('YOUR') &&
      !EMAILJS_TEMPLATE_ID.includes('YOUR')
    );
  }

  async submit(value: ContactFormValue): Promise<void> {
    if (!this.isConfigured) {
      // Demo mode: simulate network latency so the UI still feels real.
      await new Promise((resolve) => setTimeout(resolve, 1200));
      console.warn(
        'EmailJS not configured yet. Fill in EMAILJS_PUBLIC_KEY, EMAILJS_SERVICE_ID ' +
          'and EMAILJS_TEMPLATE_ID in core/services/contact.service.ts.'
      );
      return;
    }

    // Real send via EmailJS REST API (no extra dependency required).
    const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: value,
      }),
    });

    if (!res.ok) throw new Error(`EmailJS request failed: ${res.status}`);
  }
}
