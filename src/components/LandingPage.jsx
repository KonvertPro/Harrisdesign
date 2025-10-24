import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import DropdownMenuSimple from "./DropdownMenuSimple";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const words = ["Creators", "Startups", "Brands"];
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);
  const [activeTheme, setActiveTheme] = useState('hero');
  const [activeService, setActiveService] = useState(null); // index | null


  // (Removed Three.js background)

  // === 2D TEXT CYCLE (fade) ===
  useEffect(() => {
    const displayMs = 2200;
    const fadeMs = 500;
    let t1, t2;

    const cycle = () => {
      t1 = setTimeout(() => {
        setWordVisible(false);
        t2 = setTimeout(() => {
          setWordIndex((i) => (i + 1) % words.length);
          setWordVisible(true);
          cycle();
        }, fadeMs);
      }, displayMs);
    };

    cycle();
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  // === SCROLL ANIMATIONS ===
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // === BACKGROUND THEME BY SCROLL ===
  useEffect(() => {
    const sectionIds = ['hero', 'services', 'work', 'testimonials', 'cta'];

    const getActiveByCenter = () => {
      const centerY = window.innerHeight / 2;
      let closestId = 'hero';
      let closestDelta = Infinity;
      sectionIds.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const delta = Math.abs(sectionCenter - centerY);
        if (delta < closestDelta) {
          closestDelta = delta;
          closestId = id;
        }
      });
      return closestId;
    };

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const id = getActiveByCenter();
        setActiveTheme((prev) => (prev === id ? prev : id));
        ticking = false;
      });
    };

    // Run on mount and on resize for accuracy
    const onResize = () => {
      const id = getActiveByCenter();
      setActiveTheme((prev) => (prev === id ? prev : id));
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    // initial
    onResize();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // === JSX RETURN ===
  return (
    <div className="relative bg-white text-neutral-900 font-custom">
      {/* Subtle animated violet background glows */}
      <div className={`violet-glows theme-${activeTheme}`} aria-hidden="true">
        <span className="blob blob-1"></span>
        <span className="blob blob-2"></span>
        <span className="blob blob-3"></span>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <DropdownMenuSimple />

        {/* Hero Section */}
        <section id="hero" className="relative z-10 px-6 pt-20 pb-12 md:pb-16 max-w-7xl mx-auto">
          <div className="max-w-5xl">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight leading-none mb-8 text-neutral-900">
            <span className="inline-flex items-baseline gap-[0.3em]">
              <span>Helping</span>
              <span className="relative inline-block align-baseline min-w-[9ch]">
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[115%] h-[70%] rounded-full blur-2xl opacity-80 bg-gradient-to-r from-violet-600/60 via-fuchsia-500/40 to-violet-400/60 animate-pulse-soft"
                />
                <span className={`relative text-violet-800 transition-opacity duration-500 ${wordVisible ? 'opacity-100' : 'opacity-0'}`}>
                  {words[wordIndex]}
                </span>
              </span>
            </span>
            <span className="block text-transparent bg-clip-text bg-neutral-800">
              stand out.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-neutral-600 mb-12 max-w-2xl leading-relaxed">
            Bespoke portfolios, startup platforms, and custom web applications.
          </p>
          <div className="flex flex-wrap gap-4">
            <a
              href="#work"
              className="inline-flex items-center justify-center px-8 py-4 bg-violet-600 hover:bg-violet-700 text-white transition-all duration-300 rounded-xl font-semibold text-lg shadow-soft hover:-translate-y-0.5"
            >
              View Work
            </a>
            <a
              href="#cta"
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-300 hover:border-neutral-500 text-neutral-900 transition-all duration-300 rounded-xl font-semibold text-lg hover:bg-violet-50"
            >
              Get started
            </a>
          </div>
          </div>
        </section>

        {/* Ticker Break Between Hero and Services */}
        <section className="relative z-10 py-12 md:py-16">
          <div className="px-6 max-w-7xl mx-auto xl:px-0 xl:max-w-none xl:mx-0 xl:w-screen xl:relative xl:left-1/2 xl:right-1/2 xl:-ml-[50vw] xl:-mr-[50vw]">
            <HeroTicker />
          </div>
        </section>

        {/* Services Section */}
        <section 
        id="services" 
        data-animate
        className={`relative z-10 px-6 py-24 max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible.services ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-6 max-w-3xl text-neutral-900">
          Three core specialties.
          <span className="block text-neutral-500">Infinite possibilities.</span>
        </h2>
        <p className="text-xl text-neutral-600 mb-16 max-w-2xl">
          We focus on what we do best, delivering exceptional results in every project.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Portfolios',
              description: 'Showcase your work with stunning, high-performance portfolio sites that captivate clients and land opportunities.',
              icon: '✨',
              color: 'from-brand-50 to-brand-100',
              borderColor: 'hover:border-brand-500',
              shadowColor: 'hover:shadow-colored'
            },
            {
              title: 'Startups',
              description: 'Launch fast with scalable platforms built for growth. From MVP to market leader, we build the tech that scales with you.',
              icon: '🚀',
              color: 'from-secondary-50 to-secondary-100',
              borderColor: 'hover:border-secondary-500',
              shadowColor: 'hover:shadow-colored-purple'
            },
            {
              title: 'Custom Apps',
              description: 'Bespoke web applications tailored to your unique needs. Complex problems solved with elegant, maintainable code.',
              icon: '⚡',
              color: 'from-teal-50 to-teal-100',
              borderColor: 'hover:border-teal-500',
              shadowColor: 'hover:shadow-colored-teal'
            }
          ].map((service, index) => {
            const isActive = activeService === index;
            const isDimmed = activeService !== null && !isActive;
            return (
              <motion.div
                key={index}
                layout
                onClick={() => setActiveService(isActive ? null : index)}
                initial={false}
                animate={{
                  scale: isActive ? 1.05 : isDimmed ? 0.95 : 1,
                  opacity: isDimmed ? 0.7 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`cursor-pointer group bg-gradient-to-br ${service.color} border-2 border-neutral-200 ${service.borderColor} rounded-2xl p-8 ${service.shadowColor} ${isActive ? 'shadow-soft-lg' : 'shadow-soft'} transition-all duration-300`}
              >
                <motion.div layout className="flex items-center gap-4">
                  <div className="text-5xl">{service.icon}</div>
                  <h3 className="text-2xl font-bold text-neutral-900">{service.title}</h3>
                </motion.div>

                <AnimatePresence initial={false}>
                  {isActive && (
                    <motion.div
                      key="content"
                      layout
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.1 }}
                      className="mt-4"
                    >
                      <p className="text-neutral-700 leading-relaxed mb-4">{service.description}</p>
                      <button className="inline-flex items-center px-4 py-2 bg-white/80 hover:bg-white text-neutral-900 rounded-xl font-semibold border border-neutral-200 shadow-soft transition-colors">
                        Learn more
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
        </section>

        {/* Featured Work */}
        <section 
        id="work" 
        data-animate
        className={`relative z-10 px-6 py-24 max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible.work ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-neutral-900">
          Work that speaks
          <span className="block text-neutral-500">for itself.</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: 'TechFlow Analytics',
              category: 'Custom SaaS Platform',
              description: 'Real-time data visualization dashboard for enterprise clients.',
              color: 'from-brand-400 to-brand-600'
            },
            {
              title: 'Nora Chen Photography',
              category: 'Portfolio Site',
              description: 'Award-winning portfolio showcasing architectural photography.',
              color: 'from-secondary-400 to-secondary-600'
            },
            {
              title: 'GreenPath Startup',
              category: 'MVP Launch',
              description: 'Sustainability tracking app that secured $2M seed funding.',
              color: 'from-teal-400 to-teal-600'
            },
            {
              title: 'Apex Consulting',
              category: 'Corporate Website',
              description: 'Modern B2B platform with integrated booking system.',
              color: 'from-orange-400 to-orange-600'
            }
          ].map((project, index) => (
            <div 
              key={index}
              className="group relative bg-white border-2 border-neutral-200 rounded-2xl overflow-hidden hover:border-neutral-400 transition-all duration-300 shadow-soft hover:shadow-soft-lg"
            >
              <div className={`h-64 bg-gradient-to-br ${project.color} group-hover:scale-105 transition-transform duration-500`}></div>
              <div className="p-8">
                <div className="text-sm text-brand-600 font-semibold mb-2">{project.category}</div>
                <h3 className="text-2xl font-bold mb-3 text-neutral-900">{project.title}</h3>
                <p className="text-neutral-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
        </section>

        {/* Testimonials */}
        <section 
        id="testimonials" 
        data-animate
        className={`relative z-10 px-6 py-24 max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible.testimonials ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <h2 className="text-5xl md:text-6xl font-bold mb-16 text-center text-neutral-900">
          Trusted by ambitious
          <span className="block text-neutral-500">teams worldwide.</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "They didn't just build our platform—they understood our vision and brought it to life beyond our expectations.",
              author: "Sarah Chen",
              role: "CEO, TechFlow",
              color: 'border-brand-200 bg-brand-50'
            },
            {
              quote: "The attention to detail and technical expertise is unmatched. Our portfolio site has become our best sales tool.",
              author: "Marcus Rivera",
              role: "Creative Director",
              color: 'border-secondary-200 bg-secondary-50'
            },
            {
              quote: "From concept to launch in 8 weeks. The speed and quality completely transformed our startup journey.",
              author: "Jessica Mills",
              role: "Founder, GreenPath",
              color: 'border-teal-200 bg-teal-50'
            }
          ].map((testimonial, index) => (
            <div 
              key={index}
              className={`${testimonial.color} border-2 rounded-2xl p-8 shadow-soft hover:shadow-soft-lg transition-shadow duration-300`}
            >
              <p className="text-lg text-neutral-700 mb-6 leading-relaxed">
                "{testimonial.quote}"
              </p>
              <div>
                <div className="font-semibold text-neutral-900">{testimonial.author}</div>
                <div className="text-sm text-neutral-600">{testimonial.role}</div>
              </div>
            </div>
          ))}
        </div>
        </section>
      </div>

      {/* CTA Section */}
      <section 
        id="cta" 
        data-animate
        className={`relative z-10 px-6 py-32 max-w-7xl mx-auto transition-all duration-1000 ${
          isVisible.cta ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        <div className="bg-gradient-to-br from-brand-500 via-secondary-500 to-teal-500 rounded-3xl p-12 md:p-16 text-center shadow-soft-lg">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to build something exceptional?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss your project and create a digital experience that sets you apart.
          </p>
          <button className="px-8 py-4 bg-white text-blue-600 hover:bg-neutral-50 transition-all duration-300 rounded-xl font-semibold text-lg shadow-soft hover:shadow-soft-lg hover:-translate-y-0.5">
            Start Your Project
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-12 max-w-7xl mx-auto border-t border-neutral-200">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-neutral-600">
            © 2025 YourStudio. Crafting digital excellence.
          </div>
          <div className="flex gap-6 text-neutral-600">
            <a href="#" className="hover:text-brand-500 transition-colors">Twitter</a>
            <a href="#" className="hover:text-brand-500 transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-brand-500 transition-colors">Dribbble</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

// === HeroTicker component ===
const HeroTicker = () => {
  // Example items (use your own images/logos here)
  const itemsA = [
    { title: 'Creative Studio', img: 'https://picsum.photos/seed/creative1/600/400' },
    { title: 'SaaS Dashboard', img: 'https://picsum.photos/seed/app2/600/400' },
    { title: 'Portfolio Grid', img: 'https://picsum.photos/seed/folio3/600/400' },
    { title: 'Product Landing', img: 'https://picsum.photos/seed/landing4/600/400' },
    { title: 'Photography', img: 'https://picsum.photos/seed/photo5/600/400' },
    { title: 'Architecture', img: 'https://picsum.photos/seed/arch6/600/400' },
  ];
  const itemsB = [
    { title: 'Startup MVP', img: 'https://picsum.photos/seed/mvp1/600/400' },
    { title: 'Ecommerce', img: 'https://picsum.photos/seed/shop2/600/400' },
    { title: 'Fintech', img: 'https://picsum.photos/seed/fin3/600/400' },
    { title: 'Travel Blog', img: 'https://picsum.photos/seed/travel4/600/400' },
    { title: 'Consulting', img: 'https://picsum.photos/seed/consult5/600/400' },
    { title: 'Wellness', img: 'https://picsum.photos/seed/well6/600/400' },
  ];

  return (
    <div className="ticker select-none">
      <TickerRowJS direction="left" items={itemsA} baseSpeed={36} />
      <div className="h-4" />
      <TickerRowJS direction="right" items={itemsB} baseSpeed={30} />
    </div>
  );
};


const TickerRowJS = ({ direction = "left", items = [], baseSpeed = 60 }) => {
  const trackRef = useRef(null);
  const groupRef = useRef(null);
  const hoveringRef = useRef(false);
  const rafRef = useRef(0);
  const posRef = useRef(0);
  const widthRef = useRef(0);
  const lastTimeRef = useRef(0);

  useEffect(() => {
    const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const measure = () => {
      if (!groupRef.current) return;
      widthRef.current = groupRef.current.offsetWidth;
      // Initialize position so rightward flow starts seamlessly
      posRef.current = direction === 'right' ? -widthRef.current : 0;
      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
    };
    measure();
    const onResize = () => measure();
    window.addEventListener('resize', onResize);

    if (reduceMotion) {
      return () => window.removeEventListener('resize', onResize);
    }

    const step = (now) => {
      if (!lastTimeRef.current) lastTimeRef.current = now;
      const dt = Math.min(64, now - lastTimeRef.current); // cap delta to avoid jumps
      lastTimeRef.current = now;

      const speedPxPerSec = baseSpeed * (hoveringRef.current ? 0.28 : 1);
      const delta = (speedPxPerSec * dt) / 1000;

      if (direction === 'left') {
        posRef.current -= delta;
        if (posRef.current <= -widthRef.current) {
          posRef.current += widthRef.current;
        }
      } else {
        posRef.current += delta;
        if (posRef.current >= 0) {
          posRef.current -= widthRef.current;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);

    return () => {
      window.removeEventListener('resize', onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      lastTimeRef.current = 0;
    };
  }, [baseSpeed, direction]);

  const onEnter = () => { hoveringRef.current = true; };
  const onLeave = () => { hoveringRef.current = false; };

  return (
    <div className="ticker-row">
      <div className="ticker-track" ref={trackRef}>
        <div className="ticker-group" ref={groupRef}>
          {items.map((it, i) => (
            <a key={`a-${i}`} className="ticker-item" href="#" onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <img src={it.img} alt={it.title} loading="lazy" />
              <div className="caption">{it.title}</div>
            </a>
          ))}
        </div>
        <div className="ticker-group" aria-hidden="true">
          {items.map((it, i) => (
            <a key={`b-${i}`} className="ticker-item" href="#" onMouseEnter={onEnter} onMouseLeave={onLeave}>
              <img src={it.img} alt="" loading="lazy" />
              <div className="caption">{it.title}</div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
