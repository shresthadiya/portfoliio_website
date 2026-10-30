import { Navbar } from "@/layout/Navbar.jsx";
import { Hero } from "@/sections/Hero.jsx";
import { About } from "@/sections/About.jsx";
import { Projects } from "@/sections/Projects.jsx";
import { Experience } from "@/sections/Experience.jsx";
import { Contact } from "@/sections/Contact.jsx";
import { Activities } from "@/sections/Activities.jsx";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        <Activities />
      </main>
    </div>
  );
}

export default App;
