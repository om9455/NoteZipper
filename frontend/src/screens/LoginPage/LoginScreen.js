import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Form,Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false)
  const history = useNavigate();
  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history("/mynotes");
    }
  }, [history]);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {
          "Content-type": "application/json"
        }
      }
      setLoading(true)
      const {data} = await axios.post('/api/users/login', {
        email,
        password,
      }, config)
      console.log(data)
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false)
      setError(false);
      history("/mynotes");
    }
    catch (error) {
      setError(error.response.data.message);
      console.log(error.response.data.message);
      setLoading(false)
    }
  }
  return (
    <Container className="mx-auto" style={{width:"80%"}}>
      <MainScreen title="Login">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
      {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" value={email} placeholder="Enter email" onChange={(e)=>{setEmail(e.target.value)}}/>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
              <Form.Check type="checkbox" label="Check me out" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
            New Customer ? <Link to="/register" style={{textDecoration:"none"}}>Register Here</Link>

            </Col>
          </Row>
      </MainScreen>
    </Container>
  );
}

export default LoginScreen
