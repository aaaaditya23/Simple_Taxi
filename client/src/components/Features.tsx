import { Card, CardContent } from "@/components/ui/card";
import { Users, User, Zap, Leaf, Shield, Clock } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "Shared Taxi",
    description: "Save up to 40% by sharing your ride with others heading the same direction",
    color: "text-chart-2",
  },
  {
    icon: User,
    title: "Normal Taxi",
    description: "Enjoy a private, comfortable ride just for you and your companions",
    color: "text-chart-3",
  },
  {
    icon: Zap,
    title: "Easy Booking",
    description: "Book your ride in under 2 minutes with our simple, streamlined process",
    color: "text-chart-4",
  },
  {
    icon: Clock,
    title: "Fast Pickup",
    description: "Average wait time of just 5 minutes. Get where you need to go, fast",
    color: "text-primary",
  },
  {
    icon: Leaf,
    title: "Eco-Friendly",
    description: "Reduce carbon emissions by sharing rides and helping the environment",
    color: "text-chart-2",
  },
  {
    icon: Shield,
    title: "Safe & Secure",
    description: "Verified drivers, GPS tracking, and 24/7 support for your peace of mind",
    color: "text-chart-3",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose RideShare?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Whether you want to save money or travel in comfort, we've got you covered
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="hover-elevate transition-all" data-testid={`card-feature-${index}`}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <div className={`p-3 rounded-lg bg-muted mb-4 ${feature.color}`}>
                    <feature.icon className="h-8 w-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
