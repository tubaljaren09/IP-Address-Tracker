import { useEffect, useState } from "react";
import Axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import arrow from "../images/icon-arrow.svg";
import MarkerPosition from "./MarkerPosition";

const Home = () => {
  const [address, setAddress] = useState(null);
  const [ipAddress, setIpAddress] = useState("");
  const apiKey = "at_E0urN4SPTxzOLY94SysxImIVZaZeh";
  const checkIpAddress =
    /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;
  const checkDomain =
    /^[a-zA-Z0-9][a-zA-Z0-9-]{1,61}[a-zA-Z0-9](?:\.[a-zA-Z]{2,})+/;

  useEffect(() => {
    Axios.get(`https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}`)
      .then((res) => {
        console.log(res);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    getEnteredAddress();
    setIpAddress("");
  };

  return (
    <div className="home-main">
      <div>
        <h2>IP Address Tracker</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="ipaddress"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
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
