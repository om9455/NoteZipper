import React, {useEffect} from 'react'
import { Container,Row,Button } from 'react-bootstrap'
import './LandingPage.css';
import { Link,useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const history = useNavigate();
   useEffect(() => {
     const userInfo = localStorage.getItem("userInfo");
     if (userInfo) {
       history("/mynotes");
     }
   }, [history]);
  return (
    <div className="main">
      <Container>
        <Row>
          <div className="intro-text">
            <div>
              <h1 className="title">Welcome to Note Zipper</h1>
              <p className="subtitle">One safe place for all your notes.</p>
            </div>
            <div className="buttonContainer">
  
                <Link to="/login">
                  <Button size="lg" className="landingbutton">
                    Login
                  </Button>
                </Link>
              
          
                <Link to="/register">
                  <Button
                    size="lg"
                    className="landingbutton"
                    variant="outline-primary"
                  >
                    Signup
                  </Button>
                </Link>
            
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
}

export default LandingPage
