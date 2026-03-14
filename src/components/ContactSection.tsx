import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".contact-content > *", {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="py-32 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center contact-content" dir="rtl">
          <div className="divider-gold mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6">
            تواصل <span className="text-gradient-gold">معنا</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg mb-12">
            نسعد بخدمتكم والإجابة على جميع استفساراتكم
          </p>

          <form className="space-y-6 text-right">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="الاسم الكامل"
                className="w-full bg-transparent border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
              />
              <input
                type="tel"
                placeholder="رقم الجوال"
                className="w-full bg-transparent border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
                dir="ltr"
              />
            </div>
            <input
              type="email"
              placeholder="البريد الإلكتروني"
              className="w-full bg-transparent border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors"
            />
            <textarea
              placeholder="رسالتك..."
              rows={5}
              className="w-full bg-transparent border border-border px-5 py-4 font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-gold transition-colors resize-none"
            />
            <button type="button" className="btn-gold w-full">
              إرسال الرسالة
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
