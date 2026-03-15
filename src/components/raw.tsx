// import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
// import { 
//   ArrowRight, Server, Cloud, TrendingUp, Code, Database, 
//   Terminal, Activity, Globe, Cpu, Layers, Zap, Lock, Lightbulb, Briefcase, Smartphone,
//   MoveRight, User, CheckCircle, X, Sun, Moon, Hash, ScanLine, Box, Disc, LayoutTemplate, Monitor
// } from 'lucide-react';
// import { MemoryRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// /* --- CONTEXT & STATE MANAGEMENT --- */
// const AppContext = createContext();

// export const useApp = () => useContext(AppContext);

// const AppProvider = ({ children }) => {
//   const [isDarkMode, setIsDarkMode] = useState(true);
//   const [isReplayedIntro, setIsReplayedIntro] = useState(false);

//   useEffect(() => {
//     if (isDarkMode) {
//       document.documentElement.classList.add('dark');
//       document.documentElement.setAttribute('data-theme', 'dark');
//     } else {
//       document.documentElement.classList.remove('dark');
//       document.documentElement.setAttribute('data-theme', 'light');
//     }
//   }, [isDarkMode]);

//   const toggleTheme = () => setIsDarkMode(prev => !prev);

//   return (
//     <AppContext.Provider value={{ isDarkMode, toggleTheme, isReplayedIntro, setIsReplayedIntro }}>
//       {children}
//     </AppContext.Provider>
//   );
// };

// /* --- UTILS & HOOKS --- */
// const useScrollProgress = () => {
//   const [scrollY, setScrollY] = useState(0);
//   const [vh, setVh] = useState(typeof window !== 'undefined' ? window.innerHeight : 0);

//   useEffect(() => {
//     const handleScroll = () => setScrollY(window.scrollY);
//     const handleResize = () => setVh(window.innerHeight);
//     setVh(window.innerHeight);
//     window.addEventListener('scroll', handleScroll);
//     window.addEventListener('resize', handleResize);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return { scrollY, vh };
// };

// const useInView = (threshold = 0.2) => {
//   const ref = useRef(null);
//   const [isInView, setIsInView] = useState(false);

//   useEffect(() => {
//     const node = ref.current;
//     if (!node) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setIsInView(entry.isIntersecting);
//       },
//       { threshold }
//     );

//     observer.observe(node);
//     return () => observer.disconnect();
//   }, [threshold]);

//   return [ref, isInView];
// };

// const useScramble = (text, active) => {
//   const [display, setDisplay] = useState(text);
//   const chars = "!<>-_\\/[]{}—=+*^?#________";
  
//   useEffect(() => {
//     if (!active) {
//         setDisplay(text); 
//         return;
//     }
//     let iteration = 0;
//     const interval = setInterval(() => {
//       setDisplay(
//         text.split("").map((letter, index) => {
//             if (index < iteration) return text[index];
//             return chars[Math.floor(Math.random() * chars.length)];
//           }).join("")
//       );
//       if (iteration >= text.length) clearInterval(interval);
//       iteration += 1 / 3;
//     }, 30);
//     return () => clearInterval(interval);
//   }, [active, text]);
  
//   return display;
// };

// const useTilt = (ref) => {
//   const [transform, setTransform] = useState("");
//   useEffect(() => {
//     const el = ref.current;
//     if (!el) return;
//     const handleMove = (e) => {
//       const rect = el.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       const xPct = x / rect.width;
//       const yPct = y / rect.height;
//       const xRot = (yPct - 0.5) * 20; 
//       const yRot = (xPct - 0.5) * -20; 
//       setTransform(`perspective(1000px) rotateX(${xRot}deg) rotateY(${yRot}deg) scale(1.02)`);
//     };
//     const handleLeave = () => setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)");
//     el.addEventListener("mousemove", handleMove);
//     el.addEventListener("mouseleave", handleLeave);
//     return () => {
//       el.removeEventListener("mousemove", handleMove);
//       el.removeEventListener("mouseleave", handleLeave);
//     };
//   }, []);
//   return transform;
// };

// function getCubicBezierPoint(t, p0, p1, p2, p3) {
//   const u = 1 - t;
//   const tt = t * t;
//   const uu = u * u;
//   const uuu = uu * u;
//   const ttt = tt * t;
//   let x = uuu * p0.x + 3 * uu * t * p1.x + 3 * u * tt * p2.x + ttt * p3.x;
//   let y = uuu * p0.y + 3 * uu * t * p1.y + 3 * u * tt * p2.y + ttt * p3.y;
//   return { x, y };
// }

// /* --- COMPONENTS --- */

// // 1. Sudden Lines
// const SuddenLines = ({ scrollY, vh }) => {
//   const { isDarkMode } = useApp();
//   const lines = [
//     { start: 1.2, end: 2.2, path: "M 0 30 L 100 30", color: isDarkMode ? "#222" : "#ddd" },
//     { start: 2.8, end: 4.0, path: "M 50 0 L 50 100", color: isDarkMode ? "#222" : "#ddd" },
//     { start: 4.5, end: 6.0, path: "M 0 80 Q 50 20 100 80", color: isDarkMode ? "#333" : "#ccc" },
//   ];
//   return (
//     <div className="fixed inset-0 pointer-events-none z-0">
//       <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
//         {lines.map((line, i) => {
//           const startPx = line.start * vh;
//           const endPx = line.end * vh;
//           const progress = vh > 0 ? Math.max(0, Math.min(1, (scrollY - startPx) / (endPx - startPx))) : 0;
//           const active = scrollY > startPx && scrollY < endPx;
//           if (!active && progress === 0) return null;
//           return (
//             <path key={i} d={line.path} fill="none" stroke={line.color} strokeWidth="0.1" vectorEffect="non-scaling-stroke" strokeDasharray="100" strokeDashoffset={100 - (progress * 100)} style={{ opacity: active ? 1 : 0 }} />
//           );
//         })}
//       </svg>
//     </div>
//   );
// };

