import React from 'react';

const Footer = () => {
  return (
    <div className="footer">
      <div className="grid">
        <div className="grid__row">
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Về chăm sóc khách hàng</h3>
            <ul className="footer__list">
              <li className="footer-item">
                <a href="#" className="footer-item__link">Trung Tâm Trợ Giúp</a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">Shop Mall</a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">Hướng dẫn mua hàng</a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Giới thiệu</h3>
            <ul className="footer__list">
              <li className="footer-item">
                <a href="#" className="footer-item__link">Giới thiệu</a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">Tuyển dụng</a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">Điều khoản</a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Danh mục</h3>
            <ul className="footer__list">
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  <i className="footer-item__icon fa-brands fa-facebook"></i>
                  Facebook
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  <i className="footer-item__icon fa-brands fa-instagram"></i>
                  Instagram
                </a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">
                  <i className="footer-item__icon fa-brands fa-linkedin"></i>
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Theo dõi</h3>
            <ul className="footer__list">
              <li className="footer-item">
                <a href="#" className="footer-item__link">Trung Tâm Trợ Giúp</a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">Shop Mall</a>
              </li>
              <li className="footer-item">
                <a href="#" className="footer-item__link">Hướng dẫn mua hàng</a>
              </li>
            </ul>
          </div>
          <div className="grid__column-2-4">
            <h3 className="footer__heading">Vào cửa hàng trên ứng dụng</h3>
            <div className="footer__download">
              <img src="img/qr_code.png" alt="Download QR" className="footer__download-qr" />
              <div className="footer__download-apps">
                <a href="#" className="footer__download-app-link">
                  <img src="img/Google-Play-Logo.png" alt="Google Play" className="footer__download-app-icon-img" />
                </a>
                <a href="#" className="footer__download-app-link">
                  <img src="img/appstore.png" alt="App Store" className="footer__download-app-icon-img" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="grid">
          <p className="footer__text">© 2025 - Bản quyền thuộc về Công ty MyCV</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;