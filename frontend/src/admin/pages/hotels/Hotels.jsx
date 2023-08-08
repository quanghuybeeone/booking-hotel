import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import useFetch from "../../../hooks/useFetch";
import ModalAddComponent from "../../components/modal/ModalAddComponent";
import ModalEditComponent from "../../components/modal/ModalEditComponent";
import ModalDeleteComponent from "../../components/modal/ModalDeleteComponent";

const Hotels = () => {
  const [pageSize, setPageSize] = useState(5); // Số lượng dữ liệu trên mỗi trang
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [totalPages, setTotalPages] = useState(1); // Tổng số trang
  const [searchValue, setSearchValue] = useState([]); // Giá trị tìm kiếm
  const [filteredData, setfilteredData] = useState([]); // Giá trị tìm kiếm
  const { data, loading, error, reFetch } = useFetch(`/hotels`);

  useEffect(() => {
    if (data) {
      if (searchValue.length == 0) {
        setfilteredData(data);
        setTotalPages(Math.ceil(data.length / pageSize));
      } else {
        setfilteredData(
          data.filter((item) => {
            return searchValue.every((keyword) => {
              return (
                item._id.toLowerCase().includes(keyword.toLowerCase()) ||
                item.name.toLowerCase().includes(keyword.toLowerCase()) ||
                item.city.toLowerCase().includes(keyword.toLowerCase()) ||
                item.type.toLowerCase().includes(keyword.toLowerCase()) ||
                item.address.toLowerCase().includes(keyword.toLowerCase())
              );
            });
          })
        );
        setTotalPages(Math.ceil(filteredData.length / pageSize));
      }
    }
  }, [data, searchValue, pageSize]);

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    const searchQuery = event.target.value;
    const keywords = searchQuery.split(" ");
    console.log(keywords);
    setSearchValue(keywords);
    setCurrentPage(1); // Reset lại trang hiện tại khi thay đổi giá trị tìm kiếm
  };

  const renderData = () => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const displayedProducts = filteredData.slice(startIndex, endIndex);

    return displayedProducts.map((item) => {
      return (
        <tr key={item._id}>
          <td className="border-bottom-0">
            <h6 className="fw-semibold mb-0">{item._id}</h6>
          </td>
          <td className="border-bottom-0">
            <h6 className="fw-semibold mb-1">{item.name}</h6>
            <span className="fw-normal">{item.type}</span>
          </td>
          <td className="border-bottom-0">
            <p className="mb-0 fw-normal">{item.address}</p>
            <span className="fw-normal">{item.city}</span>
          </td>
          {item.featured ? (
            <td className="border-bottom-0">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-success rounded-3 fw-semibold">
                  Hoạt động
                </span>
              </div>
            </td>
          ) : (
            <td className="border-bottom-0">
              <div className="d-flex align-items-center gap-2">
                <span className="badge bg-danger rounded-3 fw-semibold">
                  Không hoạt động
                </span>
              </div>
            </td>
          )}
          <td className="border-bottom-0">
            <h6 className="fw-semibold mb-0 fs-4">{item.cheapestPrice.toLocaleString()} đ</h6>
          </td>
          <td className="border-bottom-0">
            <h6 className="fw-semibold mb-0 fs-4">
              <span>
                <ModalEditComponent
                  titleModal={"Edit Hotel"}
                  inputFields={[
                    "name",
                    "type",
                    "city",
                    "address",
                    "distance",
                    "title",
                    "desc",
                    "cheapestPrice",
                  ]}
                  url="/hotels/"
                  uploadUrl="/file/uploads/"
                  onUpdate={reRender}
                  targetId={item._id}
                />
              </span>

              <span className="mx-2">
                <ModalDeleteComponent
                  titleModal={"Delete Hotel"}
                  url="/hotels/"
                  onUpdate={reRender}
                  targetId={item._id}
                />
              </span>
            </h6>
          </td>
        </tr>
      );
    });
  };

  const reRender = () => {
    reFetch();
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
                  Quản lý khách sạn
                </h5>
                <ModalAddComponent
                  titleModal={"Add new Hotels"}
                  inputFields={[
                    "name",
                    "type",
                    "city",
                    "address",
                    "distance",
                    "title",
                    "desc",
                    "cheapestPrice",
                  ]}
                  url="/hotels/"
                  uploadUrl="/file/uploads/"
                  onUpdate={reRender}
                />
              </div>
            </div>
            <div className="card">
              <div className="card-body">
                <nav aria-label="Page navigation example d-flex">
                  <div className="d-flex align-items-center me-3  mb-3">
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
                      value={pageSize}
                      onChange={handlePageSizeChange}
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
                      value={searchValue.map((item) => item).join(" ")}
                      onChange={handleSearchChange}
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
                          <h6 className="fw-semibold mb-0">Name Hotel</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Address</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Status</h6>
                        </th>
                        <th className="border-bottom-0">
                          <h6 className="fw-semibold mb-0">Cheapest Price</h6>
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
                        renderData()
                      )}
                    </tbody>
                  </table>
                </div>
                <nav aria-label="Page navigation example d-flex">
                  <ul className="pagination justify-content-end">
                    <li
                      className={`page-item ${
                        currentPage === 1 ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Previous"
                        onClick={() => handlePageChange(currentPage - 1)}
                      >
                        <span aria-hidden="true">«</span>
                      </a>
                    </li>
                    {Array.from({ length: totalPages }, (_, index) => (
                      <li
                        key={index}
                        className={`page-item ${
                          currentPage === index + 1 ? "active" : ""
                        }`}
                      >
                        <a
                          className="page-link"
                          href="#"
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </a>
                      </li>
                    ))}
                    <li
                      className={`page-item ${
                        currentPage === totalPages ? "disabled" : ""
                      }`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        aria-label="Next"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
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

export default Hotels;
