import React, { useContext, useEffect, useState } from 'react'
import useFetch from "../../../hooks/useFetch";
import { Link, useLocation } from 'react-router-dom';
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import { SearchContext } from '../../context/SeachContext';
import axios from 'axios';

const List = () => {
  const location = useLocation()
  const [destination, setDestination] = useState(location.state.destination)
  const [dates, setDates] = useState(location.state.dates);
  const [openDate, setOpenDate] = useState(false);
  const [options, setOptions] = useState(location.state.options)
  const [min, setMin] = useState('')
  const [max, setMax] = useState('')

  const [page, setPage] = useState(1);
  const pageSize = 4;
  const minPrice = 0;
  const maxPrice = 999999999;
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const urlApi = destination ? `/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}` : `/hotels?min=${minPrice}&max=${maxPrice}`;
    axios.get(urlApi)
      .then(response => setTotalItems(response.data.length))
      .catch(error => console.error(error));
  }, [destination, minPrice, maxPrice]);

  const offset = (page - 1) * pageSize;
  const urlApi = destination ? `/hotels?city=${destination}&min=${minPrice}&max=${maxPrice}&offset=${offset}&limit=${pageSize}` : `/hotels?min=${minPrice}&max=${maxPrice}&offset=${offset}&limit=${pageSize}`;
  const { data, loading, error, reFetch } = useFetch(urlApi);

  const totalPages = Math.ceil(totalItems / pageSize);
  // console.log(totalPages);
  const isLastPage = page === totalPages;

  const [openOptions, setOpenOptions] = useState(false);
  const handleOption = (name, operation) => {
    setOptions((prev) => {
      return {
        ...prev,
        [name]: operation === "i" ? options[name] + 1 : options[name] - 1,
      };
    });
  };
  const { dispatch } = useContext(SearchContext);
  // handleChange
  const handleClick = () => {
    dispatch({ type: "NEW_SEARCH", payload: { destination, dates, options } });
    reFetch()
  }

  return (
    <>
      {/* Breadcrumb Section Begin */}
      {/* <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>List Hotel 123</h2>
                <div className="bt-option">
                  <a href="./home.html">Home</a>
                  <span>Hotels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Breadcrumb Section End */}

      {/* Rooms Section Begin */}
      <section className="rooms-section spad mt-5">
        <div className="container">
          <div className="row">
            <div className='col-lg-8 row'>
              {loading ? (
                <div className='row' style={{ minHeight: "1150px" }}>"Loading ..."</div>

              ) : (
                <div className='row' style={{ minHeight: "1150px" }}>
                  {
                    data.map((item) => (
                      <div className="col-lg-6 col-md-6" key={item._id}>
                        <div className="room-item">
                          <img src={`http://localhost:8888/uploads/${item.photos[0]}`} alt="" />
                          <div className="ri-text">
                            <h4>{item.name}</h4>
                            <h4></h4>
                            <h3>
                              {item.cheapestPrice.toLocaleString()} đ<span>/Đêm</span>
                            </h3>
                            <table>
                              <tbody>
                                <tr>
                                  <td className="r-o">Loại:</td>
                                  <td>{item.type}</td>
                                </tr>
                                <tr>
                                  <td className="r-o">Tỉnh/Thành phố:</td>
                                  <td>{item.city}</td>
                                </tr>
                                <tr>
                                  <td className="r-o">Địa chỉ:</td>
                                  <td>{item.address}</td>
                                </tr>
                              </tbody>
                            </table>
                            <Link to={`/hotels/${item._id}`} className="primary-btn">
                              More Details
                            </Link>

                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              <div className="col-lg-12">


                <div className="room-pagination">
                  {[...Array(totalPages)].map((_, index) => (
                    <div
                      key={index}
                      className={`num-page ${page === index + 1 ? 'active' : ''}`}
                      onClick={() => setPage(index + 1)}
                    >
                      {index + 1}
                    </div>
                  ))}
                  {!isLastPage && (
                    <div
                      className="num-page"
                      onClick={() => setPage(prevPage => prevPage + 1)}
                    >
                      Next <i className="fa fa-long-arrow-right" />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className='col-lg-4'>
              <div className="booking-form">
                <h3 className="mb-2">Tìm khách sạn</h3>
                <div className="form">
                  <div className="check-date">
                    <label htmlFor="date-in">Điểm điến của bạn</label>
                    <input type="text"
                      className="" id=""
                      onChange={(e) => {
                        setDestination(e.target.value)
                        setPage(1)
                      }}
                      value={destination}
                    />
                  </div>
                  <div className="check-date">
                    <label htmlFor="date-in">Giá thấp nhất một đêm</label>
                    <input type="number"
                      className="" id=""
                      onChange={(e) => {
                        setMin(e.target.value)
                        setPage(1)
                      }}
                      value={min}
                    />
                  </div>
                  <div className="check-date">
                    <label htmlFor="date-in">Giá cao nhất một đêm</label>
                    <input type="number"
                      className="" id=""
                      onChange={(e) => {
                        setMax(e.target.value)
                        setPage(1)
                      }}
                      value={max}
                    />
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
                  <button type="button" className="search-btn" onClick={handleClick}>Tìm kiếm</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rooms Section End */}
    </>

  )
}

export default List