import React, { useEffect, useState } from "react";
import MainScreen from "../../components/MainScreen";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link,useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ErrorMessage from "../../components/ErrorMessage";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../actions/userActions";

const RegisterScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg");
  const [message, setMessage] = useState(null);
  const [picMessage, setPicMessage] = useState(null);
    const history = useNavigate();
  const dispatch = useDispatch();
  const userRegister = useSelector((state) => state.userRegister);
  const { loading, error, userInfo } = userRegister;


  useEffect(() => {
    if (userInfo) {
      history("/mynotes");
    }
  }, [history, userInfo]);

  const postDetails = (pics) => {
    if (!pics) {
      setPicMessage("Please select an Image")
    }
    setPicMessage(null)
    if (pics.type === 'image/jpeg' || pics.type === "image/png") {
      const data = new FormData();
      data.append('file', pics)
      data.append('upload_preset', 'notezipper')
      data.append("cloud_name", "dhhqargv7");
      fetch("https://api.cloudinary.com/v1_1/dhhqargv7/image/upload", {
        method: "post",
        body: data,
      }).then((res) => res.json()).then((data) => {
        console.log(data);
        setPic(data.url.toString());
      }).catch((err) => {
        console.log(err);
      })
    } else {
      return setPicMessage("Please Select an Image");
    }
} 


  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password Do not Match")
    } else {
      dispatch(register(name, email, password, pic));
      history("/mynotes");
    }
  };

  return (
    <Container className="mx-auto" style={{ width: "80%" }}>
      <MainScreen title="REGISTER">
        {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
        {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
        {loading && <Loading />}
        <Form onSubmit={submitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              value={email}
              placeholder="Enter email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
          </Form.Group>
          {picMessage && <ErrorMessage variant="danger">{picMessage}</ErrorMessage>}
          <Form.Group className="position-relative mb-3">
            <Form.Label>Pic</Form.Label>
            <Form.Control
              type="file"
              name="Pic"
              onChange={(e) => {
                postDetails(e.target.files[0])
              }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
        <Row className="py-3">
          <Col>
            New Customer ?{" "}
            <Link to="/login" style={{ textDecoration: "none" }}>
              Login
            </Link>
          </Col>
        </Row>
      </MainScreen>
    </Container>
  );
};

export default RegisterScreen;
