import { Component } from "react";
import poster1 from "/assets/Poster1.png";
import poster2 from "/assets/Poster2.png";
import poster3 from "/assets/Poster3.png";
import poster4 from "/assets/Poster4.png";
import poster5 from "/assets/Poster5.png";

// ─────────────────────────────────────────
// MODEL CLASSES
// ─────────────────────────────────────────

/** Represents a single graphic design project */
class DesignProject {
  constructor({ id, category, title, imageUrl }) {
    this.id       = id;
    this.category = category;
    this.title    = title;
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

/** Manages modal open/close state */
class ModalController {
  constructor() {
    this.selectedProject = null;
  }

  open(project)  { this.selectedProject = project; return this; }
  close()        { this.selectedProject = null;    return this; }
  isOpen()       { return Boolean(this.selectedProject); }
  getProject()   { return this.selectedProject; }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class GraphicConfig {
  static PROJECTS = [
    new DesignProject({ id: 1, category: "Poster", title: "Project 1", imageUrl: poster1 }),
    new DesignProject({ id: 2, category: "Poster", title: "Project 2", imageUrl: poster2 }),
    new DesignProject({ id: 3, category: "Poster", title: "Project 3", imageUrl: poster3 }),
    new DesignProject({ id: 4, category: "Poster", title: "Project 4", imageUrl: poster4 }),
    new DesignProject({ id: 5, category: "Poster", title: "Project 5", imageUrl: poster5 }),
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

/** Modal image viewer */
function ImageModal({ project, onClose }) {
  if (!project) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-6"
        onClick={onClose}
        style={{ animation: "fadeInBackdrop 0.25s ease both" }}
      >
        {/* Modal box — stop click from closing when clicking inside */}
        <div
          className="relative bg-[#1e1e1e] rounded-2xl overflow-hidden shadow-2xl border border-white/10 max-w-lg w-full"
          onClick={(e) => e.stopPropagation()}
          style={{ animation: "popUp 0.3s cubic-bezier(0.34,1.56,0.64,1) both" }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-black/50 hover:bg-orange-500 flex items-center justify-center transition-all duration-200 cursor-pointer"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
              stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {/* Image */}
          <div className="w-full aspect-[3/4] bg-gradient-to-br from-[#d0d0d0] to-[#a8a8a8] overflow-hidden">
            {project.hasImage() ? (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-full object-contain"
              />
            ) : (
              /* Placeholder when no image is set yet */
              <div className="w-full h-full flex flex-col items-center justify-center gap-3">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none"
                  stroke="#888" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                  <circle cx="8.5" cy="8.5" r="1.5"/>
                  <polyline points="21 15 16 10 5 21"/>
                </svg>
                <span className="text-[13px] text-[#888]">No image yet</span>
              </div>
            )}
          </div>

          {/* Footer info */}
          <div className="px-5 py-4 flex items-center justify-between border-t border-white/5">
            <div>
              <span className="text-[10px] text-[#888] uppercase tracking-widest block">
                {project.category}
              </span>
              <h3 className="text-[15px] font-bold text-[#f0f0f0]">{project.title}</h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

/** Single design project card */
function DesignCard({ project, onView }) {
  return (
    <div className="group flex flex-col rounded-2xl overflow-hidden bg-[#3a3a3a] border border-white/5 hover:border-orange-500/40 hover:shadow-[0_8px_32px_rgba(255,107,26,0.15)] transition-all duration-300 hover:-translate-y-1">

      {/* Poster image area */}
      <div className="w-full aspect-[9/10] overflow-hidden bg-gradient-to-br from-[#c8c8c8] to-[#a8a8a8]">
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
      <div className="px-3 py-1 flex items-end justify-between bg-[#3a3a3a]">
        <div className="flex flex-col gap-0.5">
          <span className="text-[10px] text-[#888] font-medium uppercase tracking-widest">
            {project.category}
          </span>
          <h3 className="text-[13px] font-bold text-[#f0f0f0]">{project.title}</h3>
        </div>

        {/* View button — opens modal */}
        <button
          onClick={() => onView(project)}
          className="text-[11px] text-[#a0a0a0] hover:text-orange-500 transition-colors duration-200 font-medium flex items-center gap-1 pb-0.5 cursor-pointer"
        >
          View
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/** Single tool icon */
function ToolIcon({ tool }) {
  return (
    <div className="group flex flex-col items-center gap-2">
      <div className="w-14 h-14 rounded-xl flex items-center justify-center bg-[#3a3a3a] border border-white/5 hover:border-orange-500/40 hover:shadow-[0_4px_16px_rgba(255,107,26,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-1">
        <img src={tool.logoUrl} alt={tool.name} className="w-8 h-8 object-contain" />
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
  constructor(props) {
    super(props);

    this.modal = new ModalController();

    this.state = { selectedProject: null };

    this.handleView  = this.handleView.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    // Close modal on Escape key
    window.addEventListener("keydown", this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(e) {
    if (e.key === "Escape") this.handleClose();
  }

  handleView(project) {
    this.modal.open(project);
    this.setState({ selectedProject: this.modal.getProject() });
    // Prevent background scroll while modal is open
    document.body.style.overflow = "hidden";
  }

  handleClose() {
    this.modal.close();
    this.setState({ selectedProject: null });
    document.body.style.overflow = "";
  }

  render() {
    const { selectedProject } = this.state;
    const { PROJECTS, TOOLS } = GraphicConfig;

    return (
      <section
        id="graphic"
        className="bg-[#2b2b2b] font-['Poppins',sans-serif] px-16 py-20 max-md:px-4 flex flex-col items-center gap-14"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          @keyframes fadeInBackdrop {
            from { opacity: 0; }
            to   { opacity: 1; }
          }
          @keyframes popUp {
            from { opacity: 0; transform: scale(0.85) translateY(20px); }
            to   { opacity: 1; transform: scale(1)    translateY(0);    }
          }
        `}</style>

        {/* ── GRAPHIC DESIGNING ── */}
        <div className="w-full flex flex-col items-center gap-10">
          <h2 className="text-4xl font-bold text-orange-500 tracking-[0.18em] uppercase">
            Graphic Designing
          </h2>

          <div className="w-full grid grid-cols-4 gap-5 max-md:grid-cols-2 max-sm:grid-cols-1">
            {PROJECTS.map((project) => (
              <DesignCard key={project.id} project={project} onView={this.handleView} />
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

        {/* ── MODAL ── */}
        <ImageModal project={selectedProject} onClose={this.handleClose} />
      </section>
    );
  }
}