
import { useEffect, useRef } from "react";
import { SocialIcon } from "react-social-icons";
import { Button } from "@/components/Button";
import { ArrowRight, Download } from "lucide-react";

const skills = [
  "React",
  "Node.js",
  "JavaScript",
  "Python",
  "Java",
  "MongoDB",
  "Docker",
  "Figma",
  "Robot Automation",
  "HDFS",
  "Git",
  "GitHub Actions",
];

const SKY = "132,179,206"; // #84b3ce
const DEEP = "22,88,123"; // #16587b

export const Hero = ({ children }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
    ).matches;

    let w = 0;
    let h = 0;
    let raf = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      w = canvas.clientWidth;
      h = canvas.clientHeight;

      canvas.width = w * dpr;
      canvas.height = h * dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener("resize", resize);

    const glowDot = (x, y, r, color) => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * 3);

      g.addColorStop(0, `rgba(${color},0.9)`);
      g.addColorStop(1, `rgba(${color},0)`);

      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, r * 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = `rgb(${color})`;
      ctx.beginPath();
      ctx.arc(x, y, r, 0, Math.PI * 2);
      ctx.fill();
    };

    // Full-screen wireframe surface
    const drawMesh = (t) => {
      const cols = 64;
      const rows = 36;
      const pts = [];

      for (let j = 0; j <= rows; j++) {
        const row = [];
        const v = (j / rows) * 2 - 1;

        for (let i = 0; i <= cols; i++) {
          const u = (i / cols) * 2.3 - 1.15;

          const z =
              Math.sin(2.4 * u + t * 0.7) *
              Math.cos(1.7 * v - t * 0.5) +
              0.4 * Math.sin(4.5 * u - t * 0.9 + 2 * v) +
              0.25 * Math.cos(3 * v + u * 2 + t * 0.4);

          const px = w * 0.5 + u * w * 0.5 + v * w * 0.04;
          const py = h * 0.5 + v * h * 0.58 - z * h * 0.13;

          row.push([px, py, z]);
        }

        pts.push(row);
      }

      ctx.lineWidth = 0.7;

      const seg = (a, b) => {
        const alpha =
            0.2 +
            Math.min(0.45, Math.abs((a[2] + b[2]) / 2) * 0.3);

        ctx.strokeStyle = `rgba(${SKY},${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a[0], a[1]);
        ctx.lineTo(b[0], b[1]);
        ctx.stroke();
      };

      for (let j = 0; j <= rows; j++) {
        for (let i = 0; i < cols; i++) {
          seg(pts[j][i], pts[j][i + 1]);
        }
      }

      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j < rows; j++) {
          seg(pts[j][i], pts[j + 1][i]);
        }
      }
    };

    // Flowing curves
    const curves = [
      {
        y: 0.12,
        amp: 0.05,
        freq: 1.8,
        speed: 0.35,
        phase: 0.5,
        dash: true,
        dot: SKY,
        ds: 0.025,
      },
      {
        y: 0.24,
        amp: 0.08,
        freq: 2.6,
        speed: -0.45,
        phase: 1.5,
        dash: false,
        dot: SKY,
        ds: 0.04,
      },
      {
        y: 0.38,
        amp: 0.07,
        freq: 3.1,
        speed: 0.4,
        phase: 2.4,
        dash: true,
        dot: DEEP,
        ds: 0.035,
      },
      {
        y: 0.52,
        amp: 0.1,
        freq: 2.2,
        speed: 0.55,
        phase: 4.2,
        dash: false,
        dot: DEEP,
        ds: 0.06,
        hero: true,
      },
      {
        y: 0.65,
        amp: 0.09,
        freq: 1.6,
        speed: -0.3,
        phase: 3,
        dash: true,
        dot: SKY,
        ds: 0.03,
      },
      {
        y: 0.78,
        amp: 0.08,
        freq: 2.9,
        speed: 0.5,
        phase: 5.1,
        dash: false,
        dot: SKY,
        ds: 0.045,
      },
      {
        y: 0.9,
        amp: 0.05,
        freq: 2.0,
        speed: -0.35,
        phase: 0.9,
        dash: true,
        dot: DEEP,
        ds: 0.03,
      },
    ];

    const curveY = (c, x, t) =>
        h * c.y +
        Math.sin(
            (x / w) * Math.PI * 2 * c.freq + t * c.speed + c.phase,
        ) *
        h *
        c.amp;

    const drawCurves = (t) => {
      curves.forEach((c) => {
        ctx.setLineDash(c.dash ? [6, 7] : []);
        ctx.lineWidth = c.hero ? 1.6 : 1;

        ctx.strokeStyle = c.hero
            ? `rgba(${DEEP},0.25)`
            : `rgba(${SKY},${c.dash ? 0.35 : 0.6})`;

        ctx.beginPath();

        for (let x = 0; x <= w; x += 6) {
          const y = curveY(c, x, t);

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
        ctx.setLineDash([]);

        const px = ((t * c.ds + c.phase * 0.13) % 1) * w;

        glowDot(px, curveY(c, px, t), c.hero ? 4.5 : 3, c.dot);
      });
    };

    const frame = (ms) => {
      const t = reduceMotion ? 2 : ms / 1000;

      ctx.clearRect(0, 0, w, h);

      const bg = ctx.createRadialGradient(
          w * 0.5,
          h * 0.5,
          0,
          w * 0.5,
          h * 0.5,
          Math.max(w, h) * 0.7,
      );

      bg.addColorStop(0, `rgba(${SKY},0.22)`);
      bg.addColorStop(1, "rgba(245,238,221,0)");

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      drawMesh(t);
      drawCurves(t);

      if (!reduceMotion) {
        raf = requestAnimationFrame(frame);
      }
    };

    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
      <section
          className="relative min-h-screen w-full overflow-hidden flex items-center"
          style={{ backgroundColor: "#f5eedd" }}
      >
        {/* Animated mathematical background */}
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-50"
            aria-hidden="true"
        />

        {/* Main content */}
        <div className="container relative z-10 mx-auto px-6 pt-32 pb-20">
          {/* Two-column layout: text on the left, photo on the right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* LEFT COLUMN */}
            <div className="flex flex-col items-start gap-6">
              {/* Role badge */}
              <div className="animate-fade-in">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer
              </span>
              </div>

              {/* Additional content passed into Hero */}
              {children}

              {/* Headline and introduction */}
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                  Enjoying
                  <span className="text-primary"> logic </span>
                  <br />
                  behind the
                  <span className="text-primary italic"> code. </span>
                </h1>

                <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                  Hi, I'm Diya Shrestha - a software engineer with a
                  background in computational mathematics and a passion
                  for algorithms, data science, and AI. I build reliable
                  software solutions by combining engineering,
                  mathematical thinking, and analytical problem-solving.
                </p>
              </div>

              {/* Call-to-action buttons */}
              <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
                <Button size="lg">
                  Contact Me <ArrowRight />
                </Button>

                <Button size="lg">
                <span className="relative flex items-center justify-center gap-2">
                  <Download className="w-5 h-5" />
                  Download CV
                </span>
                </Button>
              </div>

              {/* Social links */}
              <div className="social-container flex items-center gap-4 animate-fade-in animation-delay-400">
                <SocialIcon
                    url="https://www.linkedin.com/in/diya-shrestha-10a66820b/"
                    className="hover:scale-110 hover:opacity-90 duration-300"
                />

                <SocialIcon
                    url="https://github.com/shresthadiya"
                    className="hover:scale-110 hover:opacity-90 duration-300"
                />

                <SocialIcon
                    url="mailto:diyashrestha2001@gmail.com"
                    className="hover:scale-110 hover:opacity-90 duration-300"
                />
              </div>
            </div>

            {/* RIGHT COLUMN */}
            <div className="relative animate-fade-in animation-delay-300 mt-4 lg:mt-0">
              <div className="relative max-w-md mx-auto">
                <div className="relative glass rounded-3xl p-2">
                  <img
                      src="/formal_photo.jpg"
                      alt="Diya Shrestha"
                      className="w-full aspect-[4/5] object-cover rounded-2xl"
                  />

                  {/* Open-to-work badge */}
                  <div className="absolute -bottom-4 -right-4 glass rounded-xl px-4 py-3 text-muted animate-float">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                      <span className="text-sm font-medium">
                      Open to work
                    </span>
                    </div>
                  </div>

                  {/* Experience badge */}
                  <div className="absolute -top-4 -left-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500">
                    <div className="text-2xl text-muted">2+</div>
                    <div className="text-xs text-muted-foreground">
                      Years Exp.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Skills ticker */}
          <div className="mt-20 animate-fade-in animation-delay-600">
            <p className="text-sm text-muted-foreground mb-6 text-center">
              Technologies I work with
            </p>

            <div className="relative overflow-hidden">
              <div className="flex animate-marquee">
                {[...skills, ...skills].map((skill, idx) => (
                    <div key={idx} className="flex-shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground/50 hover:text-muted-foreground transition-colors">
                    {skill}
                  </span>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
  );
};
