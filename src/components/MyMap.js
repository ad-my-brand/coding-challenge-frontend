import React from "react";
import PropTypes from "prop-types";
import { Map, Layers, layer } from "react-openlayers";
import { fromLonLat } from "ol/proj";

const MyMap = (props) => {
  return (
    <Map
      view={{ center: fromLonLat(props.center), zoom: 4 }}
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Layers>
        <layer.Tile></layer.Tile>
      </Layers>
    </Map>
  );
};

MyMap.propTypes = {
  center: PropTypes.array.isRequired,
};

export default MyMap;
