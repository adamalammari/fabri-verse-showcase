import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import img1 from "@/assets/manufacturing-1.jpg";
import img2 from "@/assets/manufacturing-2.jpg";
import img3 from "@/assets/manufacturing-3.jpg";
import img4 from "@/assets/manufacturing-4.jpg";

gsap.registerPlugin(ScrollTrigger);

const steps = [
  {
    num: "01",
    title: "اختيار الأقمشة",
    desc: "نختار أجود أنواع الأقمشة من مصادر عالمية موثوقة، نفحص كل قطعة بعناية فائقة لضمان أعلى معايير الجودة.",
    image: img1,
  },
  {
    num: "02",
    title: "القص والتفصيل",
    desc: "باستخدام أحدث تقنيات القص بالليزر والقوالب الرقمية، نضمن دقة متناهية في كل قطعة.",
    image: img2,
  },
  {
    num: "03",
    title: "الخياطة والتطريز",
    desc: "أيدي حرفية ماهرة تنسج كل غرزة بإتقان، مع تطريزات يدوية تعكس الفخامة والأصالة.",
    image: img3,
  },
  {
    num: "04",
    title: "الفحص والتغليف",
    desc: "مراحل فحص صارمة تضمن خلو كل ثوب من أي عيب، ثم تغليف فاخر يليق بمنتجنا.",
    image: img4,
  },
];

const ProcessSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".process-header > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: ".process-header",
          start: "top 80%",
        },
      });

      // Each step animation
      document.querySelectorAll(".process-step").forEach((step, i) => {
        const isEven = i % 2 === 0;

        gsap.from(step.querySelector(".step-image"), {
          x: isEven ? -100 : 100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
          },
        });

        gsap.from(step.querySelector(".step-content"), {
          x: isEven ? 100 : -100,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: step,
            start: "top 70%",
          },
        });

        // Parallax on image
        gsap.to(step.querySelector(".step-image img"), {
          yPercent: 15,
          scrollTrigger: {
            trigger: step,
            start: "top bottom",
            end: "bottom top",
            scrub: 1,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="process-header text-center mb-24" dir="rtl">
          <div className="divider-gold mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            رحلة <span className="text-gradient-gold">الإتقان</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg max-w-lg mx-auto">
            من الخيط الأول حتى آخر غرزة، كل مرحلة تحكي قصة التميز
          </p>
        </div>

        <div className="space-y-32">
          {steps.map((step, i) => (
            <div
              key={step.num}
              className={`process-step grid lg:grid-cols-2 gap-12 items-center ${
                i % 2 !== 0 ? "lg:direction-rtl" : ""
              }`}
            >
              <div
                className={`step-image overflow-hidden h-[400px] lg:h-[500px] ${
                  i % 2 !== 0 ? "lg:order-2" : ""
                }`}
              >
                <img
                  src={step.image}
                  alt={step.title}
                  className="w-full h-[130%] object-cover"
                />
              </div>
              <div
                className={`step-content ${i % 2 !== 0 ? "lg:order-1" : ""}`}
                dir="rtl"
              >
                <span className="font-display text-8xl font-bold text-gradient-gold opacity-30">
                  {step.num}
                </span>
                <h3 className="font-display text-3xl md:text-4xl font-bold text-foreground -mt-8 mb-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground font-body text-lg leading-relaxed max-w-md">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
