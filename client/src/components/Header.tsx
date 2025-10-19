import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Car, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/book", label: "Book Ride" },
    { path: "/bookings", label: "My Bookings" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-2 -ml-2" data-testid="link-home">
            <Car className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">RideShare</span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link key={item.path} href={item.path}>
                <Button
                  variant={location === item.path ? "secondary" : "ghost"}
                  data-testid={`link-${item.label.toLowerCase().replace(" ", "-")}`}
                >
                  {item.label}
                </Button>
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link href="/book">
              <Button variant="default" data-testid="button-book-now">
                Book Now
              </Button>
            </Link>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-menu-toggle"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link key={item.path} href={item.path}>
                  <Button
                    variant={location === item.path ? "secondary" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => setMobileMenuOpen(false)}
                    data-testid={`link-mobile-${item.label.toLowerCase().replace(" ", "-")}`}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
              <Link href="/book">
                <Button
                  variant="default"
                  className="w-full"
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid="button-mobile-book-now"
                >
                  Book Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
