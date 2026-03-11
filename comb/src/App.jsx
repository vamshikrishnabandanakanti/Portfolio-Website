import Hero from './components/Hero/Hero';
import ScrollyCanvas from './components/About/ScrollyCanvas';
import Overlay from './components/About/Overlay';
// import Projects from './components/About/Projects';
import Demo from './components/curious/demo';

import StorySection from './components/story/StorySection';
import SkillsSection from './components/skills/SkillsSection';
import ProjectsDemo from './components/projects/demo';
import ContactPage from './components/Contact/ContactPage';
import { NavBarDemo } from './components/ui/navbar-demo';
import './index.css';

function App() {
  return (
    <div className="app-container selection:bg-white selection:text-black relative">
      <NavBarDemo />

      <div id="home">
        <Hero />
      </div>

      {/* Added AnimatedLetterText Demo temporarily */}
      <div className="relative z-10 bg-white w-full">
        <Demo />
      </div>




      <div id="about" className="relative w-full" style={{ minHeight: "100vh", isolation: "isolate" }}>
        <ScrollyCanvas frameCount={240} />
        <Overlay />
      </div>

      <StorySection />

      {/* Infinite Hardware-Accelerated Skills Marquee */}
      <SkillsSection />

      <div id="projects">
        <ProjectsDemo />
      </div>

      <div id="contact">
        <ContactPage />
      </div>

    </div>
  );
}

export default App;