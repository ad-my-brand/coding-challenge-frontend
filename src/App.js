import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Form from "./components/Form";
import { Card, Container } from "react-bootstrap";
import {
  Address,
  BasicInformation,
  CompanyInformation,
  Location,
} from "./components/UserDetails";
import Header from "./components/Header";
import MyFooter from "./components/Footer";

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("-1");

  useEffect(() => {
    return async () => {
      await getUsers();
    };
  }, []);

  const getUsers = async () => {
    try {
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(data.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="main-container">
      <div className="my-container">
        <Header />
        <Container>
          <div className="row">
            <div className="col-md-6 d-flex justify-content-center">
              <Card className="my-card">
                <Card.Body>
                  <Form
                    users={users}
                    onChange={setSelectedUserId}
                    label="Please select an user"
                  />
                </Card.Body>
              </Card>
            </div>
            {selectedUserId < "0" ? null : (
              <div className="col-md-6 d-flex justify-content-center">
                <BasicInformation user={users[selectedUserId]} />
              </div>
            )}
          </div>

          {selectedUserId < "0" ? null : (
            <div className="row mt-1">
              <div className="col-md-6 d-flex justify-content-center">
                <CompanyInformation company={users[selectedUserId].company} />
              </div>
              <div className="col-md-6 d-flex justify-content-center">
                <Address address={users[selectedUserId].address} />
              </div>
            </div>
          )}

          {selectedUserId < "0" ? null : (
            <div className="mt-1">
              <Location geo={users[selectedUserId].address.geo} />
            </div>
          )}
        </Container>
      </div>
      <MyFooter />
    </div>
  );
}

export default App;
