import React, { useContext, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useFetch from '../../../hooks/useFetch';
import { SearchContext } from '../../context/SeachContext';
import Reserve from "../../components/reserve/Reserve";
import {
  faCircleArrowLeft,
  faCircleArrowRight,
  faCircleXmark,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { AuthContext } from '../../context/AuthContext';
import "./hotels.css"

const Hotel = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  // console.log(id);
  const [slideNumber, setSlideNumber] = useState(0);
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const { data, loading, error } = useFetch(`/hotels/find/${id}`);
  // console.log(data);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { dates, options } = useContext(SearchContext);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;

  function dayDifference(date1, date2) {
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays;
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate);
  const total = days * data.cheapestPrice * options.room
  const handleOpen = (i) => {
    setSlideNumber(i);
    setOpen(true);
  };

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 2 : slideNumber - 1;
    } else {
      newSlideNumber = slideNumber === 2 ? 0 : slideNumber + 1;
    }

    setSlideNumber(newSlideNumber);
  };

  const handleClick = () => {
    if (user) {
      setOpenModal(true);
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      {/* Breadcrumb Section Begin */}
      {/* <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Our Rooms</h2>
                <div className="bt-option">
                  <Link to={"/"}>Home</Link>
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      {/* Breadcrumb Section End */}
      {loading ? (
        "loading"
      ) : (
        <>
          {/* Room Details Section Begin */}
          <section className="room-details-section spad mt-5">
            <div className="container">
              <div className="row">

                <div className="col-lg-12">
                  <div className="room-details-item">
                    {open && (
                      <div className="slider">
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          className="close"
                          onClick={() => setOpen(false)}
                        />
                        <FontAwesomeIcon
                          icon={faCircleArrowLeft}
                          className="arrow"
                          onClick={() => handleMove("l")}
                        />
                        <div className="sliderWrapper">
                          <img
                            src={`http://localhost:8888/uploads/${data.photos[slideNumber]}`}
                            alt=""
                            className="sliderImg"
                          />
                        </div>
                        <FontAwesomeIcon
                          icon={faCircleArrowRight}
                          className="arrow"
                          onClick={() => handleMove("r")}
                        />
                      </div>
                    )}
                    <div className="hotelImages">
                      {data.photos?.map((photo, i) => {
                        // console.log(photo);
                        return(
                        
                          <div className="hotelImgWrapper" key={i}>
                            <img
                              onClick={() => handleOpen(i)}
                              src={`http://localhost:8888/uploads/${photo}`}
                              alt=""
                              className="hotelImg"
                            />
                          </div>
                        )
                      })}
                    </div>
                    <div className="rd-text">
                      <div className="rd-title">
                        <div className="rdt-right">
                          <div className="rating">
                            <i className="icon_star" />
                            <i className="icon_star" />
                            <i className="icon_star" />
                            <i className="icon_star" />
                            <i className="icon_star-half_alt" />
                          </div>
                          <div className={`btn-booking`} onClick={handleClick}>Booking Now</div>
                        </div>
                      </div>
                      <div>
                        <h1>Giá ưu đãi dành cho {days} ngày tại {data.name}</h1>
                        <h2>
                          <b>{total.toLocaleString()} đ</b> ({options.room}{" "}phòng,{" "}{days}{" "}ngày)
                        </h2>
                      </div>
                      <table>
                        <tbody>
                          <tr>
                            <td className="r-o">Thành phố:</td>
                            <td>{data.city}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Cách trung tâm:</td>
                            <td>{data.distance} km</td>
                          </tr>
                          <tr>
                            <td className="r-o">Địa chỉ:</td>
                            <td>{data.address}</td>
                          </tr>
                          <tr>
                            <td className="r-o">Title:</td>
                            <td>{data.title}</td>
                          </tr>
                        </tbody>
                      </table>
                      <p className="f-para">
                        {data.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* Room Details Section End */}
        </>
      )}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </>

  )
}

export default Hotel