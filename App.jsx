import { useState, useEffect, useRef } from "react";

const C = {
  paper:    "#F2EDE4",
  dark:     "#E8E1D5",
  black:    "#0D0D0D",
  blue:     "#0057FF",
  pink:     "#FF2D78",
  yellow:   "#FFE600",
  burgundy: "#6B0F1A",
  white:    "#FAFAF8",
};

const TICKER = "AI OPERATIONS · PROMPT ENGINEERING · QA AUTOMATION · AI ENABLEMENT · AGENT DEPLOYMENT · RESPONSIBLE AI · LIVE DEPLOYMENTS ·";

const TIMELINE = [
  {
    id: "01",
    label: "Undergraduate · Law",
    title: "WHERE IT BEGAN",
    body: "I studied law because I wanted to understand how systems work and who they protect. Digital rights, IP, copyright — the legal edges of technology. It shaped how I think about AI today.",
    skills: ["Critical thinking", "Digital rights", "IP & copyright", "Ethical frameworks"],
    bg: C.paper, accent: C.burgundy, imgColor: C.burgundy, pattern: "scales",
    org: "University of Liverpool", orgType: "LLB Law", years: "2016 — 2019",
  },
  {
    id: "02",
    label: "B2B SaaS · Customer Operations",
    title: "PEOPLE, PROCESS, TECHNOLOGY",
    body: "I spent two years helping a global user base navigate complex software. Live demos, onboarding calls, training sessions. I learned that the gap between a good tool and an adopted tool is almost always about people, not product.",
    skills: ["User empathy", "Platform training", "Onboarding", "Zoho CRM", "Freshdesk", "Feedback loops"],
    bg: C.dark, accent: C.blue, imgColor: C.blue, pattern: "human",
    org: "Benivo", orgType: "Customer Operations Specialist", years: "2019 — 2021",
  },
  {
    id: "03",
    label: "MSc · University of the Arts London",
    title: "ARTS MEETS AI",
    body: "Data Science and AI at UAL — where the curriculum asked not just how models work, but what they're responsible for. My thesis examined AI and creative rights during the 2023 writers strike. I evaluated models, tested outputs, and got into the detail of what responsible AI actually looks like in practice.",
    skills: ["Model evaluation", "Prompt engineering", "Responsible AI", "GPT-4", "A/B testing", "Research"],
    bg: C.black, accent: C.pink, imgColor: C.pink, pattern: "split",
    org: "University of the Arts London", orgType: "MSc Data Science & AI", years: "2022 — 2024",
  },
  {
    id: "04",
    label: "Global Financial Services · Technology Associate",
    title: "SCALING UP",
    body: "I built and ran an AI adoption programme for 300 professionals across three regions. Strategy, diagnostic assessments, workshops, champion networks, Power BI tracking. This is where I learned that behaviour change is the hardest part of any AI rollout.",
    skills: ["Programme design", "Microsoft Copilot", "Champion networks", "Power BI", "DAX", "Workshop delivery", "Azure SQL"],
    bg: C.blue, accent: C.yellow, imgColor: C.yellow, pattern: "linegraph",
    org: "Wellington Management", orgType: "Technology Associate", years: "2023 — 2024",
  },
  {
    id: "05",
    label: "AI Studio · Operations",
    title: "BUILDING IN PRODUCTION",
    body: "Live AI agents in real commercial environments. Four clients simultaneously. I do QA, prompt engineering, automation pipelines, tool evaluation, and weekly briefings. I build the systems that make AI usable, not just possible.",
    skills: ["Prompt engineering", "QA frameworks", "Playwright", "Python", "Anthropic API", "Zapier", "Google Apps Script", "Agent deployment"],
    bg: C.black, accent: C.yellow, imgColor: C.yellow, pattern: "terminal",
    org: "Cyphr Studio", orgType: "AI Operations Coordinator", years: "2024 — Present",
  },
  {
    id: "06",
    label: "Open",
    title: "NOW",
    body: "I know what I do and why it matters. I sit at the intersection of the technical and the human. Looking for the right place to do it properly.",
    skills: [],
    bg: C.pink, accent: C.black, imgColor: C.black, pattern: "none",
    org: null, orgType: null, years: null,
  },
];

const ALL_SKILLS = [
  "Power BI", "DAX", "Power Query", "RLS", "Python", "SQL", "Playwright",
  "Anthropic API", "Google Apps Script", "Zapier", "Make", "Power Automate",
  "Zoho Analytics", "Azure SQL", "SharePoint", "Freshdesk", "Zendesk",
  "Zoho CRM", "Jira", "Tableau", "Prompt Engineering", "QA Frameworks",
  "Golden Set Methodology", "Rubric Design", "Model Evaluation",
  "Conversational AI Evaluation", "Agent Deployment", "Responsible AI",
  "Policy Compliance", "Violation Categorisation", "Workshop Design",
  "Champion Networks", "Stakeholder Reporting", "Onboarding",
  "Training Delivery", "Cross-functional Collaboration", "CRM Governance",
  "Data Storytelling", "Microsoft Copilot", "GPT-4", "Claude", "Gemini",
];

function useInView(ref, threshold = 0.2) {
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true); },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref, threshold]);
  return inView;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789·█░▓▒";
function useScramble(text, trigger, duration = 900) {
  const [display, setDisplay] = useState(text);
  useEffect(() => {
    if (!trigger) return;
    let frame = 0;
    const total = 20;
    const interval = setInterval(() => {
      frame++;
      const progress = frame / total;
      setDisplay(text.split("").map((char, i) => {
        if (char === " ") return " ";
        if (i / text.length < progress) return char;
        return CHARS[Math.floor(Math.random() * CHARS.length)];
      }).join(""));
      if (frame >= total) { clearInterval(interval); setDisplay(text); }
    }, duration / total);
    return () => clearInterval(interval);
  }, [trigger, text, duration]);
  return display;
}

