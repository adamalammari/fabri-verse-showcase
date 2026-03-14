const Footer = () => (
  <footer className="py-16 border-t border-border" style={{ backgroundColor: 'hsl(var(--section-warm))' }}>
    <div className="container mx-auto px-6 text-center" dir="rtl">
      <h3 className="font-display text-3xl font-bold text-gradient-gold mb-4">الكسوة</h3>
      <p className="text-muted-foreground font-body text-sm mb-8 max-w-md mx-auto">
        مصنع الكسوة للأثواب الفاخرة — حيث يلتقي التراث بالحداثة
      </p>
      <div className="divider-gold mb-8" />
      <p className="text-muted-foreground/60 font-body text-xs">
        © {new Date().getFullYear()} الكسوة. جميع الحقوق محفوظة
      </p>
    </div>
  </footer>
);

export default Footer;
