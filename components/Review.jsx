import React from "react";
import StarRatings from "react-star-ratings";

// cheked

const Review = ({ review }) => {
  return (
    <div className="w-full p-4 flex flex-col  shadow-lg border-[1px] gap-3 relative">
      <div className="flex justify-start items-center gap-3">
        <img
          className="w-10 h-10 object-cover rounded-full border-[1px] border-[#3232326d]"
          src={
            review.addedBy.src ? review.addedBy.src : "/profilePlaceholder.png"
          }
          alt=""
        />
        <div className="text-sm text-[#1F2937] font-bold">
          {review.addedBy.name}
        </div>
      </div>
      <div className="">
        <div className="flex items-center space-x-1">
          <StarRatings
            rating={review.rating}
            starRatedColor="blue"
            numberOfStars={5}
            name="rating"
            starDimension="20px"
            starSpacing="1px"
          />
        </div>
      </div>
      <div className="text-sm text-[#1f2937be] ">{review.message}</div>
      <div className="text-sm text-[#1F2937] font-bold  flex w-fit self-end">
        {review.createdAt.slice(0, 10)}
      </div>
    </div>
  );
};

export default Review;
