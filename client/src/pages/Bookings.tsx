import { Link } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import BookingCard, { type BookingStatus } from "@/components/BookingCard";
import { Calendar, Loader2 } from "lucide-react";
import type { Booking } from "@shared/schema";

export default function Bookings() {
  const { toast } = useToast();

  const { data: bookings = [], isLoading } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
  });

  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: BookingStatus }) => {
      const res = await apiRequest("PATCH", `/api/bookings/${id}/status`, { status });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/bookings"] });
      toast({
        title: "Booking updated",
        description: "Status updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Update failed",
        description: "Could not update booking status.",
        variant: "destructive",
      });
    },
  });

  const handleCancel = (id: string) => {
    updateStatusMutation.mutate({ id, status: "cancelled" });
  };

  const handleRebook = (id: string) => {
    console.log("Rebook:", id);
    toast({
      title: "Rebook feature",
      description: "This would redirect to booking page with pre-filled details.",
    });
  };

  const handleViewDetails = (id: string) => {
    console.log("View details:", id);
    toast({
      title: "Booking details",
      description: "Detailed view would show complete booking information.",
    });
  };

  const upcomingBookings = bookings.filter((b) => b.status === "upcoming");
  const completedBookings = bookings.filter((b) => b.status === "completed");

  if (isLoading) {
    return (
      <div className="min-h-[calc(100vh-4rem)] bg-background flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between gap-4 mb-8 flex-wrap">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
            <p className="text-muted-foreground">View and manage your rides</p>
          </div>
          <Link href="/book">
            <Button data-testid="button-new-booking">
              <Calendar className="mr-2 h-5 w-5" />
              New Booking
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="all" className="space-y-6">
          <TabsList data-testid="tabs-bookings">
            <TabsTrigger value="all" data-testid="tab-all">
              All ({bookings.length})
            </TabsTrigger>
            <TabsTrigger value="upcoming" data-testid="tab-upcoming">
              Upcoming ({upcomingBookings.length})
            </TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">
              Completed ({completedBookings.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {bookings.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">Start booking your rides today!</p>
                <Link href="/book">
                  <Button>Book Your First Ride</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {bookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    onViewDetails={() => handleViewDetails(booking.id)}
                    onCancel={booking.status === "upcoming" ? () => handleCancel(booking.id) : undefined}
                    onRebook={booking.status === "completed" ? () => handleRebook(booking.id) : undefined}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="upcoming" className="space-y-4">
            {upcomingBookings.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No upcoming bookings</h3>
                <p className="text-muted-foreground mb-6">Book a ride to get started</p>
                <Link href="/book">
                  <Button>Book a Ride</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {upcomingBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    onViewDetails={() => handleViewDetails(booking.id)}
                    onCancel={() => handleCancel(booking.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {completedBookings.length === 0 ? (
              <Card className="p-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-xl font-semibold mb-2">No completed rides</h3>
                <p className="text-muted-foreground">Your ride history will appear here</p>
              </Card>
            ) : (
              <div className="grid lg:grid-cols-2 gap-6">
                {completedBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    {...booking}
                    onViewDetails={() => handleViewDetails(booking.id)}
                    onRebook={() => handleRebook(booking.id)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
