import { useRef, useState, useEffect } from "react";

const cards = [
  {
    id: "instagram",
    name: "Instagram",
    stat: "625k followers",
    cta: "Follow",
    icon: "fa-instagram",
    blob: "radial-gradient(circle at 30% 30%, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
    iconGradient: "linear-gradient(145deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
    iconShadowColor: "rgba(238,42,123,0.5)",
    iconBg: "rgba(238,42,123,0.1)",
    iconBorder: "rgba(238,42,123,0.3)",
    ctaColor: "#ee2a7b",
    ctaBg: "rgba(238,42,123,0.1)",
    ctaBorder: "rgba(238,42,123,0.35)",
    shadow: "rgba(238,42,123,0.2)",
    floatDelay: 0,
  },
  {
    id: "linkedin",
    name: "LinkedIn",
    stat: "100k connections",
    cta: "Connect",
    icon: "fa-linkedin-in",
    blob: "radial-gradient(circle at 30% 30%, #0a66c2 0%, #00a0dc 100%)",
    iconGradient: "linear-gradient(145deg, #5eb0f5 0%, #0a66c2 60%, #084e96 100%)",
    iconShadowColor: "rgba(10,102,194,0.5)",
    iconBg: "rgba(10,102,194,0.1)",
    iconBorder: "rgba(10,102,194,0.3)",
    ctaColor: "#0a66c2",
    ctaBg: "rgba(10,102,194,0.1)",
    ctaBorder: "rgba(10,102,194,0.35)",
    shadow: "rgba(10,102,194,0.22)",
    floatDelay: 0.4,
  },
  {
    id: "gmail",
    name: "Gmail",
    stat: "320k subscribers",
    cta: "Mail me",
    icon: "fa-google",
    blob: "radial-gradient(circle at 20% 30%, #ea4335 0%, #fbbc05 40%, #4285f4 100%)",
    iconGradient: "linear-gradient(145deg, #ff7b6b 0%, #ea4335 50%, #c5221f 100%)",
    iconShadowColor: "rgba(234,67,53,0.5)",
    iconBg: "rgba(234,67,53,0.1)",
    iconBorder: "rgba(234,67,53,0.3)",
    ctaColor: "#ea4335",
    ctaBg: "rgba(234,67,53,0.1)",
    ctaBorder: "rgba(234,67,53,0.35)",
    shadow: "rgba(234,67,53,0.2)",
    floatDelay: 0.8,
  },
  {
    id: "whatsapp",
    name: "WhatsApp",
    stat: "50k contacts",
    cta: "Message",
    icon: "fa-whatsapp",
    blob: "radial-gradient(circle at 30% 30%, #25d366 0%, #128c7e 60%, #075e54 100%)",
    iconGradient: "linear-gradient(145deg, #6ef5a0 0%, #25d366 50%, #128c7e 100%)",
    iconShadowColor: "rgba(37,211,102,0.5)",
    iconBg: "rgba(37,211,102,0.1)",
    iconBorder: "rgba(37,211,102,0.3)",
    ctaColor: "#128c7e",
    ctaBg: "rgba(37,211,102,0.1)",
    ctaBorder: "rgba(37,211,102,0.35)",
    shadow: "rgba(37,211,102,0.2)",
    floatDelay: 1.2,
  },
  {
    id: "github",
    name: "GitHub",
    stat: "150k followers",
    cta: "Follow",
    icon: "fa-github",
    blob: "radial-gradient(circle at 30% 30%, #6e40c9 0%, #8b949e 60%, #e6edf3 100%)",
    iconGradient: "linear-gradient(145deg, #6e40c9 0%, #4a4a5a 60%, #1a1a2e 100%)",
    iconShadowColor: "rgba(110,64,201,0.5)",
    iconBg: "rgba(110,64,201,0.1)",
    iconBorder: "rgba(110,64,201,0.3)",
    ctaColor: "#6e40c9",
    ctaBg: "rgba(110,64,201,0.1)",
    ctaBorder: "rgba(110,64,201,0.35)",
    shadow: "rgba(110,64,201,0.2)",
    floatDelay: 1.6,
  },
];

