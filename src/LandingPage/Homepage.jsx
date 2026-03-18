import { Component } from "react";

// ─────────────────────────────────────────
// MODEL CLASS
// ─────────────────────────────────────────

class PersonInfo {
  constructor({ firstName, lastName, title, bio, cvPath, avatarPath }) {
    this.firstName  = firstName;
    this.lastName   = lastName;
    this.title      = title;
    this.bio        = bio;
    this.cvPath     = cvPath;
    this.avatarPath = avatarPath;
  }

  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}

// ─────────────────────────────────────────
// CONFIGURATION
// ─────────────────────────────────────────

class HomepageConfig {
  static PERSON = new PersonInfo({
    firstName:  "Ralph Justine",
    lastName:   "Gallentes",
    title:      "A Frontend Developer",
    bio:        "passionate about building clean, responsive, and engaging digital experiences that combine creativity and performance.",
    cvPath:     "/assets/cv.pdf",
    avatarPath: "/assets/formalphoto.png",
  });
}

// ─────────────────────────────────────────
// SUB-COMPONENTS
// ─────────────────────────────────────────

function HeroText({ person }) {
  return (
    <div className="fade-left flex flex-col gap-6 max-w-[550px]">
      <h1 className="text-6xl font-bold text-[#f0f0f0] leading-tight tracking-tight max-md:text-4xl">
        Hi! I'm{" "}
        <span className="text-orange-500 font-bold">{person.fullName}</span>
      </h1>

      <p className="text-[15px] text-[#c0c0c0] leading-7 font-light text-justify">
        <span className="text-orange-500 font-semibold">{person.title}</span>{" "}
        {person.bio}
      </p>

      <div>
        <a
          href={person.cvPath}
          download
          className="inline-block bg-orange-500 text-white px-7 py-3 rounded-full text-[15px] font-medium tracking-wide hover:bg-orange-600 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(255,107,26,0.4)] transition-all duration-300"
        >
          Download CV
        </a>
      </div>
    </div>
  );
}

function ProfileCircle({ person }) {
  return (
    <div className="fade-right flex-shrink-0">
      <div className="float-anim w-[340px] h-[340px] max-md:w-[220px] max-md:h-[220px] rounded-full shadow-[0_0_60px_rgba(255,107,26,0.25)] overflow-hidden border-4 border-orange-500">
        <img
          src={person.avatarPath}
          alt={`${person.fullName} profile photo`}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

// ─────────────────────────────────────────
// MAIN CLASS COMPONENT
// ─────────────────────────────────────────

export default class Homepage extends Component {
  render() {
    const { PERSON } = HomepageConfig;

    return (
      <div id="Home" className="min-h-screen bg-[#2b2b2b] font-['Poppins',sans-serif] flex flex-col px-16 max-md:px-6">
        <style>{`
          @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');

          @keyframes floatCircle {
            0%, 100% { transform: translateY(0px); }
            50%       { transform: translateY(-14px); }
          }
          @keyframes fadeInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to   { opacity: 1; transform: translateX(0); }
          }
          @keyframes fadeInRight {
            from { opacity: 0; transform: translateX(30px); }
            to   { opacity: 1; transform: translateX(0); }
          }

          .float-anim { animation: floatCircle 4s ease-in-out infinite; }
          .fade-left  { animation: fadeInLeft  0.7s ease both; }
          .fade-right { animation: fadeInRight 0.8s ease 0.2s both; }
        `}</style>

        <main className="flex flex-1 items-center justify-around gap-10 py-16 max-md:flex-col-reverse max-md:text-center max-md:py-10">
          <HeroText      person={PERSON} />
          <ProfileCircle person={PERSON} />
        </main>
      </div>
    );
  }
}