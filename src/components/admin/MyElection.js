import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { backendUrl } from "../../backendUrl";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import ElectionItem from "../Common/ElectionItem";
import { useNavigate } from "react-router-dom";
import { Ellipsis } from "react-css-spinners"; // Ensure you have this spinner or a similar one installed

const MyElectionList = () => {
  const url = backendUrl();
  const [electionList, setElectionList] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchElections(admin_id) {
      setLoading(true);
      setError("");
      try {
        const response = await axios.get(
          `${url}/elections/admin/id/${admin_id}`
        );
        setElectionList(response.data);
      } catch (err) {
        setError("Failed to load elections. Please try again later.");
        console.error(err); // Log the error for debugging purposes
      } finally {
        setLoading(false);
      }
    }

    let admin_id = localStorage.getItem("ballot_admin_id");
    if (admin_id) fetchElections(admin_id);
    else navigate("/admin_login");
  }, [navigate]);

  const { openElection, closeElection } = useMemo(() => {
    let open = [];
    let close = [];
    const currentDate = new Date();

    electionList.forEach((election) => {
      if (new Date(election.expiry_date) < currentDate) {
        close.push(election);
      } else {
        open.push(election);
      }
    });

    return { openElection: open, closeElection: close };
  }, [electionList]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "80vh",
        }}
      >
        <Ellipsis size={80} color="#007bff" />
      </div>
    );
  }
  return (
    <div>
      <Card>
        <Card.Header>
          <Nav variant="pills" activeKey={activeTab}>
            <Nav.Item>
              <Nav.Link
                eventKey="active"
                onClick={() => setActiveTab("active")}
              >
                Active ({openElection.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link
                eventKey="closed"
                onClick={() => setActiveTab("closed")}
              >
                Closed ({closeElection.length})
              </Nav.Link>
            </Nav.Item>
            <Nav.Item className="add-new-election-item">
              <Link to="/new_election">
                <Button>Add New</Button>
              </Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
        <Card.Body style={{ minHeight: "80vh" }}>
          <ElectionItem
            electionList={activeTab === "active" ? openElection : closeElection}
            usedIn={"admin"}
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default MyElectionList;
