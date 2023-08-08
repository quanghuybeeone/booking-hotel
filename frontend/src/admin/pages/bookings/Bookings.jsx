import React, { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import useFetch from "../../../hooks/useFetch";
import axios from "axios";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { format } from "date-fns";
import "./bookings.css"

const getDatesInRange = (startDate, endDate) => {
  const start = new Date(startDate);
  start.setHours(0, 0, 0, 0);

  const end = new Date(endDate);
  end.setHours(0, 0, 0, 0);

  const date = new Date(start.getTime());

  const dates = [];

  while (date < end) {
    const currentDate = new Date(date);
    currentDate.setHours(0, 0, 0, 0);
    dates.push(currentDate);

    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const formatDayMonth = (date) => {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  return `${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}`;
};

const RoomBookingTable = ({ rooms, selectedWeek }) => {

  const renderTableRows = () => {
    return rooms.map((room) => {
      const roomCells = room.roomNumbers.map((roomNumber) => {
        const checkday = () => {
          const r = [];
          const datesInRange = getDatesInRange(selectedWeek[0].startDate, selectedWeek[0].endDate);
          
          for (let i = 0; i < datesInRange.length; i++) {
            const currentDate = new Date(datesInRange[i]).getTime();
            const isBooked = roomNumber.unavailableDates.some((bookedDate) => {
              const check = bookedDate.some(date => {
                date = new Date(date).getTime();
                return date === currentDate
              })
              return check
            });
            r.push(<td className="border-bottom-0" key={i}>{isBooked ? "Đã đặt" : ""}</td>);
          }
          return r;
        };

        return (
          <tr key={roomNumber._id}>
            <td className="border-bottom-0">
              <h6 className="fw-semibold mb-1">Phòng {roomNumber.number}</h6>
              <span className="fw-normal">{room.title}</span>
            </td>
            {checkday()}
          </tr>
        );
      });
      return roomCells;
    });
  };

  const renderDayLabels = () => {
    const datesInRange = getDatesInRange(selectedWeek[0].startDate, selectedWeek[0].endDate);
    return datesInRange.map((date, index) => (
      <th key={index} className="border-bottom-0">
        <h6 className="fw-semibold mb-0">{formatDayMonth(date)}</h6>
      </th>
    ));
  };

  return (
    <table className="table table-bordered text-nowrap mb-0 align-middle">
      <thead className="text-dark fs-4">
        <tr>
          <th className="border-bottom-0"></th>
          {renderDayLabels()}
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};

const Bookings = () => {
  const [hotels, setHotels] = useState([]);
  const [selectedHotel, setSelectedHotel] = useState();
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const { data, loading, error, reFetch } = useFetch(
    selectedHotel ? `/hotels/room/${selectedHotel}` : `/rooms`
  );

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
                  Quản lý lịch đặt phòng
                </h5>
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

                    <label className="m-1">Thời gian :</label>
                    <div className="select-option">
                      <div className="input position-relative p-2">
                        <span
                          onClick={() => setOpenDate(!openDate)}
                          className=""
                        >{`${format(
                          dates[0].startDate,
                          "MM/dd/yyyy"
                        )} to ${format(dates[0].endDate, "MM/dd/yyyy")}`}</span>
                        {openDate && (
                          <DateRange
                            editableDateInputs={true}
                            onChange={(item) => {
                              setDates([item.selection])
                            }}
                            moveRangeOnFirstSelection={false}
                            ranges={dates}
                            className="date-in-admin"
                            minDate={new Date()}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </nav>

                <div className="table-responsive mb-3">
                  {loading ? ("Loading..."):(
                    <RoomBookingTable rooms={data} selectedWeek={dates} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Bookings;
