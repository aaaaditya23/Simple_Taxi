import { useState } from "react";
import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import TaxiTypeCard from "@/components/TaxiTypeCard";
import { MapPin, Calendar, ArrowRight, ArrowLeft } from "lucide-react";
import type { InsertBooking } from "@shared/schema";

export default function Book() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<1 | 2>(1);
  const [pickup, setPickup] = useState("");
  const [dropoff, setDropoff] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [selectedTaxi, setSelectedTaxi] = useState<"shared" | "normal" | null>(null);

  const createBookingMutation = useMutation({
    mutationFn: async (bookingData: InsertBooking) => {
      const res = await apiRequest("POST", "/api/bookings", bookingData);
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking confirmed!",
        description: "Your ride has been successfully booked.",
      });
      setLocation("/bookings");
    },
    onError: () => {
      toast({
        title: "Booking failed",
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleContinue = () => {
    if (step === 1 && pickup && dropoff && date && time) {
      setStep(2);
    } else if (step === 2 && selectedTaxi) {
      const fare = selectedTaxi === "shared" ? "13.50" : "22.50";
      createBookingMutation.mutate({
        pickup,
        dropoff,
        date,
        time,
        taxiType: selectedTaxi,
        fare,
        status: "upcoming",
      });
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Book Your Ride</h1>
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center gap-2 ${step >= 1 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                1
              </div>
              <span>Details</span>
            </div>
            <div className="flex-1 h-px bg-border" />
            <div className={`flex items-center gap-2 ${step >= 2 ? "text-primary" : "text-muted-foreground"}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? "bg-primary text-primary-foreground" : "bg-muted"}`}>
                2
              </div>
              <span>Choose Taxi</span>
            </div>
          </div>
        </div>

        {step === 1 ? (
          <Card>
            <CardHeader>
              <CardTitle>Enter Ride Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="pickup">Pickup Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="pickup"
                    placeholder="Enter pickup location"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="pl-10"
                    data-testid="input-book-pickup"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="dropoff">Drop-off Location</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="dropoff"
                    placeholder="Enter drop-off location"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="pl-10"
                    data-testid="input-book-dropoff"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="date"
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="pl-10"
                      data-testid="input-book-date"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="time">Time</Label>
                  <Input
                    id="time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    data-testid="input-book-time"
                  />
                </div>
              </div>

              <Button
                className="w-full"
                size="lg"
                onClick={handleContinue}
                disabled={!pickup || !dropoff || !date || !time}
                data-testid="button-continue-step1"
              >
                Continue
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            <Card className="bg-muted/50">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-chart-2" />
                      <span className="text-sm text-muted-foreground">From</span>
                    </div>
                    <p className="font-medium truncate">{pickup}</p>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <MapPin className="h-4 w-4 text-destructive" />
                      <span className="text-sm text-muted-foreground">To</span>
                    </div>
                    <p className="font-medium truncate">{dropoff}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">When</span>
                    </div>
                    <p className="font-medium">{date} {time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div>
              <h2 className="text-xl font-semibold mb-4">Choose Your Taxi Type</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <TaxiTypeCard
                  type="shared"
                  selected={selectedTaxi === "shared"}
                  onClick={() => setSelectedTaxi("shared")}
                  price="12-15"
                  eta="8 min"
                  capacity={4}
                />
                <TaxiTypeCard
                  type="normal"
                  selected={selectedTaxi === "normal"}
                  onClick={() => setSelectedTaxi("normal")}
                  price="20-25"
                  eta="5 min"
                  capacity={4}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={() => setStep(1)}
                disabled={createBookingMutation.isPending}
                data-testid="button-back-step2"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Back
              </Button>
              <Button
                className="flex-1"
                size="lg"
                onClick={handleContinue}
                disabled={!selectedTaxi || createBookingMutation.isPending}
                data-testid="button-confirm-booking"
              >
                {createBookingMutation.isPending ? "Confirming..." : "Confirm Booking"}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
