import React, { useState, FormEvent, useEffect, useRef } from "react";
import FormControl from "./FormControl";
import styles from "../styles/Home.module.css";
import mapboxgl from "mapbox-gl";

export interface Geo {
  lat: string;
  lng: string;
}
export interface Address {
  geo: Geo;
}
export interface User {
  id: number;
  name: string;
  address: Address;
}

const Form = () => {
  const mapContainer = useRef(null);
  const map = useRef<mapboxgl.Map>();
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);
  const [state, setState] = useState({ title: "", body: "" });
  const [users, setUsers] = useState<[]>();
  const [userId, setUserId] = useState("");
  const [selectedUser, setSelectedUser] = useState<User>();
  const [errorMessage, setErrorMessage] = useState("");
  const [httpError, setHttpError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [creating, setCreating] = useState(false);

  mapboxgl.accessToken = process.env.MAPBOX_ACCESS_TOKEN!;

  useEffect(() => {
    (async () => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users",
        { method: "GET" }
      );

      const resData = await response.json();
      setUsers(resData);
    })();
  }, []);

  //initialize map
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: zoom,
    });
    const geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserLocation: true,
    });

    map.current.addControl(geolocate, "top-right");
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, "top-right");
  }, [lng, lat, zoom]);

  //set default geolocation to the location of the user
  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition((data) => {
      const newLng = Number(data.coords.longitude.toFixed(4));
      const newLat = Number(data.coords.latitude.toFixed(4));
      map.current?.setCenter([newLng, newLat]);
      map.current?.zoomTo(15);
    });
  }, []);

  //Reset the geolocation coordinates when the map is zoomed
  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on("move", () => {
      setLng(Number(map.current?.getCenter().lng.toFixed(4)));
      setLat(Number(map.current?.getCenter().lat.toFixed(4)));
      setZoom(Number(map.current?.getZoom().toFixed(2)));
    });
  });

  //handle form inputs changes
  const handleChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    e.persist();
    setState((state) => ({ ...state, [target.name]: target.value }));
  };

  //handle validations
  const handleValidation = () => {
    //Validate user selection
    if (userId.trim().length == 0) {
      setErrorMessage("Please select a user");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }

    //validate post inputs
    if (state.title.trim().length == 0 || state.body.trim().length == 0) {
      setErrorMessage("Input fields cannot be empty !");
      setTimeout(() => {
        setErrorMessage("");
      }, 5000);
      return;
    }
  };

  //handle user selection
  const handleUserSelect = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setUserId(target.value);
    const selected = users?.find((u: User) => u.id == Number(target.value));
    setSelectedUser(selected);
    if (
      selectedUser?.address.geo.lat &&
      selectedUser.address.geo.lng &&
      selectedUser.id &&
      selectedUser.name
    ) {
      map.current?.setCenter([
        Number(selectedUser?.address.geo.lng),
        Number(selectedUser?.address.geo.lat),
      ]);
      map.current?.zoomTo(1);
    }
  };

  //handle form submission
  const handleSubmit = async () => {
    handleValidation();
    setCreating(true);
    const data = {
      ...state,
      userId: Number(userId),
    };
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      await response.json();
      if (response.status === 200 || response.status === 201) {
        setCreating(false);
        setSuccessMessage("Post created Successfully");
        setState({ title: "", body: "" });
      } else {
        setCreating(false);
        setHttpError("Request failed. Please retry");
      }
    } catch (error: any) {
      setCreating(false);
      setHttpError(error.message);
    }
  };

  return (
    <div className={styles.grid}>
      <form
        className={styles.form}
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <FormControl
          formLabel="Create Post"
          validate={handleValidation}
          error={errorMessage}
        >
          {httpError.trim().length > 0 && (
            <div className={styles.alert}>
              <span
                className={styles.closebtn}
                onClick={() => setHttpError("")}
              >
                &times;
              </span>
              {httpError}
            </div>
          )}
          {successMessage.trim().length > 0 && (
            <div className={styles.success}>
              <span
                className={styles.closebtn}
                onClick={() => setSuccessMessage("")}
              >
                &times;
              </span>
              {successMessage}
            </div>
          )}
          <select
            disabled={creating}
            className={styles.select}
            value={userId}
            onChange={handleUserSelect}
          >
            <option>Select user</option>
            {users?.map((u: User, i) => (
              <option key={i} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
          <input
            disabled={creating}
            type="text"
            name="title"
            onChange={handleChange}
            value={state.title}
            className={styles.textInput}
            placeholder="title"
            required
          />{" "}
          <br />
          <textarea
            disabled={creating}
            name="body"
            onChange={handleChange}
            value={state.body}
            className={styles.textArea}
            placeholder="body"
            required
          />
          <br />
          <button disabled={creating} className={styles.btn} type="submit">
            {creating ? "Processing..." : "Submit"}
          </button>
        </FormControl>
      </form>
      <div className={styles.mapDiv}>
        <div ref={mapContainer} className={styles.mapContainer} />
      </div>
    </div>
  );
};

export default Form;