type CardData = (typeof cards)[number];

function SocialCard({ card }: { card: CardData }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const blobRef = useRef<HTMLDivElement>(null);
  const shimmerRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current!;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;

    // tilt: max ±6deg
    const tiltX = ((y - cy) / cy) * -6;
    const tiltY = ((x - cx) / cx) * 6;

    el.style.transform = `translateY(-6px) scale(1.04) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

    if (shimmerRef.current) {
      shimmerRef.current.style.background = `radial-gradient(220px circle at ${x}px ${y}px, rgba(255,255,255,0.55), transparent 65%)`;
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (blobRef.current) {
      blobRef.current.style.opacity = "0.35";
      blobRef.current.style.transform = "translate(-50%, -50%) scale(1)";
    }
    if (shimmerRef.current) shimmerRef.current.style.opacity = "1";
    if (cardRef.current) {
      cardRef.current.style.boxShadow = `0 16px 48px ${card.shadow}, 0 4px 16px rgba(0,0,0,0.08)`;
      cardRef.current.style.animationPlayState = "paused";
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (blobRef.current) {
      blobRef.current.style.opacity = "0";
      blobRef.current.style.transform = "translate(-50%, -50%) scale(0.5)";
    }
    if (shimmerRef.current) shimmerRef.current.style.opacity = "0";
    if (cardRef.current) {
      cardRef.current.style.transform = "";
      cardRef.current.style.boxShadow = "";
      cardRef.current.style.animationPlayState = "running";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        width: 148,
        height: 188,
        borderRadius: 20,
        position: "relative",
        cursor: "pointer",
        transformStyle: "preserve-3d",
        transition: "box-shadow 0.4s ease",
        flexShrink: 0,
        animation: `float 3s ease-in-out ${card.floatDelay}s infinite`,
      }}
    >
      {/* Glass surface */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: 20,
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(16px) saturate(1.8)",
          WebkitBackdropFilter: "blur(16px) saturate(1.8)",
          border: "1px solid rgba(255,255,255,0.85)",
          boxShadow: "inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.04)",
          overflow: "hidden",
        }}
      >
        {/* Brand blob */}
        <div
          ref={blobRef}
          style={{
            position: "absolute",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: card.blob,
            filter: "blur(50px)",
            opacity: 0,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%) scale(0.5)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            pointerEvents: "none",
          }}
        />
        {/* Shimmer */}
        <div
          ref={shimmerRef}
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0,
            transition: "opacity 0.25s ease",
            pointerEvents: "none",
            borderRadius: 20,
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          padding: "18px 14px 16px",
        }}
      >
        {/* 3D Icon box */}
        <div
          style={{
            width: 52,
            height: 52,
            borderRadius: 14,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            background: hovered ? card.iconBg : "rgba(255,255,255,0.7)",
            border: `1px solid ${hovered ? card.iconBorder : "rgba(255,255,255,0.9)"}`,
            backdropFilter: "blur(8px)",
            transition: "all 0.35s ease",
            marginBottom: 2,
            boxShadow: hovered
              ? `inset 0 1px 0 rgba(255,255,255,0.8), 0 6px 20px ${card.iconShadowColor}`
              : "inset 0 1px 0 rgba(255,255,255,0.9), 0 2px 8px rgba(0,0,0,0.08)",
          }}
        >
          {/* Gloss */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "45%",
              borderRadius: "14px 14px 50% 50%",
              background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)",
              pointerEvents: "none",
            }}
          />
          <i
            className={`fa-brands ${card.icon}`}
            style={{
              fontSize: "1.45rem",
              background: hovered
                ? card.iconGradient
                : "linear-gradient(145deg, #555, #999)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: hovered
                ? `drop-shadow(0 2px 5px ${card.iconShadowColor})`
                : "drop-shadow(0 1px 2px rgba(0,0,0,0.15))",
              transition: "all 0.35s ease",
              position: "relative",
              zIndex: 1,
            }}
          />
        </div>

        <h2
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "0.82rem",
            fontWeight: 700,
            color: "#1a1a2e",
            letterSpacing: "0.1px",
          }}
        >
          {card.name}
        </h2>

        <div style={{ width: "75%", height: 1, background: "rgba(0,0,0,0.07)", borderRadius: 1 }} />

        <p style={{ fontSize: "0.65rem", color: "rgba(0,0,0,0.4)", letterSpacing: "0.3px" }}>
          {card.stat}
        </p>

        <CtaButton card={card} />
      </div>
    </div>
  );
}

function CtaButton({ card }: { card: CardData }) {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <a
      ref={ref}
      href="#"
      onMouseEnter={() => {
        if (ref.current) {
          ref.current.style.color = "#fff";
          ref.current.style.background = card.ctaColor;
          ref.current.style.borderColor = card.ctaColor;
          ref.current.style.boxShadow = `0 4px 14px ${card.shadow}`;
        }
      }}
      onMouseLeave={() => {
        if (ref.current) {
          ref.current.style.color = card.ctaColor;
          ref.current.style.background = card.ctaBg;
          ref.current.style.borderColor = card.ctaBorder;
          ref.current.style.boxShadow = "none";
        }
      }}
      style={{
        marginTop: 2,
        display: "inline-flex",
        alignItems: "center",
        gap: 4,
        fontSize: "0.65rem",
        fontWeight: 600,
        color: card.ctaColor,
        background: card.ctaBg,
        border: `1px solid ${card.ctaBorder}`,
        borderRadius: 30,
        padding: "4px 13px",
        textDecoration: "none",
        transition: "all 0.22s ease",
        cursor: "pointer",
        letterSpacing: "0.2px",
      }}
    >
      <i className="fa-solid fa-link" style={{ fontSize: "0.55rem" }} />
      {card.cta}
    </a>
  );
}

export default function SocialCards() {
  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap" rel="stylesheet" />

      <style>{`
        @keyframes float {
          0%   { transform: translateY(0px); }
          50%  { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "linear-gradient(135deg, #e8eaf6 0%, #fce4ec 40%, #e3f2fd 80%, #f3e5f5 100%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'DM Sans', sans-serif",
          padding: "40px 24px",
          position: "relative",
          overflow: "hidden",
          perspective: "1000px",
        }}
      >
        {/* Soft bg orbs */}
        <div style={{ position: "fixed", width: 500, height: 500, borderRadius: "50%", background: "rgba(238,42,123,0.08)", filter: "blur(80px)", top: -100, left: -80, pointerEvents: "none" }} />
        <div style={{ position: "fixed", width: 400, height: 400, borderRadius: "50%", background: "rgba(10,102,194,0.08)", filter: "blur(80px)", bottom: -60, right: -60, pointerEvents: "none" }} />
        <div style={{ position: "fixed", width: 350, height: 350, borderRadius: "50%", background: "rgba(37,211,102,0.07)", filter: "blur(80px)", top: "50%", left: "50%", transform: "translate(-50%,-50%)", pointerEvents: "none" }} />

        <h1
          style={{
            position: "relative",
            zIndex: 1,
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(1.6rem, 4vw, 2.8rem)",
            fontWeight: 800,
            color: "#1a1a2e",
            letterSpacing: -0.5,
            textAlign: "center",
            marginBottom: 6,
          }}
        >
          Social <span style={{ color: "#ee2a7b" }}>Connect</span>
        </h1>

        <p
          style={{
            position: "relative",
            zIndex: 1,
            color: "rgba(0,0,0,0.35)",
            fontSize: "0.75rem",
            letterSpacing: "3px",
            textTransform: "uppercase",
            marginBottom: 48,
          }}
        >
          Hover to interact
        </p>

        <div
          style={{
            position: "relative",
            zIndex: 1,
            display: "flex",
            flexDirection: "row",
            gap: 16,
            justifyContent: "center",
            alignItems: "center",
            flexWrap: "nowrap",
            perspective: "800px",
          }}
        >
          {cards.map((card) => (
            <SocialCard key={card.id} card={card} />
          ))}
        </div>
      </div>
    </>
  );
}
