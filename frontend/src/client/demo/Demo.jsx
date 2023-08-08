import React from "react";
import RoomBookingTable from "./RoomBookingTable";
import "./demo.css"
const App = () => {
  const rooms = [
    {
      _id: "64d00bbc5f88a2f56b80b64a",
      title: "Phòng 4 Người",
      price: 500000,
      maxPeople: 6,
      desc: "gồm 2 giường đôi, dành cho 4 người ( kèm 2 trẻ em )",
      roomNumbers: [
        {
          number: 204,
          unavailableDates: [
            ["2023-08-08T17:00:00.000Z", "2023-08-09T17:00:00.000Z"],
          ],
          _id: "64d00bbc5f88a2f56b80b64b",
        },
        {
          number: 205,
          unavailableDates: [],
          _id: "64d00bbc5f88a2f56b80b64c",
        },
        {
          number: 206,
          unavailableDates: [],
          _id: "64d00bbc5f88a2f56b80b64d",
        },
      ],
      createdAt: "2023-08-06T21:08:12.811Z",
      updatedAt: "2023-08-07T20:36:02.064Z",
      __v: 0,
    },
  ];

  const selectedWeek = {
    startDate: new Date("2023-08-05T00:00:00.000Z"),
    endDate: new Date("2023-08-11T23:59:59.999Z"),
  };

  return (
    <div>
      <h2>Lịch đặt phòng khách sạn</h2>
      <RoomBookingTable rooms={rooms} selectedWeek={selectedWeek} />
    </div>
  );
};

export default App;