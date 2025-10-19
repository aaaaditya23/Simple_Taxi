import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Calendar } from "lucide-react";
import { useState } from "react";
import heroImage from "@assets/generated_images/City_taxi_street_scene_6ea6f566.png";

export default function Hero() {
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");

  const handleQuickBook = () => {
    console.log("Quick book:", { pickup, dropoff });
  };

  return (
    <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-foreground">
            Your Ride, Your Choice
          </h1>
          <p className="text-lg sm:text-xl mb-8 text-foreground/90">
            Book shared or private taxis in seconds
          </p>

          <div className="bg-card/90 backdrop-blur-sm border border-card-border rounded-lg p-6 space-y-4">
            <div className="space-y-3">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Pickup location"
                  value={pickup}
                  onChange={(e) => setPickup(e.target.value)}
                  className="pl-10"
                  data-testid="input-pickup"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Drop-off location"
                  value={dropoff}
                  onChange={(e) => setDropoff(e.target.value)}
                  className="pl-10"
                  data-testid="input-dropoff"
                />
              </div>
            </div>

            <Button
              className="w-full"
              size="lg"
              onClick={handleQuickBook}
              data-testid="button-search-rides"
            >
              <Calendar className="mr-2 h-5 w-5" />
              Search Rides
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              50,000+ Happy Riders
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