// // 2. Hero Section
// const HeroSection = ({ scrollY, vh }) => {
//   const opacity = vh > 0 ? Math.max(0, 1 - scrollY / (vh * 0.9)) : 1;
//   const scale = 1 + (scrollY * 0.0005);
//   return (
//     <section className="h-screen w-full flex flex-col items-center justify-center relative z-30 bg-[var(--bg-main)]">
//       <div className="absolute inset-0 pointer-events-none">
//         <span className="hero-corner hero-corner--tl" />
//         <span className="hero-corner hero-corner--tr" />
//         <span className="hero-corner hero-corner--bl" />
//         <span className="hero-corner hero-corner--br" />
//       </div>
//       <div style={{ opacity, transform: `scale(${scale})` }} className="text-center px-6 relative z-10">
//         <div className="font-mono text-xs md:text-sm text-[var(--text-dim)] mb-8 tracking-[0.5em] uppercase border-b border-[var(--text-dim)] pb-4 inline-block welcome-item welcome-delay-1">Portfolio 2026</div>
//         <h1 className="text-[12vw] md:text-[15vw] font-poster font-bold tracking-tight leading-none text-[var(--text-primary)] mix-blend-difference select-none welcome-item welcome-delay-2">WELCOME</h1>
//         <div className="flex justify-center items-center gap-4 mt-4 welcome-item welcome-delay-3">
//            <span className="h-px w-12 bg-[#333]"></span>
//            <h2 className="text-xl md:text-3xl font-serif italic font-light text-[var(--text-secondary)]">Nikolas • Student & Developer</h2>
//            <span className="h-px w-12 bg-[#333]"></span>
//         </div>
//       </div>
//       <div style={{ opacity }} className="absolute bottom-12 flex flex-col items-center gap-3 animate-bounce welcome-item welcome-delay-4">
//         <div className="w-px h-8 bg-gradient-to-b from-[var(--text-dim)] to-transparent"></div>
//         <span className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-dim)]">Dive In</span>
//       </div>
//     </section>
//   );
// };

// // 3. Holographic Intro (Who Am I) - FULL SECTION STICKY
// const IntroSection = ({ scrollY, vh }) => {
//   const [ref, active] = useInView(0.3);
//   const cardRef = useRef(null);
//   const cardTransform = useTilt(cardRef);

//   const PROFILE_IMG = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop"; 

//   const displayTransform = cardTransform || 'perspective(1000px) rotateX(4deg) rotateY(-4deg) rotateZ(1deg)';

//   return (
//     // Sticky Top 0, Z-0 so next sections (Z-10) cover it
//     <section ref={ref} className="sticky top-0 h-screen z-0 bg-[var(--bg-main)] flex items-center justify-center overflow-hidden">
//       <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center gap-16 md:gap-32">
        
//         {/* Left: Image Card */}
//         <div 
//             className={`flex-1 perspective-container transition-opacity duration-1000 ease-out ${active ? 'opacity-100' : 'opacity-0'}`}
//         >
//            <div 
//              ref={cardRef} 
//              className="w-[300px] h-[450px] md:w-[400px] md:h-[600px] bg-[var(--bg-panel)] border border-[var(--border)] relative group overflow-hidden transition-transform duration-300 ease-out" 
//              style={{ 
//                  transform: displayTransform, 
//                  boxShadow: '0 20px 50px rgba(0,0,0,0.2)' 
//              }}
//            >
//               <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none z-10"></div>
              
//               <img 
//                 src={PROFILE_IMG} 
//                 alt="Profile" 
//                 className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500 grayscale group-hover:grayscale-0"
//               />
              
//               <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-[var(--text-primary)] z-20"></div>
//               <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-[var(--text-primary)] z-20"></div>
//               <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-[var(--text-primary)] z-20"></div>
//               <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-[var(--text-primary)] z-20"></div>
              
//               <div className="absolute bottom-8 left-0 w-full text-center z-20 pointer-events-none">
//                  <div className="inline-block bg-[var(--bg-main)] border border-[var(--text-primary)] px-4 py-1">
//                     <span className="font-mono text-xs tracking-widest text-[var(--text-primary)]">NIKOLAS // DEV</span>
//                  </div>
//               </div>
//            </div>
//         </div>
        
//         {/* Right: Text Content */}
//         <div className={`flex-1 transition-all duration-1000 delay-300 ease-out transform ${active ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}>
//            <h2 className="text-5xl md:text-7xl font-poster text-[var(--text-primary)] mb-8 leading-[0.9]">WHO <br/><span className="text-[var(--text-dim)]">AM I?</span></h2>
//            <p className="font-serif italic text-2xl text-[var(--text-secondary)] leading-relaxed mb-8 border-l-4 border-[var(--accent)] pl-6">"A digital craftsman blending business logic with architectural precision."</p>
//            <div className="font-mono text-sm text-[var(--text-dim)] leading-loose max-w-md">
//              <p className="mb-6">Als Student der Wirtschaftsinformatik verstehe ich beide Welten: Die strategische Notwendigkeit und die technische Exzellenz.</p>
//              <p className="mb-6">Mein Ziel: Praxissemester 2026. <br/>Mein Werkzeug: Moderner Code & klare Kommunikation.</p>
//              <p>Ich baue nicht nur Software, ich schaffe digitale Erlebnisse, die funktionieren und begeistern.</p>
//            </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // 4. Reveal Text (Bridge) - COVERS INTRO
// const BridgeSection = ({ scrollY, vh }) => {
//   const [ref, active] = useInView(0.4);

