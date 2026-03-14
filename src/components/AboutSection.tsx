import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import factoryImage from "@/assets/manufacturing-2.jpg";

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: "+25", label: "سنة خبرة" },
  { number: "+500K", label: "ثوب سنوياً" },
  { number: "12", label: "فرع" },
  { number: "+200", label: "حرفي متخصص" },
];

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image reveal
      gsap.from(".about-image", {
        clipPath: "inset(0 100% 0 0)",
        duration: 1.5,
        ease: "power4.inOut",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });

      // Text slide in
      gsap.from(".about-text > *", {
        x: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        },
      });

      // Stats counter
      gsap.from(".stat-item", {
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".stats-grid",
          start: "top 80%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="section-dark py-32">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-16 items-center">
          {/* Image - 3 cols */}
          <div className="lg:col-span-3 overflow-hidden">
            <img
              src={factoryImage}
              alt="مصنع الأثواب الحديث"
              className="about-image w-full h-[500px] lg:h-[600px] object-cover"
            />
          </div>

          {/* Text - 2 cols */}
          <div className="lg:col-span-2 about-text" dir="rtl">
            <div className="divider-gold mb-6 !mx-0 !mr-0" />
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              تراث عريق
              <br />
              <span className="text-gradient-gold">بلمسة عصرية</span>
            </h2>
            <p className="text-primary-foreground/60 font-body text-lg leading-relaxed mb-8">
              منذ أكثر من ربع قرن، نصنع الأثواب بأيدي حرفيين مهرة، نجمع بين أصالة الحرفة وأحدث تقنيات التصنيع لنقدم لكم ثوباً يليق بمقامكم.
            </p>
            <a href="#process" className="btn-gold inline-block">مراحل التصنيع</a>
          </div>
        </div>

        {/* Stats */}
        <div className="stats-grid grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-16 border-t border-primary-foreground/10">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item text-center">
              <div className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-2">
                {stat.number}
              </div>
              <div className="text-primary-foreground/50 font-body text-sm tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
