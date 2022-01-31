import { useState } from "react";
import "./App.css";
import Formcontrol from "./component/Formcontrol";
import Map from "./component/Map";

function App() {
  const [lng, setLng] = useState(78.9629);
  const [lat, setLat] = useState(20.5937);
  const [focused, setFocused] = useState(false);

  const setMapLng = (maplng) => {
    setLng(maplng);
  };

  const setMapLat = (maplat) => {
    setLat(maplat);
  };

  const onFocus = (isFocus) => setFocused(isFocus);

  return (
    <div className="App">
      <Map maplng={lng} maplat={lat} />
      <Formcontrol
        focused={focused}
        setFocus={onFocus}
        setMapLng={setMapLng}
        setMapLat={setMapLat}
      />
    </div>
  );
}

export default App;
