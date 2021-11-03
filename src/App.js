import CreateRelationship from "./createRelationship";
import { useState, useEffect, useCallback } from "react";
const WAIT_TIME = 2000;

function App() {
  const [nodeList, setNodeList] = useState(["None"]);

  // useEffect for refreshing node list
  useEffect(() => {
    fetch("/nodelist")
      .then((res) => res.json())
      .then((data) => {
        setNodeList(data.nodes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header"></header>
      <CreateRelationship nodes={nodeList} />
    </div>
  );
}

export default App;
