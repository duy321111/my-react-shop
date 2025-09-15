import React from "react";

const Reviews = () => {
  return (
    <div className="rating-section">
      <div className="rating-summary">
        <div className="rating-average">
          <span className="score">4.3</span>
          <div className="stars">★★★★☆</div>
          <p>120 đánh giá</p>
        </div>

        <div className="rating-distribution">
          <div className="rating-bar">
          <span>5 ★</span>
          <div className="bar">
            <div className="fill" style={{ width: "80%" }}></div>
          </div>
          <span>80%</span>
        </div>

        <div className="rating-bar">
          <span>4 ★</span>
          <div className="bar">
            <div className="fill" style={{ width: "60%" }}></div>
          </div>
          <span>60%</span>
        </div>

        <div className="rating-bar">
          <span>3 ★</span>
          <div className="bar">
            <div className="fill" style={{ width: "30%" }}></div>
          </div>
          <span>30%</span>
        </div>

        <div className="rating-bar">
          <span>2 ★</span>
          <div className="bar">
            <div className="fill" style={{ width: "10%" }}></div>
          </div>
          <span>10%</span>
        </div>

        <div className="rating-bar">
          <span>1 ★</span>
          <div className="bar">
            <div className="fill" style={{ width: "5%" }}></div>
          </div>
          <span>5%</span>
        </div>
      </div>

    </div>

        <div className="review-form">
          <h3>Viết đánh giá của bạn</h3>
          <div className="star-rating">
            <input type="radio" id="star5" name="rating" value="5" />
            <label htmlFor="star5" title="5 sao">★</label>

            <input type="radio" id="star4" name="rating" value="4" />
            <label htmlFor="star4" title="4 sao">★</label>

            <input type="radio" id="star3" name="rating" value="3" />
            <label htmlFor="star3" title="3 sao">★</label>

            <input type="radio" id="star2" name="rating" value="2" />
            <label htmlFor="star2" title="2 sao">★</label>

            <input type="radio" id="star1" name="rating" value="1" />
            <label htmlFor="star1" title="1 sao">★</label>
          </div>
          <textarea placeholder="Chia sẻ cảm nhận của bạn..."></textarea>
          <button>Gửi đánh giá</button>
        </div>

      <div className="review-list">
        <h3>Đánh giá gần đây</h3>
        <div className="review-item">
          <div className="review-stars">★★★★☆</div>
          <p><strong>Nguyễn Văn A</strong> - Sản phẩm dùng tốt.</p>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
