import axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import "../../css/admin.css";
import { backendUrl } from "../../backendUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const initialState = {
  electionName: "",
  electionPass: "",
  fromDate: "",
  toDate: "",
  accessType: 1,
};

const ElectionForm = () => {
  const url = backendUrl();
  const navigate = useNavigate();
  const sendFormDataToBackend = async () => {
    try {
      if (formData.electionName <= 5) {
        toast.error("Election name must be atleast 5 character long");
        return;
      }
      if (formData.fromDate > formData.toDate) {
        toast.error("Expiry date must be greater than generation day");
        return;
      }
      if (!formData.fromDate || !formData.toDate) {
        toast.error("Enter the dates please");
        return;
      }
      if (formData.accessType == 0 && formData.electionPass.length < 5) {
        toast.error("Password must be atleast 5 character long");
        return;
      }
      const electionData = {
        election_name: formData.electionName,
        generation_date: formData.fromDate,
        expiry_date: formData.toDate,
        candidates: null,
        created_by: localStorage.getItem("ballot_admin_id"),
        access_type: formData.accessType == 0 ? "VIA_URL" : "OPEN_FOR_ALL",
        password: formData.electionPass,
      };

      const response = await axios.post(
        `${url}/create/election/`,
        electionData
      );

      if (response.status == 201) {
        localStorage.setItem("ballot_newElectionID", response.data._id);
        navigate(`/admin/election/details/${response.data._id}`);
        toast.success("Election Added Sucessfully");
      } else if (response.status == 400) {
        toast.error("Expiry date must be greater than the generation date.");
      }
    } catch (error) {
      toast.error("Unable to add election");
    }
  };

  const [formData, setFormData] = useState(initialState);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="bg-transparent election-form-div">
      <h1>Add New Election </h1>
      <Form>
        <Form.Group
          as={Row}
          controlId="electionName"
          className="election-form-group"
        >
          <Form.Label column sm={12} md={4}>
            Election Name
          </Form.Label>
          <Col sm={12} md={4}>
            <Form.Control
              type="text"
              name="electionName"
              placeholder="Enter election name"
              value={formData.electionName}
              onChange={handleInputChange}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          controlId="accessType"
          className="election-form-group"
        >
          <Form.Label column sm={12} md={4}>
            Access Type
          </Form.Label>
          <Col sm={12} md={4}>
            <Form.Control
              as="select"
              name="accessType"
              value={formData.accessType}
              onChange={handleInputChange}
            >
              <option value={1}>Open For All</option>
              <option value={0}>Only By URL</option>
            </Form.Control>
          </Col>
        </Form.Group>

        {formData.accessType == 0 && (
          <Form.Group
            as={Row}
            controlId="electionUrl"
            className="election-form-group"
          >
            <Form.Label column sm={12} md={4}>
              Election Password
            </Form.Label>
            <Col sm={12} md={4}>
              <Form.Control
                type="text"
                name="electionPass"
                placeholder="Enter election key"
                value={formData.electionUrl}
                onChange={handleInputChange}
              />
            </Col>
          </Form.Group>
        )}

        <Form.Group
          as={Row}
          controlId="dateRange"
          className="election-form-group"
        >
          <Form.Label column sm={12} md={4}>
            Election Active Dates
          </Form.Label>
          <Col sm={12} md={4}>
            <Row>
              <Col>
                <Form.Control
                  type="date"
                  name="fromDate"
                  placeholder="From Date"
                  value={formData.fromDate}
                  onChange={handleInputChange}
                />
              </Col>
              <Col>
                <Form.Control
                  type="date"
                  name="toDate"
                  placeholder="To Date"
                  value={formData.toDate}
                  onChange={handleInputChange}
                />
              </Col>
            </Row>
          </Col>
        </Form.Group>

        <Button variant="primary" onClick={sendFormDataToBackend}>
          Create Election
        </Button>
      </Form>
    </div>
  );
};

export default ElectionForm;