// ─── Cursor ───────────────────────────────────────────────────────────────────
function Cursor() {
  const ref = useRef(null);
  useEffect(() => {
    const move = (e) => {
      if (ref.current) ref.current.style.transform = `translate(${e.clientX - 10}px,${e.clientY - 10}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div ref={ref} style={{
      position: "fixed", top: 0, left: 0, width: 20, height: 20,
      border: `2.5px solid ${C.pink}`, pointerEvents: "none",
      zIndex: 9999, mixBlendMode: "difference", transition: "transform 0.05s linear",
    }} />
  );
}

// ─── Ticker ───────────────────────────────────────────────────────────────────
function Ticker() {
  const full = `${TICKER} ${TICKER} ${TICKER}`;
  return (
    <div style={{
      background: C.black, color: C.yellow,
      fontFamily: "'Courier New', monospace",
      fontSize: 13, letterSpacing: "0.18em",
      padding: "10px 0", overflow: "hidden", whiteSpace: "nowrap", userSelect: "none",
      fontWeight: "600",
    }}>
      <span style={{ display: "inline-block", animation: "ticker 22s linear infinite" }}>{full}</span>
      <style>{`
        @keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-33.333%)}}
        *{cursor:none!important;box-sizing:border-box;margin:0;padding:0;}
        html{scroll-behavior:smooth;}body{background:${C.paper};}
        @keyframes bounceIn{0%{opacity:0;transform:scale(0.4) translateY(16px);}55%{opacity:1;transform:scale(1.18) translateY(-5px);}75%{transform:scale(0.93) translateY(3px);}100%{transform:scale(1) translateY(0);}}
        @keyframes pulse{0%,100%{opacity:0.4;transform:scaleY(1)}50%{opacity:0.9;transform:scaleY(0.55)}}
        @keyframes popin{from{opacity:0;transform:scale(0.88) translateY(12px)}to{opacity:1;transform:scale(1) translateY(0)}}
        @keyframes floatY{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes fall{0%{transform:translateY(-120px) rotate(0deg);opacity:0;}60%{opacity:1;}100%{transform:translateY(0) rotate(0deg);opacity:1;}}
        @keyframes holdHands{0%{transform:scaleX(0);opacity:0;}100%{transform:scaleX(1);opacity:1;}}
        @keyframes blink{0%,100%{opacity:1;}50%{opacity:0;}}
      `}</style>
    </div>
  );
}

// ─── Nav Tabs ─────────────────────────────────────────────────────────────────
function NavTabs({ active, onChange }) {
  const tabs = ["STORY", "PROJECTS", "WORKFLOWS", "WRITING", "CONTACT"];
  const [photoOpen, setPhotoOpen] = useState(false);
  const PHOTO = "data:image/png;base64,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";

  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
      background: C.black, borderBottom: `3px solid ${C.yellow}`,
      display: "flex", alignItems: "center", padding: "0 32px", height: 48,
    }}>
      {/* Profile photo */}
      <div style={{ position: "relative", marginRight: 24, flexShrink: 0 }}>
        <img
          src={PHOTO}
          alt="Elizabeth Alabi"
          onClick={() => setPhotoOpen(o => !o)}
          style={{
            width: 34, height: 34,
            borderRadius: "50%",
            border: `2px solid ${photoOpen ? C.pink : C.yellow}`,
            objectFit: "cover",
            cursor: "none",
            transition: "border-color 0.2s, transform 0.2s",
            transform: photoOpen ? "scale(1.1)" : "scale(1)",
            display: "block",
          }}
        />
        {/* Expanded photo */}
        {photoOpen && (
          <div style={{
            position: "absolute",
            top: 44, left: 0,
            zIndex: 300,
            animation: "popin 0.25s cubic-bezier(0.16,1,0.3,1)",
          }}>
            <img
              src={PHOTO}
              alt="Elizabeth Alabi"
              style={{
                width: 220, height: 220,
                borderRadius: 0,
                border: `3px solid ${C.pink}`,
                objectFit: "cover",
                boxShadow: `6px 6px 0 ${C.yellow}`,
                display: "block",
              }}
            />
            <div style={{
              background: C.black,
              border: `3px solid ${C.pink}`,
              borderTop: "none",
              padding: "14px 18px",
              fontFamily: "'Courier New', monospace",
              fontSize: 11,
              color: C.white,
              letterSpacing: "0.1em",
              lineHeight: 1.7,
              whiteSpace: "nowrap",
            }}>
              ELIZABETH ALABI<br/>
              <span style={{ color: C.pink, fontSize: 9, letterSpacing: "0.08em" }}>AI SPECIALIST · LONDON</span>
            </div>
          </div>
        )}
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, flex: 1 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => onChange(t)} style={{
            background: active === t ? C.yellow : "transparent",
            color: active === t ? C.black : C.white,
            border: "none", borderRight: `1px solid ${C.white}22`,
            fontFamily: "'Courier New', monospace",
            fontSize: 10, letterSpacing: "0.2em",
            padding: "0 20px", height: 48,
            fontWeight: active === t ? "bold" : "normal",
            transition: "background 0.2s, color 0.2s", cursor: "none",
          }}
          onMouseEnter={e => { if (active !== t) e.currentTarget.style.background = C.white + "15"; }}
          onMouseLeave={e => { if (active !== t) e.currentTarget.style.background = "transparent"; }}
          >{t}</button>
        ))}
      </div>

      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: 9,
        color: C.pink, letterSpacing: "0.2em", whiteSpace: "nowrap",
      }}>● OPEN TO WORK</div>
    </div>
  );
}


// ─── Name Intro ───────────────────────────────────────────────────────────────
function NameIntro() {
  const [entered, setEntered] = useState(false);
  const [glitch, setGlitch] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => { const t = setTimeout(() => setEntered(true), 200); return () => clearTimeout(t); }, []);
  useEffect(() => {
    const t = setInterval(() => { setGlitch(true); setTimeout(() => setGlitch(false), 110); }, 3800);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{
      background: C.black, minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      position: "relative", overflow: "hidden",
      borderBottom: `3px solid ${C.yellow}`,
    }}>
      {/* Dot grid bg */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: `radial-gradient(${C.blue}18 1px, transparent 1px)`,
        backgroundSize: "28px 28px", pointerEvents: "none",
      }} />

      {/* Bottom colour bleed */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 160,
        background: `linear-gradient(to bottom, transparent, ${C.burgundy}55)`,
        pointerEvents: "none",
      }} />

      <div style={{
        textAlign: "center", zIndex: 1, position: "relative",
        opacity: entered ? 1 : 0,
        transform: entered ? "translateY(0)" : "translateY(50px)",
        transition: "opacity 1s ease, transform 1s cubic-bezier(0.16,1,0.3,1)",
      }}>
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10, color: C.pink,
          letterSpacing: "0.3em", marginBottom: 36,
          opacity: entered ? 1 : 0, transition: "opacity 0.8s ease 0.5s",
        }}>AI OPERATIONS · ENABLEMENT · QA</div>

        <div
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{
            fontFamily: "Georgia, 'Times New Roman', serif",
            fontSize: "clamp(80px, 13vw, 168px)",
            fontWeight: 900, lineHeight: 0.88, letterSpacing: "-0.04em",
            filter: glitch ? "blur(2.5px) translate(5px,-3px)" : "none",
            transition: glitch ? "filter 0.04s" : `filter 0.1s, transform 0.3s`,
            transform: hovered ? "scale(1.02)" : "scale(1)",
            userSelect: "none",
          }}>
          <div style={{ color: C.white }}>ELIZA</div>
          <div style={{ color: hovered ? C.pink : C.blue, transition: "color 0.3s" }}>BETH</div>
          <div style={{
            fontStyle: "italic", fontWeight: 400, fontSize: "0.52em",
            letterSpacing: "-0.01em",
            color: hovered ? C.yellow : C.pink, transition: "color 0.3s",
          }}>Alabi.</div>
        </div>

        {/* Scroll cue */}
        <div style={{
          marginTop: 56, display: "flex", flexDirection: "column",
          alignItems: "center", gap: 10,
          animation: "floatY 2.5s ease-in-out infinite",
        }}>
          <div style={{
            fontFamily: "'Courier New', monospace", fontSize: 9,
            color: C.white, opacity: 0.4, letterSpacing: "0.25em",
          }}>SCROLL TO BEGIN</div>
          <div style={{ width: 1, height: 44, background: C.yellow, animation: "pulse 1.8s ease-in-out infinite" }} />
          <div style={{
            width: 0, height: 0,
            borderLeft: "5px solid transparent", borderRight: "5px solid transparent",
            borderTop: `7px solid ${C.yellow}`, opacity: 0.7,
          }} />
        </div>
      </div>
    </div>
  );
}

// ─── Visual Sub-Components ────────────────────────────────────────────────────
function VisualTerminal({ color, inView }) {
  const size = 210;
  return (
    <div style={{ width:size,height:size,border:`3px solid ${color}`,background:C.black,padding:16,fontFamily:"'Courier New',monospace",fontSize:11,color,boxShadow:inView?`8px 8px 0 ${color}44`:"none",transition:"box-shadow 0.5s ease",overflow:"hidden" }}>
      <div style={{ opacity:0.5,marginBottom:8,fontSize:9 }}>~/cyphr-studio $</div>
      {["run qa_pipeline.py","✓ 847 logs evaluated","✓ pass rate: 85%","✓ violations flagged: 12","deploying agent v2.4..."].map((line,i)=>(
        <div key={i} style={{ opacity:inView?1:0,transition:`opacity 0.3s ease ${i*200+300}ms`,marginBottom:4,color:line.startsWith("✓")?C.yellow:color }}>{line}</div>
      ))}
      <span style={{ animation:"blink 1s step-end infinite",color }}>█</span>
    </div>
  );
}

function VisualLineGraph({ color, inView }) {
  const size = 210;
  const [progress, setProgress] = useState(0);
  const basePoints = [2,4,3,6,5,8,7,10,9,13,12,15,14,17,16,19];
  const maxY=20,padX=20,padY=20;
  const graphW=size-padX*2,graphH=size-padY*2;

  useEffect(() => {
    if (!inView) return;
    let t=0, dir=1;
    const id=setInterval(()=>{
      t += 0.008 * dir;
      if (t >= 1) { t=1; dir=-1; }
      if (t <= 0) { t=0; dir=1; }
      setProgress(t);
    },30);
    return ()=>clearInterval(id);
  },[inView]);

  const visibleCount=Math.max(2,Math.ceil(progress*basePoints.length));
  const visiblePts=basePoints.slice(0,visibleCount).map((v,i)=>({
    x:padX+(i/(basePoints.length-1))*graphW,
    y:padY+graphH-(v/maxY)*graphH,
  }));
  const pathD=visiblePts.map((p,i)=>`${i===0?"M":"L"}${p.x},${p.y}`).join(" ");
  const last=visiblePts[visiblePts.length-1];

  return (
    <div style={{ width:size,height:size,border:`3px solid ${color}`,background:"transparent",boxShadow:inView?`8px 8px 0 ${color}44`:"none",transition:"box-shadow 0.5s ease",position:"relative",overflow:"hidden" }}>
      <svg width={size} height={size} style={{ position:"absolute",inset:0 }}>
        {[0.25,0.5,0.75].map(f=><line key={f} x1={padX} y1={padY+graphH*f} x2={size-padX} y2={padY+graphH*f} stroke={color} strokeOpacity="0.12" strokeWidth="1"/>)}
        {visiblePts.length>1&&<path d={`${pathD} L${last.x},${padY+graphH} L${visiblePts[0].x},${padY+graphH} Z`} fill={color} fillOpacity="0.1"/>}
        {visiblePts.length>1&&<path d={pathD} stroke={color} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>}
        {visiblePts.map((p,i)=><circle key={i} cx={p.x} cy={p.y} r="3.5" fill={color}/>)}
        {last&&<circle cx={last.x} cy={last.y} r="7" fill={color} fillOpacity="0.3" style={{ animation:"pulse 0.8s ease-in-out infinite" }}/>}
      </svg>
      <div style={{ position:"absolute",top:10,left:padX,fontFamily:"'Courier New',monospace",fontSize:8,color,opacity:0.5,letterSpacing:"0.08em" }}>{Math.round(progress*300)} PEOPLE</div>
      <div style={{ position:"absolute",bottom:10,right:14,fontFamily:"'Courier New',monospace",fontSize:8,color,opacity:0.4,letterSpacing:"0.08em" }}>↑ {Math.round(progress*100)}%</div>
    </div>
  );
}

function VisualSplit({ color, inView }) {
  const size = 210;
  const CELL = 14;
  const halfCols = Math.ceil((size/2) / CELL);
  const rows = Math.ceil(size / CELL);
  const [phase, setPhase] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!inView) return;
    let t = 0;
    const id = setInterval(() => { t += 0.025; setPhase(t); }, 40);
    setTimeout(() => setReady(true), 200);
    return () => clearInterval(id);
  }, [inView]);

  // Flower colour map — centred on the full image (0-1 across full width)
  // For pixel side we only render the right half (nx 0.5-1.0)
  const flowerColor = (nx, ny) => {
    const cx = 0.5, cy = 0.38;
    const dx = nx - cx, dy = ny - cy;
    const dist = Math.sqrt(dx*dx + dy*dy);
    const angle = Math.atan2(dy, dx);
    const petal = Math.abs(Math.cos(angle * 6)) * 0.2;
    if (dist < 0.09) return color; // centre
    if (dist < 0.09 + petal) return color + "cc"; // petals
    if (Math.abs(dx) < 0.04 && ny > 0.56 && ny < 0.88) return color + "88"; // stem
    if (ny > 0.6 && ny < 0.72 && dx < -0.06 && dx > -0.2) return color + "66"; // left leaf
    if (ny > 0.66 && ny < 0.78 && dx > 0.06 && dx < 0.2) return color + "66"; // right leaf
    return "transparent";
  };

  return (
    <div style={{
      width: size, height: size,
      border: `3px solid ${color}`,
      overflow: "hidden", position: "relative",
      boxShadow: inView ? `8px 8px 0 ${color}44` : "none",
      transition: "box-shadow 0.5s ease",
    }}>
      {/* Left half — painterly SVG flower */}
      <div style={{ position: "absolute", left: 0, top: 0, width: "50%", height: "100%", overflow: "hidden" }}>
        <svg width={size} height={size} style={{ position: "absolute", left: 0, top: 0 }}>
          {/* 6 petals */}
          {Array.from({ length: 6 }).map((_, i) => {
            const a = (i / 6) * Math.PI * 2 + phase * 0.2;
            const px = size * 0.5 + Math.cos(a) * size * 0.18;
            const py = size * 0.38 + Math.sin(a) * size * 0.18;
            return (
              <ellipse key={i}
                cx={px} cy={py}
                rx={size * 0.07} ry={size * 0.13}
                transform={`rotate(${(a * 180 / Math.PI) + 90},${px},${py})`}
                stroke={color} strokeWidth="1.5" fill="none"
                strokeOpacity={0.7 + Math.sin(phase + i) * 0.3}
                style={{ opacity: inView ? 1 : 0, transition: `opacity 0.4s ease ${i * 80}ms` }}
              />
            );
          })}
          {/* Centre */}
          <circle cx={size * 0.5} cy={size * 0.38} r={size * 0.07}
            stroke={color} strokeWidth="2" fill="none"
            style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.5s" }} />
          {/* Stem */}
          <line x1={size * 0.5} y1={size * 0.45} x2={size * 0.5} y2={size * 0.85}
            stroke={color} strokeWidth="2"
            style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.6s" }} />
          {/* Left leaf */}
          <path d={`M${size*0.5},${size*0.62} Q${size*0.32},${size*0.58} ${size*0.34},${size*0.72}`}
            stroke={color} strokeWidth="1.5" fill="none"
            style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.7s" }} />
          {/* Right leaf */}
          <path d={`M${size*0.5},${size*0.68} Q${size*0.68},${size*0.64} ${size*0.66},${size*0.78}`}
            stroke={color} strokeWidth="1.5" fill="none"
            style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.8s" }} />
          {/* Ground */}
          <line x1={8} y1={size * 0.87} x2={size - 8} y2={size * 0.87}
            stroke={color} strokeWidth="1" strokeOpacity="0.3"
            style={{ opacity: inView ? 1 : 0, transition: "opacity 0.5s ease 0.9s" }} />
        </svg>
        <div style={{ position: "absolute", bottom: 5, left: 5, fontFamily: "'Courier New',monospace", fontSize: 6, color, opacity: 0.5, letterSpacing: "0.1em" }}>ART</div>
      </div>

      {/* Divider line through the centre */}
      <div style={{
        position: "absolute", left: "50%", top: 0, bottom: 0,
        width: 2, background: color, zIndex: 2,
        opacity: inView ? 0.8 : 0, transition: "opacity 0.5s ease 0.3s",
      }} />

      {/* Right half — chunky pixel flower (same flower, right side only) */}
      <div style={{ position: "absolute", right: 0, top: 0, width: "50%", height: "100%", overflow: "hidden", background: "rgba(0,0,0,0.15)" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${halfCols}, 1fr)`,
          gridTemplateRows: `repeat(${rows}, 1fr)`,
          width: "100%", height: "100%",
          gap: "1px", background: "rgba(0,0,0,0.25)",
        }}>
          {Array.from({ length: rows }).map((_, row) =>
            Array.from({ length: halfCols }).map((_, col) => {
              // nx maps from 0.5 to 1.0 (right half of the full flower)
              const nx = 0.5 + (col / halfCols) * 0.5;
              const ny = row / rows;
              return (
                <div key={`${row}-${col}`} style={{
                  background: flowerColor(nx, ny),
                  opacity: ready ? 1 : 0,
                  transition: `opacity 0.2s ease ${Math.min((row + col) * 20, 600)}ms`,
                }} />
              );
            })
          )}
        </div>
        <div style={{ position: "absolute", bottom: 5, right: 5, fontFamily: "'Courier New',monospace", fontSize: 6, color, opacity: 0.5, letterSpacing: "0.1em" }}>AI</div>
      </div>
    </div>
  );
}


function VisualScales({ color, inView }) {
  const size = 210;
  const [angle, setAngle] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t=0;
    const id=setInterval(()=>{t+=0.035;setAngle(Math.sin(t)*16);},30);
    return ()=>clearInterval(id);
  },[inView]);
  const pivotX=105,pivotY=38,armLen=68;
  const rad=(angle*Math.PI)/180;
  const lx=pivotX-Math.cos(rad)*armLen, ly=pivotY+Math.sin(rad)*armLen*0.55;
  const rx=pivotX+Math.cos(rad)*armLen, ry=pivotY-Math.sin(rad)*armLen*0.55;
  const ph=26;
  return (
    <div style={{ width:size,height:size,border:`3px solid ${color}`,background:"transparent",overflow:"hidden",boxShadow:inView?`8px 8px 0 ${color}44`:"none",transition:"box-shadow 0.5s ease",opacity:inView?1:0 }}>
      <svg width={size} height={size} viewBox="0 0 210 210">
        <line x1="105" y1={pivotY} x2="105" y2="178" stroke={color} strokeWidth="3"/>
        <line x1="68" y1="178" x2="142" y2="178" stroke={color} strokeWidth="3.5"/>
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={color} strokeWidth="2.5"/>
        <line x1={lx} y1={ly} x2={lx-16} y2={ly+ph} stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
        <line x1={lx} y1={ly} x2={lx+16} y2={ly+ph} stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
        <path d={`M${lx-18},${ly+ph} Q${lx},${ly+ph+9} ${lx+18},${ly+ph}`} stroke={color} strokeWidth="2.5" fill="none"/>
        <line x1={rx} y1={ry} x2={rx-16} y2={ry+ph} stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
        <line x1={rx} y1={ry} x2={rx+16} y2={ry+ph} stroke={color} strokeWidth="1.5" strokeOpacity="0.7"/>
        <path d={`M${rx-18},${ry+ph} Q${rx},${ry+ph+9} ${rx+18},${ry+ph}`} stroke={color} strokeWidth="2.5" fill="none"/>
        <circle cx="105" cy={pivotY} r="4" fill={color}/>
        {[[14,14],[186,18],[11,178],[188,172]].map(([x,y],i)=>(
          <rect key={i} x={x} y={y} width="8" height="8" fill={color} fillOpacity="0.4"/>
        ))}
      </svg>
    </div>
  );
}

