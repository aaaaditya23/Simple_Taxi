import { useState } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import BookingCard, { type BookingStatus } from "@/components/BookingCard";
import { Calendar } from "lucide-react";

const mockBookings = [
  {
    id: "1",
    pickup: "123 Main Street, Downtown",
    dropoff: "456 Park Avenue, Uptown",
    date: "Dec 28, 2025",
    time: "10:30 AM",
    taxiType: "shared" as const,
    fare: "15.50",
    status: "upcoming" as BookingStatus,
  },
  {
    id: "2",
    pickup: "789 Oak Road, West Side",
    dropoff: "321 Elm Street, East End",
    date: "Dec 27, 2025",
    time: "3:45 PM",
    taxiType: "normal" as const,
    fare: "24.00",
    status: "upcoming" as BookingStatus,
  },
  {
    id: "3",
    pickup: "555 Broadway, Theater District",
    dropoff: "100 Central Station",
    date: "Dec 20, 2025",
    time: "7:00 PM",
    taxiType: "shared" as const,
    fare: "12.00",
    status: "completed" as BookingStatus,
  },
  {
    id: "4",
    pickup: "200 Airport Road",
    dropoff: "999 Hotel Plaza",
    date: "Dec 18, 2025",
    time: "11:20 AM",
    taxiType: "normal" as const,
    fare: "35.50",
    status: "completed" as BookingStatus,
  },
];

export default function Bookings() {
  const [bookings, setBookings] = useState(mockBookings);
  const [activeTab, setActiveTab] = useState("all");

  const handleCancel = (id: string) => {
    console.log("Cancel booking:", id);
    setBookings(bookings.map(b => 
      b.id === id ? { ...b, status: "cancelled" as BookingStatus } : b
    ));
  };

  const handleRebook = (id: string) => {
    console.log("Rebook:", id);
  };

  const handleViewDetails = (id: string) => {
    console.log("View details:", id);
  };

  const filterBookings = (status?: BookingStatus) => {
    if (!status) return bookings;
    return bookings.filter(b => b.status === status);
  };

  const upcomingBookings = filterBookings("upcoming");
  const completedBookings = filterBookings("completed");

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

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
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
