import { Link } from "wouter";
import { Car, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-card border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Car className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">RideShare</span>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your trusted partner for affordable and comfortable rides.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" data-testid="button-facebook">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-twitter">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" data-testid="button-instagram">
                <Instagram className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/book" className="text-muted-foreground hover:text-foreground transition-colors">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link href="/bookings" className="text-muted-foreground hover:text-foreground transition-colors">
                  My Bookings
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-muted-foreground">Help Center</li>
              <li className="text-muted-foreground">Safety</li>
              <li className="text-muted-foreground">Terms of Service</li>
              <li className="text-muted-foreground">Privacy Policy</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Newsletter</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get updates on new features and special offers
            </p>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Your email"
                className="flex-1"
                data-testid="input-newsletter"
              />
              <Button data-testid="button-subscribe">Subscribe</Button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; 2025 RideShare. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
