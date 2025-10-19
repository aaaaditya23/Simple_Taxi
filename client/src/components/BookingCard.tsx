import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, DollarSign, Users, User } from "lucide-react";

export type BookingStatus = "upcoming" | "completed" | "cancelled";

interface BookingCardProps {
  id: string;
  pickup: string;
  dropoff: string;
  date: string;
  time: string;
  taxiType: "shared" | "normal";
  fare: string;
  status: BookingStatus;
  onViewDetails?: () => void;
  onCancel?: () => void;
  onRebook?: () => void;
}

export default function BookingCard({
  id,
  pickup,
  dropoff,
  date,
  time,
  taxiType,
  fare,
  status,
  onViewDetails,
  onCancel,
  onRebook,
}: BookingCardProps) {
  const statusColors = {
    upcoming: "bg-chart-3/10 text-chart-3 border-chart-3/20",
    completed: "bg-chart-2/10 text-chart-2 border-chart-2/20",
    cancelled: "bg-muted text-muted-foreground",
  };

  return (
    <Card data-testid={`card-booking-${id}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-2">
            {taxiType === "shared" ? (
              <Users className="h-5 w-5 text-chart-2" />
            ) : (
              <User className="h-5 w-5 text-chart-3" />
            )}
            <span className="font-semibold">
              {taxiType === "shared" ? "Shared" : "Normal"} Taxi
            </span>
          </div>
          <Badge variant="secondary" className={statusColors[status]}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-chart-2 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Pickup</p>
              <p className="font-medium truncate">{pickup}</p>
            </div>
          </div>
          
          <div className="pl-2 border-l-2 border-dashed border-border h-4" />
          
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-destructive mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm text-muted-foreground">Drop-off</p>
              <p className="font-medium truncate">{dropoff}</p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t gap-4 flex-wrap">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <span className="text-muted-foreground">•</span>
            <span className="text-sm text-muted-foreground">{time}</span>
          </div>
          <div className="flex items-center gap-1 font-semibold">
            <DollarSign className="h-4 w-4" />
            <span>{fare}</span>
          </div>
        </div>

        <div className="flex gap-2 pt-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onViewDetails}
            data-testid={`button-view-details-${id}`}
          >
            View Details
          </Button>
          {status === "upcoming" && onCancel && (
            <Button
              variant="outline"
              size="sm"
              onClick={onCancel}
              data-testid={`button-cancel-${id}`}
            >
              Cancel
            </Button>
          )}
          {status === "completed" && onRebook && (
            <Button
              variant="default"
              size="sm"
              onClick={onRebook}
              data-testid={`button-rebook-${id}`}
            >
              Rebook
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
