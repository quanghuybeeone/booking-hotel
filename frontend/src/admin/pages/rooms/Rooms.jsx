import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import useFetch from "../../../hooks/useFetch";
import ModalAddComponent from "../../components/modal/ModalAddComponent";
import ModalEditComponent from "../../components/modal/ModalEditComponent";
import ModalDeleteComponent from "../../components/modal/ModalDeleteComponent";
import axios from "axios";

const Rooms = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();

  const { data, loading, error, reFetch } = useFetch(
    selectedHotel ? `/hotels/room/${selectedHotel}` : `/rooms`
  );
  // console.log(selectedHotel);
  const reRender = () => {
    reFetch();
  };

  useEffect(() => {
    const fetchDataHotels = async () => {
      try {
        const response = await axios.get("/hotels");
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchDataHotels();
  }, []);

  const handleHotelChange = (event) => {
    const selectedHotelId = event.target.value;
    setSelectedHotel(selectedHotelId);
  };

  return (
    <>
      {/*  Body Wrapper */}
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        <Sidebar />
        {/*  Main wrapper */}
        <div className="body-wrapper">
          <Topbar />
          <div className="container-fluid">
            <div className="card">
              <div className="card-body d-flex">
                <h5 className="card-title fw-semibold align-items-center m-0 mt-2">
                  Quản lý phòng
                </h5>
                {selectedHotel ? (
                  <ModalAddComponent
                    titleModal={"Add New Room"}
                    inputFields={[
                      "title",
                      "desc",
                      "price",
                      "maxPeople",
                      "roomNumbers",
                    ]}
                    url={`/rooms/${selectedHotel}`}
                    onUpdate={reRender}
                  />
                ) : (
                  <span className="m-2">
                    (Chọn khách sạn mới thêm được phòng)
                  </span>
                )}
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <nav aria-label="Page navigation example d-flex">
                  <div className="d-flex align-items-center me-3  mb-3">
                    <label htmlFor="pageSizeSelect" className="m-1">
                      Chọn khách sạn
                    </label>
                    <select
                      id="pageSizeSelect"
                      className="form-select p-1 px-2"
                      style={{
                        width: "200px",
                        backgroundPosition: "right 5px center",
                      }}
                      value={selectedHotel}
                      onChange={handleHotelChange}
                    >
                      <option value={undefined}></option>
                      {hotels.map((hotel, index) => (
                        <option key={index} value={hotel._id}>
                          {hotel.name}
                        </option>
                      ))}
                    </select>
                    <label htmlFor="pageSizeSelect" className="m-1">
                      Số dòng/trang:
                    </label>
                    <select
                      id="pageSizeSelect"
                      className="form-select p-1 px-2"
                      style={{
                        width: "60px",
                        backgroundPosition: "right 5px center",
                      }}
                      //   value={pageSize}
                      //   onChange={handlePageSizeChange}
                    >
                      <option value="5">5</option>
                      <option value="10">10</option>
                      <option value="20">20</option>
                    </select>
                    <label className="m-1">Tìm kiếm:</label>
                    <input
                      type="text"
                      className="form-control p-1 px-2"
                      style={{ width: "200px" }}
                      placeholder="Tìm kiếm"
                      //   value={searchValue.map((item) => item).join(" ")}
                      //   onChange={handleSearchChange}
                    />
                  </div>
                </nav>
                <div className="table-responsive mb-3">
                  <table className="table table-bordered text-nowrap mb-0 align-middle">
                    <thead className="text-dark fs-4">
                      <tr>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Id</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Name Room</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Max People</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Price</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Number Rooms</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Control</h6>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {loading ? (
                        <tr>
                          <td colSpan="6">Loading....</td>
                        </tr>
                      ) : (
                        data.map((item) => (
                          <tr key={item._id}>
                            <td className="border-bottom-0">{item._id}</td>
                            <td className="border-bottom-0">{item.title}</td>
                            <td className="border-bottom-0">
                              {item.maxPeople}
                            </td>
                            <td className="border-bottom-0">{item.price}</td>
                            <td>
                              {item.roomNumbers
                                .map((item) => item.number)
                                .join(" ,")}
                            </td>

                            <td className="border-bottom-0">
                              <h6 className="fw-semibold mb-0 fs-4">
                                <span>
                                  <ModalEditComponent
                                    titleModal={"Edit Room"}
                                    inputFields={[
                                      "title",
                                      "desc",
                                      "price",
                                      "maxPeople",
                                    ]}
                                    url="/rooms/"
                                    onUpdate={reRender}
                                    targetId={item._id}
                                  />
                                </span>

                                <span className="mx-2">
                                  <ModalDeleteComponent
                                    titleModal={"Delete Room"}
                                    url={`/rooms/${selectedHotel}/`}
                                    onUpdate={reRender}
                                    targetId={item._id}
                                  />
                                </span>
                              </h6>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example d-flex">
                  <ul className="pagination justify-content-end">
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Previous">
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    <li className="page-item active">
                      <a className="page-link" href="#">
                        1
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        2
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#">
                        3
                      </a>
                    </li>
                    <li className="page-item">
                      <a className="page-link" href="#" aria-label="Next">
                        <span aria-hidden="true">»</span>
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;
