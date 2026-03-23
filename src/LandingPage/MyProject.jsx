import { Component } from "react";

// ─────────────────────────────────────────
// MODEL CLASSES
// ─────────────────────────────────────────

class Project {
  constructor({ id, category, title, description, tags, liveUrl, imageUrl }) {
    this.id          = id;
    this.category    = category;
    this.title       = title;
    this.description = description;
    this.tags        = tags;
    this.liveUrl     = liveUrl;
    this.imageUrl    = imageUrl;
  }
  hasImage() { return Boolean(this.imageUrl); }
}

class TechItem {
  constructor(name, logoUrl) {
    this.name    = name;
    this.logoUrl = logoUrl;
  }
}

class CarouselController {
  constructor(totalItems, visibleCount = 3) {
    this.totalItems   = totalItems;
    this.visibleCount = visibleCount;
    this.maxIndex     = Math.max(0, totalItems - visibleCount);
  }

  clamp(index)       { return Math.max(0, Math.min(index, this.maxIndex)); }
  next(current)      { return this.clamp(current + 1); }
  prev(current)      { return this.clamp(current - 1); }
  isAtStart(current) { return current === 0; }
  isAtEnd(current)   { return current >= this.maxIndex; }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class ProjectsConfig {
  static PROJECTS = [
    new Project({ id: 1, category: "Website", title: "Project 1", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Tailwind"], liveUrl: "#", imageUrl: null }),
    new Project({ id: 2, category: "Website", title: "Project 2", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Tailwind"], liveUrl: "#", imageUrl: null }),
    new Project({ id: 3, category: "Website", title: "Project 3", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Tailwind"], liveUrl: "#", imageUrl: null }),
    new Project({ id: 4, category: "Website", title: "Project 4", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Tailwind"], liveUrl: "#", imageUrl: null }),
    new Project({ id: 5, category: "Website", title: "Project 5", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Tailwind"], liveUrl: "#", imageUrl: null }),
    new Project({ id: 6, category: "Website", title: "Project 6", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", tags: ["React", "Tailwind"], liveUrl: "#", imageUrl: null }),

  ];

  static TECH_STACK = [
    new TechItem("HTML",       "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg"),
    new TechItem("CSS",        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg"),
    new TechItem("JavaScript", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg"),
    new TechItem("PHP",        "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg"),
    new TechItem("React",      "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"),
    new TechItem("Tailwind",   "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg"),
    new TechItem("VS Code",    "/assets/vscode.png"),
    new TechItem("Github",     "/assets/github.png"),
  ];
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

function ProjectCard({ project, isMobile }) {
  return (
    <div
      className="flex-shrink-0 bg-[#1e1e1e] rounded-2xl overflow-hidden border border-white/5 hover:border-orange-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(255,107,26,0.15)]"
      style={{ width: isMobile ? "80vw" : "calc(33.333% - 14px)" }}
    >
      <div className="w-full h-[160px] overflow-hidden">
        {project.hasImage() ? (
          <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#c8c8c8] to-[#a0a0a0]" />
        )}
      </div>

      <div className="p-5 flex flex-col gap-2">
        <span className="text-[12px] text-[#888] font-medium uppercase tracking-widest">
          {project.category}
        </span>
        <h3 className="text-[18px] font-bold text-[#f0f0f0]">{project.title}</h3>
        <p className="text-[12px] text-[#a0a0a0] leading-5">{project.description}</p>

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          <div className="flex gap-2 flex-wrap">
            {project.tags.map((tag) => (
              <span key={tag} className="px-2.5 py-0.5 rounded text-[11px] font-medium bg-orange-500 text-white">
                {tag}
              </span>
            ))}
          </div>
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[13px] text-[#e0e0e0] hover:text-orange-500 transition-colors duration-200 font-medium flex items-center gap-1"
          >
            View
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M17 7H7M17 7v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous" : "Next"}
      className={`flex-shrink-0 w-9 h-9 rounded-full border flex items-center justify-center transition-all duration-300
        ${disabled
          ? "border-white/10 text-white/20 cursor-not-allowed"
          : "border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white cursor-pointer"
        }`}
    >
      {direction === "prev" ? (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 18l-6-6 6-6" />
        </svg>
      ) : (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 18l6-6-6-6" />
        </svg>
      )}
    </button>
  );
}

function TechIcon({ tech }) {
  return (
    <div className="flex flex-col items-center gap-2 flex-shrink-0 mx-6 group">
      <div className="w-12 h-12 flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        <img src={tech.logoUrl} alt={tech.name} className="w-10 h-10 object-contain" />
      </div>
      <span className="text-[12px] text-[#a0a0a0] font-medium group-hover:text-orange-500 transition-colors duration-300">
        {tech.name}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN CLASS COMPONENT
// ─────────────────────────────────────────

export default class ProjectsSection extends Component {
  constructor(props) {
    super(props);

    this.projects  = ProjectsConfig.PROJECTS;
    this.techStack = ProjectsConfig.TECH_STACK;

    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

    this.state = {
      activeIndex: 0,
      isMobile,
    };

    this.updateCarousel(isMobile);
    this.handleNext    = this.handleNext.bind(this);
    this.handlePrev    = this.handlePrev.bind(this);
    this.handleResize  = this.handleResize.bind(this);
  }

  updateCarousel(isMobile) {
    this.carousel = new CarouselController(this.projects.length, isMobile ? 1 : 3);
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize() {
    const isMobile = window.innerWidth < 768;
    if (isMobile !== this.state.isMobile) {
      this.updateCarousel(isMobile);
      this.setState({ isMobile, activeIndex: 0 });
    }
  }

  handleNext() {
    this.setState((prev) => ({
      activeIndex: this.carousel.next(prev.activeIndex),
    }));
  }

  handlePrev() {
    this.setState((prev) => ({
      activeIndex: this.carousel.prev(prev.activeIndex),
    }));
  }

  render() {
    const { activeIndex, isMobile } = this.state;
    const loopedTech = [...this.techStack, ...this.techStack];

    // Calculate card offset: mobile uses px (80vw + 20px gap), desktop uses %
    const cardOffset = isMobile
      ? `translateX(calc(${activeIndex} * (-80vw - 20px)))`
      : `translateX(calc(${-(activeIndex * 33.333)}% - ${activeIndex * (20 / 3)}px))`;

    return (
      <section id="MyProject"  className="bg-[#2b2b2b] font-['Poppins',sans-serif] px-16 py-20 max-md:px-4 flex flex-col gap-20">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 14s linear infinite;
          }
          .marquee-track:hover { animation-play-state: paused; }
          .carousel-slide      { transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1); }
        `}</style>

        {/* ── MY PROJECTS ── */}
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-4xl font-bold text-orange-500 tracking-[0.18em] uppercase">
            My Projects
          </h2>

          <div className="flex items-center gap-3">
            <ArrowButton direction="prev" onClick={this.handlePrev} disabled={this.carousel.isAtStart(activeIndex)} />

            <div className="flex-1 overflow-hidden">
              <div
                className="carousel-slide flex gap-5"
                style={{ transform: cardOffset }}
              >
                {this.projects.map((project) => (
                  <ProjectCard key={project.id} project={project} isMobile={isMobile} />
                ))}
              </div>
            </div>

            <ArrowButton direction="next" onClick={this.handleNext} disabled={this.carousel.isAtEnd(activeIndex)} />
          </div>

          {/* Dot indicators */}
          <div className="flex justify-center gap-2">
            {Array.from({ length: this.carousel.maxIndex + 1 }).map((_, i) => (
              <button
                key={i}
                onClick={() => this.setState({ activeIndex: i })}
                className={`rounded-full transition-all duration-300
                  ${activeIndex === i
                    ? "w-6 h-2 bg-orange-500"
                    : "w-2 h-2 bg-white/20 hover:bg-orange-500/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* ── TECH STACK ── */}
        <div className="flex flex-col gap-8">
          <h2 className="text-center text-4xl font-bold text-orange-500 tracking-[0.18em] uppercase">
            Tech Stack
          </h2>

          <div className="overflow-hidden relative mx-auto w-full md:max-w-[600px]">
            {/* Fade edges */}
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#2b2b2b] to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#2b2b2b] to-transparent z-10 pointer-events-none" />

            <div className="marquee-track py-2">
              {loopedTech.map((tech, i) => (
                <TechIcon key={`${tech.name}-${i}`} tech={tech} />
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }
}