//   const words = "I bridge the gap between abstract business requirements and concrete software architecture.".split(" ");

//   return (
//     // Z-10 to slide OVER the sticky IntroSection (z-0)
//     <section ref={ref} className="min-h-[60vh] flex items-center justify-center relative z-10 bg-[var(--bg-main)] py-24 border-t border-[var(--border)]">
//       <div className={`max-w-5xl px-8 text-center ${active ? 'reveal-active' : ''} reveal-text`}>
//         <h2 className="text-3xl md:text-6xl font-light leading-tight">
//           {words.map((word, i) => (
//             <span key={i} style={{ transitionDelay: `${i * 30}ms` }} className="mr-3 inline-block">
//               {word === "business" || word === "software" ? <b className="font-serif italic text-[var(--text-primary)] border-b border-[var(--accent)]">{word}</b> : <span className="text-[var(--text-dim)]">{word}</span>}
//             </span>
//           ))}
//         </h2>
//       </div>
//     </section>
//   );
// };

// // 5. Posters / Passions
// const PosterCard = ({ title, icon: Icon, desc, index, isDarkMode }) => {
//   const isWhiteBackground = index % 2 === 0;
//   const isModeWhite = isWhiteBackground ? !isDarkMode : isDarkMode;
//   const bgClass = isModeWhite ? 'bg-white text-black' : 'bg-black text-white';
//   const borderColor = isModeWhite ? 'border-black' : 'border-white';
//   const textColor = isModeWhite ? 'text-black' : 'text-white';
  
//   return (
//     <div className={`
//       w-[320px] md:w-[450px] h-[520px] shrink-0 mx-6 flex flex-col justify-between p-10 border
//       ${bgClass} ${borderColor}
//       relative overflow-hidden group
//     `}>
//       <div className={`absolute inset-0 opacity-5 ${isModeWhite ? 'bg-grid-pattern-dark' : 'bg-grid-pattern'}`}></div>
//       <div className={`absolute top-10 right-10 w-12 h-12 border-t border-r ${borderColor} opacity-50`}></div>
//       <div className={`absolute bottom-10 left-10 w-12 h-12 border-b border-l ${borderColor} opacity-50`}></div>
//       <div className="flex justify-between items-start relative z-10">
//         <div className={`p-4 border ${borderColor} rounded-full ${textColor}`}>
//            <Icon size={32} strokeWidth={1} />
//         </div>
//         <span className={`font-mono text-xs tracking-widest uppercase border ${borderColor} px-2 py-1 rounded ${textColor}`}>0{index % 4 + 1} // DRIVER</span>
//       </div>
//       <div className="relative z-10">
//         <h3 className={`font-poster text-6xl uppercase leading-[0.85] mb-6 tracking-tight ${textColor}`}>{title}</h3>
//         <div className={`h-px w-12 ${borderColor} mb-6`}></div>
//         <p className={`font-mono text-xs md:text-sm leading-relaxed ${isModeWhite ? 'opacity-70' : 'opacity-60'}`}>{desc}</p>
//       </div>
//     </div>
//   );
// };

// const PassionsMarqueeSection = () => {
//   const { isDarkMode } = useApp();
//   const drivers = [
//     { title: "Tech", icon: Cpu, desc: "Technologie als Werkzeug. Immer am Puls der Zeit, aber nie dem Hype verfallen." },
//     { title: "Solve", icon: Lightbulb, desc: "Komplexe Herausforderungen verlangen nach eleganten Lösungen. Ich liefere sie." },
//     { title: "Business", icon: Briefcase, desc: "Verständnis für Märkte und Prozesse. Code muss Wert schaffen." },
//     { title: "Growth", icon: TrendingUp, desc: "Stillstand ist Rückschritt. Ich suche Herausforderungen." },
//   ];
//   return (
//     <section className="py-32 bg-[var(--bg-main)] overflow-hidden relative z-10">
//       <div className="mb-20 px-8 flex flex-col items-center justify-center max-w-7xl mx-auto text-center">
//         <h2 className="text-5xl md:text-8xl font-poster text-[var(--text-primary)] mb-4 uppercase tracking-tight">My Passion</h2>
//         <span className="font-mono text-xs text-[var(--text-dim)] tracking-[0.5em] uppercase border border-[var(--text-dim)] px-4 py-2 rounded-full">Core Drivers & Philosophy</span>
//       </div>
//       <div className="flex flex-col gap-16">
//         <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
//           {[...drivers, ...drivers].map((d, i) => <PosterCard key={`r1-${i}`} {...d} index={i} isDarkMode={isDarkMode} />)}
//         </div>
//         <div className="flex w-max animate-marquee-reverse hover:[animation-play-state:paused] translate-x-[-100px]">
//           {[...drivers, ...drivers].reverse().map((d, i) => <PosterCard key={`r2-${i}`} {...d} index={i + 4} isDarkMode={isDarkMode} />)}
//         </div>
//       </div>
//     </section>
//   );
// };

// // 6. PROFESSIONAL POSTER CARD DESIGN

