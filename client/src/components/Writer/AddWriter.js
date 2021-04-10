import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMutation } from "@apollo/client";
import { CREATE_WRITER } from "../../Graphql/Mutation";

function AddAnime() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [name, setName] = useState();
  const [age, setAge] = useState();

  const [addWriter, { error }] = useMutation(CREATE_WRITER);

  const AddWriter = (e) => {
    e.preventDefault();
    addWriter({
      variables: {
        name: name,
        age: age,
      },
    });
    handleClose();
    if (error) {
      console.log("Error : " + error);
    }
  };

  const handleOnChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "age") {
      setAge(e.target.value);
    }
  };
  return (
    <div className="mt-3">
      <Button variant="primary" onClick={handleShow}>
        Add Writer
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Writer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddWriter}>
            <div className="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleOnChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="age">Age:</label>
              <input
                type="text"
                name="age"
                id="age"
                onChange={handleOnChange}
                className="form-control"
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={AddWriter}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddAnime;
