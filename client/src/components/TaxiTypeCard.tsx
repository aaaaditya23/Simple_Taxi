import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, User, Clock, DollarSign } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaxiTypeCardProps {
  type: "shared" | "normal";
  selected?: boolean;
  onClick?: () => void;
  price?: string;
  eta?: string;
  capacity?: number;
}

export default function TaxiTypeCard({
  type,
  selected = false,
  onClick,
  price = "15-20",
  eta = "5 min",
  capacity = 4,
}: TaxiTypeCardProps) {
  const isShared = type === "shared";

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all hover-elevate active-elevate-2",
        selected && "ring-2 ring-primary"
      )}
      onClick={onClick}
      data-testid={`card-taxi-${type}`}
    >
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-3">
            {isShared ? (
              <Users className="h-8 w-8 text-chart-2" />
            ) : (
              <User className="h-8 w-8 text-chart-3" />
            )}
            <div>
              <h3 className="font-semibold text-lg">
                {isShared ? "Shared Taxi" : "Normal Taxi"}
              </h3>
              <p className="text-sm text-muted-foreground">
                {isShared ? "Share your ride" : "Private ride"}
              </p>
            </div>
          </div>
          {isShared && (
            <Badge variant="secondary" className="bg-chart-2/10 text-chart-2 border-chart-2/20">
              Save 40%
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users className="h-4 w-4" />
            <span>Up to {capacity} people</span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>{eta}</span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-muted-foreground text-sm">Estimated fare</span>
          <div className="flex items-center gap-1">
            <DollarSign className="h-5 w-5 text-foreground" />
            <span className="text-xl font-bold">{price}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
