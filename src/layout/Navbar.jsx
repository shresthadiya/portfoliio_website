import {Button} from "@/components/Button.jsx";
import {Menu, X} from "lucide-react";
import {useState} from "react";

const navLinks = [
    {href: "#about", label: "About"},
    {href: "#projects", label: "Projects"},
    {href: "#experience", label: "Experience"},
    {href: "#activities", label: "Activities"}
]


export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    return (
        <header className="fixed top-0 left-0 right-0 bg-transparent py-5 z-50">
            <nav className="container mx-auto px-6 flex items-center justify-between">
                <a href="#" className="text-xl font-bold tracking-tight hover:text-primary">
                    DS.
                </a>

                {/* For desktop view */}
                <div className="hidden md:flex items-center gap-1">
                    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
                        {navLinks.map((link, index) =>(
                            <a href={link.href} key={index} className="px-4 py-1 text-sm text-muted-foreground hover:text-primary-foreground rounded-full hover:bg-surface">{link.label}</a>
                        ))}
                    </div>
                </div>

                {/* Contact Me button */}
                <div className="hidden md:block">
                    <Button size="sm">Contact Me</Button>
                </div>

                {/* For mobile hamburger icon */}
                <button className="md:hidden p-2 text-foreground cursor-pointer hover:text-primary" onClick={() => setIsMobileMenuOpen((prev) => !prev)}>
                    {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
                </button>
            </nav>

            {/* For mobile menu */}
            {isMobileMenuOpen &&
                <div className="md:hidden glass animate-fade-in">
                <div className="container mx-auto p-6 flex flex-col gap-4">
                    {navLinks.map((link, index) => (
                        <a href={link.href} key={index}
                           className="text-lg text-muted-foreground hover:text-foreground py-2">{link.label}</a>
                    ))}
                    <Button>Contact Me</Button>
                </div>
            </div>}
        </header>
    );

};