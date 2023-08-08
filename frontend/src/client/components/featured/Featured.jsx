import React from 'react'
import useFetch from "../../../hooks/useFetch";

const Featured = () => {
  const { data, loading, error } = useFetch("/hotels/countByCity?cities=hanoi,danang,hcm")
  // console.log(data);

  return (
    <>
      {/* Blog Section Begin */}
      <section className="blog-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>Hotel News</span>
                <h2>Các thành phố du lịch</h2>
              </div>
            </div>
          </div>
          <div className="row">
            <>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <div className="col-lg-4">
                    <div
                      className="blog-item set-bg"
                      data-setbg="img/blog/blog-1.jpg"
                      style={{ backgroundImage: 'url("img/blog/blog-1.jpg")' }}
                    >
                      <div className="bi-text">
                        <span className="b-tag">New</span>
                        <h4>
                          <a href="#">Hà Nội</a>
                        </h4>
                        <div className="b-time">
                          {data[0]} Địa điểm khách sạn
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="blog-item set-bg"
                      data-setbg="img/blog/blog-2.jpg"
                      style={{ backgroundImage: 'url("img/blog/blog-2.jpg")' }}
                    >
                      <div className="bi-text">
                        <span className="b-tag">New</span>
                        <h4>
                          <a href="#">Đà Nẵng</a>
                        </h4>
                        <div className="b-time">
                          {data[1]} Địa điểm khách sạn
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4">
                    <div
                      className="blog-item set-bg"
                      data-setbg="img/blog/blog-3.jpg"
                      style={{ backgroundImage: 'url("img/blog/blog-3.jpg")' }}
                    >
                      <div className="bi-text">
                        <span className="b-tag">New</span>
                        <h4>
                          <a href="#">TP.Hồ Chí Minh</a>
                        </h4>
                        <div className="b-time">
                          {data[2]} Địa điểm khách sạn
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </>
          </div>
        </div>
      </section>
      {/* Blog Section End */}
    </>

  )
}

export default Featured