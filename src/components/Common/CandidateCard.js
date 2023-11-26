import React, { useState } from "react";
import "./../../css/CandidateCard.css"; // make sure to create this CSS file and import it
import profile from "../../images/profile.png";
import axios from "axios";
import { backendUrl } from "../../backendUrl";
import { Form, Button, Modal } from "react-bootstrap";
import { toast } from "react-toastify";
const CandidateCard = ({ data, id, refresh }) => {
  const url = backendUrl();
  const [showModal, setShowModal] = useState(false);
  const [candidateName, setCandidateName] = useState("");
  const [candidateToEdit, setCandidateToEdit] = useState(null);
  const [candidateSubInfo, setCandidateSubInfo] = useState("");
  function handleShowModal(candidateId) {
    setCandidateToEdit(candidateId);
    setShowModal(true);
    setCandidateName(data.name);
    setCandidateSubInfo(data.subinformation);
  }
  function hideModal() {
    setCandidateToEdit(null);
    setShowModal(false);
    setCandidateName("");
    setCandidateSubInfo("");
  }

  const handleCandidateEdit = async (e) => {
    e.preventDefault();
    if (!candidateToEdit) return;
    try {
      const response = await axios.patch(
        `${url}/candidates/edit/${candidateToEdit}`,
        {
          name: candidateName,
          subinformation: candidateSubInfo,
        }
      );
      toast.success("Candidate edited successfullt");
      hideModal();
      console.log(response.data);
      refresh();
    } catch (error) {
      toast.error("Error submitting candidate:");
    }
  };
  const deleteCandidate = async (candidateToDelete) => {
    if (!candidateToDelete) return;
    try {
      const response = await axios.delete(
        `${url}/candidates/delete/${candidateToDelete}/`
      );
      toast.success("Candidate deleted");
      refresh();
    } catch (error) {
      toast.error("Unable to delete Candidate");
    }
  };
  return (
    <div className="candidate-card">
      <div className="candidate-image">
        <img src={profile} alt="Candidate" />
      </div>
      <div className="candidate-info">
        <h2 style={{ fontSize: data.name.length > 6 ? "10px" : "16px" }}>
          {data.name}
        </h2>
        <p>{data.subinformation}</p>
      </div>
      <div className="vote-button-parent">
        <div
          className="vote-button-v2"
          onClick={() => handleShowModal(data._id)}
        >
          <button>Edit</button>
        </div>
        <div className="vote-button-v2">
          <button onClick={() => deleteCandidate(data._id)}>Delete</button>
        </div>
      </div>
      <Modal
        show={showModal}
        onHide={hideModal}
        className="d-flex align-items-center justify-content-center"
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCandidateEdit}>
            <Form.Group controlId="candidateName" className="form-group-modals">
              <Form.Label>Candidate Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter candidate name"
                value={candidateName}
                onChange={(e) => setCandidateName(e.target.value)}
              />
            </Form.Group>
            <Form.Group
              controlId="candidateSubInfo"
              className="form-group-modals"
            >
              <Form.Label>Subinformation</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter subinformation"
                value={candidateSubInfo}
                onChange={(e) => setCandidateSubInfo(e.target.value)}
              />
            </Form.Group>
            <br />
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CandidateCard;