function VisualHuman({ color, inView }) {
  const size = 210;
  const [phase, setPhase] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let t=0;
    const id=setInterval(()=>{t+=0.03;setPhase(t);},40);
    return ()=>clearInterval(id);
  },[inView]);
  const crowd=[
    {x:30,y:185,s:0.85,c:color,d:0,sp:0.8},{x:62,y:178,s:1.1,c:C.white,d:100,sp:1.1},
    {x:105,y:174,s:1.25,c:color,d:50,sp:0.9},{x:148,y:179,s:1.05,c:C.white,d:150,sp:1.2},
    {x:178,y:184,s:0.8,c:color,d:80,sp:0.7},{x:46,y:202,s:0.7,c:C.white+"aa",d:200,sp:1.0},
    {x:85,y:200,s:0.75,c:color+"aa",d:250,sp:0.85},{x:125,y:201,s:0.72,c:C.white+"aa",d:180,sp:1.15},
    {x:163,y:203,s:0.68,c:color+"aa",d:220,sp:0.95},
  ];
  return (
    <div style={{ width:size,height:size,border:`3px solid ${color}`,background:"transparent",overflow:"hidden",position:"relative",boxShadow:inView?`8px 8px 0 ${color}44`:"none",transition:"box-shadow 0.5s ease" }}>
      <svg width={size} height={size} style={{ position:"absolute",inset:0 }}>
        {Array.from({length:6}).map((_,i)=><line key={i} x1="0" y1={i*36+10} x2={size} y2={i*36+10} stroke={color} strokeOpacity="0.06" strokeWidth="1"/>)}
      </svg>
      <svg width={size} height={size} viewBox="0 0 210 210" style={{ position:"absolute",inset:0 }}>
        {crowd.map((p,i)=>{
          const sway=Math.sin(phase*p.sp+i)*4;
          const h=34*p.s,hw=7*p.s,hy=p.y-h;
          return (
            <g key={i} style={{ opacity:inView?1:0,transform:inView?`translateX(${sway}px)`:"translateY(30px)",transition:`opacity 0.5s ease ${p.d+300}ms,transform 0.3s ease` }}>
              <circle cx={p.x} cy={hy} r={4.5*p.s} stroke={p.c} strokeWidth="1.5" fill="none"/>
              <line x1={p.x} y1={hy+4.5*p.s} x2={p.x} y2={hy+4.5*p.s+h*0.45} stroke={p.c} strokeWidth="1.5"/>
              <line x1={p.x} y1={hy+4.5*p.s+h*0.18} x2={p.x-hw} y2={hy+4.5*p.s+h*0.32} stroke={p.c} strokeWidth="1.5"/>
              <line x1={p.x} y1={hy+4.5*p.s+h*0.18} x2={p.x+hw} y2={hy+4.5*p.s+h*0.32} stroke={p.c} strokeWidth="1.5"/>
              <line x1={p.x} y1={hy+4.5*p.s+h*0.45} x2={p.x-5*p.s} y2={p.y} stroke={p.c} strokeWidth="1.5"/>
              <line x1={p.x} y1={hy+4.5*p.s+h*0.45} x2={p.x+5*p.s} y2={p.y} stroke={p.c} strokeWidth="1.5"/>
            </g>
          );
        })}
        {[12,20,28].map((r,i)=><circle key={i} cx="105" cy="135" r={r} stroke={color} strokeWidth="1.2" fill="none" strokeOpacity={0.15+Math.sin(phase+i)*0.15}/>)}
      </svg>
    </div>
  );
}

function Visual({ pattern, color, inView }) {
  if (pattern === "none")      return null;
  if (pattern === "terminal")  return <VisualTerminal color={color} inView={inView}/>;
  if (pattern === "linegraph") return <VisualLineGraph color={color} inView={inView}/>;
  if (pattern === "split")     return <VisualSplit color={color} inView={inView}/>;
  if (pattern === "scales")    return <VisualScales color={color} inView={inView}/>;
  if (pattern === "human")     return <VisualHuman color={color} inView={inView}/>;
  return null;
}

// ─── Skill Tag ────────────────────────────────────────────────────────────────
function SkillTag({ label, bg, delay, inView, onSkillClick }) {
  const [vis, setVis] = useState(false);
  const [hov, setHov] = useState(false);
  const isDark = bg === C.black || bg === C.blue;
  const border = isDark ? C.white : C.black;
  const text = isDark ? C.white : C.black;

  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setVis(true), delay);
    return () => clearTimeout(t);
  }, [inView, delay]);

  return (
    <div
      onClick={() => onSkillClick && onSkillClick(label)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        fontFamily: "'Courier New', monospace",
        fontSize: 10, letterSpacing: "0.1em",
        padding: "6px 14px",
        border: `2px solid ${hov ? C.pink : border}`,
        color: hov ? C.pink : text,
        background: hov ? C.pink + "15" : "transparent",
        opacity: vis ? 1 : 0,
        animation: vis ? "bounceIn 0.55s cubic-bezier(0.34,1.56,0.64,1) both" : "none",
        whiteSpace: "nowrap",
        transition: "border-color 0.2s, color 0.2s, background 0.2s",
        cursor: "none",
      }}>{label}</div>
  );
}

// ─── Border Climbers ──────────────────────────────────────────────────────────
// Sections alternate: even ones have the centre border line, odd ones don't.
// Climbers slide down even sections, then jump to base of next even section.
// They accumulate in the NOW (section 6) at the bottom.

