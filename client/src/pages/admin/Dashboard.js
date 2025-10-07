import React from "react";
import AdminSidebar from "../../components/admin/Sidebar";

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar bên trái */}
      <AdminSidebar />

      {/* Nội dung chính */}
      <div className="flex-1">
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Bảng điều khiển</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow text-lg">
              📦 Tổng sản phẩm: <strong>120</strong>
            </div>
            <div className="bg-white p-4 rounded shadow text-lg">
              🧾 Tổng đơn hàng: <strong>523</strong>
            </div>
            <div className="bg-white p-4 rounded shadow text-lg">
              💸 Doanh thu: <strong>145.000.000đ</strong>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
// 