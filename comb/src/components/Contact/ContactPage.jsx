import React, { useRef, useState } from "react";

const cards = [
  {
    id: "instagram", name: "Instagram",
    imageUrl: "",
    stats: "625k followers",
    actionText: "Follow me",
    actionIcon: "fa-brands fa-instagram",
    color: "#ec4899",
    blob: "radial-gradient(circle at 30% 30%, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
    iconGradient: "linear-gradient(145deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%)",
    iconShadow: "rgba(238,42,123,0.5)",
    shadow: "rgba(236,72,153,0.25)",
    floatDelay: "0s",
  },
  {
    id: "linkedin", name: "Linkedin",
    imageUrl: "",
    stats: "100k connections",
    actionText: "Connect",
    actionIcon: "fa-brands fa-linkedin-in",
    color: "#3b82f6",
    blob: "radial-gradient(circle at 30% 30%, #0a66c2 0%, #8a922dff 100%)",
    iconGradient: "linear-gradient(145deg, #5eb0f5 0%, #0a66c2 60%, #084e96 100%)",
    iconShadow: "rgba(10,102,194,0.5)",
    shadow: "rgba(59,130,246,0.25)",
    floatDelay: "0.4s",
  },
  {
    id: "whatsapp", name: "WhatsApp",
    // 👇 PASTE WHATSAPP PROFILE IMAGE URL HERE
    imageUrl: "",
    stats: "50k contacts",
    actionText: "Message",
    actionIcon: "fa-brands fa-whatsapp",
    color: "#10b981",
    blob: "radial-gradient(circle at 30% 30%, #25d366 0%, #128c7e 60%, #075e54 100%)",
    iconGradient: "linear-gradient(145deg, #6ef5a0 0%, #25d366 50%, #128c7e 100%)",
    iconShadow: "rgba(37,211,102,0.5)",
    shadow: "rgba(16,185,129,0.25)",
    floatDelay: "0.6s",
  },
  {
    id: "gmail", name: "Gmail",
    // 👇 PASTE GMAIL / EMAIL PROFILE IMAGE URL HERE
    imageUrl: "",
    stats: "320k subscribers",
    actionText: "Mail me",
    actionIcon: "fa-regular fa-envelope",
    color: "#ef4444",
    blob: "radial-gradient(circle at 20% 30%, #ea4335 0%, #fbbc05 40%, #4285f4 100%)",
    iconGradient: "linear-gradient(145deg, #ff7b6b 0%, #ea4335 50%, #c5221f 100%)",
    iconShadow: "rgba(234,67,53,0.5)",
    shadow: "rgba(239,68,68,0.25)",
    floatDelay: "0.8s",
  },
];

