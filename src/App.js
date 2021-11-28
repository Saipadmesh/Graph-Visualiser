import CreateNode from "./createNode";
import CreateRelationship from "./createRelationship";
import DrawGraph from "./graph";
import { useState, useEffect } from "react";
const WAIT_TIME = 2000;

function App() {
  const [nodeList, setNodeList] = useState([]);
  const [relList, setRelList] = useState([]);
  // useEffect for refreshing node list
  useEffect(() => {
    fetch("/nodelist")
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.nodes);
        setNodeList(data.nodes);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => {};
  }, []);

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
    console.log(nodeList);
  }

  function handleChangeRelationships(newValue) {
    setRelList(relList.concat([newValue]));
    setNodeList(
      nodeList.map((node) => {
        if (node.name === newValue[0] || node.name === newValue[1]) {
          return {
            "id": node.id,
            "name": node.name,
            "age": node.age,
            "followers": node.followers + 1,
          };
        } else {
          return node;
        }
      })
    );
    console.log(relList);
  }

  function handleDelRelationships(newValue) {
    //console.log(newValue);
    setRelList(
      relList.filter((arr) => {
        return arr.indexOf(newValue[0]) < 0 && arr.indexOf(newValue[1]) < 0;
      })
    );
    setNodeList(
      nodeList.map((node) => {
        if (node.name === newValue[0] || node.name === newValue[1]) {
          console.log(node.name);
          return {
            "id": node.id,
            "name": node.name,
            "age": node.age,
            "followers": node.followers - 1,
          };
        } else {
          return node;
        }
      })
    );
    console.log(relList);
  }
  //<DrawGraph nodelist={nodeList} rellist={relList} />
  return (
    <div className="App">
      <header className="App-header"></header>
      <div style={{ height: 500, width: 500, margin: 10 }}>
        <DrawGraph nodelist={nodeList} rellist={relList} />
      </div>
      <br />
      <br />
      <CreateNode nodes={nodeList} onChange={handleChangeNodes} />
      <br />
      <br />
      <CreateRelationship
        nodes={nodeList}
        relationships={relList}
        onChange={handleChangeRelationships}
        onDelete={handleDelRelationships}
      />
    </div>
  );
}

export default App;
