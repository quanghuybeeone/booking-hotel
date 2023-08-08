import React from 'react'
import useFetch from "../../../hooks/useFetch";

const ListRoom = () => {
  const { data, loading, error } = useFetch("/hotels?featured=true&limit=9")
  // const { data, loading, error } = useFetch("/hotels?city=hcm&min=1&max=999&limit=1")
  // console.log(data);
  return (
    <>
      {/* Breadcrumb Section Begin */}
      <div className="breadcrumb-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumb-text">
                <h2>List Hotel</h2>
                <div className="bt-option">
                  <a href="./home.html">Home</a>
                  <span>Hotels</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Breadcrumb Section End */}

      {/* Rooms Section Begin */}
      <section className="rooms-section spad">
        <div className="container">
          <div className="row">
            {loading ? (
              "loading"
            ) : (
              <>
                {
                  data.map((item) => (
                    <div className="col-lg-4 col-md-6" key={item._id}>
                      <div className="room-item">
                        <img src="img/room/room-1.jpg" alt="" />
                        <div className="ri-text">
                          <h4>{item.name}</h4>
                          <h3>
                            {item.cheapestPrice}$<span>/Đêm</span>
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
                          <a href="#" className="primary-btn">
                            More Details
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </>
            )}

            <div className="col-lg-12">
              <div className="room-pagination">
                <a href="#">1</a>
                <a href="#">2</a>
                <a href="#">
                  Next <i className="fa fa-long-arrow-right" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Rooms Section End */}
    </>

  )
}

export default ListRoom