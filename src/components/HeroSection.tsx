import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "@/assets/hero-thobe.jpg";

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image parallax
      gsap.to(imageRef.current, {
        yPercent: 30,
        scale: 1.1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // Overlay darken on scroll
      gsap.to(overlayRef.current, {
        opacity: 0.9,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      // Title entrance
      gsap.from(titleRef.current, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.3,
      });

      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out",
        delay: 0.8,
      });

      // Text parallax on scroll
      gsap.to(titleRef.current, {
        y: -100,
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "20% top",
          end: "60% top",
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative h-[120vh] overflow-hidden"
    >
      <img
        ref={imageRef}
        src={heroImage}
        alt="ثوب فاخر"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div
        ref={overlayRef}
        className="overlay-dark absolute inset-0"
      />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-6">
        <h1
          ref={titleRef}
          className="font-display text-5xl md:text-7xl lg:text-9xl font-bold text-primary-foreground mb-6 leading-tight"
        >
          صُنع
          <br />
          <span className="text-gradient-gold">بإتقان</span>
        </h1>
        <p
          ref={subtitleRef}
          className="font-body text-primary-foreground/60 text-lg md:text-xl max-w-xl tracking-wide"
        >
          حيث يلتقي التراث بالتكنولوجيا الحديثة في صناعة أرقى الأثواب
        </p>
        <div className="mt-10 flex gap-4">
          <a href="#about" className="btn-gold">اكتشف المزيد</a>
          <a href="#branches" className="btn-outline-gold">فروعنا</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <span className="text-primary-foreground/40 text-xs font-body tracking-widest uppercase">اسحب للأسفل</span>
        <div className="w-px h-12 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
};

export default HeroSection;
