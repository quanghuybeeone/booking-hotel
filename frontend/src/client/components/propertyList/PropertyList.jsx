import React from 'react'
import useFetch from "../../../hooks/useFetch";

const PropertyList = () => {
  const { data, loading, error } = useFetch("/hotels/countByType")
  // console.log(data);

  return (

    <>
      {/* Services Section End */}
      <section className="services-section spad">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <span>What We Do</span>
                <h2>Các dịch vụ của chúng tôi</h2>
              </div>
            </div>
          </div>

          <div className="row">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  
                  <div className="col-lg-4 col-sm-6" key={item.type}>
                    <div className="service-item">
                      <i className="flaticon-036-parking" />
                      <h4>{item.type}</h4>
                      <h5>Có {item.count} Địa điểm</h5>
                      <p>
                        Sang trọng, Lịch sự, View đẹp và bao gồm hiều dịch vụ khác.
                      </p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>
      {/* Services Section End */}
    </>
  )
}

export default PropertyList