function StarRating({ totalStars = 5, defaultValue = 4 }) {
  const [rating, setRating] = useState(defaultValue);
  const [hover, setHover] = useState(0);
  return (
    <div style={{ display: "flex", gap: 3 }}>
      {Array.from({ length: totalStars }, (_, i) => i + 1).map((star) => {
        const active = (hover || rating) >= star;
        return (
          <button key={star} type="button" onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)} onMouseLeave={() => setHover(0)}
            style={{
              background: "none", border: "none", cursor: "pointer", padding: 0,
              transform: hover === star ? "scale(1.3) rotate(-8deg)" : "scale(1)",
              transition: "transform 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}>
            <svg width={18} height={18} viewBox="0 0 24 24"
              fill={active ? "#f59e0b" : "none"}
              stroke={active ? "#f59e0b" : "#d1d5db"} strokeWidth="1.5"
              style={{ display: "block", filter: active ? "drop-shadow(0 2px 5px rgba(245,158,11,0.4))" : "none", transition: "all 0.25s ease" }}>
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

function SocialCard({ card }) {
  const cardRef = useRef(null);
  const blobRef = useRef(null);
  const shimmerRef = useRef(null);
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const el = cardRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2, cy = rect.height / 2;
    const tiltX = ((y - cy) / cy) * -6;
    const tiltY = ((x - cx) / cx) * 6;
    el.style.transform = `translateY(-6px) scale(1.03) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    if (shimmerRef.current) {
      shimmerRef.current.style.background = `radial-gradient(120px circle at ${x}px ${y}px, rgba(255,255,255,0.55), transparent 70%)`;
    }
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (blobRef.current) { blobRef.current.style.opacity = "0.5"; blobRef.current.style.transform = "translate(-50%,-50%) scale(1)"; }
    if (shimmerRef.current) shimmerRef.current.style.opacity = "1";
    if (cardRef.current) {
      cardRef.current.style.boxShadow = `0 16px 40px ${card.shadow}, 0 4px 16px rgba(0,0,0,0.08)`;
      cardRef.current.style.animationPlayState = "paused";
      cardRef.current.style.borderColor = "rgba(255,255,255,0.98)";
      cardRef.current.style.background = "rgba(255,255,255,0.62)";
    }
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (blobRef.current) { blobRef.current.style.opacity = "0"; blobRef.current.style.transform = "translate(-50%,-50%) scale(0.5)"; }
    if (shimmerRef.current) shimmerRef.current.style.opacity = "0";
    if (cardRef.current) {
      cardRef.current.style.transform = "";
      cardRef.current.style.boxShadow = "0 2px 16px rgba(99,102,241,0.07), inset 0 1px 0 rgba(255,255,255,0.9)";
      cardRef.current.style.borderColor = "rgba(255,255,255,0.75)";
      cardRef.current.style.background = "rgba(255,255,255,0.38)";
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
        /* ── Fixed square shape ── */
        width: "100%",
        aspectRatio: "1 / 1",
        borderRadius: 24,
        padding: "24px 16px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        /* ── Glassmorphism ── */
        background: "rgba(255,255,255,0.45)",
        backdropFilter: "blur(25px) saturate(1.8)",
        WebkitBackdropFilter: "blur(25px) saturate(1.8)",
        border: "1px solid rgba(255,255,255,0.8)",
        boxShadow: "0 8px 32px rgba(31,38,135,0.06), inset 0 1px 0 rgba(255,255,255,0.95)",
        transition: "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
        transformStyle: "preserve-3d",
        animation: `floatCard 4s ease-in-out ${card.floatDelay} infinite`,
        boxSizing: "border-box",
      }}
    >
      {/* Brand blob */}
      <div ref={blobRef} style={{
        position: "absolute", width: "140%", height: "140%", borderRadius: "50%",
        background: card.blob, filter: "blur(35px)", opacity: 0,
        top: "50%", left: "50%",
        transform: "translate(-50%,-50%) scale(0.6)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
        pointerEvents: "none",
      }} />

      {/* Mouse shimmer */}
      <div ref={shimmerRef} style={{
        position: "absolute", inset: 0, opacity: 0,
        transition: "opacity 0.25s ease", pointerEvents: "none", borderRadius: 24,
      }} />

      {/* Top gloss */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "50%",
        borderRadius: "24px 24px 60% 60%",
        background: "linear-gradient(180deg, rgba(255,255,255,0.7) 0%, transparent 100%)",
        pointerEvents: "none",
      }} />

      {/* Icon or profile image */}
      <div style={{ position: "relative", zIndex: 1, flexShrink: 0, marginBottom: 12 }}>
        {card.imageUrl ? (
          <div style={{
            width: 64, height: 64, borderRadius: "50%", overflow: "hidden",
            border: `2px solid ${hovered ? card.color : "rgba(255,255,255,0.95)"}`,
            boxShadow: hovered ? `0 0 0 4px ${card.color}22, 0 8px 24px ${card.iconShadow}` : "0 0 0 2px rgba(255,255,255,0.8), 0 4px 12px rgba(0,0,0,0.08)",
            transition: "all 0.35s ease",
          }}>
            <img src={card.imageUrl} alt={card.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        ) : (
          <div style={{
            width: 64, height: 64, borderRadius: 20,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: hovered ? `${card.color}15` : "rgba(255,255,255,0.8)",
            border: `1.5px solid ${hovered ? card.color + "44" : "rgba(255,255,255,1)"}`,
            boxShadow: hovered ? `inset 0 1px 0 rgba(255,255,255,0.9), 0 8px 20px ${card.iconShadow}` : "inset 0 1px 0 rgba(255,255,255,1), 0 3px 10px rgba(0,0,0,0.05)",
            transition: "all 0.35s ease", overflow: "hidden", position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "45%", borderRadius: "20px 20px 50% 50%", background: "linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)", pointerEvents: "none" }} />
            <i className={card.actionIcon} style={{
              fontSize: "1.8rem",
              background: hovered ? card.iconGradient : "linear-gradient(145deg, #999, #bbb)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              filter: hovered ? `drop-shadow(0 3px 6px ${card.iconShadow})` : "none",
              transition: "all 0.35s ease", position: "relative", zIndex: 1,
            }} />
          </div>
        )}
      </div>

      {/* Name + stats */}
      <div style={{ position: "relative", zIndex: 1, textAlign: "center", width: "100%", marginBottom: 10 }}>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.1rem", color: "#0f172a", letterSpacing: "-0.2px" }}>{card.name}</div>
        <div style={{ fontSize: "0.75rem", color: "#64748b", fontWeight: 600, marginTop: 4 }}>{card.stats}</div>
      </div>

      {/* CTA button */}
      <button
        style={{
          position: "relative", zIndex: 1,
          padding: "8px 16px", borderRadius: 30,
          border: `1.5px solid ${card.color}44`,
          background: hovered ? card.color : "rgba(255,255,255,0.6)",
          backdropFilter: "blur(10px)",
          color: hovered ? "#fff" : card.color,
          fontFamily: "'DM Sans', sans-serif", fontWeight: 700,
          fontSize: "0.75rem", cursor: "pointer",
          transition: "all 0.25s ease",
          display: "flex", alignItems: "center", gap: 6,
          letterSpacing: "0.3px", whiteSpace: "nowrap",
          width: "100%", justifyContent: "center",
          boxShadow: hovered ? `0 6px 20px ${card.shadow}` : "none",
          transform: hovered ? "scale(1.05)" : "scale(1)",
        }}>
        <i className="fa-solid fa-link" style={{ fontSize: "0.7rem" }} />
        {card.actionText}
      </button>
    </div>
  );
}

function FormInput({ label, type = "text", placeholder, textarea = false }) {
  const [focused, setFocused] = useState(false);
  const base = {
    width: "100%", padding: "9px 13px", borderRadius: 10,
    border: `1.5px solid ${focused ? "#a5b4fc" : "#e8ecf0"}`,
    background: focused ? "#fefeff" : "#f8fafc",
    fontSize: "0.84rem", fontFamily: "'DM Sans', sans-serif",
    outline: "none", transition: "all 0.28s ease",
    boxShadow: focused ? "0 0 0 3px rgba(165,180,252,0.2), 0 2px 8px rgba(0,0,0,0.04)" : "none",
    color: "#1e293b", boxSizing: "border-box",
  };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 11 }}>
      <label style={{
        fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase",
        color: focused ? "#6366f1" : "#94a3b8",
        fontFamily: "'DM Sans', sans-serif", transition: "color 0.28s ease",
      }}>{label}</label>
      {textarea
        ? <textarea onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} style={{ ...base, minHeight: 78, maxHeight: 78, resize: "none" }} />
        : <input type={type} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          placeholder={placeholder} style={base} />
      }
    </div>
  );
}

export default function ContactPage() {
  const [submitHovered, setSubmitHovered] = useState(false);

  return (
    <>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet" />
      <style>{`
        @keyframes floatCard {
          0%,100% { transform: translateY(0px); }
          50%      { transform: translateY(-6px); }
        }
        @keyframes revealUp {
          from { opacity:0; transform:translateY(24px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes driftA {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(28px,-18px) scale(1.06); }
        }
        @keyframes driftB {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(-22px,16px) scale(1.05); }
        }
        @keyframes driftC {
          0%,100% { transform: translate(0,0) scale(1); }
          50%     { transform: translate(16px,20px) scale(1.04); }
        }
        *, *::before, *::after { box-sizing:border-box; margin:0; padding:0; }
        ::placeholder { color:#c0cad6 !important; }
      `}</style>

      <div style={{
        height: "100vh", width: "100vw", overflow: "hidden",
        position: "relative", fontFamily: "'DM Sans', sans-serif",
        background: "linear-gradient(145deg, #faf5ff 0%, #f0f4ff 28%, #e9f3fd 58%, #f0fdf8 100%)",
      }}>
        <div style={{ position: "absolute", width: 560, height: 560, borderRadius: "50%", background: "radial-gradient(circle, rgba(199,210,254,0.42) 0%, transparent 65%)", top: "-130px", left: "-90px", animation: "driftA 15s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 480, height: 480, borderRadius: "50%", background: "radial-gradient(circle, rgba(186,230,253,0.38) 0%, transparent 65%)", bottom: "-110px", right: "-70px", animation: "driftB 18s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(254,205,211,0.32) 0%, transparent 65%)", top: "32%", right: "16%", animation: "driftC 21s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", width: 260, height: 260, borderRadius: "50%", background: "radial-gradient(circle, rgba(187,247,208,0.38) 0%, transparent 65%)", bottom: "14%", left: "6%", animation: "driftA 24s ease-in-out infinite reverse", pointerEvents: "none" }} />

        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.3, pointerEvents: "none" }}>
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse">
              <circle cx="1.5" cy="1.5" r="1.1" fill="#c7d2fe" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" />
        </svg>

        <div style={{
          position: "relative", zIndex: 1, height: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "2vh 2vw",
        }}>
          <div style={{
            width: "min(1280px, 96vw)",
            height: "min(720px, 92vh)",
            background: "rgba(255,255,255,0.74)",
            backdropFilter: "blur(30px)",
            WebkitBackdropFilter: "blur(30px)",
            borderRadius: 24,
            border: "1px solid rgba(255,255,255,0.92)",
            boxShadow: "0 8px 40px rgba(99,102,241,0.08), 0 2px 16px rgba(0,0,0,0.05), inset 0 1px 0 #fff",
            display: "grid",
            gridTemplateColumns: "60% 40%",
            overflow: "hidden",
            animation: "revealUp 0.75s cubic-bezier(0.16,1,0.3,1) forwards",
            position: "relative",
          }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2.5, zIndex: 10, background: "linear-gradient(90deg, #a5b4fc, #f9a8d4, #6ee7b7, #93c5fd)", borderRadius: "24px 24px 0 0" }} />

            {/* ── LEFT ── */}
            <div style={{ padding: "32px 40px", borderRight: "1px solid rgba(226,232,240,0.7)", display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
              <div>
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", background: "linear-gradient(135deg,rgba(236,253,245,0.95),rgba(240,253,244,0.9))", border: "1px solid rgba(110,231,183,0.55)", borderRadius: 20, marginBottom: 16 }}>
                  <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#10b981", boxShadow: "0 0 8px rgba(16,185,129,0.55)" }} />
                  <span style={{ fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", color: "#059669" }}>Available for work</span>
                </div>

                <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2.2rem, 4vw, 3.6rem)", fontWeight: 800, color: "#0f172a", lineHeight: 1.05, letterSpacing: "-1.5px", marginBottom: 12 }}>
                  Let's build<br />
                  <span style={{ background: "linear-gradient(130deg, #6366f1 0%, #ec4899 50%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                    something great
                  </span>
                </h1>

                <p style={{ fontSize: "1.05rem", color: "#64748b", lineHeight: 1.6, maxWidth: "90%", marginBottom: 32 }}>
                  Have a project idea or just want to connect? Reach out — I'd love to explore how we can collaborate and create together.
                </p>

                <div style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.9))", border: "1px solid rgba(226,232,240,0.85)", borderRadius: 16, padding: "16px 20px", marginBottom: 40, boxShadow: "0 4px 15px rgba(0,0,0,0.03)", position: "relative", overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "linear-gradient(90deg, #f9ce34, #ee2a7b, #6228d7)" }} />
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1rem", color: "#1e293b" }}>Rate my Portfolio</div>
                      <div style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: 2 }}>Tell me what you think</div>
                    </div>
                    <StarRating defaultValue={4} />
                  </div>
                </div>
              </div>

              {/* Social cards — larger grid */}
              <div>
                <div style={{ fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#94a3b8", marginBottom: 16 }}>Find me on</div>
                <div style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 16,
                  perspective: "1000px",
                }}>
                  {cards.map(card => <SocialCard key={card.id} card={card} />)}
                </div>
              </div>
            </div>

            {/* ── RIGHT ── */}
            <div style={{ padding: "28px 32px", background: "rgba(248,250,252,0.45)", display: "flex", flexDirection: "column" }}>
              <div style={{ marginBottom: 18 }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#0f172a", letterSpacing: "-0.3px" }}>Send a Message</h2>
                <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: 3 }}>I'll get back to you within 24 hours.</p>
              </div>

              <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                  <FormInput label="Name" placeholder="John Doe" />
                  <FormInput label="Email" type="email" placeholder="john@example.com" />
                </div>
                <FormInput label="Phone" type="tel" placeholder="+1 (555) 000-0000" />
                <FormInput label="Message" textarea placeholder="How can I help you?" />
                <div style={{ flex: 1 }} />
                <button
                  onMouseEnter={() => setSubmitHovered(true)}
                  onMouseLeave={() => setSubmitHovered(false)}
                  style={{
                    width: "100%", padding: "13px", borderRadius: 11, border: "none",
                    background: submitHovered
                      ? "linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #db2777 100%)"
                      : "linear-gradient(135deg, #6366f1 0%, #8b5cf6 50%, #ec4899 100%)",
                    color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.88rem",
                    cursor: "pointer", transition: "all 0.32s cubic-bezier(0.175,0.885,0.32,1.275)",
                    boxShadow: submitHovered ? "0 10px 28px rgba(99,102,241,0.32), 0 4px 10px rgba(0,0,0,0.08)" : "0 4px 16px rgba(99,102,241,0.2), 0 2px 6px rgba(0,0,0,0.05)",
                    transform: submitHovered ? "translateY(-2px)" : "translateY(0)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    gap: 8, letterSpacing: "0.02em", marginTop: 4,
                  }}>
                  <span>Send Message</span>
                  <i className="fa-solid fa-paper-plane" style={{ fontSize: "0.78rem", transform: submitHovered ? "translateX(3px) translateY(-2px)" : "none", transition: "transform 0.3s ease" }} />
                </button>
                <p style={{ textAlign: "center", marginTop: 10, fontSize: "0.7rem", color: "#cbd5e1" }}>Your message is safe with me ✦</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}