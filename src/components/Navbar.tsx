import { useEffect, useState } from "react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md py-4 shadow-sm"
          : "bg-transparent py-6"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <a href="#hero" className="font-display text-2xl font-bold text-foreground tracking-wider">
          <span className="text-gradient-gold">الكسوة</span>
        </a>
        <div className="hidden md:flex items-center gap-8">
          {[
            { href: "#about", label: "من نحن" },
            { href: "#process", label: "مراحل التصنيع" },
            { href: "#branches", label: "الفروع" },
            { href: "#contact", label: "تواصل معنا" },
          ].map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-foreground/70 hover:text-gold transition-colors duration-300 text-sm font-body tracking-wide"
            >
              {link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="btn-gold text-xs hidden md:block">
          اطلب الآن
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
