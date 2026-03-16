import { useEffect, useState } from "react";
import { Menu, X, ArrowUp } from "lucide-react";

const navLinks = [
  { href: "#about", label: "من نحن" },
  { href: "#process", label: "مراحل التصنيع" },
  { href: "#branches", label: "الفروع" },
  { href: "#contact", label: "تواصل معنا" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
      setShowTop(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-card/90 backdrop-blur-xl py-3 shadow-[0_2px_20px_hsl(var(--gold)/0.08)] border-b border-border/50"
            : "bg-transparent py-5"
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-6">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-full flex items-center justify-center border-2 border-gold/60 group-hover:border-gold transition-colors duration-300">
              <span className="font-display text-sm font-bold text-gradient-gold">ك</span>
            </div>
            <span className="font-display text-xl font-bold text-gradient-gold tracking-wider">
              الكسوة
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative px-4 py-2 text-foreground/65 hover:text-foreground text-sm font-body tracking-wide transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gold rounded-full transition-all duration-300 group-hover:w-3/4" />
              </a>
            ))}
          </div>

          {/* CTA + Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="#contact"
              className="btn-gold text-xs hidden md:inline-flex items-center gap-2 rounded-sm"
            >
              اطلب الآن
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-10 h-10 flex items-center justify-center text-foreground/70 hover:text-foreground transition-colors"
              aria-label="القائمة"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-500 ${
            mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="container mx-auto px-6 pb-6 pt-2 flex flex-col gap-1" dir="rtl">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-4 py-3 text-foreground/70 hover:text-foreground hover:bg-muted/50 rounded-sm text-sm font-body transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileOpen(false)}
              className="btn-gold text-xs text-center mt-2 rounded-sm"
            >
              اطلب الآن
            </a>
          </div>
        </div>
      </nav>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="العودة للأعلى"
        className={`fixed bottom-6 left-6 z-50 w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-500 ${
          showTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          backgroundColor: "hsl(var(--gold))",
          color: "hsl(var(--obsidian))",
        }}
      >
        <ArrowUp size={20} />
      </button>
    </>
  );
};

export default Navbar;