function Stop({ stop, index, onSkillClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.18);
  const scrambled = useScramble(stop.title, inView, 800);
  const isEven = index % 2 === 0;
  const isDark = stop.bg === C.black || stop.bg === C.blue;
  const textColor = isDark ? C.white : C.black;

  return (
    <div ref={ref} style={{
      background: stop.bg,
      borderBottom: `3px solid ${C.black}`,
      minHeight: "100vh",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      position: "relative", overflow: "hidden",
    }}>
      {/* Watermark number */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%,-50%)",
        fontFamily: "Georgia, serif",
        fontSize: "clamp(140px,22vw,280px)",
        fontWeight: 900,
        color: isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.04)",
        userSelect: "none", pointerEvents: "none",
        letterSpacing: "-0.05em", lineHeight: 1, zIndex: 0,
      }}>{stop.id}</div>

      {/* Centre accent line — subtle, thinner, every section */}
      <div style={{
        position: "absolute",
        top: 0, bottom: 0,
        left: "50%",
        width: 1,
        background: stop.accent,
        opacity: 0.2,
        zIndex: 0,
        pointerEvents: "none",
      }} />

      {/* Org badge — top of image side, connected to centre line */}
      {stop.org && (
        <div style={{
          position: "absolute",
          top: 80,
          // Image is on right for even, left for odd
          // Badge sits just past the centre line toward the image side
          left: isEven ? "50%" : "auto",
          right: isEven ? "auto" : "50%",
          zIndex: 5,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(-10px)",
          transition: "opacity 0.5s ease 0.5s, transform 0.5s ease 0.5s",
          pointerEvents: "none",
          display: "flex",
          alignItems: "center",
          flexDirection: isEven ? "row" : "row-reverse",
        }}>
          {/* Dot on the line */}
          <div style={{
            width: 10, height: 10, borderRadius: "50%",
            background: stop.accent,
            flexShrink: 0,
            boxShadow: `0 0 0 3px ${isDark ? stop.bg : C.paper}, 0 0 0 5px ${stop.accent}44`,
          }} />
          {/* Badge */}
          <div style={{
            background: stop.accent,
            padding: "8px 14px",
            marginLeft: isEven ? 8 : 0,
            marginRight: isEven ? 0 : 8,
            whiteSpace: "nowrap",
            boxShadow: `3px 3px 0 ${stop.accent}44`,
          }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11, letterSpacing: "0.1em",
              color: C.black, fontWeight: "bold", marginBottom: 2,
            }}>{stop.org}</div>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 9, letterSpacing: "0.07em",
              color: C.black, opacity: 0.75,
            }}>{stop.orgType} · {stop.years}</div>
          </div>
        </div>
      )}

      {/* Colour bleed */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 80,
        background: `linear-gradient(to bottom, transparent, ${stop.accent}22)`,
        pointerEvents: "none", zIndex: 0,
      }} />

      {/* Content */}
      <div style={{
        borderRight: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.12)"}`,
        padding: "100px 56px 64px",
        display: "flex", flexDirection: "column", justifyContent: "center",
        zIndex: 1, order: isEven ? 0 : 1,
      }}>
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 12, color: stop.accent,
          letterSpacing: "0.16em", marginBottom: 20,
          opacity: inView ? 0.85 : 0,
          transform: inView ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.6s ease 0.1s, transform 0.6s ease 0.1s",
        }}>{stop.label}</div>

        <div style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontSize: "clamp(30px,4vw,56px)",
          fontWeight: 900, lineHeight: 0.95,
          letterSpacing: "-0.03em", color: textColor, marginBottom: 28,
        }}>{scrambled}</div>

        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(14px,1.5vw,17px)",
          color: textColor, lineHeight: 1.8, maxWidth: 400, marginBottom: 36,
          opacity: inView ? 1 : 0,
          transform: inView ? "translateY(0)" : "translateY(18px)",
          transition: "opacity 0.7s ease 0.35s, transform 0.7s ease 0.35s",
          whiteSpace: "pre-line",
        }}>{stop.body}</div>

        {stop.skills.length > 0 && (
          <div>
            <div style={{
              display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10,
            }}>
              {stop.skills.map((s, i) => (
                <SkillTag key={s} label={s} bg={stop.bg} delay={500 + i * 130} inView={inView} onSkillClick={onSkillClick} />
              ))}
            </div>

          </div>
        )}

        {stop.id === "06" && (
          <div style={{ marginTop: 40, opacity: inView ? 1 : 0, transition: "opacity 0.8s ease 0.6s" }}>
            <button style={{
              background: C.black, color: C.white,
              border: `3px solid ${C.black}`,
              fontFamily: "'Courier New', monospace",
              fontSize: 11, letterSpacing: "0.2em",
              padding: "13px 30px", fontWeight: "bold", cursor: "none",
              transition: "background 0.2s, color 0.2s, transform 0.15s, box-shadow 0.15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.background = C.yellow; e.currentTarget.style.color = C.black; e.currentTarget.style.transform = "translate(-3px,-3px)"; e.currentTarget.style.boxShadow = `5px 5px 0 ${C.black}`; }}
            onMouseLeave={e => { e.currentTarget.style.background = C.black; e.currentTarget.style.color = C.white; e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.boxShadow = "none"; }}
            >SEE MY WORK →</button>
          </div>
        )}
      </div>

      {/* Visual */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: 56, zIndex: 1, order: isEven ? 1 : 0,
      }}>
        {stop.id === "06" ? (
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: "clamp(52px,9vw,108px)",
            fontWeight: 900, fontStyle: "italic",
            color: C.black, lineHeight: 1, letterSpacing: "-0.04em",
            opacity: inView ? 1 : 0,
            transform: inView ? "rotate(-3deg) translateX(24px)" : "rotate(-3deg) translateY(30px)",
            transition: "opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s",
            userSelect: "none",
          }}>Elizabeth<br />Alabi.</div>
        ) : (
          <div style={{
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0) scale(1)" : "translateY(28px) scale(0.92)",
            transition: "opacity 0.8s ease 0.2s, transform 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s",
          }}>
            <Visual pattern={stop.pattern} color={stop.imgColor} inView={inView} />
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Skills Strip ─────────────────────────────────────────────────────────────
function SkillsStrip({ onSkillClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, 0.1);
  return (
    <div ref={ref} style={{
      background: C.yellow,
      borderTop: `3px solid ${C.black}`, borderBottom: `3px solid ${C.black}`,
      padding: "44px 48px",
    }}>
      <div style={{
        fontFamily: "'Courier New', monospace", fontSize: 10,
        letterSpacing: "0.25em", color: C.black, opacity: 0.5, marginBottom: 20,
      }}>FULL SKILL SET</div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
        {ALL_SKILLS.map((s, i) => {
          const [hov, setHov] = useState(false);
          return (
            <div key={s}
              onClick={() => onSkillClick && onSkillClick(s)}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{
                fontFamily: "'Courier New', monospace", fontSize: 11,
                letterSpacing: "0.1em", padding: "7px 16px",
                border: `2px solid ${C.black}`,
                background: hov ? C.black : "transparent",
                color: hov ? C.yellow : C.black,
                opacity: inView ? 1 : 0,
                animation: inView ? `bounceIn 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 35}ms both` : "none",
                transition: "background 0.15s, color 0.15s",
                whiteSpace: "nowrap",
                cursor: "none",
              }}>{s}</div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Knowledge base ───────────────────────────────────────────────────────────
const KB = {
  "Power BI": "Elizabeth has built Power BI dashboards used at executive level — tracking KPIs, adoption metrics, and business outcomes across global teams. She implemented Row-Level Security, refresh cycles, composite models, and custom visuals. She also ran a full migration programme moving teams off Tableau onto Power BI, which saved over £100k in licensing costs. More recently I built the QA metrics dashboard for a live AI agent deployment, shared weekly with commercial stakeholders.",
  "DAX": "Elizabeth uses DAX for calculated measures, time intelligence, and comparative reporting. Built during her time at a global financial services firm for executive-level dashboards tracking adoption and productivity across three regions.",
  "Power Query": "Elizabeth used Power Query extensively for data transformation and shaping within Power BI — cleaning source data, building reusable query steps, and managing refresh logic.",
  "RLS": "She implemented Row-Level Security at a global financial services firm to control data access by region and role across executive dashboards — ensuring the right people saw the right data.",
  "Python": "Elizabeth used Python to build the automated QA pipeline for a live retail AI agent — generating structured pass/fail datasets across 100+ test scenarios weekly using the Anthropic API. She also built a price checker script using JSON-LD and Next.js data extraction that writes results to Google Sheets.",
  "Playwright": "Elizabeth used Playwright for browser automation in the QA pipeline — systematically testing a live AI agent interface at scale rather than manually reviewing interactions.",
  "Anthropic API": "The Anthropic API is at the core of Elizabeth's QA pipeline — She uses it to evaluate AI agent outputs at scale, applying golden set methodology and structured rubrics. It's also the engine behind this chatbot you're using right now.",
  "Prompt Engineering": "Elizabeth's day-to-day work at an AI studio across four live client deployments. She designs, iterates, and calibrates system prompts for commercial AI agents. On one project she rebuilt a single overloaded prompt into two separate schemas when it was causing scope violations — which resolved a critical behavioural issue in the live product.",
  "QA Frameworks": "Elizabeth built the entire QA framework for a live retail AI agent from scratch — rubric design, golden set methodology, calibration processes, pass/fail scoring, and violation categorisation. She lifted the pass rate from 34% to 85% and track it weekly in a Power BI dashboard shared with stakeholders.",
  "Golden Set Methodology": "A QA technique Elizabeth applies to evaluate AI agents consistently — a fixed set of test cases run repeatedly to measure whether model behaviour is improving, stable, or degrading over time. She designed and operationalised this across multiple client deployments.",
  "Rubric Design": "Elizabeth designs structured evaluation rubrics that define exactly what a pass, partial pass, or fail looks like for an AI agent response — covering accuracy, tone, scope compliance, and safety policy adherence.",
  "Model Evaluation": "For her MSc thesis Elizabeth ran A/B testing across multiple AI models — including GPT-4 and Copilot — against defined quality and safety criteria. I assessed not just output quality but potential harms and policy risks. The thesis was nominated for an award.",
  "Conversational AI Evaluation": "Elizabeth reviews AI-generated conversation logs against defined quality, safety, and policy criteria — identifying violations, surfacing trends, and feeding structured findings back into improvement cycles.",
  "Agent Deployment": "Elizabeth has supported the live deployment and ongoing QA of AI agents in real commercial environments — including a retail assistant deployed in John Lewis stores and a consumer-facing chatbot for an alcohol brand.",
  "Responsible AI": "Runs through everything Elizabeth does. It started with her MSc thesis on AI and creative rights during the 2023 writers strike, continued through embedding responsible AI behaviours into an enterprise adoption programme, and now shapes how she evaluates safety and policy compliance in live AI deployments.",
  "Policy Compliance": "Elizabeth evaluates AI agent outputs for policy adherence — checking that responses stay within defined scope, avoid prohibited content, and handle sensitive flows like age verification correctly.",
  "Violation Categorisation": "Elizabeth categorises and logs QA violations by type — tone, scope, safety, accuracy — to identify systemic patterns and produce structured findings reports that inform corrective action.",
  "Google Apps Script": "Elizabeth has built automation workflows using Google Apps Script at an AI studio — including a CSV-to-Sheets QA pipeline and a document generation system that eliminated manual processes across client accounts.",
  "Zapier": "Elizabeth used Zapier to automate Jira ticket commenting with formatted QA results — connecting pipeline output directly into the team's project management workflow without manual copy-paste.",
  "Make": "Elizabeth uses Make for no-code automation workflows — connecting tools and eliminating manual processes across client accounts at an AI studio.",
  "Power Automate": "Elizabeth has experience with Power Automate for workflow automation within the Microsoft ecosystem, used alongside the Copilot rollout at a global financial services firm.",
  "Zoho CRM": "Used at a B2B SaaS company, Elizabeth managed support interactions across a global user base of 300. She maintained data integrity, contributed to CRM governance, and ensured accurate reporting.",
  "Freshdesk": "She used it to manage customer operations, track resolution rates, and surface recurring patterns back to the product team.",
  "Zendesk": "Elizabeth has experience with Zendesk for customer operations and support ticket management across different organisational contexts.",
  "Jira": "Elizabeth has used Jira across five years and three different industries — SaaS, fintech, and an AI studio. She uses it for ticket management, QA workflow tracking, logging violations, and managing the feedback loop between findings and the product team.",
  "Microsoft Copilot": "Elizabeth led the enterprise rollout of Microsoft Copilot across 300 professionals at a global financial services firm — spanning three regions. She designed the strategy, ran diagnostic assessments, delivered role-specific workshops, coordinated a champion network, and tracked adoption metrics in Power BI.",
  "Workshop Design": "Elizabeth has designed and delivered AI workshops across three contexts — a B2B SaaS company, a global financial services firm, and an AI studio. She adapts content and approach to different technical confidence levels and roles. Three years of experience.",
  "Champion Networks": "Elizabeth built and coordinated both a Power BI Ambassador Network and an AI champion network at a global financial services firm — using peer influence to sustain adoption beyond formal training.",
  "Stakeholder Reporting": "Elizabeth produces weekly QA findings reports for commercial and product stakeholders at an AI studio, and built executive-level Power BI dashboards presented to senior leadership across regions at a financial services firm.",
  "Onboarding": "Elizabeth has delivered remote onboarding at a B2B SaaS company for a global user base of 300, and tool onboarding at scale at a global financial services firm. The focus is always on building genuine confidence with the tool, not just showing people where to click.",
  "Training Delivery": "Three years of experience delivering training across a B2B SaaS company, a global financial services firm, and an AI studio — covering AI tools, productivity platforms, and data tools. I adapt to technical and non-technical audiences.",
  "Cross-functional Collaboration": "Across every role Elizabeth has worked closely with product, technical, commercial, and leadership teams — from feeding QA findings into product improvement cycles to collaborating with IT and senior leadership on enterprise AI rollouts.",
  "CRM Governance": "Elizabeth has contributed to CRM governance at a B2B SaaS company — managing data integrity, access controls, and documentation standards across the Zoho CRM instance.",
  "Data Storytelling": "Elizabeth translates data into decisions — whether that's a Power BI dashboard for a board or a QA findings report. The skill is knowing what to show and what to leave out.",
  "SharePoint": "Elizabeth built and maintained a central Productivity Hub in SharePoint at a global financial services firm — embedding reports, training materials, tools, and best practices to drive adoption across teams.",
  "Azure SQL": "Used during her time at a global financial services firm for data integration into Power BI — connecting enterprise data sources to executive reporting tools.",
  "SQL": "Elizabeth uses SQL for data extraction and analysis — used alongside Power BI at a financial services firm and in QA pipeline work for structured data queries.",
  "Tableau": "Elizabeth ran a full Proof of Concept comparing Tableau and Power BI, presented pros and cons to stakeholders, and led the adoption programme to migrate teams from Tableau to Power BI — saving over £100k in licensing costs in the process.",
  "A/B testing": "Applied in her MSc thesis — running A/B tests across multiple AI models against defined quality and safety criteria to produce structured insight into model strengths, failure modes, and suitability.",
  "Research": "Elizabeth's MSc thesis examined AI and creative rights in the context of the 2023 WGA writers strike. She evaluated multiple AI models, designed assessment criteria, and produced structured findings. The thesis was nominated for an award.",
  "GPT-4": "Elizabeth used GPT-4 as one of the models evaluated in her MSc thesis, and it's been part of her toolkit for prompt engineering and AI tool assessment across client work.",
  "Claude": "Elizabeth uses Claude daily — for prompt engineering, QA evaluation, and client-facing AI work at an AI studio. This chatbot runs on Claude via the Anthropic API.",
  "Gemini": "Elizabeth uses Gemini and the Gemini API for automation workflows and document generation at an AI studio — including a process automation system built with Google Apps Script.",
  "Zoho Analytics": "Elizabeth used Zoho Analytics at a B2B SaaS company to build dashboards tracking team performance, process outcomes, and digital product health metrics. She also built a generative AI productivity tracker in Zoho Analytics that provided visibility into AI usage trends and their impact on business output.",
  "Digital rights": "Elizabeth's background in law gave her a strong grounding in digital rights, IP, and copyright — the legal edges of technology. This shapes how she thinks about responsible AI deployment, data protection, and the ethical implications of the systems she builds and evaluates.",
  "IP & copyright": "Elizabeth studied IP and copyright law at undergraduate level and applied it directly in her MSc thesis on AI and creative rights during the 2023 WGA writers strike — examining what AI systems owe to the people whose work trained them.",
  "Ethical frameworks": "Elizabeth approaches AI with a legal and ethical lens developed through her law degree and MSc. She designs QA criteria that assess not just output quality but potential harms, policy risks, and responsible use — embedding ethics into evaluation rather than treating it as an afterthought.",
  "Critical thinking": "Developed through a law degree and sharpened across every role since. Elizabeth applies structured analytical thinking to QA evaluation, adoption strategy, and AI assessment — identifying root causes, patterns, and failure modes rather than surface symptoms.",
  "User empathy": "A core skill developed at a B2B SaaS company supporting 300 global users through a complex platform. Elizabeth learned that the gap between a good tool and an adopted tool is almost always about people — their confidence, their context, their actual workflow.",
  "Platform training": "Elizabeth has delivered platform training across a B2B SaaS company, a global financial services firm, and an AI studio — adapting content to different technical confidence levels, roles, and learning styles across three years.",
  "Feedback loops": "Elizabeth has built and managed structured feedback loops throughout her career — from synthesising user feedback at a SaaS company into product recommendations, to feeding QA findings from AI agent evaluations back into the prompt engineering and product improvement cycle.",
  "Programme design": "Elizabeth designed the full AI adoption programme at a global financial services firm from scratch — covering strategy, diagnostic assessments, role-specific training, champion networks, and impact measurement. 300 people, three regions.",
  "Workshop delivery": "Three years of workshop delivery across a B2B SaaS company, a global financial services firm, and an AI studio. Elizabeth adapts to technical and non-technical audiences, and has delivered to over 100 staff in a single programme.",
  "Prompt engineering": "Day-to-day work across four live client deployments at an AI studio. Elizabeth designs, iterates, and calibrates system prompts for commercial AI agents — including rebuilding a flawed single-schema prompt into two separate schemas when it was causing scope violations in a live product.",
  "QA frameworks": "Elizabeth built the entire QA framework for a live retail AI agent from scratch — rubric design, golden set methodology, calibration, pass/fail scoring, violation categorisation. She lifted the pass rate from 34% to 85% and tracks it weekly in a Power BI dashboard shared with commercial stakeholders.",
  "Agent deployment": "Elizabeth has supported the live deployment and ongoing QA of AI agents in real commercial environments — including a retail assistant in John Lewis stores and a consumer-facing chatbot for an alcohol brand, both with real customers and real stakes.",
  "Model evaluation": "For her MSc thesis Elizabeth ran A/B tests across multiple AI models — including GPT-4 and Copilot — against defined quality and safety criteria. She assessed not just output quality but potential harms and policy risks. The thesis was nominated for an award.",
  "Champion networks": "Elizabeth built and coordinated both a Power BI Ambassador Network and an AI champion network at a global financial services firm — using peer influence and community facilitation to sustain adoption beyond the formal training programme.",
    "default": "Elizabeth has hands-on experience with this across her work in AI operations, enterprise adoption, and QA evaluation. Click another skill or ask her something from the chips above.",
};

const CHIPS = [
  "What do you actually do?",
  "What makes you different?",
  "What are you open to?",
  "How was this built?",
];

const CHIP_RESPONSES = {
  "What do you actually do?": "Elizabeth makes AI work for people, not the other way around. Day to day that means designing and evaluating AI agents, building QA frameworks, running adoption programmes, and writing system prompts. Right now she's across four live client deployments simultaneously.",
  "What makes you different?": "Elizabeth sits at the intersection of the technical and the human. She can write a system prompt and run a workshop, build a QA pipeline and present the findings to a board. Most people do one or the other. She does both — and she understands why both matter.",
  "What are you open to?": "Elizabeth is open to AI Adoption, Enablement, Operations, or Consulting roles. Ideally somewhere she can shape how an organisation thinks about and uses AI, not just implement someone else's playbook. £42–55k+ range. Open to hybrid and remote. Based in London, relocating to Manchester end of 2026.",
  "How was this built?": "This chatbot uses a RAG-inspired architecture — Elizabeth's career knowledge is stored as a curated static knowledge base (the foundation layer), and the Anthropic API adds dynamic reasoning on top. If the API is unavailable for any reason, it falls back to the static data seamlessly — it never breaks. Clicking any skill tag fires a contextual query about that skill. The portfolio itself is built in React from scratch, no templates. Hosted on Vercel.",
};

// ─── Floating Chat ────────────────────────────────────────────────────────────
function FloatingChat({ initialSkill, onSkillHandled }) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (initialSkill) {
      setOpen(true);
      askAboutSkill(initialSkill);
      onSkillHandled();
    }
  }, [initialSkill]);

  useEffect(() => {
    if (bottomRef.current) bottomRef.current.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const getStaticResponse = (skill) => {
    if (KB[skill]) return KB[skill];
    const lower = skill.toLowerCase();
    for (const [key, val] of Object.entries(KB)) {
      if (key.toLowerCase() === lower) return val;
    }
    return KB.default;
  };

  const askAboutSkill = async (skill) => {
    const question = `Tell me about your experience with ${skill}.`;
    const userMsg = { role: "user", content: `🏷 ${skill}` };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    // Try API first, fall back to static
    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: `You are ALIBI AI, a portfolio assistant speaking in THIRD PERSON about Elizabeth Alabi. Always refer to her as "Elizabeth" or "she/her". Never say "I" as if you are Elizabeth. Keep responses under 100 words. Be specific, direct, confident. No corporate fluff. Never name specific companies — refer to them by sector/type only (e.g. "a global financial services firm", "a B2B SaaS company", "an AI studio"). Do not answer questions unrelated to Elizabeth's professional background. If asked something off-topic, redirect warmly.

Career context: Elizabeth is an AI Operations Coordinator at an AI studio (seconded from a brand partnership group). Previously Technology Associate at a global financial services firm. Before that, Customer Operations Specialist at a B2B SaaS HR tech company. MSc Data Science & AI, UAL — thesis on AI and creative rights, award nominated. LLB Law, University of Liverpool. Skills include Power BI, Python, Playwright, Anthropic API, prompt engineering, QA frameworks, Google Apps Script, Zapier, Jira (5 years, 3 industries), Tableau (ran migration saving £100k+), Microsoft Copilot enterprise rollout (300 people, 3 regions), workshop delivery, champion networks, responsible AI, model evaluation.`,
          messages: [{ role: "user", content: question }],
        }),
      });
      if (!res.ok) throw new Error();
      const data = await res.json();
      const reply = data.content?.[0]?.text || getStaticResponse(skill);
      setMessages(prev => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages(prev => [...prev, { role: "assistant", content: getStaticResponse(skill) }]);
    } finally {
      setLoading(false);
    }
  };

  const handleChip = (chip) => {
    const userMsg = { role: "user", content: chip };
    const reply = CHIP_RESPONSES[chip];
    setMessages(prev => [...prev, userMsg, { role: "assistant", content: reply }]);
  };

  const handleReset = () => setMessages([]);

  const [bubble, setBubble] = useState(false);
  const [bubbleDone, setBubbleDone] = useState(false);

  useEffect(() => {
    if (bubbleDone) return;
    const t1 = setTimeout(() => setBubble(true), 3000);
    const t2 = setTimeout(() => { setBubble(false); setBubbleDone(true); }, 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{ position: "fixed", bottom: 28, right: 28, zIndex: 500 }}>
      {/* Speech bubble */}
      {bubble && !open && (
        <div style={{
          position: "absolute", bottom: 64, right: 0,
          background: C.black, color: C.white,
          padding: "10px 16px",
          fontFamily: "'Courier New', monospace",
          fontSize: 10, letterSpacing: "0.08em",
          whiteSpace: "nowrap",
          border: `2px solid ${C.yellow}`,
          boxShadow: `3px 3px 0 ${C.yellow}`,
          animation: "popin 0.3s cubic-bezier(0.16,1,0.3,1)",
        }}>
          Click any skill tag to learn more →
          {/* Tail */}
          <div style={{
            position: "absolute", bottom: -8, right: 20,
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: `8px solid ${C.yellow}`,
          }}/>
        </div>
      )}

      {open && (
        <div style={{
          position: "absolute", bottom: 64, right: 0,
          width: 380,
          background: C.paper,
          border: `3px solid ${C.black}`,
          boxShadow: `6px 6px 0 ${C.black}`,
          animation: "popin 0.25s cubic-bezier(0.16,1,0.3,1)",
          display: "flex", flexDirection: "column",
          maxHeight: "75vh",
        }}>
          {/* Header */}
          <div style={{
            padding: "16px 20px 12px",
            borderBottom: `2px solid ${C.black}`,
            display: "flex", justifyContent: "space-between", alignItems: "flex-start",
          }}>
            <div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 15, fontWeight: 700, color: C.black }}>
                ALIBI AI
              </div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.black, opacity: 0.45, marginTop: 4, letterSpacing: "0.05em" }}>
                Elizabeth's alibi for every role she's ever had. Ask me anything about her.
              </div>
            </div>
            {messages.length > 0 && (
              <button onClick={handleReset} style={{
                fontFamily: "'Courier New', monospace", fontSize: 8,
                color: C.black, opacity: 0.4, background: "none",
                border: "none", cursor: "none", letterSpacing: "0.1em",
                padding: "2px 6px",
              }}>RESET</button>
            )}
          </div>

          {/* Always-visible chips */}
          <div style={{
            padding: "10px 16px",
            borderBottom: `1px solid rgba(0,0,0,0.1)`,
            display: "flex", flexWrap: "wrap", gap: 6,
          }}>
            {CHIPS.map(c => (
              <div key={c}
                onClick={() => handleChip(c)}
                style={{
                  fontFamily: "'Courier New', monospace", fontSize: 9,
                  padding: "6px 10px", border: `2px solid ${C.black}`,
                  color: C.black, letterSpacing: "0.04em",
                  transition: "background 0.15s, color 0.15s", cursor: "none",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={e => { e.currentTarget.style.background = C.black; e.currentTarget.style.color = C.yellow; }}
                onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = C.black; }}
              >{c}</div>
            ))}
            <div style={{
              fontFamily: "'Courier New', monospace", fontSize: 7,
              color: C.black, opacity: 0.3, letterSpacing: "0.1em",
              width: "100%", paddingTop: 2,
            }}>↓ CLICK ANY SKILL TAG TO ASK ABOUT IT</div>
          </div>

          {/* Messages */}
          {messages.length > 0 && (
            <div style={{
              flex: 1, overflowY: "auto", padding: "14px 16px",
              display: "flex", flexDirection: "column", gap: 10,
            }}>
              {messages.map((m, i) => (
                <div key={i} style={{
                  alignSelf: m.role === "user" ? "flex-end" : "flex-start",
                  maxWidth: "90%",
                  background: m.role === "user" ? C.black : C.white,
                  color: m.role === "user" ? C.yellow : C.black,
                  padding: "9px 13px",
                  border: `2px solid ${C.black}`,
                  fontFamily: m.role === "user" ? "'Courier New', monospace" : "Georgia, serif",
                  fontSize: m.role === "user" ? 10 : 12,
                  lineHeight: 1.65,
                  letterSpacing: m.role === "user" ? "0.05em" : "0",
                }}>{m.content}</div>
              ))}
              {loading && (
                <div style={{
                  alignSelf: "flex-start",
                  fontFamily: "'Courier New', monospace", fontSize: 10,
                  color: C.black, opacity: 0.35, padding: "4px 0",
                  animation: "pulse 1s ease-in-out infinite",
                }}>thinking...</div>
              )}
              <div ref={bottomRef} />
            </div>
          )}
        </div>
      )}

      {/* Skill nudge bubble — shows when chat is closed */}
      {!open && (
        <div style={{
          position: "absolute", bottom: 64, right: 0,
          background: C.black, border: `2px solid ${C.pink}`,
          padding: "8px 12px", whiteSpace: "nowrap",
          boxShadow: `3px 3px 0 ${C.pink}`,
          animation: "floatY 3s ease-in-out infinite",
        }}>
          <div style={{
            fontFamily: "'Courier New', monospace",
            fontSize: 9, color: C.pink, letterSpacing: "0.1em",
            marginBottom: 2,
          }}>ALIBI AI</div>
          <div style={{
            fontFamily: "Georgia, serif",
            fontSize: 11, color: C.white, lineHeight: 1.4,
          }}>Click any skill tag<br/>to learn more ↓</div>
          {/* Arrow */}
          <div style={{
            position: "absolute", bottom: -8, right: 16,
            width: 0, height: 0,
            borderLeft: "6px solid transparent",
            borderRight: "6px solid transparent",
            borderTop: `8px solid ${C.pink}`,
          }} />
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        background: open ? C.black : C.pink,
        border: `3px solid ${C.black}`, width: 52, height: 52,
        fontFamily: "Georgia, serif", fontSize: 22, color: C.white,
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: `4px 4px 0 ${C.black}`,
        transition: "background 0.2s, transform 0.15s, box-shadow 0.15s", cursor: "none",
      }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translate(-3px,-3px)"; e.currentTarget.style.boxShadow = `6px 6px 0 ${C.black}`; }}
      onMouseLeave={e => { e.currentTarget.style.transform = "translate(0,0)"; e.currentTarget.style.boxShadow = `4px 4px 0 ${C.black}`; }}
      >{open ? "×" : "?"}</button>
    </div>
  );
}

