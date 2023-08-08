import React from "react";
import { memo } from "react";
import { Link } from "react-router-dom";


const Header = () => {

  return (
    <>
      {/* Page Preloder */}
      {/* <div id="preloder">
            <div className="loader" />
        </div> */}


      
      {/* Offcanvas Menu Section Begin */}
      <div className="offcanvas-menu-overlay" />
      <div className="canvas-open">
        <i className="icon_menu" />
      </div>
      <div className="offcanvas-menu-wrapper">
        <div className="canvas-close">
          <i className="icon_close" />
        </div>
        <div className="search-icon  search-switch">
          <i className="icon_search" />
        </div>
        <div className="header-configure-area">
          <div className="language-option">
            <img src="img/flag.jpg" alt="" />
            <span>
              EN <i className="fa fa-angle-down" />
            </span>
            <div className="flag-dropdown">
              <ul>
                <li>
                  <a href="#">Zi</a>
                </li>
                <li>
                  <a href="#">Fr</a>
                </li>
              </ul>
            </div>
          </div>
          <a href="#" className="bk-btn">
            Booking Now
          </a>
        </div>
        <nav className="mainmenu mobile-menu">
          <ul>
            <li className="active">
              <Link to={"/"}>Home</Link>
            </li>
            <li>
              <Link to={"/hotels"}>Hotels</Link>
            </li>
            <li>
              <Link to={"/rooms"}>Rooms</Link>
              <ul className="dropdown">
                <li>
                  <a href="/rooms">Room Details</a>
                </li>
                <li>
                  <a href="#">Deluxe Room</a>
                </li>
                <li>
                  <a href="#">Family Room</a>
                </li>
                <li>
                  <a href="#">Premium Room</a>
                </li>
              </ul>
            </li>
            <li>
              <a href="/blog">News</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
        </nav>
        <div id="mobile-menu-wrap" />
        <div className="top-social">
          <a href="#">
            <i className="fa fa-facebook" />
          </a>
          <a href="#">
            <i className="fa fa-twitter" />
          </a>
          <a href="#">
            <i className="fa fa-instagram" />
          </a>
        </div>
        <ul className="top-widget">
          <li>
            <i className="fa fa-phone" /> (12) 345 67890
          </li>
          <li>
            <i className="fa fa-envelope" /> info.colorlib@gmail.com
          </li>
        </ul>
      </div>
      {/* Offcanvas Menu Section End */}
      {/* Header Section Begin */}
      <header className="header-section">
        <div className="top-nav">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <ul className="tn-left">
                  <li>
                    <i className="fa fa-phone" /> (12) 345 67890
                  </li>
                  <li>
                    <i className="fa fa-envelope" /> info.colorlib@gmail.com
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="tn-right">
                  <div className="top-social">
                    <a href="#">
                      <i className="fa fa-facebook" />
                    </a>
                    <a href="#">
                      <i className="fa fa-twitter" />
                    </a>
                    <a href="#">
                      <i className="fa fa-instagram" />
                    </a>
                  </div>
                  <Link to={"/login"} className="bk-btn">
                    Đăng Nhập
                  </Link>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="menu-item top-nav">
          <div className="container">
            <div className="row">
              <div className="col-lg-2">
                <div className="logo">
                  <a href="/">
                    <img src="img/logo.png" alt="" />
                  </a>
                </div>
              </div>
              <div className="col-lg-10">
                <div className="nav-menu">
                  <nav className="mainmenu">
                    <ul>
                      <li className="">
                        <Link to={"/"}>Home</Link>
                      </li>
                      <li>
                        <Link to={"/hotels"}>Hotels</Link>
                      </li>
                      <li>
                        <Link to={"/rooms"}>Rooms</Link>
                      </li>
                      <li>
                        <a href="/blog">News</a>
                      </li>
                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                  </nav>
                  <div className="nav-right search-switch">
                    <i className="icon_search" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Header End */}

      {/* Search model Begin */}
      <div className="search-model">
        <div className="h-100 d-flex align-items-center justify-content-center">
          <div className="search-close-switch">
            <i className="icon_close" />
          </div>
          <form className="search-model-form">
            <input
              type="text"
              id="search-input"
              placeholder="Search here....."
            />
          </form>
        </div>
      </div>

      {/* Search model end */}
    </>
  );
};

export default memo(Header);
