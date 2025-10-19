import BookingCard from '../BookingCard'

export default function BookingCardExample() {
  return (
    <div className="grid gap-6 p-6 max-w-2xl">
      <BookingCard
        id="1"
        pickup="123 Main Street, Downtown"
        dropoff="456 Park Avenue, Uptown"
        date="Dec 25, 2025"
        time="10:30 AM"
        taxiType="shared"
        fare="15.50"
        status="upcoming"
        onViewDetails={() => console.log('View details')}
        onCancel={() => console.log('Cancel booking')}
      />
      <BookingCard
        id="2"
        pickup="789 Oak Road, West Side"
        dropoff="321 Elm Street, East End"
        date="Dec 20, 2025"
        time="3:45 PM"
        taxiType="normal"
        fare="24.00"
        status="completed"
        onViewDetails={() => console.log('View details')}
        onRebook={() => console.log('Rebook')}
      />
    </div>
  )
}
