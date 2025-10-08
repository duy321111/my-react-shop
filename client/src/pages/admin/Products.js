import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "../../assets/css/admin/productlist.module.css";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("Tất cả");
  const [brandFilter, setBrandFilter] = useState("Tất cả");

  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products");
      setProducts(res.data);
    } catch (err) {
      console.error("Lỗi khi tải sản phẩm:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:5000/api/categories/");
    setCategories(res.data);
  };

  const fetchBrands = async () => {
    const res = await axios.get("http://localhost:5000/api/brand/");
    setBrands(res.data);
  };

  //  Lọc theo search + category + brand
  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory =
      categoryFilter === "Tất cả" ||
      product.category?.name === categoryFilter;
    const matchesBrand =
      brandFilter === "Tất cả" || product.brand?.name === brandFilter;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  if (loading) return <div className={styles.loading}>Đang tải dữ liệu...</div>;

  return (
    <div className="grid-full-width">
      <div className="grid__row">
        <div className="grid__column-2">
          <AdminSidebar />
        </div>

        <div className="grid__column-10">
          <AdminHeader />
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Quản lý sản phẩm</h1>

            {/* Thanh tìm kiếm và bộ lọc */}
            <div className={styles.filterBar}>
              <input
                type="text"
                placeholder="Tìm theo tên sản phẩm..."
                className={styles.searchInput}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <select
                className={styles.filterSelect}
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="Tất cả">Tất cả danh mục</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              </select>

              <select
                className={styles.filterSelect}
                value={brandFilter}
                onChange={(e) => setBrandFilter(e.target.value)}
              >
                <option value="Tất cả">Tất cả thương hiệu</option>
                {brands.map((brand) => (
                  <option key={brand._id} value={brand.name}>
                    {brand.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Bảng sản phẩm */}
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Danh mục</th>
                  <th>Thương hiệu</th>
                  <th>Giá hiện tại</th>
                  <th>Giá cũ</th>
                  <th>Kho</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                      Không tìm thấy sản phẩm phù hợp
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product._id}>
                      <td>
                        <img
                          src={`${process.env.PUBLIC_URL}/img/${product.image}`}
                          alt={product.name}
                          className={styles.productImage}
                        />
                      </td>
                      <td>{product.name}</td>
                      <td>{product.category?.name}</td>
                      <td>{product.brand?.name}</td>
                      <td>{product.priceCurrent.toLocaleString()}₫</td>
                      <td>{product.priceOld.toLocaleString()}₫</td>
                      <td>{product.quantityAvailable}</td>
                      <td>
                        <button
                          className={styles.detailBtn}
                          onClick={() => setSelectedProduct(product)}
                        >
                          Chi tiết
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>

            {/* Modal chi tiết sản phẩm */}
            {selectedProduct && (
              <div
                className={styles.modalOverlay}
                onClick={() => setSelectedProduct(null)}
              >
                <div
                  className={styles.modalContent}
                  onClick={(e) => e.stopPropagation()}
                >
                  <h2>{selectedProduct.name}</h2>
                  <img
                    src={`${process.env.PUBLIC_URL}/img/${selectedProduct.image}`}
                    alt={selectedProduct.name}
                    className={styles.modalImage}
                  />
                  <p>
                    <strong>Thương hiệu:</strong> {selectedProduct.brand?.name}
                  </p>
                  <p>
                    <strong>Danh mục:</strong> {selectedProduct.category?.name}
                  </p>
                  <p>
                    <strong>Giá:</strong>{" "}
                    {selectedProduct.priceCurrent.toLocaleString()}₫
                  </p>
                  <p>
                    <strong>Mô tả:</strong> {selectedProduct.description || "Không có"}
                  </p>
                  <h3>Thông số kỹ thuật</h3>
                  <ul>
                    {selectedProduct.specifications?.map((spec, idx) => (
                      <li key={idx}>
                        <strong>{spec.key}:</strong> {spec.value}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={styles.closeBtn}
                    onClick={() => setSelectedProduct(null)}
                  >
                    Đóng
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
