import { useState, Component } from "react";
import Graph from "vis-react";
//import "./styles.css";
//import "./network.css";
const DrawGraph = (props) => {
  var nodeList = props.nodelist;
  var relationships = props.rellist;
  console.log(nodeList);
  console.log(relationships);
  const graph = {
    nodes: nodeList.map((person) => {
      return { "id": person.name, "label": person.name };
    }),
    edges: relationships.map((arr) => {
      return { "from": arr[0], "to": arr[1] };
    }),
  };

  var options = {
    layout: {
      hierarchical: true,
    },
    edges: {
      color: "#000000",
    },
    interaction: { hoverEdges: true },
  };

  var events = {
    select: function (event) {
      var { nodes, edges } = event;
    },
  };
  //<Graph graph={graph} options={options} events={events} />
  return (
    <div>
      <Graph graph={graph} options={options} events={events} />
    </div>
  );
};

export default DrawGraph;
