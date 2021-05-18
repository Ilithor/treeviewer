import React, { useState, useEffect } from "react";
import axios from "axios";
import Hierarchy from "./components/Hierarchy/Hierarchy";
import LineChart from "./components/LineChart/LineChart";
import "./App.css";

/**
 * Fill out the App.js and Hierarchy.js code so that:
 * - When the app loads fetch node data by doing a GET on /api/nodes
 * - Pass that data to the Hierarchy component to display a list of nodes
 * - When one of the nodes is clicked, fetch the node's data by calling GET /api/data/<nodeId>
 * - Pass that data to the LineChart component
 */

function App() {
  const [hierarchyData, setHierarchyData] = useState();
  const [lineChartData, setLineChartData] = useState();

  /* Task: implement handleSelectNode() */
  const handleSelectNode = (id) => {
    axios.get(`/api/data/${id}`).then((res) => {
      setLineChartData(res.data);
    });
  };

  useEffect(() => {
    axios.get("/api/nodes").then((res) => {
      setHierarchyData(res.data);
    });
  }, []);

  return (
    <div className="app">
      <div className="hierarchy" role="navigation">
        <Hierarchy
          nodes={hierarchyData ? hierarchyData : []}
          handleSelectNode={handleSelectNode}
        />
      </div>
      <div className="main" role="main">
        <LineChart
          from={"2021-01-01"}
          to={"2021-01-10"}
          min={0}
          max={100}
          data={lineChartData ? lineChartData : []}
        />
      </div>
    </div>
  );
}

export default App;
