"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/common/Button";
import { Product } from "@/types/product";

interface Props {
  product: Product;
}

export default function ProductReviews({ product }: Props) {
  const reviews = product.reviews || [];
  const [expandedReview, setExpandedReview] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  if (!reviews.length) {
    return (
      <div className="mt-10 text-gray-500 italic">
        Bu ürün için henüz yorum yapılmamış.
      </div>
    );
  }

  const renderStars = (rating: number) => (
    <div className="flex items-center">
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} className="text-yellow text-md">
          {i <= rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );

  const toggleComment = (index: number) => {
    setExpandedReview(expandedReview === index ? null : index);
  };

  const displayedReviews = showAll ? reviews : reviews.slice(0, 2);

  return (
    <section className="mt-14">
      <h3 className="font-bold text-black text-base mb-4 font-poppins">
        Ürün Yorumları
      </h3>

      <div className="space-y-6">
        {displayedReviews.map((review, index) => {
          const isExpanded = expandedReview === index;
          const shortComment =
            review.comment.length > 160
              ? review.comment.slice(0, 160) + "..."
              : review.comment;

          return (
            <motion.div
              key={review.reviewerName + index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              layout
            >
              <div className="flex gap-4 mb-2">
                <p className="font-medium text-base text-black font-poppins">
                  {review.reviewerName}
                </p>
                <div className="flex items-center gap-2">
                  {renderStars(review.rating)}
                </div>
              </div>

              <AnimatePresence mode="wait">
                {isExpanded ? (
                  <motion.p
                    key="expanded"
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="font-normal text-base text-black font-poppins leading-snug"
                  >
                    {review.comment}
                    <button
                      onClick={() => toggleComment(index)}
                      className="text-primary font-medium ml-1 hover:underline"
                    >
                      Daha az göster
                    </button>
                  </motion.p>
                ) : (
                  <motion.p
                    key="collapsed"
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 4 }}
                    transition={{ duration: 0.25, ease: "easeInOut" }}
                    className="font-normal text-base text-black font-poppins leading-snug"
                  >
                    {shortComment}
                    {review.comment.length > 160 && (
                      <button
                        onClick={() => toggleComment(index)}
                        className="text-primary font-medium ml-1 hover:underline"
                      >
                        Daha fazla göster
                      </button>
                    )}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {reviews.length > 2 && (
        <div className="flex justify-start mt-6">
          <Button
            onClick={() => setShowAll(!showAll)}
            variant="secondary"
            className="w-32"
          >
            {showAll ? "Daha az göster" : "Tümünü Gör"}
          </Button>
        </div>
      )}
    </section>
  );
}
