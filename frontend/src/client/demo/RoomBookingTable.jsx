// import React from "react";

// const RoomBookingTable = ({ rooms, selectedWeek }) => {
//   const renderTableHeader = () => {
//     const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//     const headerCells = days.map((day, index) => (
//       <th key={index}>{day}</th>
//     ));
//     return <tr>
//         <th></th>
//         {headerCells}
//         </tr>;
//   };

//   const renderTableRows = () => {
//     return rooms.map((room) => {
//       const roomCells = room.roomNumbers.map((roomNumber) => {
//         const isBooked = roomNumber.unavailableDates.some(
//           (unavailableDate) => {
//             const startDate = new Date(unavailableDate[0]);
//             const endDate = new Date(unavailableDate[1]);
//             return (
//               startDate >= selectedWeek.startDate &&
//               endDate <= selectedWeek.endDate
//             );
//           }
//         );

//         return (
//           <td key={roomNumber._id}>{roomNumber.number}{isBooked ? "Đã đặt" : "Chưa đặt"}</td>
//         );
//       });
//       return (
//         <tr key={room._id}>
//           <td>
//             <h6>{room.title}</h6>
//             <span></span>
//           </td>
//           {roomCells}
//         </tr>
//       );
//     });
//   };

//   return (
//     <table>
//       <thead>{renderTableHeader()}</thead>
//       <tbody>{renderTableRows()}</tbody>
//     </table>
//   );
// };

// export default RoomBookingTable;

// import React from "react";

// const RoomBookingTable = ({ rooms, selectedWeek }) => {
//     const renderTableHeader = () => {
//         const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
//         const headerCells = days.map((day, index) => <th key={index}>{day}</th>);
//         return (
//             <tr>
//                 <th></th>
//                 {headerCells}
//             </tr>
//         );
//     };

//     const renderTableRows = () => {
//         return rooms.map((room) => {
//             const roomCells = room.roomNumbers.map((roomNumber) => {
//                 // const isBooked = roomNumber.unavailableDates.some(
//                 //   (unavailableDate) => {
//                 //     const startDate = new Date(unavailableDate[0]);
//                 //     const endDate = new Date(unavailableDate[1]);
//                 //     return (
//                 //       startDate >= selectedWeek.startDate &&
//                 //       endDate <= selectedWeek.endDate
//                 //     );
//                 //   }
//                 // );
//                 const unavailableDates = roomNumber.unavailableDates.map((unavailableDate)=>{
//                     console.log(unavailableDate);
//                 })
//                 // console.log(roomNumber.unavailableDates);
//                 const checkday = ()=>{
//                     const r = []
//                     for (let i = 0; i < 7; i++) {

//                         r.push(<td>trống</td>)
//                     }
//                     return r
//                 }

//                 return (
//                     <tr key={roomNumber._id}>
//                         <td>
//                             <h6>Phòng {roomNumber.number}</h6>
//                             <span>{room.title}</span>
//                         </td>
//                         {checkday()}
//                     </tr>
//                 )
//             });
//             return roomCells
//         });
//     };

//     return (
//         <table>
//             <thead>{renderTableHeader()}</thead>
//             <tbody>{renderTableRows()}</tbody>
//         </table>
//     );
// };

// export default RoomBookingTable;

import React from "react";

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
  const renderTableHeader = () => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const headerCells = days.map((day, index) => <th key={index}>{day}</th>);
    return (
      <tr>
        <th></th>
        {headerCells}
      </tr>
    );
  };

  const renderTableRows = () => {
    return rooms.map((room) => {
      const roomCells = room.roomNumbers.map((roomNumber) => {
        const checkday = () => {
          const r = [];
          const datesInRange = getDatesInRange(selectedWeek.startDate, selectedWeek.endDate);
          for (let i = 0; i < 7; i++) {
            const currentDate = new Date(datesInRange[i]).getTime();
            const isBooked = roomNumber.unavailableDates.some((bookedDate) => {
                const check = bookedDate.some(date => {
                    date = new Date(date).getTime();
                    return date === currentDate
                })
                return check
            });
            r.push(<td key={i}>{isBooked ? "Đã đặt" : ""}</td>);
          }
          return r;
        };

        return (
          <tr key={roomNumber._id}>
            <td>
              <h6>Phòng {roomNumber.number}</h6>
              <span>{room.title}</span>
            </td>
            {checkday()}
          </tr>
        );
      });
      return roomCells;
    });
  };

  const renderDayLabels = () => {
    const datesInRange = getDatesInRange(selectedWeek.startDate, selectedWeek.endDate);
    return datesInRange.map((date, index) => (
      <th key={index}>{formatDayMonth(date)}</th>
    ));
  };

  return (
    <table>
      <thead>
        {renderTableHeader()}
        <tr>
          <th></th>
          {renderDayLabels()}
        </tr>
      </thead>
      <tbody>{renderTableRows()}</tbody>
    </table>
  );
};

export default RoomBookingTable;


