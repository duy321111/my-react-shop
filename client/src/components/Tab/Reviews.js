import React, { useEffect, useState, useMemo } from "react";


const Reviews = ({ productId, userId }) => {
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    average: 0,
    total: 0,
    distribution: [0, 0, 0, 0, 0],
  });
  const [newReview, setNewReview] = useState({ rating: 0, comment: "" });
  const [loading, setLoading] = useState(false);
  const [userReview, setUserReview] = useState(null); 
  const user = JSON.parse(localStorage.getItem("user"));

  const fetchReviews = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/reviews/product/${productId}`, {
        cache: "no-store",
      });
      
      const data = await res.json();
      setReviews(data);
      const UserReview = JSON.parse(localStorage.getItem("user"));
      // Tìm xem user này đã đánh giá chưa
      const existingReview = data.find(r => r.userId === userId || r.userName === localStorage.getItem("userName"));
      setUserReview(existingReview || null);

      // Tính trung bình và phân bố
      if (data.length > 0) {
        const total = data.length;
        const sum = data.reduce((acc, r) => acc + r.rating, 0);
        const avg = (sum / total).toFixed(1);
        const dist = [0, 0, 0, 0, 0];
        data.forEach((r) => (dist[r.rating - 1]++));
        const distPercent = dist.map((d) => Math.round((d / total) * 100));
        setRatingStats({ average: avg, total, distribution: distPercent });
      }
    } catch (err) {
      console.error(err);
    }
  };
  
 

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const handleSubmit = async (e) => {
    
    e.preventDefault();
    if (!user) {
      alert("Vui lòng đăng nhập để gửi đánh giá!");
      return;
    }
    if (!newReview.rating || !newReview.comment.trim()) {
      alert("Vui lòng chọn số sao và nhập nội dung đánh giá!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId,
          rating: newReview.rating,
          comment: newReview.comment,
          userId: user._id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Đánh giá đã được gửi!");
        setNewReview({ rating: 0, comment: "" });
        fetchReviews();
      } else {
        alert(data.message || "Gửi đánh giá thất bại!");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối đến server!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="review-section">
      {/* Tổng quan đánh giá */}
      <div className="rating-summary">
        <div className="rating-average">
          <div className="score">{ratingStats.average}</div>
          <div className="stars">
            {"★".repeat(Math.round(ratingStats.average)) +
              "☆".repeat(5 - Math.round(ratingStats.average))}
          </div>
          <p>{ratingStats.total} đánh giá</p>
        </div>

        <div className="rating-distribution">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-bar">
              <span>{star}</span>
              <div className="bar">
                <div
                  className="fill"
                  style={{ width: `${ratingStats.distribution[star - 1]}%` }}
                />
              </div>
              <span>{ratingStats.distribution[star - 1]}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Form đánh giá */}
      {!userReview ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3>Viết đánh giá của bạn</h3>

          <div className="star-rating">
            {[5, 4, 3, 2, 1].map((star) => (
              <React.Fragment key={star}>
                <input
                  type="radio"
                  id={`star${star}`}
                  name="rating"
                  value={star}
                  checked={newReview.rating === star}
                  onChange={() => setNewReview({ ...newReview, rating: star })}
                />
                <label htmlFor={`star${star}`}>★</label>
              </React.Fragment>
            ))}
          </div>

          <textarea
            placeholder="Chia sẻ cảm nhận của bạn..."
            value={newReview.comment}
            onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Đang gửi..." : "Gửi đánh giá"}
          </button>
        </form>
      ) : (
        <div style={{ margin: "20px 0", padding: "15px", background: "#f9f9f9", borderRadius: "6px" }}>
          <h3>Đánh giá của bạn</h3>
          <div className="review-stars">
            {"★".repeat(userReview.rating) + "☆".repeat(5 - userReview.rating)}
          </div>
          <p>
            <strong>{userReview.userName}</strong>: {userReview.comment}
          </p>
          <small className="review-date">
            {new Date(userReview.createdAt).toLocaleDateString("vi-VN")}
          </small>
        </div>
      )}

      {/* Danh sách đánh giá */}
      <div className="review-list">
        <h3>Đánh giá gần đây</h3>
        {reviews.length > 0 ? (
          reviews.map((r) => (
            <div key={r._id} className="review-item">
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "5px" }}>
                <strong>{r.userName}</strong>
                <span className="review-date">
                  {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="review-stars">
                {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
              </div>
              <p>{r.comment}</p>
            </div>
          ))
        ) : (
          <p>Chưa có đánh giá nào.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;