// const PosterProjectCard = ({ project, index, isVisible, shouldAnimate }) => {
//   let animationClass = '';
//   if (!isVisible) {
//     animationClass = ''; // Default .project-card has hidden state
//   } else if (shouldAnimate) {
//     animationClass = 'project-card--visible';
//   } else {
//     animationClass = 'project-card--static';
//   }

//   return (
//     <div
//      className={`project-card w-[85vw] md:w-[60vw] h-[85vh] md:h-[90vh] shrink-0 relative group cursor-pointer mr-8 md:mr-24 last:mr-0 perspective-container ${animationClass}`}
//      style={{ transitionDelay: (isVisible && shouldAnimate) ? `${index * 150}ms` : '0ms' }} 
//     >
//      <div className="w-full h-full bg-[var(--bg-panel)] border border-[var(--text-primary)] relative overflow-hidden flex flex-col transition-all duration-500 group-hover:bg-[var(--text-primary)] group-hover:text-[var(--bg-main)]">
       
//        <div className="absolute -right-8 -bottom-16 text-[15rem] md:text-[22rem] font-poster leading-none text-[var(--text-primary)] opacity-5 group-hover:opacity-10 pointer-events-none select-none z-0 group-hover:text-[var(--bg-main)] transition-colors">
//           0{index + 1}
//        </div>
       
//        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
//           <div className="absolute top-[20%] left-0 w-full h-px bg-current"></div>
//           <div className="absolute top-0 left-[30%] w-px h-full bg-current"></div>
//           <div className="absolute top-[20%] left-[70%] w-px h-[80%] bg-current"></div>
//        </div>

//        <div className="h-[20%] flex-none flex relative z-10 font-mono text-xs uppercase tracking-widest border-b border-[var(--text-primary)] group-hover:border-[var(--bg-main)]">
//          <div className="w-[30%] border-r border-[var(--text-primary)] group-hover:border-[var(--bg-main)] p-4 md:p-6 flex flex-col justify-between">
//            <span className="opacity-70">CASE 0{index + 1}</span>
//            <span className="text-xl font-bold">{project.year}</span>
//          </div>
//          <div className="flex-grow p-4 md:p-6 flex flex-col justify-between">
//            <div className="flex justify-between items-start">
//               <span className="opacity-70">Role & Context</span>
//               <div className="w-2 h-2 rounded-full bg-current"></div>
//            </div>
//            <span className="font-bold text-lg leading-tight">{project.role} // {project.context}</span>
//          </div>
//        </div>

//        <div className="flex-grow flex relative z-10 overflow-hidden">
//          <div className="w-[30%] border-r border-[var(--text-primary)] group-hover:border-[var(--bg-main)] p-4 md:p-6 flex flex-col justify-between py-8">
//             <div className="flex flex-col gap-2">
//               <span className="font-mono text-[10px] uppercase opacity-60">Focus</span>
//               <span className="font-serif italic text-base md:text-lg leading-tight">{project.focus}</span>
//             </div>
//             <div className="flex flex-col gap-2">
//                <span className="font-mono text-[10px] uppercase opacity-60">Stack</span>
//                <div className="flex flex-col gap-1.5">
//                  {project.tags.slice(0, 3).map(tag => (
//                    <span key={tag} className="text-[10px] md:text-xs font-bold border border-current px-2 py-1 w-max">{tag}</span>
//                  ))}
//                </div>
//             </div>
//          </div>

//          <div className="w-[70%] p-6 md:p-10 flex flex-col justify-between h-full">
//             <div className="flex justify-end mb-4">
//                <div className="w-12 h-12 md:w-16 md:h-16 border-2 border-current rounded-full flex items-center justify-center rotate-12 group-hover:rotate-0 transition-transform duration-500">
//                  {project.icon}
//                </div>
//             </div>
//             <div className="flex flex-col justify-end">
//                <h3 className="text-4xl md:text-6xl lg:text-7xl font-poster uppercase leading-[0.9] tracking-tight break-words mb-4 md:mb-6">
//                  {project.title.split(' ').map((word, i) => <div key={i}>{word}</div>)}
//                </h3>
//                <p className="font-serif text-sm md:text-base leading-relaxed opacity-90 border-l-2 border-current pl-4 line-clamp-3 md:line-clamp-none">
//                  {project.desc}
//                </p>
//             </div>
//          </div>
//        </div>

//        <div className="h-10 flex-none border-t border-[var(--text-primary)] group-hover:border-[var(--bg-main)] flex items-center px-6 font-mono text-[10px] uppercase justify-between relative z-10 bg-[var(--bg-panel)] group-hover:bg-[var(--text-primary)] transition-colors">
//           <div className="flex gap-4 overflow-hidden whitespace-nowrap">
//              <span className="opacity-70">Deliverables:</span>
//              <span className="font-bold truncate max-w-[150px] md:max-w-none">{project.deliverables}</span>
//           </div>
//           <div className="flex gap-2 items-center group-hover:underline shrink-0 pl-4">
//              <span>View Details</span>
//              <ArrowRight size={12} />
//           </div>
//        </div>
//      </div>
//     </div>
//   );
// };

// // --- REST OF COMPONENTS ---

// const DynamicProjectTitle = ({ text, active, progress }) => {
//   const [visibleChars, setVisibleChars] = useState(0);

