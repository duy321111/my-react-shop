import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import styles from "../../assets/css/admin/addproduct.module.css";

const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    brand: "",
    category: "",
    origin: "",
    description: "",
    priceOld: "",
    priceCurrent: "",
    saleOff: "",
    quantityAvailable: "",
    promotions: "",
  });

  const [brands, setBrands] = useState([]);
  const [categories, setCategories] = useState([]);
  const [mainImage, setMainImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [extraImages, setExtraImages] = useState([]);
  const [specifications, setSpecifications] = useState([{ key: "", value: "" }]);

  // Load brands, categories và thông tin sản phẩm
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [brandsRes, categoriesRes, productRes] = await Promise.all([
          axios.get("http://localhost:5000/api/brand"),
          axios.get("http://localhost:5000/api/categories"),
          axios.get(`http://localhost:5000/api/products/${id}`),
        ]);
        setBrands(brandsRes.data);
        setCategories(categoriesRes.data);
        const product = productRes.data;
        setFormData({
          name: product.name,
          brand: product.brand?._id || "",
          category: product.category?._id || "",
          origin: product.origin || "",
          description: product.description || "",
          priceOld: product.priceOld || "",
          saleOff: product.saleOff || "",
          priceCurrent: product.priceCurrent || "",
          quantityAvailable: product.quantityAvailable || "",
          promotions: product.promotions?.join(",") || "",
        });
        setPreview(product.image ? `/uploads/${product.image}` : null);
        setSpecifications(product.specifications?.length > 0 ? product.specifications : [{ key: "", value: "" }]);
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      if ((name === "priceOld" || name === "saleOff") && newData.priceOld && newData.saleOff) {
        const priceOld = parseFloat(newData.priceOld);
        const saleOff = parseFloat(newData.saleOff);
        if (!isNaN(priceOld) && !isNaN(saleOff)) {
          newData.priceCurrent = Math.round(priceOld * (1 - saleOff / 100));
        }
      }
      return newData;
    });
  };

  const handleSpecChange = (index, field, value) => {
    const updatedSpecs = [...specifications];
    updatedSpecs[index][field] = value;
    setSpecifications(updatedSpecs);
  };
  const addSpecification = () => setSpecifications([...specifications, { key: "", value: "" }]);
  const removeSpecification = (index) => setSpecifications(specifications.filter((_, i) => i !== index));

  const handleMainImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMainImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };
  const handleExtraImagesChange = (e) => setExtraImages(Array.from(e.target.files));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    for (const key in formData) {
      if (key === "promotions") {
        const promoArr = formData.promotions ? formData.promotions.split(",").map((p) => p.trim()) : [];
        data.append("promotions", JSON.stringify(promoArr));
      } else {
        data.append(key, formData[key]);
      }
    }
    if (mainImage) data.append("image", mainImage);
    extraImages.forEach((img) => data.append("images", img));
    data.append("specifications", JSON.stringify(specifications));

    try {
      await axios.put(`http://localhost:5000/api/products/${id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Cập nhật sản phẩm thành công!");
      navigate("/admin/products"); // quay về danh sách
    } catch (err) {
      console.error(err);
      alert("Cập nhật thất bại!");
    }
  };

  return (
    <div className="grid-full-width">
      <div className="grid__row">
        <div className="grid__column-2"><AdminSidebar /></div>
        <div className="grid__column-10">
          <AdminHeader />
          <div className={styles.addProductContainer}>
            <h2 className={styles.title}>Sửa sản phẩm</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              {/* Các input giống AddProduct */}
                <div className={styles.formGroup}>
                    <label>Tên sản phẩm</label>
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className={styles.formGroup}>
                    <label>Thương hiệu</label>
                    <select name="brand" value={formData.brand} onChange={handleChange} required>
                    <option value="">-- Chọn thương hiệu --</option>
                    {brands.map((b) => <option key={b._id} value={b._id}>{b.name}</option>)}
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label>Danh mục</label>
                    <select name="category" value={formData.category} onChange={handleChange} required>
                    <option value="">-- Chọn danh mục --</option>
                    {categories.map((c) => <option key={c._id} value={c._id}>{c.name}</option>)}
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label>Xuất xứ</label>
                    <input name="origin" value={formData.origin} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Mô tả</label>
                    <textarea name="description" value={formData.description} onChange={handleChange} />
                </div>

                <div className={styles.row}>
                    <div className={styles.formGroup}>
                    <label>Giá gốc</label>
                    <input type="number" name="priceOld" value={formData.priceOld} onChange={handleChange} required />
                    </div>

                    <div className={styles.formGroup}>
                    <label>Giảm giá (%)</label>
                    <input type="number" name="saleOff" value={formData.saleOff} onChange={handleChange} />
                    </div>

                    <div className={styles.formGroup}>
                    <label>Giá hiện tại</label>
                    <input type="number" name="priceCurrent" value={formData.priceCurrent} readOnly />
                    </div>
                </div>

                <div className={styles.formGroup}>
                    <label>Số lượng tồn</label>
                    <input type="number" name="quantityAvailable" value={formData.quantityAvailable} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Khuyến mãi (phân cách bằng dấu ,)</label>
                    <input name="promotions" value={formData.promotions} onChange={handleChange} />
                </div>

                <div className={styles.formGroup}>
                    <label>Ảnh chính</label>
                    <input type="file" accept="image/*" onChange={handleMainImageChange} />
                    {preview && <img src={preview} alt="Preview" className={styles.preview} />}
                </div>

                <div className={styles.formGroup}>
                    <label>Ảnh phụ (có thể chọn nhiều)</label>
                    <input type="file" accept="image/*" multiple onChange={handleExtraImagesChange} />
                </div>

                {/*Thông số kỹ thuật */}
                <div className={styles.formGroup}>
                    <label>Thông số kỹ thuật</label>
                    {specifications.map((spec, index) => (
                    <div key={index} className={styles.specRow}>
                        <input
                        placeholder="Tên thông số (VD: CPU)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(index, "key", e.target.value)}
                        required
                        />
                        <input
                        placeholder="Giá trị (VD: Intel i7)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(index, "value", e.target.value)}
                        required
                        />
                        <button type="button" onClick={() => removeSpecification(index)}>X</button>
                    </div>
                    ))}
                    <button type="button" onClick={addSpecification}>+ Thêm thông số</button>
                </div>
              <button type="submit" className={styles.submitBtn}>Cập nhật sản phẩm</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProduct;
