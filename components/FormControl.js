import React from 'react';
import { useState, useEffect } from 'react';
import FormComponent from './FormComponent';
import Radio from './Radio';

export default function FormControl() {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const [selectedValue, setSelectedValue] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [latiude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, []);

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  const handleRadio = (e) => {
    e.preventDefault();
    if (selectedValue === null) {
      window.alert('Please select a user');
    } else
      setMapOpen(true),
        setLatitude(data[selectedValue - 1].address.geo.lat),
        setLongitude(data[selectedValue - 1].address.geo.lng);
  };

  const submitData = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({ name, title }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      window.alert(`${response.status} There was an error`);
    }
    const responseData = await response.json();
    console.log(responseData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name == '' || title == '') {
      window.alert('Please fill both the required fields');
    } else submitData();
  };

  return (
    <>
      <div>
        {mapOpen === false ? null : (
          <>
            <iframe
              width="240"
              height="240"
              src={`https://www.bing.com/maps/embed?h=240&w=240&${latiude}~${longitude}&lvl=4&typ=d&sty=r&src=SHELL&FORM=MBEDV8`}
              scrolling="no"
            ></iframe>
            <div className="coordinateBox">
              <input
                className="coordinates"
                type="text"
                value={`lat: ${latiude}`}
                readOnly
              ></input>
              <input
                type="text"
                className="coordinates"
                value={`lng: ${longitude}`}
                readOnly
              ></input>
            </div>
          </>
        )}
      </div>
      <form className="users" onSubmit={handleRadio}>
        <h3>Users:</h3>
        {data.map((person) => {
          return (
            <Radio
              type="radio"
              value={person.id}
              label={person.name}
              key={person.id}
              onChange={(e) => {
                setSelectedValue(e.target.value);
              }}
            ></Radio>
          );
        })}
        <button className="formButton" type="submit">
          View on map
        </button>
      </form>
      <form className="formBox" onSubmit={handleSubmit}>
        <FormComponent
          label="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <FormComponent
          label="Title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
        />
        <button
          style={{ marginTop: '1rem' }}
          className="formButton"
          type="submit"
        >
          Submit
        </button>
        <div></div>
      </form>
    </>
  );
}
