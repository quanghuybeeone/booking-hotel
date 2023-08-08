import React, { useContext, useState } from "react";
import Featured from "../../components/featured/Featured";
import PropertyList from "../../components/propertyList/PropertyList";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import "./home.css";
import { SearchContext } from "../../context/SeachContext";
const Home = () => {

  const [destination, setDestination] = useState("");
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const [openOptions, setOpenOptions] = useState(false);
  const [options, setOptions] = useState({
    adult: 1,
    children: 0,
    room: 1,
  });

  const navigate = useNavigate();
  // const { user } = useContext(AuthContext);


  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };

  const { dispatch } = useContext(SearchContext);

  const handleSearch = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    navigate("/hotels", { state: { destination, dates, options } });
  };
  return (
    <>
      {/* Hero Section Begin */}
      <section className="hero-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="hero-text">
                <h1>Sona A Luxury Hotel</h1>
                <p>
                  Here are the best hotel booking sites, including
                  recommendations for international travel and for finding
                  low-priced hotel rooms.
                </p>
                <a href="#" className="primary-btn">
                  Discover Now
                </a>
              </div>
            </div>
            <div className="col-xl-4 col-lg-5 offset-xl-2 offset-lg-1">
              <div className="booking-form">
                <h3 className="mb-2">Tìm khách sạn</h3>
                <div className="form">
                  <div className="check-date">
                    <label htmlFor="date-in">Điểm điến của bạn</label>
                    <input type="text"
                      className="" id=""
                      onChange={(e) => setDestination(e.target.value)}
                    />
                    {/* <i className="icon_calendar" /> */}
                  </div>
                  <div className="select-option">
                    <label htmlFor="guest">Thời gian cho kỳ nghỉ của bạn:</label>
                    <div className="input position-relative">
                      <span
                        onClick={() => setOpenDate(!openDate)}
                        className="headerSearchText"
                      >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                        dates[0].endDate,
                        "MM/dd/yyyy"
                      )}`}</span>
                      {openDate && (
                        <DateRange
                          editableDateInputs={true}
                          onChange={(item) => setDates([item.selection])}
                          moveRangeOnFirstSelection={false}
                          ranges={dates}
                          className="date"
                          minDate={new Date()}
                        />
                      )}
                    </div>
                  </div>
                  <div className="select-option">
                    <label htmlFor="guest">Chọn loại dịch vụ:</label>
                    <div className="input position-relative">
                      <span
                        onClick={() => setOpenOptions(!openOptions)}
                        className="headerSearchText"
                      >{`${options.adult} adult · ${options.children} children · ${options.room} room`}</span>
                      {openOptions && (
                        <div className="options">
                          <div className="optionItem">
                            <span className="optionText">Adult</span>
                            <div className="optionCounter">
                              <button
                                disabled={options.adult <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("adult", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.adult}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("adult", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="optionItem">
                            <span className="optionText">Children</span>
                            <div className="optionCounter">
                              <button
                                disabled={options.children <= 0}
                                className="optionCounterButton"
                                onClick={() => handleOption("children", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.children}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("children", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div className="optionItem">
                            <span className="optionText">Room</span>
                            <div className="optionCounter">
                              <button
                                disabled={options.room <= 1}
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "d")}
                              >
                                -
                              </button>
                              <span className="optionCounterNumber">
                                {options.room}
                              </span>
                              <button
                                className="optionCounterButton"
                                onClick={() => handleOption("room", "i")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                  <button type="button" className="search-btn" onClick={handleSearch}>Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-slider owl-carousel owl-loaded">
          <div className="owl-stage-outer">
            <div className="owl-stage">
              <div className="owl-item" style={{ width: '100%' }}>
                <div
                  className="hs-item set-bg"
                  data-setbg="img/hero/hero-2.jpg"
                  style={{ backgroundImage: 'url("img/hero/hero-2.jpg")' }}
                />
              </div>
            </div>
          </div>
          <div className="owl-nav disabled">
            <button type="button" role="presentation" className="owl-prev">
              <span aria-label="Previous">‹</span>
            </button>
            <button type="button" role="presentation" className="owl-next">
              <span aria-label="Next">›</span>
            </button>
          </div>
          <div className="owl-dots">
            <button role="button" className="owl-dot active">
              <span />
            </button>
            <button role="button" className="owl-dot">
              <span />
            </button>
            <button role="button" className="owl-dot">
              <span />
            </button>
          </div>
        </div>
      </section>
      {/* Hero Section End */}

      <Featured />

      <PropertyList />

      {/* About Us Section Begin */}
      <section className="aboutus-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="about-text">
                <div className="section-title">
                  <span>About Us</span>
                  <h2>
                    Intercontinental LA <br />
                    Westlake Hotel
                  </h2>
                </div>
                <p className="f-para">
                  Sona.com is a leading online accommodation site. We’re
                  passionate about travel. Every day, we inspire and reach
                  millions of travelers across 90 local websites in 41
                  languages.
                </p>
                <p className="s-para">
                  So when it comes to booking the perfect hotel, vacation
                  rental, resort, apartment, guest house, or tree house, we’ve
                  got you covered.
                </p>
                <a href="#" className="primary-btn about-btn">
                  Read More
                </a>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="about-pic">
                <div className="row">
                  <div className="col-sm-6">
                    <img src="img/about/about-1.jpg" alt="" />
                  </div>
                  <div className="col-sm-6">
                    <img src="img/about/about-2.jpg" alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* About Us Section End */}

      {/* Home Room Section Begin */}
      <section className="hp-room-section spad">
        <div className="container-fluid">
          <div className="hp-room-items">
            <div className="row">
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  data-setbg="img/room/room-b1.jpg"
                  style={{ backgroundImage: 'url("img/room/room-b1.jpg")' }}
                >
                  <div className="hr-text">
                    <h3>Double Room</h3>
                    <h2>
                      199$<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" className="primary-btn">
                      More Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  data-setbg="img/room/room-b2.jpg"
                  style={{ backgroundImage: 'url("img/room/room-b2.jpg")' }}
                >
                  <div className="hr-text">
                    <h3>Premium King Room</h3>
                    <h2>
                      159$<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" className="primary-btn">
                      More Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  data-setbg="img/room/room-b3.jpg"
                  style={{ backgroundImage: 'url("img/room/room-b3.jpg")' }}
                >
                  <div className="hr-text">
                    <h3>Deluxe Room</h3>
                    <h2>
                      198$<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" className="primary-btn">
                      More Details
                    </a>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 col-md-6">
                <div
                  className="hp-room-item set-bg"
                  data-setbg="img/room/room-b4.jpg"
                  style={{ backgroundImage: 'url("img/room/room-b4.jpg")' }}
                >
                  <div className="hr-text">
                    <h3>Family Room</h3>
                    <h2>
                      299$<span>/Pernight</span>
                    </h2>
                    <table>
                      <tbody>
                        <tr>
                          <td className="r-o">Size:</td>
                          <td>30 ft</td>
                        </tr>
                        <tr>
                          <td className="r-o">Capacity:</td>
                          <td>Max persion 5</td>
                        </tr>
                        <tr>
                          <td className="r-o">Bed:</td>
                          <td>King Beds</td>
                        </tr>
                        <tr>
                          <td className="r-o">Services:</td>
                          <td>Wifi, Television, Bathroom,...</td>
                        </tr>
                      </tbody>
                    </table>
                    <a href="#" className="primary-btn">
                      More Details
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Room Section End */}



      {/* Testimonial Section Begin */}
      {/* <section className="testimonial-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Testimonials</span>
                <h2>What Customers Say?</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-8 offset-lg-2">
              <div className="testimonial-slider owl-carousel owl-loaded owl-drag">
                <div className="owl-stage-outer">
                  <div
                    className="owl-stage"
                  >
                    
                    <div className="owl-item" style={{ width: 750 }}>
                      <div className="ts-item">
                        <p>
                          After a construction project took longer than
                          expected, my husband, my daughter and I needed a place
                          to stay for a few nights. As a Chicago resident, we
                          know a lot about our city, neighborhood and the types
                          of housing options available and absolutely love our
                          vacation at Sona Hotel.
                        </p>
                        <div className="ti-author">
                          <div className="rating">
                            <i className="icon_star" />
                            <i className="icon_star" />
                            <i className="icon_star" />
                            <i className="icon_star" />
                            <i className="icon_star-half_alt" />
                          </div>
                          <h5> - Alexander Vasquez</h5>
                        </div>
                        <img src="img/testimonial-logo.png" alt="" />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="owl-nav">
                  <button
                    type="button"
                    role="presentation"
                    className="owl-prev"
                  >
                    <i className="arrow_left" />
                  </button>
                  <button
                    type="button"
                    role="presentation"
                    className="owl-next"
                  >
                    <i className="arrow_right" />
                  </button>
                </div>
                <div className="owl-dots disabled" />
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Testimonial Section End */}
    </>
  );
};

export default Home;