//   useEffect(() => {
//     if (!active) {
//       setVisibleChars(0);
//       return;
//     }
//     const timeout = setTimeout(() => {
//       const interval = setInterval(() => {
//         setVisibleChars(prev => {
//           if (prev >= text.length) {
//             clearInterval(interval);
//             return prev;
//           }
//           return prev + 1;
//         });
//       }, 40); 
//       return () => clearInterval(interval);
//     }, 500); 
//     return () => clearTimeout(timeout);
//   }, [active, text]);

//   const words = text.split(" ");
  
//   return (
//     <div className="relative z-10 flex flex-col md:block">
//       {words.map((word, wIndex) => {
//         const xOffset = wIndex === 0 ? progress * -40 : progress * 40;
//         const yOffset = wIndex === 0 ? progress * -20 : progress * 20;

//         return (
//           <span 
//             key={wIndex} 
//             className={`inline-block mr-4 md:mr-8 will-change-transform ${wIndex === 1 ? 'mt-[-0.2em] md:mt-0' : ''}`}
//             style={{
//               transform: `translate(${xOffset}px, ${yOffset}px)`,
//               transition: 'transform 0.1s linear'
//             }}
//           >
//             {word.split("").map((char, cIndex) => {
//               const previousChars = words.slice(0, wIndex).join("").length + wIndex; 
//               const globalIndex = previousChars + cIndex;
//               const isVisible = globalIndex < visibleChars;
//               const isFirstWord = wIndex === 0;
              
//               return (
//                 <span 
//                   key={cIndex}
//                   className={`inline-block transition-opacity duration-100 
//                     ${isVisible ? 'opacity-100' : 'opacity-0'}
//                     ${isFirstWord ? 'font-poster' : 'font-serif italic'}
//                   `}
//                   style={{
//                     color: isFirstWord ? '#ffffff' : 'transparent', 
//                     WebkitTextStroke: !isFirstWord ? '1px #ffffff' : undefined,
//                   }}
//                 >
//                   {char}
//                 </span>
//               );
//             })}
//           </span>
//         );
//       })}
//     </div>
//   );
// };

// // 7. NEW SCROLL-BASED INTERLUDE WITH ROTATING FRAMES (SQUARES)

// const InterludeSection = ({ scrollY, vh }) => {
//   const containerRef = useRef(null);
//   const [active, setActive] = useState(false);
//   const [progress, setProgress] = useState(0);

//   // Height of the scrollable area for animation
//   const sectionHeight = vh * 3; 

//   useEffect(() => {
//     if (!containerRef.current) return;
//     const start = containerRef.current.offsetTop;
//     const end = start + sectionHeight - vh;
    
//     // Prevent division by zero
//     const dist = sectionHeight - vh;
//     const safeDist = dist > 0 ? dist : 1;
    
//     const handleScroll = () => {
//       const currentScroll = window.scrollY;
      
//       // Calculate progress (0 to 1) within the section
//       if (currentScroll >= start && currentScroll <= end) {
//         setActive(true);
//         const p = (currentScroll - start) / safeDist;
//         setProgress(Math.max(0, Math.min(1, p)));
//       } else if (currentScroll < start) {
//         setActive(false);
//         setProgress(0);
//       } else {
//         setActive(true);
//         setProgress(1);
//       }
//     };

//     window.addEventListener('scroll', handleScroll);
//     handleScroll(); // Init
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, [scrollY, vh, sectionHeight]);

//   // Animation values based on progress
//   // ROTATING Tunnel Frames (SQUARES)
//   const t1 = progress;
//   const scale1 = 1 + t1 * 4; 
//   const rot1 = t1 * 45; // 45deg rotation
//   const op1 = Math.max(0, 1 - t1 * 1.5); 
  
//   const t2 = Math.max(0, progress - 0.15); // Delayed start
//   const scale2 = 0.5 + t2 * 4; 
//   const rot2 = -t2 * 90; // Counter rotation
//   const op2 = progress < 0.15 ? 0 : Math.max(0, 1 - (t2 * 1.5));

//   const t3 = Math.max(0, progress - 0.3); // Delayed start
//   const scale3 = 0.2 + t3 * 4;
//   const rot3 = t3 * 135; 
//   const op3 = progress < 0.3 ? 0 : Math.max(0, 1 - (t3 * 1.5));

//   // Main Content Reveal
//   // Appears when progress > 0.6
//   const contentScale = Math.min(1, 0.5 + (Math.max(0, progress - 0.5) * 2)); // 0.5 -> 1.0 faster
//   const contentOpacity = Math.max(0, (progress - 0.6) * 2.5); // 0 -> 1
//   const contentBlur = Math.max(0, 10 - (progress - 0.6) * 50); // 10px -> 0px

//   return (
//     <section 
//       ref={containerRef} 
//       style={{ height: `${sectionHeight}px` }}
//       className="relative z-10 bg-[var(--bg-main)]"
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
        
//         {/* Rotating Tunnel Effect Elements - SQUARES */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
//            {/* Frame 1 - Dashed Dim */}
//            <div 
//              className="absolute border border-dashed border-[var(--text-dim)] transition-transform duration-75 ease-linear will-change-transform"
//              style={{ 
//                width: '50vw', height: '50vw', 
//                transform: `scale(${scale1}) rotate(${rot1}deg)`,
//                opacity: op1 
//              }}
//            ></div>
           
//            {/* Frame 2 - Double Line Contrast */}
//            <div 
//              className="absolute border-[2px] border-[var(--text-primary)] flex items-center justify-center transition-transform duration-75 ease-linear will-change-transform"
//              style={{ 
//                width: '35vw', height: '35vw', 
//                transform: `scale(${scale2}) rotate(${rot2}deg)`,
//                opacity: op2 
//              }}
//            >
//               {/* Inner White/Black Line for contrast */}
//               <div className="absolute inset-[-4px] border border-[var(--bg-main)]"></div>
//            </div>

