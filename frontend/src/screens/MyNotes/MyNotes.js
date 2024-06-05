import React, { useEffect, useState } from 'react'
import MainScreen from '../../components/MainScreen';
import { Link } from "react-router-dom";
import { Button, Card,Badge, Accordion } from "react-bootstrap";
// import notes, { } from '../../data/notes';
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import axios from 'axios' 

const MyNotes = () => {
  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      
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

  const [notes, setNotes] = useState([]);

  const fetchNotes = async () => {
    const {data} = await axios.get('/api/notes');
    setNotes(data);
    
  }   
   console.log(notes);  
  useEffect(() => {
    fetchNotes();
    // eslint-disable-next-line
  },[])
  return (
    <>
      <MainScreen title="Welcome Back Om Megha...">
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
        {notes.map((note) => (
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
                      Created On - Date
                      {/* <cite title="Source Title"></cite> */}
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
