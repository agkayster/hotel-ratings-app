// import logo from './logo.svg';
// import './App.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
// import 'bulma';

function App() {
  const hotelCodesOptions = [
    "All",
    "LONTOW",
    "LONPUT",
    "LONEUS",
    "LONCOU",
    "LONHOL",
  ];
  const hotelCodes = ["LONTOW", "LONPUT", "LONEUS", "LONCOU", "LONHOL"];
  const [allHotelsData, setAllHotelsData] = useState([]);
  const [ singleHotel,  setSingleHotel] = useState(null);
  const [multipleHotel, setMultipleHotel] = useState(null)
  useEffect(() => {
    for (let i = 0; i < hotelCodes.length; i++) {
      axios
        .get(`https://api.whitbread.co.uk/reviews?hotel-codes=${hotelCodes[i]}`)
        .then((res) => {
          setAllHotelsData((prev) => [...prev, { ...res.data[0] }]);
        });
    }
  }, []);
  

  const handleChange = (e) => {
    const data = allHotelsData.find(
      (item) => item.hotelCode === e.target.value
    );

    if (
      e.target.value === "LONTOW" ||
      e.target.value === "LONPUT" ||
      e.target.value === "LONEUS" ||
      e.target.value === "LONCOU" ||
      e.target.value === "LONHOL"
    ) {
      setSingleHotel(data);
    } else if (e.target.value === "All") {
		setMultipleHotel(allHotelsData)
    }
  };

  console.log("make sure get all hotels =>", allHotelsData);

  return (
    <div className="container">
      <div className="form mt-3">
        <select
          className="form-select w-25"
          aria-label="select"
          onChange={handleChange}
        >
          {hotelCodesOptions.map((item, idx) => (
            <option key={idx} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <div style={{ fontSize: "40", color: "red", textAlign: "center", paddingBottom : '20px', borderBottom : "1px solid black" }}>
        { singleHotel && singleHotel.name}
      </div>
      <div style={{ fontSize: "40", color: "red", textAlign: "center" }}>
    { multipleHotel && multipleHotel.map(item => <div> {item.name} </div>  ) }
      </div>
    </div>
  );
}

export default App;