// ─── Nav Dots ─────────────────────────────────────────────────────────────────
function NavDots({ total, active }) {
  return (
    <div style={{
      position: "fixed", right: 20, top: "50%",
      transform: "translateY(-50%)",
      display: "flex", flexDirection: "column", gap: 10, zIndex: 200,
    }}>
      {Array.from({ length: total }).map((_, i) => (
        <div key={i} style={{
          width: i === active ? 10 : 6, height: i === active ? 10 : 6,
          background: i === active ? C.pink : C.black,
          border: `2px solid ${C.black}`,
          transition: "all 0.3s ease", opacity: i === active ? 1 : 0.25,
        }} />
      ))}
    </div>
  );
}

// ─── Work Placeholder ─────────────────────────────────────────────────────────
function WorkSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("elizabethjobs200079@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div style={{
      background: C.black, minHeight: "60vh",
      borderTop: `3px solid ${C.yellow}`,
      display: "grid", gridTemplateColumns: "1fr 1fr",
      position: "relative",
    }}>
      {/* Left — statement */}
      <div style={{
        borderRight: `1px solid rgba(255,255,255,0.08)`,
        padding: "72px 56px",
        display: "flex", flexDirection: "column", justifyContent: "center",
      }}>
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 10, color: C.pink,
          letterSpacing: "0.25em", marginBottom: 24, opacity: 0.8,
        }}>AVAILABILITY</div>
        <div style={{
          fontFamily: "Georgia, serif",
          fontSize: "clamp(32px,4.5vw,56px)",
          fontWeight: 900, color: C.white,
          lineHeight: 1.05, letterSpacing: "-0.02em",
          marginBottom: 20,
        }}>
          Open to work.<br />
          <span style={{ color: C.yellow, fontStyle: "italic", fontWeight: 400 }}>Let's talk.</span>
        </div>
        <div style={{
          fontFamily: "'Courier New', monospace",
          fontSize: 12, color: C.white,
          opacity: 0.45, lineHeight: 1.8,
          maxWidth: 340,
        }}>
          AI Adoption · Enablement · Operations · QA<br />
          Based in London. Open to remote and hybrid.
        </div>
      </div>

      {/* Right — contact actions */}
      <div style={{
        padding: "72px 56px",
        display: "flex", flexDirection: "column", justifyContent: "center", gap: 16,
      }}>
        {/* Email */}
        <div
          onClick={handleCopy}
          style={{
            border: `2px solid ${copied ? C.yellow : "rgba(255,255,255,0.2)"}`,
            padding: "18px 24px",
            cursor: "none",
            transition: "border-color 0.2s, background 0.2s",
            background: copied ? C.yellow + "15" : "transparent",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.yellow; e.currentTarget.style.background = C.yellow + "10"; }}
          onMouseLeave={e => {
            if (!copied) {
              e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
              e.currentTarget.style.background = "transparent";
            }
          }}
        >
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.yellow, letterSpacing: "0.2em", marginBottom: 6 }}>
            {copied ? "COPIED ✓" : "EMAIL"}
          </div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: C.white, letterSpacing: "0.04em" }}>
            elizabethjobs200079@gmail.com
          </div>
        </div>

        {/* LinkedIn */}
        <a
          href="https://www.linkedin.com/in/elizabeth-alabi-bbb909154/"
          target="_blank"
          rel="noreferrer"
          style={{
            border: `2px solid rgba(255,255,255,0.2)`,
            padding: "18px 24px",
            textDecoration: "none",
            display: "block",
            transition: "border-color 0.2s, background 0.2s",
          }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = C.blue; e.currentTarget.style.background = C.blue + "10"; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)"; e.currentTarget.style.background = "transparent"; }}
        >
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.blue, letterSpacing: "0.2em", marginBottom: 6 }}>
            LINKEDIN
          </div>
          <div style={{ fontFamily: "'Courier New', monospace", fontSize: 13, color: C.white, letterSpacing: "0.04em" }}>
            elizabeth-alabi →
          </div>
        </a>

        {/* Status pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 10, marginTop: 8,
          fontFamily: "'Courier New', monospace", fontSize: 10,
          color: C.white, opacity: 0.4, letterSpacing: "0.15em",
        }}>
          <div style={{
            width: 8, height: 8, borderRadius: "50%",
            background: C.pink,
            animation: "pulse 2s ease-in-out infinite",
          }}/>
          ACTIVELY LOOKING · JUNE 2026
        </div>
      </div>

    </div>
  );
}

// ─── Root ─────────────────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [winH, setWinH] = useState(800);
  const [activeTab, setActiveTab] = useState("STORY");
  const [activeSkill, setActiveSkill] = useState(null);
  const activeStop = Math.min(TIMELINE.length - 1, Math.floor((scrollY - winH) / winH));

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    const onResize = () => setWinH(window.innerHeight);
    setWinH(window.innerHeight);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onResize); };
  }, []);

  return (
    <div style={{ background: C.paper }}>
      <Cursor />
      <NavTabs active={activeTab} onChange={setActiveTab} />
      <div style={{ paddingTop: 48 }}>
        <Ticker />
        {activeTab === "STORY" && (
          <>
            <NameIntro />
            <NavDots total={TIMELINE.length} active={Math.max(0, activeStop)} />
            {TIMELINE.map((stop, i) => (
              <Stop key={stop.id} stop={stop} index={i} onSkillClick={setActiveSkill} />
            ))}
            <SkillsStrip onSkillClick={setActiveSkill} />
            <WorkSection />
          </>
        )}
        {activeTab === "PROJECTS" && <ProjectsPage />}
        {activeTab === "WORKFLOWS" && (
          <div style={{ position:"fixed", top:48, left:0, right:0, bottom:0, zIndex:10, display:"flex", flexDirection:"column" }}>
            <div style={{ background:C.black, borderBottom:`2px solid ${C.yellow}33`, padding:"10px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
              <div>
                <div style={{ fontFamily:"'Courier New',monospace", fontSize:8, color:C.yellow, letterSpacing:"0.2em", opacity:0.7, marginBottom:3 }}>BUILT BY ELIZABETH ALABI</div>
                <div style={{ fontFamily:"Georgia,serif", fontSize:15, fontWeight:900, color:C.white }}>AI Workflows — 10 systems I built and automated</div>
              </div>
              <div style={{ fontFamily:"'Courier New',monospace", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>Click any diagram · Arrow keys to slide</div>
            </div>
            <iframe src="https://elialabi-eli-portfol-0wpb.bolt.host/workflows.html" style={{ flex:1, border:"none", width:"100%" }} title="AI Workflows"/>
          </div>
        )}
        {activeTab === "WRITING" && (
          <div style={{
            minHeight: "80vh", display: "flex",
            alignItems: "center", justifyContent: "center",
            background: C.black,
          }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11, color: C.white,
              opacity: 0.3, letterSpacing: "0.3em",
            }}>WRITING — COMING SOON</div>
          </div>
        )}
        {activeTab === "CONTACT" && (
          <div style={{
            minHeight: "80vh", display: "flex",
            alignItems: "center", justifyContent: "center",
            background: C.black,
          }}>
            <div style={{
              fontFamily: "'Courier New', monospace",
              fontSize: 11, color: C.white,
              opacity: 0.3, letterSpacing: "0.3em",
            }}>CONTACT — SCROLL TO BOTTOM OF STORY</div>
          </div>
        )}
        <FloatingChat initialSkill={activeSkill} onSkillHandled={() => setActiveSkill(null)} />
      </div>
    </div>
  );
}

// ─── Projects Data ────────────────────────────────────────────────────────────
const PANELS = [
  {
    id: "qa",
    label: "ALIBI AI",
    accent: C.yellow,
    bg: C.black,
    tagline: "AI quality systems that close the loop.",
    projects: [
      {
        id: "qa-01",
        title: "AI AGENT QA PIPELINE",
        sector: "Retail · Live Commercial Deployment",
        tags: ["Python", "Anthropic API", "Playwright", "Power BI"],
        problem: "A live retail AI agent was producing inconsistent responses — no systematic way to measure quality, identify failures, or verify fixes.",
        solution: "Built a full automated QA pipeline from scratch. 100+ test scenarios run weekly. Golden set methodology, structured rubrics, pass/fail scoring, violation categorisation. Results fed into a Power BI dashboard shared with stakeholders.",
        result: "Pass rate lifted from 34% to 85%. Weekly findings reports now route directly to the product team — failures flagged, fixes made, re-tested. A continuous improvement loop, not a one-off audit.",
        metric: "34% → 85%",
        metricLabel: "pass rate",
      },
      {
        id: "qa-02",
        title: "CONSUMER AI SAFETY REVIEW",
        sector: "Alcohol Brand · Consumer-Facing Chatbot",
        tags: ["QA Frameworks", "Policy Compliance", "Rubric Design"],
        problem: "A consumer-facing AI chatbot for an alcohol brand had an unreliable age verification flow — a critical safety and legal risk with real customers.",
        solution: "Designed a structured safety review framework covering age verification, recommendation accuracy, tone compliance, and policy adherence. Established a logging system for tracking and escalating violations across test runs.",
        result: "Identified known behavioural variance in the age gate — a critical failure mode. Produced structured findings reports with clear corrective action recommendations. Staging and production environments both evaluated.",
        metric: "Critical",
        metricLabel: "safety issue identified",
      },

    ],
  },
  {
    id: "workflows",
    label: "WORKFLOWS",
    accent: C.blue,
    bg: C.paper,
    tagline: "Automation built to eliminate manual work.",
    projects: [
      {
        id: "wf-01",
        title: "AI MODERATION PIPELINE",
        sector: "AI Studio · Internal Tooling",
        tags: ["Python", "Anthropic API", "Google Sheets", "Zapier"],
        problem: "QA results were being logged manually — copy-pasted from test runs into spreadsheets and then into Jira tickets by hand.",
        solution: "Built a Python pipeline that runs test scenarios, scores outputs automatically, writes structured results to Google Sheets via CSV, and auto-comments on Jira tickets with formatted findings — no manual steps.",
        result: "Eliminated hours of manual logging per week. Results are traceable, consistent, and immediately available to the product team without anyone having to touch a spreadsheet.",
        metric: "0",
        metricLabel: "manual steps",
      },
      {
        id: "wf-02",
        title: "DOCUMENT GENERATION SYSTEM",
        sector: "AI Studio · Client Workflows",
        tags: ["Gemini API", "Google Apps Script", "Make"],
        problem: "Client document production was a slow manual process — templating, populating, formatting, sending. Repetitive and error-prone.",
        solution: "Built an AI-powered document generation system using Gemini API and Google Apps Script. Templates live in Google Docs, data flows in via a trigger, Gemini populates and formats, output delivered automatically.",
        result: "Manual document production eliminated for recurring client workflows. Practical AI efficiency demonstrated directly to client teams as part of the adoption programme.",
        metric: "100%",
        metricLabel: "automated",
      },
      {
        id: "wf-03",
        title: "AI PRODUCTIVITY TRACKER",
        sector: "B2B SaaS · Internal Analytics",
        tags: ["Zoho Analytics", "CRM", "Dashboards"],
        problem: "The team was using AI tools but had no visibility into how, how often, or whether it was making a difference to output.",
        solution: "Built a generative AI productivity tracker in Zoho Analytics — pulling usage data, mapping it to business output metrics, and surfacing trends in a dashboard accessible to the whole team.",
        result: "First time the organisation had visibility into AI usage patterns and their business impact. Data used to inform decisions about which tools to invest in and where to focus adoption effort.",
        metric: "First",
        metricLabel: "visibility into AI usage",
      },
    ],
  },
  {
    id: "experimental",
    label: "PERSONAL PROJECTS",
    accent: C.pink,
    bg: C.dark,
    tagline: "Built outside work. Built to prove something.",
    projects: [
      {
        id: "ex-01",
        title: "WRITERSTRIKE",
        sector: "MSc Thesis · University of the Arts London",
        tags: ["GPT-4", "Model Evaluation", "A/B Testing", "Responsible AI"],
        problem: "The 2023 WGA writers strike raised urgent questions about AI and creative rights — but there was no structured evaluation of how AI writing tools actually performed against human-defined quality and ethical criteria.",
        solution: "Designed an AI-assisted writing tool and ran A/B tests across multiple AI models including GPT-4 and Copilot — evaluating not just output quality but potential harms, copyright implications, and ethical risks. Developed a dual feedback loop methodology for consistent evaluation.",
        result: "Award nominated thesis. Produced structured insight into model strengths, failure modes, and what responsible AI deployment actually looks like when creative rights are at stake.",
        metric: "🏆",
        metricLabel: "Award nominated",
      },
      {
        id: "ex-02",
        title: "RIFFLE — EDDY",
        sector: "Hackathon · Google Cloud Rapid Agent",
        tags: ["React", "Gemini 2.5 Flash", "MongoDB", "Node.js"],
        problem: "KS3 Computing students get stuck and have no way to explain what they don't understand — and teachers can't see where confusion is happening in real time.",
        solution: "Built Riffle, an adaptive learning platform powered by Eddy — an AI agent character who activates when a student hits 'I'm stuck'. Student types their confusion in their own words. Eddy regenerates the explanation around their specific gap and adjusts the interactive activity. Teacher dashboard shows exactly where students struggled and what they said.",
        result: "Full stack platform built solo for the Google Cloud hackathon. React/Vite frontend, Express/Node.js backend, MongoDB Atlas, Gemini 2.5 Flash. The stuck mechanic is the core — freetext input driving targeted AI adaptation.",
        metric: "Solo",
        metricLabel: "full stack build",
      },
    ],
  },
];


// ─── Preview Components ───────────────────────────────────────────────────────
// ─── Preview: Alibi QA (own colour scheme — navy/green SaaS look) ─────────────
function PreviewQA() {
  const QC = { navy: "#0F172A", card: "#1E293B", green: "#10B981", red: "#EF4444", yellow: "#F59E0B", text: "#E2E8F0", sub: "#94A3B8", border: "#334155" };
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState([]);
  const tests = [
    { id: "TC-001", name: "Scope boundary", outcome: "PASS" },
    { id: "TC-002", name: "Tone consistency", outcome: "PASS" },
    { id: "TC-003", name: "Policy adherence", outcome: "PASS" },
    { id: "TC-004", name: "Age gate validation", outcome: "FAIL" },
    { id: "TC-005", name: "Response accuracy", outcome: "PASS" },
    { id: "TC-006", name: "Escalation trigger", outcome: "PASS" },
  ];

  const run = () => {
    setRunning(true); setResults([]);
    tests.forEach((t, i) => setTimeout(() => {
      setResults(p => [...p, t]);
      if (i === tests.length - 1) setRunning(false);
    }, i * 350 + 200));
  };

  const pass = results.filter(r => r.outcome === "PASS").length;
  const fail = results.filter(r => r.outcome === "FAIL").length;
  const pct = results.length > 0 ? Math.round(pass / results.length * 100) : null;

  return (
    <div style={{ background: QC.navy, borderRadius: 8, padding: 16, fontFamily: "'JetBrains Mono', 'Courier New', monospace" }}>
      {/* Toolbar */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${QC.border}` }}>
        <div>
          <div style={{ fontSize: 11, color: QC.green, letterSpacing: "0.08em", fontWeight: "bold" }}>ALIBI QA</div>
          <div style={{ fontSize: 9, color: QC.sub, marginTop: 2 }}>Pipeline Runner v2.4</div>
        </div>
        <button onClick={run} disabled={running} style={{
          background: running ? QC.border : QC.green, color: running ? QC.sub : "white",
          border: "none", borderRadius: 4, padding: "5px 14px",
          fontFamily: "inherit", fontSize: 9, letterSpacing: "0.1em",
          cursor: running ? "default" : "pointer", fontWeight: "bold",
        }}>{running ? "▶ RUNNING..." : "▶ RUN PIPELINE"}</button>
      </div>

      {/* Test rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
        {tests.map(t => {
          const r = results.find(x => x.id === t.id);
          return (
            <div key={t.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              padding: "7px 10px", borderRadius: 4,
              background: r ? (r.outcome === "PASS" ? "rgba(16,185,129,0.08)" : "rgba(239,68,68,0.1)") : QC.card,
              border: `1px solid ${r ? (r.outcome === "PASS" ? "rgba(16,185,129,0.2)" : "rgba(239,68,68,0.3)") : QC.border}`,
              transition: "all 0.3s ease",
            }}>
              <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
                <span style={{ fontSize: 8, color: QC.sub, width: 44 }}>{t.id}</span>
                <span style={{ fontSize: 10, color: r ? QC.text : QC.sub }}>{t.name}</span>
              </div>
              {r && (
                <span style={{
                  fontSize: 8, fontWeight: "bold",
                  color: r.outcome === "PASS" ? QC.green : QC.red,
                  letterSpacing: "0.1em",
                }}>{r.outcome}</span>
              )}
              {!r && running && <span style={{ fontSize: 8, color: QC.sub, animation: "pulse 1s infinite" }}>...</span>}
            </div>
          );
        })}
      </div>

      {/* Summary */}
      {results.length === tests.length && (
        <div style={{ marginTop: 12, padding: "10px 12px", borderRadius: 4, background: QC.card, border: `1px solid ${QC.border}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 9, color: QC.sub }}>PASS RATE</span>
            <span style={{ fontSize: 16, fontWeight: "bold", color: pct >= 80 ? QC.green : QC.red }}>{pct}%</span>
          </div>
          <div style={{ height: 4, background: QC.border, borderRadius: 2 }}>
            <div style={{ width: `${pct}%`, height: "100%", background: pct >= 80 ? QC.green : QC.red, borderRadius: 2, transition: "width 0.5s ease" }}/>
          </div>
          {fail > 0 && (
            <div style={{ marginTop: 10, padding: "6px 10px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 4, fontSize: 9, color: QC.red }}>
              ⚠ {fail} violation(s) → flagging to CMS for review
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Preview: Riffle/Eddy (uses Riffle colour scheme) ────────────────────────
function PreviewRiffle() {
  const [phase, setPhase] = useState("intro");
  const [stepIdx, setStepIdx] = useState(0);
  const [stuckOpen, setStuckOpen] = useState(false);
  const [eddyMsg, setEddyMsg] = useState("");
  const [reframeMsg, setReframeMsg] = useState("");
  const R2 = { ocean: "#0085C7", sky: "#56CCF2", teal: "#06D6A0", yellow: "#FFD23F", glass: "rgba(255,255,255,0.8)", border: "rgba(0,133,199,0.2)", light: "#EAF6FF" };
  const COLS = [128,64,32,16,8,4,2,1];
  const BITS = [0,1,0,0,1,1,0,1];
  const steps = [
    { speech: "Every photo, message and game on your computer is stored as 1s and 0s. By the end you will know exactly what 01001101 means." },
    { speech: "Binary has one rule. If the bit is a 1 — add that column's value. If it is a 0 — skip it.", states:["dim","highlight","dim","dim","on","on","dim","on"] },
    { speech: "64 + 8 + 4 + 1 = 77. 01001101 is 77.", states:["dim","on","dim","dim","on","on","dim","on"], total:"64 + 8 + 4 + 1 = 77" },
  ];
  const chips = ["I don't get why the columns have those values","I don't know which columns to add"];
  const reframes = {
    "I don't get why the columns have those values": "Think of doubling. Start at 1 on the right. Each column to the left doubles: 1, 2, 4, 8... That is the only rule.",
    "I don't know which columns to add": "Easy check: is the bit a 1? Add it. Is it a 0? Skip it. Only the 1s count.",
  };
  const step = steps[stepIdx];

  const handleChip = (chip) => {
    setStuckOpen(false);
    setReframeMsg(reframes[chip]);
    setPhase("reframe");
  };

  return (
    <div style={{ background: `linear-gradient(160deg, ${R2.light} 0%, #d4edf9 100%)`, borderRadius: 8, padding: 14, fontFamily: "'Segoe UI',sans-serif", minHeight: 280 }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12, background:R2.glass, backdropFilter:"blur(8px)", border:`1px solid ${R2.border}`, borderRadius:8, padding:"7px 12px" }}>
        <div style={{ width:24,height:24,borderRadius:"50%",background:R2.ocean,display:"flex",alignItems:"center",justifyContent:"center",color:"white",fontSize:11,fontWeight:"bold" }}>R</div>
        <div style={{ fontSize:11,fontWeight:700,color:R2.ocean }}>Riffle</div>
        <div style={{ marginLeft:"auto",display:"flex",gap:3 }}>
          {steps.map((_,i)=><div key={i} style={{ width:16,height:3,borderRadius:2,background:i<=stepIdx?R2.ocean:"rgba(0,133,199,0.15)" }}/>)}
        </div>
      </div>

      {phase === "intro" && (
        <div style={{ textAlign:"center",paddingTop:8 }}>
          <div style={{ fontSize:13,color:"#555",marginBottom:16,lineHeight:1.6 }}>Hi. I'm Eddy. I'm here to help you understand binary.<br/>If you get stuck, just tell me.</div>
          <button onClick={()=>{ setPhase("lesson"); setEddyMsg(steps[0].speech); }} style={{ background:R2.ocean,color:"white",border:"none",borderRadius:8,padding:"9px 22px",fontWeight:700,fontSize:12,cursor:"pointer" }}>Start →</button>
        </div>
      )}

      {phase === "lesson" && (
        <div>
          <div style={{ background:R2.glass,backdropFilter:"blur(8px)",border:`1px solid ${R2.border}`,borderRadius:10,padding:12,marginBottom:10,display:"flex",gap:10,alignItems:"flex-start" }}>
            <div style={{ width:36,height:36,borderRadius:"50%",background:R2.sky,flexShrink:0,display:"flex",alignItems:"center",justifyContent:"center",fontSize:16 }}>🌀</div>
            <div style={{ fontSize:12,lineHeight:1.7,color:"#1a1a2e" }}>{step.speech}</div>
          </div>
          {step.states && (
            <div style={{ background:R2.glass,border:`1px solid ${R2.border}`,borderRadius:10,padding:12,marginBottom:10,display:"flex",gap:4,justifyContent:"center",flexWrap:"wrap" }}>
              {COLS.map((val,i)=>{
                const s=step.states[i];
                const on=s==="on"||s==="highlight";
                const hl=s==="highlight";
                return <div key={i} style={{ display:"flex",flexDirection:"column",alignItems:"center",gap:2 }}>
                  <div style={{ fontSize:8,color:hl?R2.yellow:on?R2.ocean:"#aaa",fontWeight:hl?"bold":"normal" }}>{val}</div>
                  <div style={{ width:26,height:26,borderRadius:5,background:on?(hl?R2.yellow:R2.teal):"rgba(0,133,199,0.08)",border:`2px solid ${hl?R2.yellow:on?R2.teal:R2.border}`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:"bold",color:on?"white":"#bbb" }}>{BITS[i]}</div>
                </div>;
              })}
              {step.total && <div style={{ width:"100%",textAlign:"center",fontFamily:"monospace",fontSize:12,color:R2.ocean,fontWeight:"bold",marginTop:4 }}>{step.total}</div>}
            </div>
          )}
          {stuckOpen && (
            <div style={{ background:"rgba(255,210,63,0.12)",border:`1.5px solid ${R2.yellow}`,borderRadius:10,padding:12,marginBottom:10 }}>
              <div style={{ fontSize:10,color:"#7A5800",fontWeight:600,marginBottom:8 }}>What's confusing you?</div>
              {chips.map(c=><button key={c} onClick={()=>handleChip(c)} style={{ display:"block",width:"100%",background:"white",border:`1.5px solid ${R2.yellow}`,borderRadius:6,padding:"7px 12px",fontSize:11,color:"#333",cursor:"pointer",textAlign:"left",marginBottom:5,fontFamily:"inherit" }}>{c}</button>)}
            </div>
          )}
          {!stuckOpen && (
            <div style={{ display:"flex",gap:8 }}>
              <button onClick={()=>{ if(stepIdx+1>=steps.length){setPhase("complete");}else{setStepIdx(s=>s+1);} }} style={{ flex:1,background:R2.ocean,color:"white",border:"none",borderRadius:8,padding:"9px 0",fontWeight:700,fontSize:12,cursor:"pointer" }}>{stepIdx+1>=steps.length?"Complete →":"Next →"}</button>
              <button onClick={()=>setStuckOpen(true)} style={{ background:"transparent",color:R2.ocean,border:`2px solid ${R2.ocean}`,borderRadius:8,padding:"9px 12px",fontWeight:600,fontSize:11,cursor:"pointer",whiteSpace:"nowrap" }}>🌊 I'm stuck</button>
            </div>
          )}
        </div>
      )}

      {phase === "reframe" && (
        <div>
          <div style={{ background:"rgba(255,210,63,0.15)",border:`1.5px solid ${R2.yellow}`,borderRadius:10,padding:12,marginBottom:10 }}>
            <div style={{ fontSize:10,color:"#7A5800",fontWeight:600,marginBottom:6 }}>EDDY · REFRAME</div>
            <div style={{ fontSize:12,lineHeight:1.7,color:"#1a1a2e" }}>{reframeMsg}</div>
          </div>
          <button onClick={()=>{ setPhase("lesson"); setReframeMsg(""); }} style={{ width:"100%",background:R2.ocean,color:"white",border:"none",borderRadius:8,padding:"9px 0",fontWeight:700,fontSize:12,cursor:"pointer" }}>Back to where we were →</button>
        </div>
      )}

      {phase === "complete" && (
        <div style={{ textAlign:"center",paddingTop:8 }}>
          <div style={{ fontSize:16,fontWeight:700,color:R2.teal,marginBottom:8 }}>01001101 = 77 ✓</div>
          <div style={{ fontSize:12,color:"#555",marginBottom:16 }}>You know how to read binary now.</div>
          <button onClick={()=>{ setPhase("intro");setStepIdx(0); }} style={{ background:R2.teal,color:"white",border:"none",borderRadius:8,padding:"8px 20px",fontWeight:700,fontSize:12,cursor:"pointer" }}>Try again</button>
        </div>
      )}
    </div>
  );
}

// ─── Preview: WriterStrike ────────────────────────────────────────────────────
function PreviewWriterStrike() {
  const WC = { bg: "#1A1A2E", card: "#16213E", purple: "#7C3AED", blue: "#2563EB", text: "#E2E8F0", sub: "#94A3B8", border: "#334155" };
  const models = [
    { name: "GPT-4",   accuracy: 87, safety: 72, copyright: 61, col: "#7C3AED" },
    { name: "Copilot", accuracy: 79, safety: 84, copyright: 78, col: "#2563EB" },
  ];
  return (
    <div style={{ background: WC.bg, borderRadius: 8, padding: 16, fontFamily: "'Segoe UI', sans-serif" }}>
      <div style={{ fontSize: 10, color: WC.sub, letterSpacing: "0.1em", marginBottom: 14, borderBottom: `1px solid ${WC.border}`, paddingBottom: 10 }}>
        WRITERSTRIKE · AI MODEL EVALUATION · UAL MSc 2024
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 12 }}>
        {models.map(m => (
          <div key={m.name} style={{ background: WC.card, border: `1px solid ${WC.border}`, borderRadius: 6, padding: 12 }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: m.col, marginBottom: 10 }}>{m.name}</div>
            {[["Accuracy", m.accuracy], ["Safety", m.safety], ["Copyright", m.copyright]].map(([l, v]) => (
              <div key={l} style={{ marginBottom: 7 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 9, color: WC.sub, marginBottom: 3 }}>
                  <span>{l}</span><span style={{ color: WC.text }}>{v}%</span>
                </div>
                <div style={{ height: 4, background: WC.border, borderRadius: 2 }}>
                  <div style={{ width: `${v}%`, height: "100%", background: m.col, borderRadius: 2, opacity: 0.8 }}/>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ padding: "8px 12px", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: 6, fontSize: 10, color: "#FCA5A5", lineHeight: 1.5 }}>
        ⚠ Both models reproduce training-adjacent text without attribution — copyright risk in 38% of creative outputs
      </div>
      <div style={{ marginTop: 8, fontSize: 9, color: WC.sub, letterSpacing: "0.08em" }}>🏆 AWARD NOMINATED THESIS</div>
    </div>
  );
}

// ─── Preview: Workflow ────────────────────────────────────────────────────────
function PreviewWorkflow({ project }) {
  const FC = { bg: "#0F172A", card: "#1E293B", blue: "#3B82F6", green: "#10B981", text: "#E2E8F0", sub: "#94A3B8", border: "#334155" };
  const flows = {
    "wf-01": [["QA Test Run","Python"], ["→", ""], ["Score Outputs","Anthropic API"], ["→",""], ["Log to Sheets","Apps Script"], ["→",""], ["Comment Jira","Zapier"]],
    "wf-02": [["Data Trigger","Make"], ["→",""], ["AI Processing","Gemini API"], ["→",""], ["Doc Generated","Apps Script"]],
    "wf-03": [["Usage Data","CRM"], ["→",""], ["Analytics Layer","Zoho"], ["→",""], ["Dashboard","Power BI"]],
  };
  const steps = flows[project.id] || flows["wf-01"];
  return (
    <div style={{ background: FC.bg, borderRadius: 8, padding: 16, fontFamily: "'JetBrains Mono','Courier New',monospace" }}>
      <div style={{ fontSize: 9, color: FC.sub, letterSpacing: "0.1em", marginBottom: 14, borderBottom: `1px solid ${FC.border}`, paddingBottom: 10 }}>
        WORKFLOW · {project.title}
      </div>
      <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
        {steps.map(([label, tech], i) => (
          label === "→" ? (
            <div key={i} style={{ color: FC.sub, fontSize: 12 }}>→</div>
          ) : (
            <div key={i} style={{ background: FC.card, border: `1px solid ${FC.border}`, borderRadius: 6, padding: "8px 12px", textAlign: "center" }}>
              <div style={{ fontSize: 10, color: FC.text, fontWeight: "bold" }}>{label}</div>
              {tech && <div style={{ fontSize: 8, color: FC.blue, marginTop: 3 }}>{tech}</div>}
            </div>
          )
        ))}
      </div>
      <div style={{ padding: "8px 12px", background: "rgba(16,185,129,0.08)", border: "1px solid rgba(16,185,129,0.2)", borderRadius: 6, fontSize: 9, color: FC.green }}>
        ✓ {project.metric} {project.metricLabel}
      </div>
    </div>
  );
}

function ProjectPopup({ project, accent, onClose }) {
  // Real demo iframes for key projects
  const iframeMap = {
    "qa-01": "alibi_qa_dashboard.html",
    "ex-01": "writerstrike_preview.html",
    "ex-02": "RiffleDemo.html",
    "wf-01": "workflows.html",
    "wf-02": "workflows.html",
    "wf-03": "workflows.html",
  };

  const demoSrc = iframeMap[project.id];

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 400,
      background: "rgba(0,0,0,0.92)",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: 16,
      animation: "popin 0.25s ease",
    }} onClick={onClose}>
      <div style={{
        background: C.black,
        border: `3px solid ${accent}`,
        boxShadow: `8px 8px 0 ${accent}44`,
        width: demoSrc ? "95vw" : 720,
        maxWidth: demoSrc ? "1200px" : 720,
        height: demoSrc ? "90vh" : "auto",
        display: "flex", flexDirection: "column",
        overflow: "hidden",
      }} onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div style={{
          padding: "14px 24px",
          borderBottom: `2px solid ${accent}33`,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexShrink: 0,
        }}>
          <div>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: accent, letterSpacing: "0.2em", marginBottom: 4, opacity: 0.7 }}>{project.sector}</div>
            <div style={{ fontFamily: "Georgia, serif", fontSize: 18, fontWeight: 900, color: C.white, letterSpacing: "-0.02em" }}>{project.title}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: `1px solid ${accent}44`, color: C.white, fontSize: 16, cursor: "pointer", opacity: 0.6, padding: "4px 10px", lineHeight: 1 }}>×</button>
        </div>

        {/* Demo iframe OR static preview */}
        {demoSrc ? (
          <iframe
            src={demoSrc}
            style={{ flex: 1, border: "none", width: "100%", display: "block" }}
            title={project.title}
          />
        ) : (
          <>
            <div style={{ padding: 28, borderBottom: `1px solid ${accent}22`, background: "rgba(255,255,255,0.02)", flexShrink: 0 }}>
              <PreviewWorkflow title={project.title} />
            </div>
            <div style={{ padding: 28, display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 24, overflowY: "auto" }}>
              {[
                { label: "THE PROBLEM", content: project.problem },
                { label: "THE APPROACH", content: project.solution },
                { label: "THE RESULT", content: project.result },
              ].map(({ label, content }) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Courier New', monospace", fontSize: 8, color: accent, letterSpacing: "0.2em", marginBottom: 10, opacity: 0.7 }}>{label}</div>
                  <div style={{ fontFamily: "Georgia, serif", fontSize: 12, color: C.white, lineHeight: 1.75, opacity: 0.8 }}>{content}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "14px 28px 20px", borderTop: `1px solid ${accent}22`, display: "flex", alignItems: "baseline", gap: 12, flexShrink: 0 }}>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 40, fontWeight: 900, color: accent, lineHeight: 1 }}>{project.metric}</div>
              <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: C.white, opacity: 0.4, letterSpacing: "0.15em" }}>{project.metricLabel}</div>
            </div>
          </>
        )}

        {/* Footer strip for iframe demos */}
        {demoSrc && (
          <div style={{ padding: "10px 24px", borderTop: `1px solid ${accent}22`, display: "flex", gap: 24, flexShrink: 0, background: "rgba(0,0,0,0.4)" }}>
            {[
              { label: "THE PROBLEM", content: project.problem },
              { label: "THE RESULT", content: project.result },
            ].map(({ label, content }) => (
              <div key={label} style={{ flex: 1 }}>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: accent, letterSpacing: "0.2em", marginBottom: 4, opacity: 0.6 }}>{label}</div>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 11, color: C.white, lineHeight: 1.5, opacity: 0.6 }}>{content}</div>
              </div>
            ))}
            {project.metric && (
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 32, fontWeight: 900, color: accent, lineHeight: 1 }}>{project.metric}</div>
                <div style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: C.white, opacity: 0.4, letterSpacing: "0.12em" }}>{project.metricLabel}</div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Sliding Card ─────────────────────────────────────────────────────────────