//            {/* Frame 3 - Dotted Secondary */}
//            <div 
//              className="absolute border-2 border-dotted border-[var(--text-secondary)] transition-transform duration-75 ease-linear will-change-transform"
//              style={{ 
//                width: '20vw', height: '20vw', 
//                transform: `scale(${scale3}) rotate(${rot3}deg)`,
//                opacity: op3 
//              }}
//            ></div>
//         </div>

//         {/* ORBITAL SYSTEM (Circle dot + lines) */}
//         <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: `scale(${contentScale})`, opacity: contentOpacity }}>
//             {/* Large Orbit (Border line) */}
//             <div className="absolute w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] border border-[var(--text-dim)] rounded-full opacity-10 animate-[spin_30s_linear_infinite]"></div>
            
//             {/* Large Satellite (Dot) */}
//             <div className="absolute w-[60vw] h-[60vw] md:w-[600px] md:h-[600px] animate-[spin_30s_linear_infinite]">
//                 <div className="absolute top-0 left-1/2 w-3 h-3 bg-[var(--text-primary)] rounded-full -translate-x-1/2 -translate-y-1/2"></div>
//             </div>

//             {/* Medium Orbit (Reverse Border) */}
//             <div className="absolute w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] border border-[var(--text-dim)] rounded-full opacity-10 animate-[spin_20s_linear_infinite_reverse]"></div>
            
//             {/* Medium Satellite (Dot) */}
//              <div className="absolute w-[40vw] h-[40vw] md:w-[400px] md:h-[400px] animate-[spin_20s_linear_infinite_reverse]">
//                 <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-[var(--text-secondary)] rounded-full -translate-x-1/2 translate-y-1/2"></div>
//             </div>
//         </div>

//         {/* Main Content with Zoom In Entrance */}
//         <div 
//           className="relative z-10 flex flex-col items-center text-center px-6"
//           style={{ 
//             transform: `scale(${contentScale})`, 
//             opacity: contentOpacity,
//             filter: `blur(${contentBlur}px)`
//           }}
//         >
            
//             {/* "Philosophy" tag with Background Halo */}
//             <div className="relative mb-6">
//                <div className="absolute inset-0 bg-[var(--accent)] opacity-20 blur-xl rounded-full scale-150 animate-pulse"></div>
//                <span className="relative font-mono text-xs text-[var(--text-primary)] tracking-[0.5em] uppercase z-10">
//                  Philosophy
//                </span>
//             </div>

//             {/* Title with Mix Blend Mode - Compact */}
//             <div className="relative mb-6 md:mb-8">
//                <h2 
//                  className="text-5xl md:text-8xl font-poster text-[var(--text-primary)] leading-none"
//                  style={{ mixBlendMode: 'difference' }}
//                >
//                  CODE IS <br/>
//                  <span className="inline-block font-serif italic font-light opacity-80">POETRY</span>
//                </h2>
//             </div>

//             <p className="font-serif italic text-lg md:text-2xl text-[var(--text-secondary)] max-w-xl mx-auto leading-relaxed mb-8">
//               "Building the future with precision, passion, and purpose."
//             </p>

//             {/* Orbital Items - Compact */}
//             <div className="mt-8 flex justify-center gap-8 md:gap-24 opacity-50">
//               {['Curiosity', 'Precision', 'Impact'].map((item, i) => (
//                 <div key={item} className="relative">
//                   <span className="font-mono text-[10px] md:text-xs uppercase tracking-widest border-b border-transparent hover:border-current transition-colors cursor-default pb-1">{item}</span>
//                 </div>
//               ))}
//             </div>

//         </div>
//       </div>
//     </section>
//   );
// };

// const ProjectsHorizontalSection = ({ scrollY, vh }) => {
//   const containerRef = useRef(null);
//   const [inViewRef, active] = useInView(0.1); 
//   const [shouldAnimateEntrance, setShouldAnimateEntrance] = useState(true);

//   // Merge refs
//   const setRefs = (node) => {
//     containerRef.current = node;
//     inViewRef.current = node;
//   };

//   const sectionHeight = vh * 4;
//   const start = containerRef.current ? containerRef.current.offsetTop : 0;
//   const dist = Math.max(1, sectionHeight - vh);
//   const progress = Math.max(0, Math.min(1, (scrollY - start) / dist));

//   // Determine animation direction logic
//   useEffect(() => {
//     if (active) {
//       if (progress > 0.5) {
//         setShouldAnimateEntrance(false);
//       } else {
//         setShouldAnimateEntrance(true);
//       }
//     }
//   }, [active]);

