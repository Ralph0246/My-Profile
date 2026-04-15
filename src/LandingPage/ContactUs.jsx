import { Component } from "react";

// ─────────────────────────────────────────
// MODEL CLASSES
// ─────────────────────────────────────────

/** Represents a single contact info row */
class ContactInfo {
  constructor({ label, value, url, emoji }) {
    this.label = label;
    this.value = value;
    this.url   = url;
    this.emoji = emoji;
  }
}

/** Represents a form field */
class FormField {
  constructor({ id, label, type, placeholder }) {
    this.id          = id;
    this.label       = label;
    this.type        = type; // "input" | "textarea"
    this.placeholder = placeholder;
  }
}

/** Manages form state and basic validation */
class FormController {
  constructor(fields) {
    this.fields = fields;
    this.data   = Object.fromEntries(fields.map((f) => [f.id, ""]));
  }

  update(id, value) {
    this.data = { ...this.data, [id]: value };
  }

  isEmpty(id) {
    return !this.data[id]?.trim();
  }

  isValid() {
    return this.fields.every((f) => !this.isEmpty(f.id));
  }

  reset() {
    this.data = Object.fromEntries(this.fields.map((f) => [f.id, ""]));
  }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class ContactConfig {
  static CONTACT_INFOS = [
    new ContactInfo({ label: "Email me",  value: "rj@example.com",       url: "mailto:rj@example.com",                                          emoji: "📧" }),
    new ContactInfo({ label: "LinkedIn",  value: "linkedin.com/in/rj",   url: "https://linkedin.com/in/rj",                                     emoji: "💼" }),
    new ContactInfo({ label: "GitHub",    value: "github.com/Ralph0246",  url: "https://github.com/Ralph0246",                                   emoji: "🐙" }),
    new ContactInfo({ label: "Facebook",  value: "facebook.com/rj",       url: "https://www.facebook.com/ralph.justine.gallentes.2025",          emoji: "📘" }),
  ];

  static FORM_FIELDS = [
    new FormField({ id: "name",    label: "YOUR NAME",     type: "input",    placeholder: "John Doe"                  }),
    new FormField({ id: "email",   label: "EMAIL ADDRESS", type: "input",    placeholder: "john@example.com"          }),
    new FormField({ id: "subject", label: "SUBJECT",       type: "input",    placeholder: "Project Inquiry"           }),
    new FormField({ id: "message", label: "MESSAGE",       type: "textarea", placeholder: "Tell me about your project..." }),
  ];
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

function ContactCard({ info }) {
  return (
    <a
      href={info.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 px-5 py-4 rounded-xl bg-[#1e1e1e] border border-white/5 hover:border-orange-500/40 hover:shadow-[0_4px_20px_rgba(255,107,26,0.12)] hover:-translate-y-0.5 transition-all duration-300 group"
    >
      {/* Icon box */}
      <div className="w-10 h-10 rounded-lg bg-[#2b2b2b] flex items-center justify-center text-lg flex-shrink-0 group-hover:bg-orange-500/10 transition-colors duration-300">
        {info.emoji}
      </div>
      <div>
        <p className="text-[13px] font-bold text-[#f0f0f0] group-hover:text-orange-500 transition-colors duration-300">
          {info.label}
        </p>
        <p className="text-[11px] text-[#888]">{info.value}</p>
      </div>
    </a>
  );
}

function FormInput({ field, value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[11px] font-semibold text-[#a0a0a0] tracking-widest uppercase">
        {field.label}
      </label>
      {field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          rows={5}
          className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-3 text-[13px] text-[#f0f0f0] placeholder-[#555] resize-none outline-none focus:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(255,107,26,0.08)] transition-all duration-300"
        />
      ) : (
        <input
          type={field.id === "email" ? "email" : "text"}
          value={value}
          onChange={(e) => onChange(field.id, e.target.value)}
          placeholder={field.placeholder}
          className="w-full bg-[#1e1e1e] border border-white/10 rounded-xl px-4 py-3 text-[13px] text-[#f0f0f0] placeholder-[#555] outline-none focus:border-orange-500/60 focus:shadow-[0_0_0_3px_rgba(255,107,26,0.08)] transition-all duration-300"
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN CLASS COMPONENT
// ─────────────────────────────────────────

export default class ContactUs extends Component {
  constructor(props) {
    super(props);

    this.formController = new FormController(ContactConfig.FORM_FIELDS);

    this.state = {
      formData: { ...this.formController.data },
      submitted: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(id, value) {
    this.formController.update(id, value);
    this.setState({ formData: { ...this.formController.data }, error: false });
  }

  handleSubmit() {
    if (!this.formController.isValid()) {
      this.setState({ error: true });
      return;
    }

    // ── Replace this with your real form submission logic (e.g. EmailJS, Formspree) ──
    console.log("Form submitted:", this.formController.data);

    this.formController.reset();
    this.setState({ formData: { ...this.formController.data }, submitted: true, error: false });

    // Reset success message after 4s
    setTimeout(() => this.setState({ submitted: false }), 4000);
  }

  render() {
    const { formData, submitted, error } = this.state;
    const { CONTACT_INFOS, FORM_FIELDS } = ContactConfig;

    return (
      <section
        id="ContactUs"
        className="bg-[#232323] font-['Poppins',sans-serif] px-16 py-24 max-md:px-6 flex flex-col items-center gap-14"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');
        `}</style>

        {/* ── Header ── */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[11px] font-semibold text-orange-500 tracking-[0.25em] uppercase">
            Get In Touch
          </span>
          <h2
            className="text-5xl font-extrabold text-[#f0f0f0] leading-tight max-md:text-3xl"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Let's Work Together
          </h2>
          <div className="w-10 h-[3px] bg-orange-500 rounded-full mt-1" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="w-full max-w-5xl grid grid-cols-2 gap-16 max-md:grid-cols-1 max-md:gap-10">

          {/* LEFT — Info */}
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <h3 className="text-[22px] font-bold text-[#f0f0f0]">Have a project in mind?</h3>
              <p className="text-[13px] text-[#a0a0a0] leading-6">
                I'm always open to discussing new opportunities, creative projects, or just having a chat about frontend development. Don't be shy — reach out!
              </p>
            </div>

            <div className="flex flex-col gap-3">
              {CONTACT_INFOS.map((info) => (
                <ContactCard key={info.label} info={info} />
              ))}
            </div>
          </div>

          {/* RIGHT — Form */}
          <div className="flex flex-col gap-5">
            {FORM_FIELDS.map((field) => (
              <FormInput
                key={field.id}
                field={field}
                value={formData[field.id]}
                onChange={this.handleChange}
              />
            ))}

            {/* Error message */}
            {error && (
              <p className="text-[12px] text-red-400 -mt-2">
                ⚠️ Please fill in all fields before sending.
              </p>
            )}

            {/* Success message */}
            {submitted && (
              <p className="text-[12px] text-green-400 -mt-2">
                ✅ Message sent! I'll get back to you soon.
              </p>
            )}

            {/* Submit button */}
            <button
              onClick={this.handleSubmit}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold text-[14px] py-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,26,0.4)] cursor-pointer"
            >
              Send Message
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>

        </div>
      </section>
    );
  }
}