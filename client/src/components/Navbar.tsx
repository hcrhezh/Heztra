import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  
  const isHomePage = location === "/";
  
  // Handle scroll event to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };
  
  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled || !isHomePage ? 'bg-white/90 backdrop-blur-sm shadow-sm' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl font-heading font-bold text-primary">
            Polifilo<span className="text-secondary">.</span>
          </Link>
          
          <div className="hidden md:flex space-x-8">
            <NavLink href="/#home" scrolled={scrolled} isHomePage={isHomePage} onClick={closeMobileMenu}>
              Home
            </NavLink>
            <NavLink href="/#portfolio" scrolled={scrolled} isHomePage={isHomePage} onClick={closeMobileMenu}>
              Portfolio
            </NavLink>
            <NavLink href="/#app-store" scrolled={scrolled} isHomePage={isHomePage} onClick={closeMobileMenu}>
              App Store
            </NavLink>
            <NavLink href="/#about" scrolled={scrolled} isHomePage={isHomePage} onClick={closeMobileMenu}>
              About
            </NavLink>
            <NavLink href="/#contact" scrolled={scrolled} isHomePage={isHomePage} onClick={closeMobileMenu}>
              Contact
            </NavLink>
          </div>
          
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <X className={`h-6 w-6 ${scrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} />
            ) : (
              <Menu className={`h-6 w-6 ${scrolled || !isHomePage ? 'text-gray-800' : 'text-white'}`} />
            )}
          </button>
        </div>
      </div>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md py-4 animate-fade-in">
          <div className="container mx-auto px-4 flex flex-col space-y-3">
            <MobileNavLink href="/#home" onClick={closeMobileMenu}>Home</MobileNavLink>
            <MobileNavLink href="/#portfolio" onClick={closeMobileMenu}>Portfolio</MobileNavLink>
            <MobileNavLink href="/#app-store" onClick={closeMobileMenu}>App Store</MobileNavLink>
            <MobileNavLink href="/#about" onClick={closeMobileMenu}>About</MobileNavLink>
            <MobileNavLink href="/#contact" onClick={closeMobileMenu}>Contact</MobileNavLink>
          </div>
        </div>
      )}
    </nav>
  );
}

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  scrolled: boolean;
  isHomePage: boolean;
  onClick?: () => void;
}

function NavLink({ href, children, scrolled, isHomePage, onClick }: NavLinkProps) {
  return (
    <a 
      href={href} 
      className={`font-medium transition-colors ${
        scrolled || !isHomePage 
          ? 'text-gray-800 hover:text-primary' 
          : 'text-white hover:text-white/80'
      }`}
      onClick={onClick}
    >
      {children}
    </a>
  );
}

interface MobileNavLinkProps {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}

function MobileNavLink({ href, children, onClick }: MobileNavLinkProps) {
  return (
    <a 
      href={href} 
      className="py-2 px-4 hover:bg-gray-100 rounded transition-colors"
      onClick={onClick}
    >
      {children}
    </a>
  );
}
