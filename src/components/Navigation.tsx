import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const navLinks = [
  { label: 'Use Cases', href: '#use-cases' },
  { label: 'Architecture', href: '#architecture' },
  { label: 'About', href: '#join' },
  { label: 'Contact', href: '#newsletter' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#F6F7FA]/90 backdrop-blur-md border-b border-[#0B0C10]/5'
            : 'bg-transparent'
        }`}
      >
        <div className="w-full px-6 lg:px-[6vw]">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <a
              href="#"
              className="text-[#0B0C10] font-semibold text-sm lg:text-base tracking-tight"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Agentic AI For Good
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => scrollToSection(link.href)}
                  className="text-[#0B0C10]/70 hover:text-[#0B0C10] text-sm font-medium transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
              <Button
                onClick={() => scrollToSection('#join')}
                className="bg-[#7B61FF] hover:bg-[#6B51EF] text-white rounded-full px-5 py-2 text-sm font-medium transition-all duration-200"
              >
                Submit a Use Case
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 text-[#0B0C10]"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-40 bg-[#F6F7FA] transition-transform duration-500 lg:hidden ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollToSection(link.href)}
              className="text-[#0B0C10] text-2xl font-semibold"
            >
              {link.label}
            </button>
          ))}
          <Button
            onClick={() => scrollToSection('#join')}
            className="bg-[#7B61FF] hover:bg-[#6B51EF] text-white rounded-full px-8 py-3 text-lg font-medium mt-4"
          >
            Submit a Use Case
          </Button>
        </div>
      </div>
    </>
  );
}
