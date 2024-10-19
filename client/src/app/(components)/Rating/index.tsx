import { Star } from "lucide-react";

interface IRating {
  rating: number;
}

const Rating = ({ rating }: IRating) => {
  return [1, 2, 3, 4, 5].map((idx) => (
    <Star
      key={idx}
      color={idx <= rating ? "#ffc107" : "#e4e5e9"}
      className="w-4 h-4"
    />
  ));
};

export default Rating;
