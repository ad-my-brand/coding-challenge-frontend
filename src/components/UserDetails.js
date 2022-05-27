import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import MyMap from "./MyMap";

const Row = ({ title, value }) => {
  return (
    <div className="row">
      <div className="col-4">
        <h6>{title}</h6>
      </div>
      <div className="col-1">:</div>
      <div className="col-7">{value}</div>
    </div>
  );
};

export const BasicInformation = ({ user }) => {
  return (
    <Card className="my-card">
      <Card.Body>
        <Card.Title>Basic Information</Card.Title>
        <Row title="Name" value={user.name} />
        <Row title="Username" value={user.username} />
        <Row title="Phone" value={user.phone} />
        <div className="row">
          <div className="col-4">
            <h6>Email</h6>
          </div>
          <div className="col-1">:</div>
          <div className="col-7">
            <a href={`mailto:${user.email}`}>{user.email}</a>
          </div>
        </div>
        <div className="row">
          <div className="col-4">
            <h6>Website</h6>
          </div>
          <div className="col-1">:</div>
          <div className="col-7">
            <a href={`https://${user.website}`}>{user.website}</a>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

BasicInformation.propTypes = {
  user: PropTypes.object.isRequired,
};

export const CompanyInformation = ({ company }) => {
  return (
    <Card className="my-card2">
      <Card.Body>
        <Card.Title>Company Information</Card.Title>
        <Row title="Name" value={company.name} />
        <Row title="BS" value={company.bs} />
        <Row title="CatchPhrase" value={company.catchPhrase} />
      </Card.Body>
    </Card>
  );
};

CompanyInformation.propTypes = {
  company: PropTypes.object.isRequired,
};

export const Address = ({ address }) => {
  return (
    <Card className="my-card2">
      <Card.Body>
        <Card.Title>Address</Card.Title>
        <Row title="Street" value={address.street} />
        <Row title="Suite" value={address.suite} />
        <Row title="City" value={address.city} />
        <Row title="Zipcode" value={address.zipcode} />
      </Card.Body>
    </Card>
  );
};

Address.propTypes = {
  address: PropTypes.object.isRequired,
};

export const Location = ({ geo }) => {
  const center = [geo.lng, geo.lat];

  return (
    <Card>
      <Card.Body>
        <Card.Title>Location</Card.Title>
        <MyMap center={center} />
      </Card.Body>
    </Card>
  );
};

Location.propTypes = {
  geo: PropTypes.object.isRequired,
};
