import React from "react";

const Room = () => {
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>Our Rooms</h2>
                <div className="bt-option">
                  <a href="./home.html">Home</a>
                  <span>Rooms</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Section End */}
      {/* Room Details Section Begin */}
      <section className="room-details-section spad">
        <div className="container">
          <div className="row">
            
            <div className="col-lg-12">
              <div className="room-details-item">
                <img src="img/room/room-details.jpg" alt="" />
                <div className="rd-text">
                  <div className="rd-title">
                    <h3>Premium King Room</h3>
                    <div className="rdt-right">
                      <div className="rating">
                        <i className="icon_star" />
                        <i className="icon_star" />
                        <i className="icon_star" />
                        <i className="icon_star" />
                        <i className="icon_star-half_alt" />
                      </div>
                      <a href="#">Booking Now</a>
                    </div>
                  </div>
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
                  <p className="f-para">
                    Motorhome or Trailer that is the question for you. Here are
                    some of the advantages and disadvantages of both, so you
                    will be confident when purchasing an RV. When comparing Rvs,
                    a motorhome or a travel trailer, should you buy a motorhome
                    or fifth wheeler? The advantages and disadvantages of both
                    are studied so that you can make your choice wisely when
                    purchasing an RV. Possessing a motorhome or fifth wheel is
                    an achievement of a lifetime. It can be similar to
                    sojourning with your residence as you search the various
                    sites of our great land, America.
                  </p>
                  <p>
                    The two commonly known recreational vehicle classes are the
                    motorized and towable. Towable rvs are the travel trailers
                    and the fifth wheel. The rv travel trailer or fifth wheel
                    has the attraction of getting towed by a pickup or a car,
                    thus giving the adaptability of possessing transportation
                    for you when you are parked at your campsite.
                  </p>
                </div>
              </div>
              <div className="rd-reviews">
                <h4>Reviews</h4>
                <div className="review-item">
                  <div className="ri-pic">
                    <img src="img/room/avatar/avatar-1.jpg" alt="" />
                  </div>
                  <div className="ri-text">
                    <span>27 Aug 2019</span>
                    <div className="rating">
                      <i className="icon_star" />
                      <i className="icon_star" />
                      <i className="icon_star" />
                      <i className="icon_star" />
                      <i className="icon_star-half_alt" />
                    </div>
                    <h5>Brandon Kelley</h5>
                    <p>
                      Neque porro qui squam est, qui dolorem ipsum quia dolor
                      sit amet, consectetur, adipisci velit, sed quia non
                      numquam eius modi tempora. incidunt ut labore et dolore
                      magnam.
                    </p>
                  </div>
                </div>
                <div className="review-item">
                  <div className="ri-pic">
                    <img src="img/room/avatar/avatar-2.jpg" alt="" />
                  </div>
                  <div className="ri-text">
                    <span>27 Aug 2019</span>
                    <div className="rating">
                      <i className="icon_star" />
                      <i className="icon_star" />
                      <i className="icon_star" />
                      <i className="icon_star" />
                      <i className="icon_star-half_alt" />
                    </div>
                    <h5>Brandon Kelley</h5>
                    <p>
                      Neque porro qui squam est, qui dolorem ipsum quia dolor
                      sit amet, consectetur, adipisci velit, sed quia non
                      numquam eius modi tempora. incidunt ut labore et dolore
                      magnam.
                    </p>
                  </div>
                </div>
              </div>
              <div className="review-add">
                <h4>Add Review</h4>
                <form action="#" className="ra-form">
                  <div className="row">
                    <div className="col-lg-6">
                      <input type="text" placeholder="Name*" />
                    </div>
                    <div className="col-lg-6">
                      <input type="text" placeholder="Email*" />
                    </div>
                    <div className="col-lg-12">
                      <div>
                        <h5>You Rating:</h5>
                        <div className="rating">
                          <i className="icon_star" />
                          <i className="icon_star" />
                          <i className="icon_star" />
                          <i className="icon_star" />
                          <i className="icon_star-half_alt" />
                        </div>
                      </div>
                      <textarea placeholder="Your Review" defaultValue={""} />
                      <button type="submit">Submit Now</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
            
          </div>
        </div>
      </section>
      {/* Room Details Section End */}
    </>
  );
};

export default Room;
