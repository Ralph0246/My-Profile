import { Component, createRef } from "react";

// ─────────────────────────────────────────
// MODEL CLASSES
// ─────────────────────────────────────────

/** Represents a single journey milestone */
class JourneyItem {
  constructor({ id, title, description, iconUrl, iconAlt }) {
    this.id          = id;
    this.title       = title;
    this.description = description;
    this.iconUrl     = iconUrl;
    this.iconAlt     = iconAlt;
  }

  /** Odd IDs → card on left, icon on right. Even IDs → icon on left, card on right */
  isLeftCard() {
    return this.id % 2 !== 0;
  }
}

/** Manages Intersection Observer logic for scroll animations */
class ScrollAnimator {
  constructor(onVisible) {
    this.onVisible = onVisible; // callback(index)
    this.observer  = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.dataset.index);
            this.onVisible(index);
            this.observer.unobserve(entry.target); // animate only once
          }
        });
      },
      { threshold: 0.2 }
    );
  }

  observe(el) { if (el) this.observer.observe(el); }
  disconnect() { this.observer.disconnect(); }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class JourneyConfig {
  static ITEMS = [
    new JourneyItem({
      id: 1,
      title: "Started with HTML",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg",
      iconAlt: "HTML",
    }),
    new JourneyItem({
      id: 2,
      title: "Learned CSS",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg",
      iconAlt: "CSS",
    }),
    new JourneyItem({
      id: 3,
      title: "Explored JavaScript",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
      iconAlt: "JavaScript",
    }),
    new JourneyItem({
      id: 4,
      title: "Dived into PHP",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/php/php-original.svg",
      iconAlt: "PHP",
    }),
    new JourneyItem({
      id: 5,
      title: "Built with React",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
      iconAlt: "React",
    }),
    new JourneyItem({
      id: 6,
      title: "Styled with Tailwind",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      iconUrl: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
      iconAlt: "Tailwind",
    }),
  ];
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

function JourneyCard({ item, visible, fromLeft }) {
  return (
    <div
      className="bg-[#3a3a3a] rounded-xl p-5 w-full shadow-md border border-white/5
        hover:border-orange-500/30 hover:shadow-[0_4px_20px_rgba(255,107,26,0.1)]
        transition-all duration-500"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? "translateX(0)"
          : fromLeft ? "translateX(-40px)" : "translateX(40px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <h3 className="text-[16px] font-bold text-[#f0f0f0] mb-1">{item.title}</h3>
      <p className="text-[12px] text-[#a0a0a0] leading-5">{item.description}</p>
    </div>
  );
}

function JourneyIcon({ item, visible, fromLeft }) {
  return (
    <div
      className="flex items-center justify-center w-16 h-16 flex-shrink-0"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible
          ? "translateX(0) scale(1)"
          : fromLeft ? "translateX(-30px) scale(0.7)" : "translateX(30px) scale(0.7)",
        transition: "opacity 0.6s ease 0.15s, transform 0.6s ease 0.15s",
      }}
    >
      <img src={item.iconUrl} alt={item.iconAlt} className="w-12 h-12 object-contain drop-shadow-lg" />
    </div>
  );
}

function TimelineNode({ number, visible }) {
  return (
    <div
      className="w-9 h-9 rounded-full bg-[#2b2b2b] border-2 border-[#4ade80] flex items-center justify-center
        text-[#4ade80] font-bold text-[13px] shadow-[0_0_12px_rgba(74,222,128,0.3)] z-10 flex-shrink-0"
      style={{
        opacity:    visible ? 1 : 0,
        transform:  visible ? "scale(1)" : "scale(0.4)",
        transition: "opacity 0.4s ease 0.1s, transform 0.4s ease 0.1s",
      }}
    >
      {number}
    </div>
  );
}

function TimelineRow({ item, isLast, visible }) {
  const leftCard = item.isLeftCard();

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center w-full">

        {/* LEFT SIDE */}
        <div className="flex-1 flex justify-end pr-5">
          {leftCard
            ? <JourneyCard item={item} visible={visible} fromLeft={true} />
            : <JourneyIcon item={item} visible={visible} fromLeft={true} />
          }
        </div>

        {/* CENTER node */}
        <TimelineNode number={item.id} visible={visible} />

        {/* RIGHT SIDE */}
        <div className="flex-1 flex justify-start pl-5">
          {leftCard
            ? <JourneyIcon item={item} visible={visible} fromLeft={false} />
            : <JourneyCard item={item} visible={visible} fromLeft={false} />
          }
        </div>

      </div>

      {/* Connector line */}
      {!isLast && (
        <div
          className="w-[2px] h-16 bg-gradient-to-b from-[#4ade80] to-[#4ade80]/20"
          style={{
            opacity:    visible ? 1 : 0,
            transform:  visible ? "scaleY(1)" : "scaleY(0)",
            transformOrigin: "top",
            transition: "opacity 0.4s ease 0.3s, transform 0.4s ease 0.3s",
          }}
        />
      )}
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN CLASS COMPONENT
// ─────────────────────────────────────────

export default class MyJourney extends Component {
  constructor(props) {
    super(props);

    this.items = JourneyConfig.ITEMS;

    // One ref per timeline row
    this.rowRefs = this.items.map(() => createRef());

    // Track which rows are visible
    this.state = {
      visibleRows: new Array(this.items.length).fill(false),
    };

    // Instantiate the scroll animator with a callback
    this.animator = new ScrollAnimator((index) => {
      this.setState((prev) => {
        const updated = [...prev.visibleRows];
        updated[index] = true;
        return { visibleRows: updated };
      });
    });
  }

  componentDidMount() {
    // Observe each row element
    this.rowRefs.forEach((ref, index) => {
      if (ref.current) {
        ref.current.dataset.index = index;
        this.animator.observe(ref.current);
      }
    });
  }

  componentWillUnmount() {
    this.animator.disconnect();
  }

  render() {
    const { visibleRows } = this.state;

    return (
      <section
        id="MyJourney"
        className="bg-[#2b2b2b] font-['Poppins',sans-serif] px-16 py-20 max-md:px-4 flex flex-col items-center gap-12"
      >
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
        `}</style>

        <h2 className="text-4xl font-bold text-orange-500 tracking-[0.18em] uppercase">
          My Journey
        </h2>

        <div className="w-full max-w-2xl flex flex-col">
          {this.items.map((item, index) => (
            <div key={item.id} ref={this.rowRefs[index]}>
              <TimelineRow
                item={item}
                isLast={index === this.items.length - 1}
                visible={visibleRows[index]}
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
}