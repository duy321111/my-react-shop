import React from 'react';

const Notification = () => {
  const notifications = [
    "Nhanh len keo lo trend! Sam ngay quan ao abcxyz",
    "Nhanh len keo lo trend! Sam ngay quan ao abcxyz",
    "Nhanh len keo lo trend! Sam ngay quan ao abcxyz",
  ];

  return (
    <div className="notification">
      <h3>Thông báo</h3>
      <ul>
        {notifications.map((notif, index) => (
          <li key={index}>{notif}</li>
        ))}
      </ul>
      <a href="#">Xem tất cả</a>
    </div>
  );
};

export default Notification;