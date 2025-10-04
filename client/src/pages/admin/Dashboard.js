import React from "react";

const Dashboard = () => {
  return (
    <div className="flex">

      <div className="flex-1">
      
        <div className="p-6">
          <h1 className="text-2xl font-bold mb-4">Bảng điều khiển</h1>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">📦 Tổng sản phẩm: 120</div>
            <div className="bg-white p-4 rounded shadow">🧾 Tổng đơn hàng: 523</div>
            <div className="bg-white p-4 rounded shadow">💸 Doanh thu: 145.000.000đ</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
