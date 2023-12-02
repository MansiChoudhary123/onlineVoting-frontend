import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { backendUrl } from "../../backendUrl";
import Card from "react-bootstrap/Card";
import Nav from "react-bootstrap/Nav";
import ElectionItem from "./ElectionItem";
import { Ellipsis } from "react-css-spinners";
import { toast } from "react-toastify";

const ElectionList = () => {
  const url = backendUrl();
  const [electionList, setElectionList] = useState([]);
  const [activeTab, setActiveTab] = useState("active");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchElections() {
      setLoading(true);
      try {
        const response = await axios.get(`${url}/elections/list/all`);
        setElectionList(response.data);
      } catch (error) {
        toast.error("Error fetching elections: " + error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchElections();
  }, []);

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

  return (
    <div style={{ position: "relative", minHeight: "80vh" }}>
      {loading ? (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Ellipsis size={80} color="black" />
        </div>
      ) : (
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
            </Nav>
          </Card.Header>
          <Card.Body>
            <ElectionItem
              electionList={
                activeTab === "active" ? openElection : closeElection
              }
              usedIn={"user"}
            />
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default ElectionList;
