import { Home, User, Briefcase, Mail } from 'lucide-react'
import { NavBar } from "./tubelight-navbar"

export function NavBarDemo() {
    const navItems = [
        { name: 'Home', url: '#home', icon: Home },
        { name: 'About', url: '#about', icon: User },
        { name: 'Projects', url: '#projects', icon: Briefcase },
        { name: 'Contact', url: '#contact', icon: Mail }
    ]

    return <NavBar items={navItems} />
}
