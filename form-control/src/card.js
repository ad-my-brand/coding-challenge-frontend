import React from 'react';

function Card(props) {
  const{name, username, email, address, phone, website, company} = props

  return (
    <div className= 'card'>
    <div>
      <h4>Name: <span>{name}</span></h4>
      <h4>Username: <span>{username}</span></h4>
      <h4>E-mail: <span>{email}</span></h4>
      <h4>Address: </h4>
      <h5>Street: <span>{address.street}</span></h5>
      <h5>Suite: <span>{address.suite}</span></h5> 
      <h5>City: <span>{address.city}</span></h5> 
      <h5>Zip-code: <span>{address.zipcode}</span></h5> 
      <h5>Geo: </h5>
      <h6>lat:<span>{address.geo.lat}</span></h6>
      <h6>lag:<span>{address.geo.lag}</span></h6>
      </div>
      <div>
      <h4>Phone: <span>{phone}</span></h4>
      <h4>Website: <span>{website}</span></h4>
      <h4>Company: </h4> 
      <h5>name: <span>{company.name}</span></h5> 
      <h5>catch-phrase: <span>{company.catchPhrase}</span></h5> 
      <h5>bs: <span>{company.bs}</span></h5> 
      </div> 
    </div>
  );
}

export default Card;
