import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../backendUrl";
import axios from "axios";
import { toast } from "react-toastify";
function ElectionModal(props) {
  const [key, setKey] = useState("");
  const navigate = useNavigate();
  const handleKeyChange = (e) => {
    setKey(e.target.value);
  };
  const url = backendUrl();

  async function handleSubmit() {
    if (!props.id) return;
    var flag = false;
    for (let i = 0; i < props.data.length; i++) {
      console.log(props.data[i]._id, props.data[i].password, props.id, key);
      if (props.data[i]._id == props.id) {
        if (props.data[i].password == key) {
          flag = true;
          break;
        }
      }
    }
    if (flag) {
      toast.success("Password Varified!");
      navigate(`/election_voting/${props.id}`);
    } else {
      toast.error(`Inccorect Password. Unable to Proceed`);
    }
  }

  return (
    <Modal {...props} centered>
      <Modal.Header closeButton>
        <Modal.Title>Enter Election Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formElectionKey">
            <Form.Label>Election Key</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Election Key"
              value={key}
              onChange={handleKeyChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ElectionModal;
