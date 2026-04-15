import { Component } from "react";

// ─────────────────────────────────────────
// MODEL CLASSES
// ─────────────────────────────────────────

class NavLink {
  constructor(label, href = "#") {
    this.label = label;
    this.href  = href;
  }

  isActive(currentLabel) {
    return this.label === currentLabel;
  }
}

class SocialLink {
  constructor(name, url, svgPath, isStroke = false) {
    this.name     = name;
    this.url      = url;
    this.svgPath  = svgPath;
    this.isStroke = isStroke;
  }

  getAriaLabel() {
    return `Visit my ${this.name} profile`;
  }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class NavbarConfig {
  static INITIALS = "RJ";

  static NAV_LINKS = [
    new NavLink("Home",       "#Home"),
    new NavLink("About me",   "#About"),
    new NavLink("My Project", "#MyProject"),
    new NavLink("My Graphic Design", "#GraphicDesign"),
    new NavLink("My Journey", "#MyJourney"),
    new NavLink("Contact me", "#ContactUs"),
  ];

  static SOCIAL_LINKS = [
    new SocialLink(
      "Facebook",
      "https://www.facebook.com/ralph.justine.gallentes.2025",
      "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
      false
    ),
    new SocialLink(
      "GitHub",
      "https://github.com/Ralph0246",
      "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22",
      true
    ),
  ];
}

// ─────────────────────────────────────────
// SUB-COMPONENT
// ─────────────────────────────────────────

function SocialButton({ link }) {
  return (
    <div
      className="w-8 h-8 rounded-full bg-[#e0e0e0] flex items-center justify-center cursor-pointer hover:bg-orange-500 hover:scale-110 transition-all duration-300"
      title={link.getAriaLabel()}
    >
      <a href={link.url} target="_blank" rel="noopener noreferrer" aria-label={link.getAriaLabel()}>
        {link.isStroke ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none"
            stroke="#2b2b2b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d={link.svgPath} />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#2b2b2b">
            <path d={link.svgPath} />
          </svg>
        )}
      </a>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN CLASS COMPONENT
// ─────────────────────────────────────────

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = { activeNav: "Home" };
    this.handleNavClick = this.handleNavClick.bind(this);
  }

  handleNavClick(label) {
    this.setState({ activeNav: label });
  }

  render() {
    const { activeNav } = this.state;
    const { NAV_LINKS, SOCIAL_LINKS, INITIALS } = NavbarConfig;

    return (
      <nav className="sticky top-0 z-50 flex items-center justify-between py-5 px-16 bg-[#2b2b2b] border-b border-white/5 max-md:px-6">

        {/* Logo */}
        <div className="w-11 h-11 rounded-full bg-[#3a3a3a] border-2 border-[#555] flex items-center justify-center text-[#e0e0e0] font-bold text-sm cursor-pointer hover:border-orange-500 hover:text-orange-500 transition-all duration-300">
          {INITIALS}
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => this.handleNavClick(link.label)}
              className={`text-[15px] font-normal no-underline transition-colors duration-300
                ${link.isActive(activeNav)
                  ? "text-orange-500"
                  : "text-[#e0e0e0] hover:text-orange-500"
                }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-2.5">
          {SOCIAL_LINKS.map((link) => (
            <SocialButton key={link.name} link={link} />
          ))}
        </div>

      </nav>
    );
  }
}