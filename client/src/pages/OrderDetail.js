import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import LoadingState from "../components/LoadingState";
import API_URL from "../config";

const OrderDetail = () => {
    const { orderId } = useParams(); // lấy id đơn hàng từ URL /orders/:orderId
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const token = localStorage.getItem("token");

    const formatPrice = (num) => Number(num || 0).toLocaleString("vi-VN") + "đ";

    useEffect(() => {
        if (!orderId || !token) {
            setLoading(false);
            setError("Thiếu thông tin đăng nhập hoặc mã đơn hàng");
            return;
        }

        const fetchOrderDetail = async () => {
            try {
                const res = await axios.get(
                    `${API_URL}/api/orders/detail/${orderId}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setOrder(res.data);
            } catch (err) {
                console.error("Lỗi khi tải chi tiết đơn hàng:", err);
                if (err.response?.status === 403) {
                    setError("Bạn không có quyền xem đơn hàng này");
                } else {
                    setError("Không thể tải chi tiết đơn hàng");
                }
            } finally {
                setLoading(false);
            }
        };
        fetchOrderDetail();
    }, [orderId, token]);

    if (loading) return <LoadingState label="Đang tải chi tiết đơn hàng..." />;
    if (error)
        return (
            <div className="app__container">
                <Header />
                <div className="grid">
                    <div className="grid__row">
                        <div className="order-detail-container order-detail-container--empty">
                            <div className="order-detail-empty__icon">
                                <i className="fa-solid fa-shield-halved"></i>
                            </div>
                            <h2>Thông báo</h2>
                            <p className="order-detail-empty__message">
                                {error}
                            </p>
                            <div className="order-detail-empty__actions">
                                <Link to="/orders" className="order-detail-empty__btn">
                                    Về danh sách đơn hàng
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        );
    if (!order) return <div>Không tìm thấy đơn hàng</div>;

    const fullAddress = [
        order.address?.detail,
        order.address?.ward,
        order.address?.province,
    ]
        .filter(Boolean)
        .join(", ");

    const items = Array.isArray(order.items) ? order.items : [];

    return (
        <div className="app__container">
            <Header />
            <div className="grid">
                <div className="grid__row">
                    <div className="order-detail-container">
                        <h2>Chi tiết đơn hàng #{order._id}</h2>
                        <p>
                            <strong>Trạng thái:</strong> {order.status}
                        </p>
                        <p>
                            <strong>Phương thức thanh toán:</strong>{" "}
                            {order.paymentMethod === "cod"
                                ? "Khi nhận hàng"
                                : "Chuyển khoản"}
                        </p>
                        <p>
                            <strong>Địa chỉ giao hàng:</strong>{" "}
                            {fullAddress || "Chưa cập nhật"}
                        </p>
                        <p>
                            <strong>Ngày đặt:</strong>{" "}
                            {new Date(order.createdAt).toLocaleString()}
                        </p>
                        {order.note && (
                            <p>
                                <strong>Ghi chú:</strong> {order.note}
                            </p>
                        )}

                        <table className="order-detail-table">
                            <thead>
                                <tr>
                                    <th>TÊN SẢN PHẨM</th>
                                    <th>HÌNH ẢNH</th>
                                    <th>SỐ LƯỢNG</th>
                                    <th>GIÁ SẢN PHẨM</th>
                                    <th>TẠM TÍNH</th>
                                </tr>
                            </thead>
                            <tbody>
                                {items.map((item) => (
                                    <tr key={item._id}>
                                        <td>
                                            {item.productId?.name ||
                                                "Sản phẩm đã xoá"}
                                        </td>
                                        <td>
                                            <img
                                                src={
                                                    item.image
                                                        ? `${process.env.PUBLIC_URL}/img/${item.image}`
                                                        : "https://via.placeholder.com/100"
                                                }
                                                alt={item.productId?.name}
                                                className="product-img"
                                            />
                                        </td>
                                        <td>{item.quantity}</td>
                                        <td>{formatPrice(item.price)}</td>
                                        <td>
                                            {formatPrice(
                                                item.price * item.quantity,
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        <div className="order-summary">
                            <p>
                                <strong>Tổng tiền:</strong>{" "}
                                <span className="total">
                                    {formatPrice(order.totalAmount)}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default OrderDetail;
