import { AnimatedFolder, type Project } from "@/components/ui/3d-folder";

const portfolioData = [
    {
        title: "Branding",
        gradient: "linear-gradient(135deg, #e73827, #f85032)",
        projects: [
            { id: "b1", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800", title: "Lumnia Identity" },
            { id: "b2", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800", title: "Prism Collective" },
            { id: "b3", image: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=800", title: "Vertex Studio" },
            { id: "b4", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", title: "Aura Branding" },
            { id: "b5", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=800", title: "Zephyr Lab" },
        ] as Project[]
    },
    {
        title: "Web Design",
        gradient: "linear-gradient(to right, #f7b733, #fc4a1a)",
        projects: [
            { id: "w1", image: "https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&q=80&w=800", title: "Nexus Platform" },
            { id: "w2", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800", title: "Echo Analytics" },
            { id: "w3", image: "https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&q=80&w=800", title: "Flow Systems" },
            { id: "w4", image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800", title: "Code Nest" },
            { id: "w5", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800", title: "Dev Port" },
        ] as Project[]
    },
    {
        title: "UI/UX Design",
        gradient: "linear-gradient(135deg, #00c6ff, #0072ff)",
        projects: [
            { id: "u1", image: "https://images.unsplash.com/photo-1586717791821-3f44a563eb4c?auto=format&fit=crop&q=80&w=800", title: "Crypto Wallet" },
            { id: "u2", image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?auto=format&fit=crop&q=80&w=800", title: "Social Connect" },
            { id: "u3", image: "https://images.unsplash.com/photo-1522542550221-31fd19fe4af0?auto=format&fit=crop&q=80&w=800", title: "Health Tracker" },
            { id: "u4", image: "https://images.unsplash.com/photo-1559028012-481c04fa702d?auto=format&fit=crop&q=80&w=800", title: "Finance Dash" },
        ] as Project[]
    },
    {
        title: "Photography",
        gradient: "linear-gradient(to right, #414345, #232526)",
        projects: [
            { id: "p1", image: "https://images.unsplash.com/photo-1493863641943-9b68992a8d07?auto=format&fit=crop&q=80&w=800", title: "Urban Rhythms" },
            { id: "p2", image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&q=80&w=800", title: "Natural States" },
            { id: "p3", image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&q=80&w=800", title: "Silent Woods" },
        ] as Project[]
    },
    {
        title: "Illustration",
        gradient: "linear-gradient(135deg, #8e2de2, #4a00e0)",
        projects: [
            { id: "i1", image: "https://images.unsplash.com/photo-1618335829737-2228915674e0?auto=format&fit=crop&q=80&w=800", title: "Digital Flora" },
            { id: "i2", image: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?auto=format&fit=crop&q=80&w=800", title: "Neon Nights" },
            { id: "i3", image: "https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&q=80&w=800", title: "Abstract Worlds" },
        ] as Project[]
    },
    {
        title: "Motion",
        gradient: "linear-gradient(135deg, #f80759, #bc4e9c)",
        projects: [
            { id: "m1", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=800", title: "3D Sequences" },
            { id: "m2", image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800", title: "Glitch Art" },
            { id: "m3", image: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=800", title: "Tech Loops" },
        ] as Project[]
    }
];

export default function DemoOne() {
    return (
        <section
            style={{
                width: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "96px 24px",
                boxSizing: "border-box",
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(180deg, #f8f9fc 0%, #eef1f8 40%, #f0eef5 70%, #f7f5fa 100%)",
            }}
        >
            {/* Decorative gradient blobs */}
            <div style={{
                position: "absolute", top: "-120px", left: "-80px", width: "500px", height: "500px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
                filter: "blur(60px)", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", top: "30%", right: "-100px", width: "450px", height: "450px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(251,191,146,0.12) 0%, transparent 70%)",
                filter: "blur(60px)", pointerEvents: "none",
            }} />
            <div style={{
                position: "absolute", bottom: "-80px", left: "30%", width: "600px", height: "400px",
                borderRadius: "50%", background: "radial-gradient(circle, rgba(147,197,253,0.12) 0%, transparent 70%)",
                filter: "blur(80px)", pointerEvents: "none",
            }} />
            {/* Subtle noise/grain overlay */}
            <div style={{
                position: "absolute", inset: 0, opacity: 0.03, pointerEvents: "none",
                backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
            }} />
            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1280px", textAlign: "center", marginBottom: "64px" }}>
                <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4" style={{ color: "#0a0a0a" }}>
                    Design <span style={{ color: "#171717", fontStyle: "italic" }}>Portfolio</span>
                </h2>
                <p style={{ color: "rgba(0,0,0,0.5)", fontSize: "18px", maxWidth: "672px", margin: "0 auto" }}>
                    An interactive catalog of creative work. Hover over folders to reveal project previews.
                </p>
            </div>
            <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: "1280px" }}>
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "48px",
                        justifyItems: "center",
                    }}
                    className="grid-cols-1! md:grid-cols-2! lg:grid-cols-3!"
                >
                    {portfolioData.map((folder) => (
                        <AnimatedFolder
                            key={folder.title}
                            title={folder.title}
                            projects={folder.projects}
                            gradient={folder.gradient}
                            className="w-full"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
