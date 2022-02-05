import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Row, Col } from "react-bootstrap";
import Map from "./Map";

export const ControlForm = ({ users }) => {
  const [Id, setId] = useState(0);
  const [location, setLocation] = useState({
    address: "Testing",
    lat: 40.854885,
    lng: -88.081807,
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const getData = () => {
    const { street, suite, city, zipcode } = users[Id].address;
    const { lat, lng } = users[Id].address.geo;
    const address = [street, suite, city, zipcode].filter(Boolean).join(", ");
    console.log(address);
    setLocation({ address: address, lat: lat, lng: lng });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.id.value);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: event.target.title.value,
        body: event.target.body.value,
        userId: event.target.id.value,
      }),
    };
    fetch("https://jsonplaceholder.typicode.com/posts", requestOptions)
      .then(async (response) => {
        const isJson = response.headers
          .get("content-type")
          ?.includes("application/json");
        const data = isJson && (await response.json());
        console.log(response.status);
        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (data && data.message) || response.status;
          setError(error);
          return Promise.reject(error);
        }
        setSuccess(true);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <Row>
      <Col xs={12} lg={6}>
        <Form
          onSubmit={(event) => {
            handleSubmit(event);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Select
              name="id"
              aria-label="Default select example"
              onChange={(e) => {
                setId(e.target.value);
                getData();
              }}
              required
            >
              <option value="">Select User</option>
              {users.map((user, index) => (
                <option value={user.id} key={index}>
                  {user.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Title</Form.Label>
            <Form.Control
              name="title"
              type="text"
              placeholder="Title"
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Body</Form.Label>
            <Form.Control
              name="body"
              as="textarea"
              rows={4}
              placeholder="Body"
              required
            />
          </Form.Group>

          <Button className="mb-5" variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        {success && <h3 className="text-success">Submitted Successfully!</h3>}
      </Col>
      {error && <h3 className="text-danger">There was an error! {error}</h3>}
      <Col>
        <Map location={location} />
      </Col>
    </Row>
  );
};
