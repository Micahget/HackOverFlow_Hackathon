import React, { useEffect, useState } from "react";

const Report = () => {
  const violationsData = [
    { id: 1, plateNo: "ABC123", violation_count: 5 },
    { id: 2, plateNo: "XYZ789", violation_count: 3 },
    { id: 3, plateNo: "DEF456", violation_count: 8 },
    { id: 4, plateNo: "GHI789", violation_count: 2 },
    { id: 5, plateNo: "JKL012", violation_count: 6 },
    { id: 6, plateNo: "MNO345", violation_count: 4 },
    { id: 7, plateNo: "PQR678", violation_count: 1 },
    { id: 8, plateNo: "STU901", violation_count: 7 },
    { id: 9, plateNo: "VWX234", violation_count: 9 },
    { id: 10, plateNo: "YZA567", violation_count: 2 },
  ];

//   const FetchData = () => {
//     fetch("http://localhost:3000/data")
//       .then((response) => response.json())
//       .then((data) => setValues({ data }));
//   };

//   console.log("Recived..!! : ", values);

//   useEffect(() => {
//     FetchData();
//   }, []);

  return (
    <>
    <div>
      {violationsData.map((violation) => (
          <li key={violation.id}>
          Plate No: {violation.plateNo}, Violation Count:{" "}
          {violation.violation_count}
        </li>
      ))}
    </div>
      </>
  );
};

export default Report;
