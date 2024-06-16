import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen';
import { Link } from "react-router-dom";
import { Button, Card,Badge, Accordion } from "react-bootstrap";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import { useDispatch, useSelector } from 'react-redux'
import { listNotes, deleteNoteAction } from "../../actions/notesAction";
import Loading from './../../components/Loading';
import ErrorMessage from './../../components/ErrorMessage';
import { useNavigate } from 'react-router-dom';
// import notes from '../../data/notes';
const MyNotes = () => { 

  const dispatch = useDispatch();  
  const noteList = useSelector(state => state.noteList);
  const userLogin = useSelector(state => state.userLogin);
  const noteCreate = useSelector((state) => state.noteCreate);
  const { success: successCreate } = noteCreate;
  const { userInfo } = userLogin;

   const noteUpdate = useSelector((state) => state.noteUpdate);
   const { success: successUpdate } = noteUpdate;

   const noteDelete = useSelector((state) => state.noteDelete);
   const {
     loading: loadingDelete,
     error: errorDelete,
     success: successDelete,
   } = noteDelete;

  const { loading, notes, error } = noteList
  const history = useNavigate();

useEffect(() => {
  if (!userInfo) {
    history("/");
  } else {
    dispatch(listNotes());
  }
}, [userInfo, dispatch, history, successCreate, successUpdate, successDelete]);
  const deleteHandler = (id) => {
   if (window.confirm("Are you sure?")) {
     dispatch(deleteNoteAction(id));
   }
  }
  function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
      console.log("totally custom!")
    );

    return (
      <button
        type="button"
        style={{ border:"none", background:"transparent", width:"100%", textAlign:"left" }}
        onClick={decoratedOnClick}
      >
        {children}
      </button>
    );
  }

   console.log(notes);  

  return (
    <>
      <MainScreen title={`Welcome Back ${userInfo.name}`}>
        <Link to="/createnotes">
          <Button
            style={{
              marginLeft: 10,
              marginBottom: 6,
            }}
            size="lg"
          >
            Create New Note
          </Button>
        </Link>
        {error && <ErrorMessage variant="danger">{ error }</ErrorMessage>}
        {loading && <Loading/>}
        {notes?.map((note) => (
          <Accordion defaultActiveKey="1" key={note._id}>
            <Card style={{ margin: 10 }}>
              <Card.Header style={{ display: "flex" }}>
                <span
                  style={{
                    color: "black",
                    textDecoration: "none",
                    flex: 1,
                    cursor: "pointer",
                    alignSelf: "center",
                    fontSize: 18,
                  }}
                >
                  <CustomToggle eventKey="0">{note.title}</CustomToggle>
                </span>
                <div>
                  <Link to={`/note/${note._id}`}>
                    <Button>Edit</Button>
                  </Link>

                  <Button
                    variant="danger"
                    className="mx-2"
                    onClick={() => deleteHandler(note._id)}
                  >
                    Delete
                  </Button>
                </div>
              </Card.Header>
              <Accordion.Collapse eventKey="0">
                <Card.Body>
                  <h4>
                    <Badge variant="success">Category - {note.category}</Badge>
                  </h4>
                  <blockquote className="blockquote mb-0">
                    <p>{note.content}</p>
                    <footer className="blockquote-footer">
                      Updated On{" "}
                      {/* <cite title="Source Title">{note.createdAt.substring(0,10) }</cite> */}
                    </footer>
                  </blockquote>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        ))}
      </MainScreen>
    </>
  );
}

export default MyNotes
