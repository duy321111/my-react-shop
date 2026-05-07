import React, { useEffect, useState } from "react";
import axios from "axios";
import Reviews from "./Reviews";
import LoadingState from "../LoadingState";
import API_URL from "../../config";

const TabContent = ({ activeTab, productId }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 📦 Lấy sản phẩm từ API theo productId
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/products/${productId}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Lỗi khi lấy sản phẩm:", err);
      } finally {
        setLoading(false);
      }
    };
    if (productId) fetchProduct();
  }, [productId]);

  if (loading) return <LoadingState label="Đang tải dữ liệu sản phẩm..." compact />;
  if (!product) return <div>Không tìm thấy sản phẩm</div>;

  const contents = [
 
    <div key="desc" className="tab-desc">
      <h3>Giới thiệu sản phẩm</h3>
      <p>{product.description || "Chưa có mô tả chi tiết cho sản phẩm này."}</p>
    </div>,

    <div key="spec" className="tab-specs">
      <h3>Thông số kỹ thuật</h3>
      <table>
        <tbody>

          {product.specifications?.length > 0 && (
            <>
              {product.specifications.map((spec, idx) => (
                <tr key={idx}>
                  <td>{spec.key}</td>
                  <td>{spec.value}</td>
                </tr>
              ))}
            </>
          )}
        </tbody>
      </table>
    </div>,

    <Reviews key="reviews" productId={productId} />,
  ];

  return <div className="tab-content">{contents[activeTab]}</div>;
};

export default TabContent;
