import React from 'react';
import { FaStar, FaRegStar, FaStarHalfAlt } from 'react-icons/fa';

interface RatingProps {
  value: number;
  totalStars?: number;

  className?: string;
}

const Rating: React.FC<RatingProps> = ({ value, totalStars = 5, className = '' }) => {
  return (
    <div className={`flex items-center gap-1 text-yellow-400 ${className}`}>
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;

        if (starValue <= value) {
          return <FaStar key={index} />;
        } else if (starValue - 0.5 <= value) {
          return <FaStarHalfAlt key={index} />;
        } else {
          return <FaRegStar key={index} className="text-gray-300" />;
        }
      })}
    </div>
  );
};

export default Rating;