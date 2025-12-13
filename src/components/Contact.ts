// ===================================
// Contact Component - Dharma Infra
// ===================================

import { icons } from '../utils/icons';
import { $, on } from '../utils/dom';
import { showToast } from './Toast';

export function Contact(): string {
  return `
    <section id="contact" class="contact section">
      <div class="container">
        <div class="contact-grid">
          <div class="contact-info">
            <div class="section-label">Partner With Us</div>
            <h2 class="section-title">Let's Build Together</h2>
            <p class="contact-text">
              Own land in Hyderabad? Partner with Dharma Infra for a hassle-free development experience. 
              We handle everything from design to construction while ensuring maximum returns for landowners.
            </p>

            <div class="contact-details">
              <div class="contact-item">
                <div class="contact-icon">${icons.location}</div>
                <div>
                  <h4>Visit Our Office</h4>
                  <p>H.no. 5-4-1/1, Gramakantam<br/>Kukatpally, Medchal-Malkajgiri<br/>Telangana - 500072</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">${icons.phone}</div>
                <div>
                  <h4>Call Us</h4>
                  <p>+91 62810 74635</p>
                </div>
              </div>

              <div class="contact-item">
                <div class="contact-icon">${icons.mail}</div>
                <div>
                  <h4>Email Us</h4>
                  <p>gauthamgottimukkala@gmail.com</p>
                </div>
              </div>
            </div>

            <div class="social-links">
              <a href="#" class="social-link" aria-label="Facebook">${icons.facebook}</a>
              <a href="#" class="social-link" aria-label="Instagram">${icons.instagram}</a>
              <a href="#" class="social-link" aria-label="LinkedIn">${icons.linkedin}</a>
              <a href="#" class="social-link" aria-label="YouTube">${icons.youtube}</a>
            </div>
          </div>

          <div class="contact-form-wrapper glass">
            <form id="contact-form" class="contact-form">
              <h3>Send Us a Message</h3>
              <div class="form-row">
                <div class="form-group">
                  <label for="name">Full Name *</label>
                  <input type="text" id="name" name="name" required placeholder="Your name" />
                </div>
                <div class="form-group">
                  <label for="phone">Phone Number *</label>
                  <input type="tel" id="phone" name="phone" required placeholder="+91 XXXXX XXXXX" />
                </div>
              </div>
              <div class="form-group">
                <label for="email">Email Address *</label>
                <input type="email" id="email" name="email" required placeholder="your@email.com" />
              </div>
              <div class="form-row">
                <div class="form-group">
                  <label for="land-location">Land Location</label>
                  <input type="text" id="land-location" name="landLocation" placeholder="Area, City" />
                </div>
                <div class="form-group">
                  <label for="land-size">Land Size (Approx)</label>
                  <select id="land-size" name="landSize">
                    <option value="">Select size</option>
                    <option value="less-200">Less than 200 Sq.Yds</option>
                    <option value="200-400">200-400 Sq.Yds</option>
                    <option value="400-600">400-600 Sq.Yds</option>
                    <option value="600-1000">600-1000 Sq.Yds</option>
                    <option value="more-1000">More than 1000 Sq.Yds</option>
                  </select>
                </div>
              </div>
              <div class="form-group">
                <label for="message">Your Message</label>
                <textarea id="message" name="message" rows="4" placeholder="Tell us about your land and development goals..."></textarea>
              </div>
              <button type="submit" class="btn btn-primary btn-full">
                <span>Send Message</span>
                ${icons.send}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  `;
}

export function initContact(): void {
  const form = $('#contact-form') as HTMLFormElement;
  
  on(form, 'submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(form);
    const data: Record<string, string> = {};
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
    
    console.log('Contact form submitted:', data);
    showToast("Thank you! We'll get back to you within 24 hours.");
    form.reset();
  });
}
