import CreateNode from "./createNode";
import CreateRelationship from "./createRelationship";
import DrawGraph from "./graph";
import { useState, useEffect } from "react";
const WAIT_TIME = 2000;

function App() {
  const [nodeList, setNodeList] = useState(["None"]);
  const [relList, setRelList] = useState(["None"]);
  // useEffect for refreshing node list
  useEffect(() => {
    let isMounted = true;
    fetch("/nodelist")
      .then((res) => res.json())
      .then((data) => {
        if (isMounted) {
          setNodeList(data.nodes);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {
      isMounted = false;
    };
  }, WAIT_TIME);

  useEffect(() => {
    fetch("/rellist")
      .then((res) => res.json())
      .then((data) => {
        setRelList(data.relationships);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  function handleChangeNodes(newValue) {
    setNodeList(nodeList.concat(newValue));
  }

  function handleChangeRelationships(newValue) {
    setRelList(relList.concat(newValue));
  }

  return (
    <div className="App">
      <header className="App-header"></header>
      <DrawGraph nodelist={nodeList} rellist={relList} />
      <br />
      <br />
      <CreateNode nodes={nodeList} onChange={handleChangeNodes} />
      <br />
      <br />
      <CreateRelationship
        nodes={nodeList}
        relationships={relList}
        onChange={handleChangeRelationships}
      />
    </div>
  );
}

export default App;
