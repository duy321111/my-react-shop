import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminSidebar from "../../components/admin/Sidebar";
import AdminHeader from "../../components/admin/HeaderAdmin";
import styles from "../../assets/css/admin/admindashboard.module.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import API_URL from "../../config";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    pendingOrders: 0,
  });

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/orders/stats`);
      setStats(res.data.overview);
      setChartData(res.data.monthlyRevenue);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu dashboard:", err);
    }
  };

  return (
    <div className="grid-full-width">
      <div className="grid__row">
        <div className="grid__column-2">
          <AdminSidebar />
        </div>

        <div className="grid__column-10">
          <AdminHeader />
          <div className={styles.wrapper}>
            <h1 className={styles.title}>Thống kê tổng quan</h1>

            {/* === CARD THỐNG KÊ === */}
            <div className={styles.statsGrid}>
              <div className={styles.statsCard}>
                <span className={styles.statsLabel}>Tổng số đơn hàng</span>
                <span className={styles.statsValue}>
                  {stats.totalOrders.toLocaleString()}
                </span>
              </div>

              <div className={styles.statsCard}>
                <span className={styles.statsLabel}>Tổng doanh thu</span>
                <span className={styles.statsValue}>
                  {stats.totalRevenue.toLocaleString()}₫
                </span>
              </div>

              <div className={styles.statsCard}>
                <span className={styles.statsLabel}>Khách hàng</span>
                <span className={styles.statsValue}>
                  {stats.totalCustomers.toLocaleString()}
                </span>
              </div>

              <div className={styles.statsCard}>
                <span className={styles.statsLabel}>Đơn hàng đang xử lý</span>
                <span className={styles.statsValue}>
                  {stats.pendingOrders.toLocaleString()}
                </span>
              </div>
            </div>

            {/* === BIỂU ĐỒ DOANH THU === */}
            <div className={styles.chartSection}>
              <h2 className={styles.chartTitle}>Doanh thu theo tháng</h2>
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={chartData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#2563eb" radius={8} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className={styles.loading}>Đang tải dữ liệu...</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
