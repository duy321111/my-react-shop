import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
const Orders = () => {
  const orders = [
    {
      id: 1,
      status: "Đã giao",
      address: "Thôn 7",
      payment: "Khi nhận hàng",
      total: "3.890.000đ",
      date: "2024-08-25",
      note: "Giao sớm",
    },
    {
      id: 2,
      status: "Đã giao",
      address: "Thôn 30",
      payment: "Khi nhận hàng",
      total: "10.490.000đ",
      date: "2024-07-25",
      note: "",
    },
    {
      id: 3,
      status: "Đang giao hàng",
      address: "Thôn 7",
      payment: "Khi nhận hàng",
      total: "4.280.000đ",
      date: "2024-12-25",
      note: "Giao sớm",
    },
  ];

  return (
    <div className="app__container">
      <Header/>
      <div className="grid">
        <div className="grid__row">
          <div className="orders-table-container">
            <h1> Đơn hàng của bạn</h1>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>ĐƠN HÀNG</th>
                  <th>TRẠNG THÁI</th>
                  <th>ĐỊA CHỈ NHẬN HÀNG</th>
                  <th>PHƯƠNG THỨC THANH TOÁN</th>
                  <th>THÀNH TIỀN</th>
                  <th>NGÀY ĐẶT</th>
                  <th>GHI CHÚ</th>
                  <th>TÙY CHỌN</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td className={o.status === "Đã giao" ? "status success" : "status pending"}>
                      {o.status}
                    </td>
                    <td>{o.address}</td>
                    <td>{o.payment}</td>
                    <td>{o.total}</td>
                    <td>{o.date}</td>
                    <td>{o.note}</td>
                    <td>
                      <a href="#" className="detail-link">
                        Chi tiết
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Orders;