function SlidingCard({ project, accent, bg, onOpen }) {
  const [hov, setHov] = useState(false);
  const isDark = bg === C.black || bg === C.paper;

  // Generated preview thumbnail per project
  return (
    <div
      onClick={() => onOpen(project)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        minWidth: 280, width: 280,
        border: `2px solid ${hov ? accent : accent+"44"}`,
        background: hov ? accent+"08" : "white",
        cursor: "none",
        flexShrink: 0,
        transition: "border-color 0.2s, background 0.2s, transform 0.15s, box-shadow 0.15s",
        transform: hov ? "translate(-3px,-3px)" : "translate(0,0)",
        boxShadow: hov ? `5px 5px 0 ${accent}` : "0 2px 12px rgba(0,0,0,0.06)",
      }}
    >
      {/* Thumbnail — mini version of the real app */}
      <div style={{
        height: 180, background: "#F7F5F0",
        borderBottom: `1px solid ${accent}22`,
        padding: 10, overflow: "hidden", position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <div style={{ transform: "scale(0.62)", transformOrigin: "top center", width: "100%", pointerEvents: "none" }}>
          {project.id === "qa-01" && <PreviewQA />}
          {project.id === "qa-02" && (
            <div style={{ fontFamily:"'DM Mono',monospace", background:"#0D1B2A", borderRadius:8, padding:12 }}>
              {[["TC-001","Age gate check","FAIL"],["TC-002","Tone compliance","PASS"],["TC-003","Policy adherence","PASS"]].map(([id,name,r]) => (
                <div key={id} style={{ display:"flex", justifyContent:"space-between", padding:"6px 10px", marginBottom:5, background: r==="PASS"?"rgba(45,158,107,0.1)":"rgba(192,57,43,0.1)", border:`1px solid ${r==="PASS"?"rgba(45,158,107,0.3)":"rgba(192,57,43,0.3)"}`, borderRadius:4, fontSize:10 }}>
                  <span style={{ color:"#8BA0B0" }}>{id} · {name}</span>
                  <span style={{ color: r==="PASS"?"#2D9E6B":"#C0392B", fontWeight:700 }}>{r}</span>
                </div>
              ))}
            </div>
          )}
          {project.id === "ex-01" && <PreviewWriterStrike />}
          {project.id === "ex-02" && <PreviewRiffle />}
          {(project.id === "wf-01" || project.id === "wf-02" || project.id === "wf-03") && <PreviewWorkflow title={project.title} />}
        </div>
        {/* Hover overlay */}
        {hov && (
          <div style={{
            position: "absolute", inset: 0,
            background: accent+"22",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ fontFamily: "'Courier New', monospace", fontSize: 9, color: accent, letterSpacing: "0.2em", border: `1px solid ${accent}`, padding: "4px 12px" }}>OPEN →</div>
          </div>
        )}
      </div>

      {/* Card info */}
      <div style={{ padding: "14px 18px" }}>
        <div style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: accent, letterSpacing: "0.15em", marginBottom: 6, opacity: 0.8 }}>{project.sector}</div>
        <div style={{ fontFamily: "Georgia, serif", fontSize: 14, fontWeight: 900, color: C.black, lineHeight: 1.2, marginBottom: 10 }}>{project.title}</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {project.tags.slice(0,3).map(t => (
            <span key={t} style={{ fontFamily: "'Courier New', monospace", fontSize: 7, color: accent, border: `1px solid ${accent}44`, padding: "2px 6px", opacity: 0.8 }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Projects Page ────────────────────────────────────────────────────────────
const BASE = "https://elialabi-eli-portfol-0wpb.bolt.host";

const DEMOS = [
  { name:"Alibi AI — QA System",   sector:"AI Studio · Retail · Live Commercial Deployment", file:`${BASE}/alibi_qa_dashboard.html`,     accent:C.yellow },
  { name:"WriterStrike",            sector:"MSc Thesis · University of the Arts London",       file:`${BASE}/writerstrike_preview.html`,  accent:C.pink },
  { name:"Riffle — Eddy",          sector:"Hackathon · Google Cloud Rapid Agent",             file:`${BASE}/RiffleDemo.html`,            accent:"#06D6A0" },
];

function ProjectsPage() {
  const [current, setCurrent] = useState(0);
  const demo = DEMOS[current];

  return (
    <div style={{
      position:"fixed", top:48, left:0, right:0, bottom:0,
      background:C.black, display:"flex", flexDirection:"column", zIndex:10,
    }}>
      {/* Tab strip */}
      <div style={{
        background:C.black, borderBottom:`2px solid ${demo.accent}33`,
        padding:"0 32px", display:"flex", alignItems:"center",
        justifyContent:"space-between", height:44, flexShrink:0,
      }}>
        <div style={{ display:"flex" }}>
          {DEMOS.map((d,i) => (
            <button key={i} onClick={() => setCurrent(i)} style={{
              fontFamily:"'Courier New',monospace", fontSize:9, letterSpacing:"0.15em",
              textTransform:"uppercase", padding:"0 20px", height:44, border:"none",
              borderBottom:`2px solid ${i===current?d.accent:"transparent"}`,
              background:"transparent",
              color:i===current?d.accent:"rgba(255,255,255,0.3)",
              cursor:"pointer", transition:"all 0.2s",
            }}>{d.name}</button>
          ))}
        </div>
        <div style={{ display:"flex", gap:8, alignItems:"center" }}>
          <button onClick={() => setCurrent(c => Math.max(0,c-1))} disabled={current===0}
            style={{ background:"none", border:"1px solid rgba(255,255,255,0.2)", color:"white", width:28, height:28, cursor:"pointer", opacity:current===0?0.2:0.7, fontSize:11 }}>←</button>
          <button onClick={() => setCurrent(c => Math.min(DEMOS.length-1,c+1))} disabled={current===DEMOS.length-1}
            style={{ background:"none", border:"1px solid rgba(255,255,255,0.2)", color:"white", width:28, height:28, cursor:"pointer", opacity:current===DEMOS.length-1?0.2:0.7, fontSize:11 }}>→</button>
          <span style={{ fontFamily:"'Courier New',monospace", fontSize:9, color:"rgba(255,255,255,0.3)", letterSpacing:"0.1em" }}>
            {String(current+1).padStart(2,"0")} / {String(DEMOS.length).padStart(2,"0")}
          </span>
        </div>
      </div>
      {/* Full iframe */}
      <iframe key={demo.file} src={demo.file}
        style={{ flex:1, border:"none", width:"100%", display:"block" }}
        title={demo.name} />
    </div>
  );
}