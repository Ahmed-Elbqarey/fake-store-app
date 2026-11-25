import React from "react";

const StarRating = ({ rating }) => {
  const fillPercentage = rating * 25;
  return (
    <div className="stars" style={{ width: `${fillPercentage}px` }}>
      ★★★★★
    </div>
  );
};

export default StarRating;
