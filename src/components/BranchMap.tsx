import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, Clock } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const branches = [
  {
    id: 1,
    name: "الفرع الرئيسي - الرياض",
    address: "شارع الملك فهد، حي العليا",
    phone: "+966 11 234 5678",
    hours: "٩ ص - ١١ م",
    x: 52,
    y: 48,
  },
  {
    id: 2,
    name: "فرع جدة",
    address: "شارع التحلية، حي الأندلس",
    phone: "+966 12 345 6789",
    hours: "١٠ ص - ١٢ م",
    x: 32,
    y: 52,
  },
  {
    id: 3,
    name: "فرع الدمام",
    address: "شارع الملك سعود، حي الفيصلية",
    phone: "+966 13 456 7890",
    hours: "٩ ص - ١٠ م",
    x: 62,
    y: 45,
  },
  {
    id: 4,
    name: "فرع المدينة المنورة",
    address: "طريق الملك عبدالعزيز",
    phone: "+966 14 567 8901",
    hours: "٩ ص - ١١ م",
    x: 36,
    y: 40,
  },
  {
    id: 5,
    name: "فرع مكة المكرمة",
    address: "شارع أجياد، العزيزية",
    phone: "+966 12 678 9012",
    hours: "٢٤ ساعة",
    x: 34,
    y: 50,
  },
  {
    id: 6,
    name: "فرع أبها",
    address: "شارع الملك فيصل",
    phone: "+966 17 789 0123",
    hours: "١٠ ص - ١٠ م",
    x: 40,
    y: 65,
  },
];

const BranchMap = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeBranch, setActiveBranch] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".map-header > *", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });

      gsap.from(".map-container", {
        scale: 0.9,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ".map-container",
          start: "top 80%",
        },
      });

      gsap.from(".branch-pin", {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: ".map-container",
          start: "top 70%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const active = branches.find((b) => b.id === activeBranch);

  return (
    <section id="branches" ref={sectionRef} className="py-32" style={{ backgroundColor: 'hsl(var(--section-soft))' }}>
      <div className="container mx-auto px-6">
        <div className="map-header text-center mb-16" dir="rtl">
          <div className="divider-gold mb-6" />
          <h2 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-4">
            فروعنا في <span className="text-gradient-gold">المملكة</span>
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            نصل إليكم أينما كنتم بأعلى مستوى من الخدمة
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 items-start">
          {/* Map */}
          <div className="lg:col-span-2 map-container relative">
            <div className="relative w-full aspect-[4/3] rounded-sm overflow-hidden bg-card border border-border">
              {/* SVG Map of Saudi Arabia */}
              <svg viewBox="0 0 100 80" className="w-full h-full">
                {/* Simplified Saudi Arabia shape */}
                <path
                  d="M25,25 L35,20 L50,18 L65,20 L75,25 L80,35 L78,45 L70,55 L60,65 L50,70 L40,68 L30,60 L22,50 L20,40 L22,30 Z"
                  fill="none"
                  stroke="hsl(38, 35%, 60%)"
                  strokeWidth="0.3"
                  opacity="0.3"
                />
                <path
                  d="M25,25 L35,20 L50,18 L65,20 L75,25 L80,35 L78,45 L70,55 L60,65 L50,70 L40,68 L30,60 L22,50 L20,40 L22,30 Z"
                  fill="hsl(38, 35%, 60%)"
                  opacity="0.05"
                />

                {/* Grid lines */}
                {[20, 30, 40, 50, 60, 70, 80].map((x) => (
                  <line
                    key={`v-${x}`}
                    x1={x}
                    y1="15"
                    x2={x}
                    y2="75"
                    stroke="hsl(38, 35%, 60%)"
                    strokeWidth="0.1"
                    opacity="0.1"
                  />
                ))}
                {[20, 30, 40, 50, 60, 70].map((y) => (
                  <line
                    key={`h-${y}`}
                    x1="15"
                    y1={y}
                    x2="85"
                    y2={y}
                    stroke="hsl(38, 35%, 60%)"
                    strokeWidth="0.1"
                    opacity="0.1"
                  />
                ))}

                {/* Branch pins */}
                {branches.map((branch) => (
                  <g
                    key={branch.id}
                    className="branch-pin cursor-pointer"
                    onClick={() =>
                      setActiveBranch(
                        activeBranch === branch.id ? null : branch.id
                      )
                    }
                  >
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={activeBranch === branch.id ? 2.5 : 1.5}
                      fill="hsl(38, 35%, 60%)"
                      className="transition-all duration-300"
                    >
                      <animate
                        attributeName="opacity"
                        values="1;0.5;1"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                    <circle
                      cx={branch.x}
                      cy={branch.y}
                      r={activeBranch === branch.id ? 4 : 3}
                      fill="none"
                      stroke="hsl(38, 35%, 60%)"
                      strokeWidth="0.2"
                      opacity="0.3"
                    >
                      <animate
                        attributeName="r"
                        values="3;5;3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                      <animate
                        attributeName="opacity"
                        values="0.3;0;0.3"
                        dur="2s"
                        repeatCount="indefinite"
                      />
                    </circle>
                  </g>
                ))}
              </svg>
            </div>
          </div>

          {/* Branch list */}
          <div className="space-y-3" dir="rtl">
            {branches.map((branch) => (
              <div
                key={branch.id}
                className={`p-5 border cursor-pointer transition-all duration-500 ${
                  activeBranch === branch.id
                    ? "border-gold bg-gold/10"
                    : "border-border hover:border-gold/30"
                }`}
                onClick={() =>
                  setActiveBranch(
                    activeBranch === branch.id ? null : branch.id
                  )
                }
              >
                <h4 className="font-display text-lg font-bold text-foreground mb-2">
                  {branch.name}
                </h4>
                {activeBranch === branch.id && (
                  <div className="space-y-2 mt-3 animate-fade-up">
                    <div className="flex items-center gap-2 text-muted-foreground text-sm">
                      <MapPin className="w-4 h-4 text-gold" />
                      {branch.address}
                    </div>
                    <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                      <Phone className="w-4 h-4 text-gold" />
                      <span dir="ltr">{branch.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-primary-foreground/60 text-sm">
                      <Clock className="w-4 h-4 text-gold" />
                      {branch.hours}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchMap;
