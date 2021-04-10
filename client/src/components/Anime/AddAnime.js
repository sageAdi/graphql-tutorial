import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_ANIME } from "../../Graphql/Mutation";
import { LOAD_WRITERS } from "../../Graphql/Queries";
import Select from "react-select";
import { Formik } from "formik";

function AddWriter() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [writerId, setWriterId] = useState("");
  const [writers, setWriters] = useState([]);

  const [addAnime, { error }] = useMutation(CREATE_ANIME);
  const { data } = useQuery(LOAD_WRITERS);

  useEffect(() => {
    if (data) {
      setWriters(data.writers);
    }
  }, [data]);
  const AddAnime = (e) => {
    e.preventDefault();
    addAnime({
      variables: {
        name: name,
        genre: genre,
        writerId: writerId,
      },
    });
    handleClose();
    if (error) {
      console.log("Error : " + error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "name") {
      setName(e.target.value);
    } else if (e.target.name === "genre") {
      setGenre(e.target.value);
    }
  };
  const handleSelect = (selectedValue) => {
    setWriterId(selectedValue.value);
  };
  const options = [];
  writers.map((writer) =>
    options.push({ value: writer.id, label: writer.name })
  );
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="mt-3">
      <Button variant="primary" onClick={handleShow}>
        Add Anime
      </Button>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.email) {
            errors.email = "Required";
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = "Invalid email address";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            setSubmitting(false);
          }, 400);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.email}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              name="password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Anime</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={AddAnime}>
            <div className="form-group">
              <label for="name">Name:</label>
              <input
                type="text"
                name="name"
                id="name"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="genre">Genre:</label>
              <input
                type="text"
                name="genre"
                id="genre"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label for="writerId">Writer:</label>
              <Select
                name="writerId"
                id="writerId"
                onChange={handleSelect}
                options={options}
              />
            </div>

            <button className="btn btn-success" type="submit">
              Submit
            </button>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={AddAnime}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AddWriter;
