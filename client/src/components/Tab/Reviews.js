import React, { useEffect, useState } from "react";

const Reviews = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0], // index 0 = 1*, index 4 = 5*
  });

  useEffect(() => {
    const fetchReviews = async () => {
      try {
          const res = await fetch(`http://localhost:5000/api/reviews/product/${productId}`, {
            cache: "no-store"
          });
          const data = await res.json();
          setReviews(data);


        // Tính trung bình và phân bố
        if (data.length > 0) {
          const total = data.length;
          const sum = data.reduce((acc, r) => acc + r.rating, 0);
          const avg = (sum / total).toFixed(1);

          const dist = [0, 0, 0, 0, 0];
          data.forEach(r => {
            dist[r.rating - 1]++;
          });

          const distPercent = dist.map(d => Math.round((d / total) * 100));
          setRatingStats({ average: avg, total, distribution: distPercent });
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
  }, [productId]);

  return (
    <div className="rating-section">
      {/* Tổng quan đánh giá */}
      <div className="rating-summary">
        <div className="rating-average">
          <span className="score">{ratingStats.average}</span>
          <div className="stars">
            {"★".repeat(Math.round(ratingStats.average)) + "☆".repeat(5 - Math.round(ratingStats.average))}
          </div>
          <p>{ratingStats.total} đánh giá</p>
        </div>

        <div className="rating-distribution">
          {[5,4,3,2,1].map((star, i) => (
            <div key={star} className="rating-bar">
              <span>{star} ★</span>
              <div className="bar">
                <div className="fill" style={{ width: `${ratingStats.distribution[star - 1]}%` }}></div>
              </div>
              <span>{ratingStats.distribution[star - 1]}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form gửi đánh giá */}
      <div className="review-form">
        <h3>Viết đánh giá của bạn</h3>
        <div className="star-rating">
          {[5,4,3,2,1].map(star => (
            <React.Fragment key={star}>
              <input type="radio" id={`star${star}`} name="rating" value={star} />
              <label htmlFor={`star${star}`} title={`${star} sao`}>★</label>
            </React.Fragment>
          ))}
        </div>
        <textarea placeholder="Chia sẻ cảm nhận của bạn..."></textarea>
        <button>Gửi đánh giá</button>
      </div>

      {/* Danh sách đánh giá */}
      <div className="review-list">
        <h3>Đánh giá gần đây</h3>
            {Array.isArray(reviews) && reviews.map(r => (
              <div key={r._id} className="review-item">
                <div className="review-stars">
                  {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                </div>
                <p>
                  <strong>{r.userName}</strong> - {r.comment}
                </p>
              </div>
            ))}
      </div>
    </div>
  );
};

export default Reviews;
