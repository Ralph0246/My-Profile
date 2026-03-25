import { Component } from "react";

// ─────────────────────────────────────────
// MODEL CLASSES
// ─────────────────────────────────────────

/** Represents a single graphic design project */
class DesignProject {
  constructor({ id, category, title, viewUrl, imageUrl }) {
    this.id       = id;
    this.category = category;
    this.title    = title;
    this.viewUrl  = viewUrl;
    this.imageUrl = imageUrl;
  }

  hasImage() { return Boolean(this.imageUrl); }
}

/** Represents a design tool */
class DesignTool {
  constructor(name, logoUrl) {
    this.name    = name;
    this.logoUrl = logoUrl;
  }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class GraphicConfig {
  static PROJECTS = [
    new DesignProject({ id: 1, category: "Poster", title: "Project 1", viewUrl: "#", imageUrl: null }),
    new DesignProject({ id: 2, category: "Poster", title: "Project 2", viewUrl: "#", imageUrl: null }),
    new DesignProject({ id: 3, category: "Poster", title: "Project 3", viewUrl: "#", imageUrl: null }),
    new DesignProject({ id: 4, category: "Poster", title: "Project 4", viewUrl: "#", imageUrl: null }),
  ];

  static TOOLS = [
    new DesignTool("Photoshop", "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg"),
    new DesignTool("Figma",     "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg"),
    new DesignTool("Canva",     "https://upload.wikimedia.org/wikipedia/commons/b/bb/Canva_Logo.png"),
  ];
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

/** Single design project card — portrait ratio like a poster */
function DesignCard({ project }) {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-[#3a3a3a] border border-white/5 hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(255,107,26,0.15)] transition-all duration-300 hover:-translate-y-1">

      {/* Poster image area — portrait ratio */}
      <div className="w-full aspect-[3/4] overflow-hidden bg-gradient-to-br from-[#c8c8c8] to-[#a8a8a8] flex-1">
        {project.hasImage() ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#d0d0d0] to-[#a8a8a8]" />
        )}
      </div>

      {/* Card footer */}
      <div className="px-4 py-3 flex items-end justify-between bg-[#3a3a3a]">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-[#888] font-medium uppercase tracking-widest">
            {project.category}
          </span>
          <h3 className="text-[13px] font-bold text-[#f0f0f0]">{project.title}</h3>
        </div>
        <a
          href={project.viewUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[11px] text-[#a0a0a0] hover:text-orange-500 transition-colors duration-200 font-medium flex items-center gap-1 pb-0.5"
        >
          View
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </div>
    </div>
  );
}

/** Single tool icon */
function ToolIcon({ tool }) {
  return (
    <div className="group flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#3a3a3a] border border-white/5 hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(255,107,26,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <img
          src={tool.logoUrl}
          alt={tool.name}
          className="w-8 h-8 object-contain"
        />
      </div>
      <span className="text-[11px] text-[#a0a0a0] font-medium group-hover:text-orange-500 transition-colors duration-300">
        {tool.name}
      </span>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN CLASS COMPONENT
// ─────────────────────────────────────────

export default class GraphicDesigning extends Component {
  render() {
    const { PROJECTS, TOOLS } = GraphicConfig;

    return (
      <section
        id="GraphicDesigning"
        className="bg-[#2b2b2b] font-['Poppins',sans-serif] px-16 py-20 max-md:px-4 flex flex-col items-center gap-14"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `}</style>

        {/* ── GRAPHIC DESIGNING ── */}
        <div className="w-full flex flex-col items-center gap-10">
          <h2 className="text-4xl font-bold text-orange-500 tracking-[0.18em] uppercase">
            Graphic Designing
          </h2>

          {/* 4-column poster grid */}
          <div className="w-full grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {PROJECTS.map((project) => (
              <DesignCard key={project.id} project={project} />
            ))}
          </div>
        </div>

        {/* ── TOOLS ── */}
        <div className="w-full flex flex-col items-center gap-8">
          <h2 className="text-4xl font-bold text-orange-500 tracking-[0.18em] uppercase">
            Tools
          </h2>

          <div className="flex items-center justify-center gap-8">
            {TOOLS.map((tool) => (
              <ToolIcon key={tool.name} tool={tool} />
            ))}
          </div>
        </div>
      </section>
    );
  }
}