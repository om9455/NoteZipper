import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen'
import { Form,Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import Loading from '../../components/Loading';
import ErrorMessage from '../../components/ErrorMessage';
import { login } from '../../actions/userActions';
const LoginScreen = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const {loading,error,userInfo}=userLogin
  const history = useNavigate();
  useEffect(() => {
    // const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      history("/mynotes");
    }
  }, [history,userInfo]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(email,password));
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