//   const projects = [
//     { 
//       title: "Azure VM", 
//       role: "Solo Dev",
//       context: "Freelance", 
//       year: "2024", 
//       focus: "Cost Optimization",
//       tags: ["Azure", "React", "Linux"], 
//       icon: <Cloud strokeWidth={1.5} size={28} />, 
//       desc: "Serverless dashboard reducing cloud costs by 60%. Automated scaling logic.",
//       deliverables: "Web App, Docs"
//     },
//     { 
//       title: "K8s Cluster", 
//       role: "Backend Lead", 
//       context: "Academic",
//       year: "2023", 
//       focus: "Scalability",
//       tags: ["Java", "Docker", "K8s"], 
//       icon: <Server strokeWidth={1.5} size={28} />, 
//       desc: "Scalable microservices architecture with Spring Boot and resilient patterns.",
//       deliverables: "CI/CD, API"
//     },
//     { 
//       title: "7 In The Wild", 
//       role: "Full Stack", 
//       context: "Personal",
//       year: "2022", 
//       focus: "Geolocation",
//       tags: ["Expo", "Maps", "Node"], 
//       icon: <Smartphone strokeWidth={1.5} size={28} />, 
//       desc: "Outdoor challenge platform for urban explorers connecting via GPS.",
//       deliverables: "Mobile App"
//     },
//     { 
//       title: "Study Maxer", 
//       role: "UX Researcher", 
//       context: "Academic",
//       year: "2023", 
//       focus: "Productivity",
//       tags: ["Figma", "UX", "Data"], 
//       icon: <Layers strokeWidth={1.5} size={28} />, 
//       desc: "User-centered design focused on student workflow optimization.",
//       deliverables: "Prototype"
//     },
//   ];

//   const totalWidthVw = (projects.length * 60) + ((projects.length - 1) * 6);
//   const xMove = progress * (totalWidthVw - 80);

//   return (
//     <section
//       ref={setRefs}
//       style={{ height: `${sectionHeight}px` }}
//       className="relative z-10 bg-[var(--bg-main)]"
//     >
//       <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col">
//         {/* Adjusted Top Position and Added Blend Mode */}
//         <div 
//           className="absolute top-8 md:top-12 left-8 md:left-12 z-50 pointer-events-none" 
//           style={{ mixBlendMode: 'difference' }}
//         >
//           <div className="text-5xl md:text-8xl uppercase tracking-tight leading-none text-[var(--bg-main)] dark:text-[var(--bg-main)]">
//              <DynamicProjectTitle text="PROJECT ARCHIVES" active={active} progress={progress} />
//           </div>
//           <div className={`mt-2 font-mono text-xs text-[var(--bg-main)] dark:text-[var(--bg-main)] tracking-[0.3em] transition-opacity duration-700 delay-700 ${active ? 'opacity-100' : 'opacity-0'}`}>
//             SELECTED WORKS 2022 — 2026
//           </div>
//         </div>

//         {/* Adjusted padding/margin so cards overlap title partially */}
//         <div className="flex items-end pb-0 h-full flex-grow pt-0">
//           <div
//             className={`flex pl-8 md:pl-24 will-change-transform project-rail ${active ? 'project-rail--active' : ''}`}
//             style={{
//               transform: `translate3d(-${xMove}vw, 0, 0)`
//             }}
//           >
//             {projects.map((p, i) => (
//               <PosterProjectCard 
//                 key={i} 
//                 project={p} 
//                 index={i} 
//                 isVisible={active}
//                 shouldAnimate={shouldAnimateEntrance}
//               />
//             ))}
//             <div className="w-[20vw] shrink-0" />
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// // --- PAGES ---

// const IntroPage = () => {
//   const { scrollY, vh } = useScrollProgress();
//   const { isReplayedIntro, setIsReplayedIntro } = useApp();
//   const containerRef = useRef(null);
//   const navigate = useNavigate();
//   const location = useLocation();
  
//   const isReplayed = location.state?.isReplayed || isReplayedIntro;

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);
  
//   useEffect(() => {
//     if (location.state?.isReplayed) {
//       setIsReplayedIntro(true);
//     }
//     return () => setIsReplayedIntro(false);
//   }, [location.state, setIsReplayedIntro]);

//   const handleClose = () => {
//     setIsReplayedIntro(false);
//     navigate('/home');
//   };

//   return (
//     <div ref={containerRef} className="relative bg-[var(--bg-main)] text-[var(--text-primary)]">
//       {isReplayed && (
//         <button
//           onClick={handleClose}
//           className="close-btn fixed top-6 right-6 z-[9999] w-12 h-12 flex items-center justify-center bg-[var(--bg-panel)] border border-[var(--border)] hover:border-[var(--text-primary)] transition-all duration-300 group shadow-lg"
//           title="Close Intro"
//           style={{ borderRadius: '4px' }}
//         >
//           <X size={20} className="text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] transition-all duration-300 group-hover:rotate-90" />
//         </button>
//       )}
//       <div className="grain-overlay"></div>
//       <SuddenLines scrollY={scrollY} vh={vh} />
//       <HeroSection scrollY={scrollY} vh={vh} />
//       <IntroSection scrollY={scrollY} vh={vh} />
//       <BridgeSection scrollY={scrollY} vh={vh} />
//       <PassionsMarqueeSection />
//       <ProjectsHorizontalSection scrollY={scrollY} vh={vh} />
//       <InterludeSection scrollY={scrollY} vh={vh} />
//     </div>
//   );
// };

// const HomePage = () => {
//   const navigate = useNavigate();
//   const { isDarkMode, toggleTheme } = useApp();

//   return (
//     <div className="min-h-screen bg-[var(--bg-main)] flex items-center justify-center p-8">
//        <div className="max-w-xl w-full text-center space-y-8 animate-fade-in">
//           <div className="w-24 h-24 mx-auto rounded-full border border-[var(--border)] flex items-center justify-center bg-[var(--bg-panel)] relative overflow-hidden group">
//              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
//              <CheckCircle className="text-[var(--accent)] w-10 h-10" />
//           </div>
          
//           <h1 className="text-4xl md:text-6xl font-poster text-[var(--text-primary)]">
//             WELCOME <span className="text-[var(--text-dim)]">HOME</span>
//           </h1>
          
