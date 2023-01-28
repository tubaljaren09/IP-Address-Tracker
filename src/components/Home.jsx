import { useEffect, useState } from "react";
import Axios from "axios";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import arrow from "../images/icon-arrow.svg";
import MarkerPosition from "./MarkerPosition";

const Home = () => {
  const [address, setAddress] = useState(null);
  const [ipaddress, setIpAddress] = useState("");
  const apiKey = "at_E0urN4SPTxzOLY94SysxImIVZaZeh";

  useEffect(() => {
    Axios.get(
      `https://geo.ipify.org/api/v2/country,city?apiKey=${apiKey}&ipAddress=8.8.8.8`
    )
      .then((res) => {
        console.log(res);
        setAddress(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="home-main">
      <div>
        <h2>IP Address Tracker</h2>
        <form action="#">
          <input type="text" name="ipaddress" />
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
