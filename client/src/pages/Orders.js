import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import LoadingState from "../components/LoadingState";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!user?._id || !token) {
            setLoading(false);
            return;
        }

        const fetchOrders = async () => {
            try {
                const res = await axios.get(
                    `http://localhost:5000/api/orders/${user._id}`,
                    {
                        headers: { Authorization: `Bearer ${token}` },
                    },
                );
                setOrders(res.data);
            } catch (error) {
                console.error("Fetch orders failed:", error);
                setOrders([]);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user?._id, token]);

    if (loading) return <LoadingState label="Đang tải danh sách đơn hàng..." />;

    return (
        <div className="app__container">
            <Header />
            <div className="grid">
                <div className="grid__row">
                    <div className="orders-table-container">
                        <h1>Đơn hàng của bạn</h1>
                        <table className="orders-table">
                            <thead>
                                <tr>
                                    <th>MÃ ĐƠN HÀNG</th>
                                    <th>TRẠNG THÁI</th>
                                    <th>ĐỊA CHỈ</th>
                                    <th>THANH TOÁN</th>
                                    <th>THÀNH TIỀN</th>
                                    <th>NGÀY ĐẶT</th>
                                    <th>GHI CHÚ</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((o) => (
                                    <tr key={o._id}>
                                        <td>{o._id.slice(-7).toUpperCase()}</td>
                                        <td>{o.status}</td>
                                        <td>
                                            {[
                                                o.address?.detail,
                                                o.address?.ward,
                                                o.address?.province,
                                            ]
                                                .filter(Boolean)
                                                .join(", ") || "Chưa cập nhật"}
                                        </td>
                                        <td>
                                            {o.paymentMethod === "cod"
                                                ? "Khi nhận hàng"
                                                : "Chuyển khoản"}
                                        </td>
                                        <td>
                                            {o.totalAmount.toLocaleString()}đ
                                        </td>
                                        <td>
                                            {new Date(
                                                o.createdAt,
                                            ).toLocaleDateString()}
                                        </td>
                                        <td>
                                            <Link to={`/orders/${o._id}`}>
                                                Xem chi tiết
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Orders;
