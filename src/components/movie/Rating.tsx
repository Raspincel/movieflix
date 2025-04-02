import { Star, StarHalf } from 'lucide-react';

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props) => {
  const fullStars = Math.floor(rating / 2);
  // Verifica se está mais próximo do próximo inteiro ou do inteiro anterior, para decidir se deve mostrar a metade da estrela
  const hasHalfStar = (rating / 2) % 2 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      <span className="mr-1 text-lg font-bold text-yellow-500">{rating}</span>
      <div className="flex">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={i} className="w-4 h-4 text-yellow-500 fill-yellow-500" />
        ))}
        {hasHalfStar && (
          <>
            <StarHalf className="w-4 h-4 text-yellow-500 fill-yellow-500 -mr-2" />
            <StarHalf className="w-4 h-4 text-gray-300 fill-gray-300 -scale-x-100 -ml-2" />
          </>
        )}
        {emptyStars > 0 &&
          [...Array(emptyStars)].map((_, i) => <Star key={i} className="w-4 h-4 text-gray-300 fill-gray-300" />)}
      </div>
    </div>
  );
};

export default Rating;