//           <p className="font-serif italic text-xl text-[var(--text-secondary)]">
//             The intro sequence is complete. You have arrived at the destination.
//           </p>

//           <div className="flex flex-col md:flex-row gap-4 justify-center pt-8">
//             <button 
//               onClick={() => navigate('/', { state: { isReplayed: true } })}
//               className="px-8 py-3 bg-[var(--text-primary)] text-[var(--bg-main)] font-mono text-sm uppercase tracking-wider hover:opacity-90 transition-opacity"
//             >
//               Replay Intro
//             </button>
//             <button 
//               onClick={toggleTheme}
//               className="px-8 py-3 border border-[var(--border)] text-[var(--text-primary)] font-mono text-sm uppercase tracking-wider hover:bg-[var(--bg-panel)] transition-colors flex items-center justify-center gap-2"
//             >
//               {isDarkMode ? <Sun size={16}/> : <Moon size={16}/>}
//               {isDarkMode ? 'Light Mode' : 'Dark Mode'}
//             </button>
//           </div>
//        </div>
//     </div>
//   );
// };

// // --- STYLES & MAIN APP WRAPPER ---

// const GlobalStyles = () => (
//   <style>{`
//     @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@300;400;600;800&family=JetBrains+Mono:ital,wght@0,400;0,700;1,400&family=Playfair+Display:ital,wght@1,400;1,700&family=Anton&display=swap');

//     :root {
//       --bg-main: #ffffff;
//       --bg-panel: #f8f8f8;
//       --text-primary: #111111;
//       --text-secondary: #444444;
//       --text-dim: #999999;
//       --border: #e5e5e5;
//       --accent: #000000;
//     }

//     [data-theme="dark"] {
//       --bg-main: #0a0a0a;
//       --bg-panel: #111111;
//       --text-primary: #ffffff;
//       --text-secondary: #cccccc;
//       --text-dim: #666666;
//       --border: #333333;
//       --accent: #ffffff;
//     }

//     body { margin: 0; background-color: var(--bg-main); transition: background-color 0.3s ease; overflow-x: hidden; }
    
//     .font-poster { font-family: 'Anton', sans-serif; letter-spacing: 0.05em; }
    
//     .close-btn { animation: fadeInScale 0.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
//     @keyframes fadeInScale {
//       from { opacity: 0; transform: scale(0.8) rotate(-90deg); }
//       to { opacity: 1; transform: scale(1) rotate(0deg); }
//     }

//     .hero-corner { position: absolute; width: 22px; height: 22px; border-color: var(--text-dim); opacity: 0.5; }
//     .hero-corner--tl { top: 24px; left: 24px; border-top: 2px solid var(--text-dim); border-left: 2px solid var(--text-dim); }
//     .hero-corner--tr { top: 24px; right: 24px; border-top: 2px solid var(--text-dim); border-right: 2px solid var(--text-dim); }
//     .hero-corner--bl { bottom: 24px; left: 24px; border-bottom: 2px solid var(--text-dim); border-left: 2px solid var(--text-dim); }
//     .hero-corner--br { bottom: 24px; right: 24px; border-bottom: 2px solid var(--text-dim); border-right: 2px solid var(--text-dim); }

//     /* Project Entrance Animation - Fan Deck Effect */
//     .project-card {
//       opacity: 0;
//       transform-origin: bottom left;
//       /* Default state for animation (before visibility) */
//       transform: translateY(100px) rotate(-10deg) skewX(-5deg);
//       filter: blur(10px);
//       transition: all 1s cubic-bezier(0.19, 1, 0.22, 1);
//       will-change: opacity, transform, filter;
//     }
    
//     .project-card--visible {
//       opacity: 1;
//       transform: translateY(0) rotate(0deg) skewX(0);
//       filter: blur(0);
//     }

//     .project-card--static {
//       opacity: 1;
//       transform: none;
//       filter: none;
//       transition: opacity 0.5s ease;
//     }
    
//     .grain-overlay {
//       position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 9999; opacity: 0.03;
//       background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
//     }

//     @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
//     @keyframes marquee-reverse { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
//     .animate-marquee { animation: marquee 40s linear infinite; }
//     .animate-marquee-reverse { animation: marquee-reverse 40s linear infinite; }

//     .reveal-text span { display: inline-block; opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease; will-change: opacity, transform; }
//     .reveal-active span { opacity: 1; transform: translateY(0); }

//     .bg-grid-pattern {
//       background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
//       background-size: 20px 20px;
//     }
//     .bg-grid-pattern-dark {
//       background-image: linear-gradient(rgba(0, 0, 0, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.05) 1px, transparent 1px);
//       background-size: 20px 20px;
//     }

//     .welcome-item { opacity: 0; transform: translateY(18px) scale(0.98); animation: welcome-in 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards; }
//     .welcome-delay-1 { animation-delay: 0.08s; }
//     .welcome-delay-2 { animation-delay: 0.18s; }
//     .welcome-delay-3 { animation-delay: 0.28s; }
//     .welcome-delay-4 { animation-delay: 0.4s; }
//     @keyframes welcome-in { to { opacity: 1; transform: translateY(0) scale(1); } }
//     @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
//     .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
//   `}</style>
// );

// export default function App() {
//   return (
//     <AppProvider>
//       <GlobalStyles />
//       <Router>
//         <Routes>
//           <Route path="/" element={<IntroPage />} />
//           <Route path="/home" element={<HomePage />} />
//         </Routes>
//       </Router>
//     </AppProvider>
//   );
// }