import 'bootstrap/dist/css/bootstrap.min.css';
import "./App.css";
import Formdetails from './Formdetails.js';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import BasicExample from './Header.js';

function App() {
  return (
    <>
    <BasicExample/>
      <Container fluid>
        <Row 
          className="vh-100 justify-content-center 
                     align-items-center backg">
        
           <Col>
           <Formdetails/>
     
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default App;

