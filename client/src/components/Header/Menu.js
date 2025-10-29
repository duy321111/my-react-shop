import { Link } from "react-router-dom";

export default function Menu() {
  const categories = [
    { name: "Laptop", icon: "fa-laptop" },
    { name: "Điện thoại", icon: "fa-mobile-screen-button" },
    { name: "Đồng hồ", icon: "fa-clock" },
    { name: "Tablet", icon: "fa-tablet-screen-button" },
    { name: "Loa/Mic/Webcam", icon: "fa-microphone" },
    { name: "Màn hình", icon: "fa-display" },
    { name: "Chuột", icon: "fa-computer-mouse" },
    { name: "Bàn phím", icon: "fa-keyboard" },
  ];

  return (
    
    <div className="header__menu ">
      <ul className="header__menu-list hide-on-mobile">
        {categories.map((cat) => (
          <li key={cat.name} className="header__menu-list-item">
          
            <Link
              to={`/category/${encodeURIComponent(cat.name)}`}
              className="header__menu-item-info"
            >
              <i className={`fa-solid ${cat.icon}`}></i>
              <span>{cat.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
// 