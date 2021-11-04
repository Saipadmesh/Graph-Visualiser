import CreateNode from "./createNode";
import CreateRelationship from "./createRelationship";
import { useState, useEffect } from "react";
const WAIT_TIME = 2000;

function App() {
  const [nodeList, setNodeList] = useState(["None"]);

  // useEffect for refreshing node list
  useEffect(() => {
    fetch("/nodelist")
      .then((res) => res.json())
      .then((data) => {
        setNodeList(data.nodes);
        console.log(nodeList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChange(newValue) {
    setNodeList(nodeList.concat(newValue));
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <CreateNode nodes={nodeList} onChange={handleChange} />
      <CreateRelationship nodes={nodeList} />
    </div>
  );
}

export default App;
