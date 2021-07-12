import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import Map from "./components/Map";

function App() {
  const [data, setData] = useState([]);
  const [index, setIndex] = useState(null);
  const [address, setAddress] = useState({
    lat: 28.624387384896497,
    lng: 77.03643491239914,
  });

  useEffect(() => {
    (async () => {
      try {
        const result = await axios.get(
          "https://jsonplaceholder.typicode.com/users"
        );

        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const getIndex = (i) => {
    if (i) {
      setIndex(i);
    }
  };

  useEffect(() => {
    if (data && index) {
      const location = data[index];
      if (location.address.geo) {
        setAddress({
          lat: Number(location?.address?.geo.lat),
          lng: Number(location?.address?.geo.lng),
        });
      }
    }
  }, [index, data]);

  return (
    <div className="main">
      <Form getIndex={getIndex} data={data} />
      <Map center={address} />
    </div>
  );
}

export default App;
