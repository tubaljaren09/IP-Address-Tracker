import { useEffect, useState } from "react";
import Axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import arrow from "../images/icon-arrow.svg";
import MarkerPosition from "./MarkerPosition";

const Home = () => {
  const [address, setAddress] = useState(null); // state that saves current address or location
  const [ipAddress, setIpAddress] = useState(""); // state that saves user input
  const apiKey = "at_E0urN4SPTxzOLY94SysxImIVZaZeh"; // api key from api geo
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi; // regex to check if ip address entered by the user is correct
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/; // regex to check if user entered a domain instead of ip address

  useEffect(() => {
    Axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`)
      .then((res) => {
        console.log(res);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []); // useEffect with promise and axios to fetch data from api then console log it and setAddress to save data in address state. catch error

  const getEnteredAddress = () => {
    Axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&${
        checkIpAddress.test(ipAddress)
          ? `ipAddress=${ipAddress}`
          : checkDomain.test(ipAddress)
          ? `domain=${ipAddress}`
          : ""
      }`
    )
      .then((res) => {
        console.log(res);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }; // A function that gets the user input. Axios with promise to fetch data and use regex to check whether the user entered an ip address or domain then console log it and setAddress to save data in address state. catch error

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("");
  }; // A function that submit the form with user input

  return (
    <div className="home-main">
      <div>
        <h2>IP Address Tracker</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="ipaddress"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)} // A function that setting the value of ipaddress state equals to input field
          />
          <button>
            <img src={arrow} />
          </button>
        </form>
      </div>
      {address && (
        <>
          <div className="information">
            <div className="bind">
              <h4>IP ADDRESS</h4>
              <h2>{address.ip}</h2>
            </div>
            <div className="bind">
              <h4>LOCATION</h4>
              <h2>
                {address.location.city}, {address.location.region}
              </h2>
            </div>
            <div className="bind">
              <h4>TIMEZONE</h4>
              <h2>UTC {address.location.timezone}</h2>
            </div>
            <div className="bind">
              <h4>ISP</h4>
              <h2>{address.isp}</h2>
            </div>
          </div>
          <MapContainer
            center={[address.location.lat, address.location.lng]}
            zoom={13}
            scrollWheelZoom={false}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <MarkerPosition address={address} />
          </MapContainer>
          ,
        </>
      )}
    </div>
  );
};

export default Home;
