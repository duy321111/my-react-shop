import React from "react";
import Reviews from "./Reviews";

const TabContent = ({ activeTab }) => {
    const contents = [
      <div key="desc" className="tab-desc">
        <h3>Giới thiệu sản phẩm</h3>
        <p>
          Laptop <strong>HP Victus Gaming</strong> trang bị CPU Intel Core i5 thế hệ 12,
          RAM 16GB, SSD 512GB, card RTX 3050 – chiến game mượt, đồ họa nặng ổn định.
        </p>
        <ul>
          <li>Thiết kế trẻ trung, viền mỏng sang trọng</li>
          <li>Bàn phím LED RGB cho game thủ</li>
          <li>Pin bền bỉ, tối ưu cho công việc & giải trí</li>
        </ul>
      </div>,

      <div key="spec" className="tab-specs">
        <h3>Thông số kỹ thuật</h3>
        <table>
          <tbody>
            <tr>
              <td>CPU</td>
              <td>Intel Core i5 Gen 12</td>
            </tr>
            <tr>
              <td>RAM</td>
              <td>16GB DDR4</td>
            </tr>
            <tr>
              <td>Ổ cứng</td>
              <td>SSD 512GB</td>
            </tr>
            <tr>
              <td>Card đồ họa</td>
              <td>NVIDIA RTX 3050</td>
            </tr>
            <tr>
              <td>Màn hình</td>
              <td>15.6 inch FullHD 144Hz</td>
            </tr>
          </tbody>
        </table>
      </div>,
      <Reviews key="reviews" />
    ];
  return <div className="tab-content">{contents[activeTab]}</div>;
};

export default TabContent;
