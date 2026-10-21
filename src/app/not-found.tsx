import Link from "next/link";
import { ArrowRight, Home } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageIntro from "@/components/PageIntro";

export default function NotFound() {
  return <div className="audience-site space-subpage"><Navbar /><main id="main-content"><PageIntro title="A little off orbit." lead="That page isn’t here. Let’s get you back to DevFest." motif="guide" meta="404 · Page not found" /><section className="audience-section"><div className="audience-wrap space-recovery-actions"><Link href="/" className="audience-button space-primary-button"><Home className="audience-icon" aria-hidden="true" />Back to DevFest</Link><Link href="/#flow" className="audience-text-link">Explore the themes<ArrowRight className="audience-icon" aria-hidden="true" /></Link></div></section></main><Footer /></div>;
}
