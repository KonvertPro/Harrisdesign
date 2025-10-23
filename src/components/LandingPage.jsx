import React, { useEffect, useState } from "react";
import DropdownMenuSimple from "./DropdownMenuSimple";

const LandingPage = () => {
  const [isVisible, setIsVisible] = useState({});
  const words = ["Creators", "Startups", "Brands"];
  const [wordIndex, setWordIndex] = useState(0);
  const [wordVisible, setWordVisible] = useState(true);


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

  // === JSX RETURN ===
  return (
    <div className="relative bg-white text-neutral-900 font-custom">
      {/* Subtle animated violet background glows */}
      <div className="violet-glows" aria-hidden="true">
        <span className="blob blob-1"></span>
        <span className="blob blob-2"></span>
        <span className="blob blob-3"></span>
      </div>

      <div className="relative z-10">
        {/* Navigation */}
        <DropdownMenuSimple />

        {/* Hero Section */}
        <section className="relative z-10 px-6 pt-20 pb-32 max-w-7xl mx-auto">
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
              stand out
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
              className="inline-flex items-center justify-center px-8 py-4 border-2 border-neutral-300 hover:border-blue-500 text-neutral-900 transition-all duration-300 rounded-xl font-semibold text-lg hover:bg-blue-50"
            >
              Let's Talk
            </a>
          </div>
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
          ].map((service, index) => (
            <div 
              key={index}
              className={`group bg-gradient-to-br ${service.color} border-2 border-neutral-200 ${service.borderColor} rounded-2xl p-8 transition-all duration-300 hover:transform hover:scale-105 ${service.shadowColor} shadow-soft`}
            >
              <div className="text-5xl mb-6">{service.icon}</div>
              <h3 className="text-2xl font-bold mb-4 text-neutral-900">{service.title}</h3>
              <p className="text-neutral-700 leading-relaxed">{service.description}</p>
            </div>
          ))}
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
