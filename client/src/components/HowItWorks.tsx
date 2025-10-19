import { MapPin, Car, CheckCircle } from "lucide-react";

const steps = [
  {
    number: 1,
    icon: MapPin,
    title: "Enter Details",
    description: "Enter your pickup and drop-off locations",
  },
  {
    number: 2,
    icon: Car,
    title: "Choose Taxi",
    description: "Select between shared or normal taxi",
  },
  {
    number: 3,
    icon: CheckCircle,
    title: "Confirm Booking",
    description: "Review and confirm your ride",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-card">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">
            Book your ride in 3 simple steps
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          {steps.map((step, index) => (
            <div key={index} className="relative" data-testid={`step-${step.number}`}>
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-1/2 w-full h-0.5 bg-border -z-10" />
              )}
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                    <step.icon className="h-10 w-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                    {step.number}
                  </div>
                </div>
                <h3 className="font-semibold text-xl mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
