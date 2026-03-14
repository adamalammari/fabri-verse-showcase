const Footer = () => (
  <footer className="section-dark py-16 border-t border-primary-foreground/10">
    <div className="container mx-auto px-6 text-center" dir="rtl">
      <h3 className="font-display text-3xl font-bold text-gradient-gold mb-4">الكسوة</h3>
      <p className="text-primary-foreground/40 font-body text-sm mb-8 max-w-md mx-auto">
        مصنع الكسوة للأثواب الفاخرة — حيث يلتقي التراث بالحداثة
      </p>
      <div className="divider-gold mb-8" />
      <p className="text-primary-foreground/30 font-body text-xs">
        © {new Date().getFullYear()} الكسوة. جميع الحقوق محفوظة
      </p>
    </div>
  </footer>
);

export default Footer;
