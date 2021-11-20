import { useState } from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Button from "@mui/material/Button";

import Popup from "./Popup";

const CreateNode = (props) => {
  // for handling popup messages
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const [message, setMessage] = useState("");

  // adding node

  const [inputs, setInputs] = useState({
    "name": null,
    "age": null,
    "followers": 0,
  });
  const [checkName, setcheckName] = useState(false);

  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    var i;
    for (i = 0; i < props.nodes.length; i++) {
      if (props.nodes[i].name === inputs.name) {
        setcheckName(true);
        return;
      }
    }

    inputs.age = Number(inputs.age);
    var toSend = { "node": inputs };
    fetch("/addnode", {
      "method": "POST",

      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify(toSend),
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        setMessage(json.message);
        props.onChange(inputs);
        togglePopup();
        setcheckName(false);
        document.getElementById("add-node-form").reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit} autoComplete="off" id="add-node-form">
        <FormControl sx={{ m: 1, width: "15ch" }}>
          <TextField
            required
            label="Name"
            name="name"
            value={inputs.name || ""}
            onChange={handleChange}
            variant="standard"
            error={checkName}
          />
          {checkName && <FormHelperText>Name already exists</FormHelperText>}
        </FormControl>
        <br />
        <FormControl sx={{ m: 1, width: "10ch" }}>
          <TextField
            required
            label="Age"
            name="age"
            value={inputs.age || ""}
            onChange={handleChange}
            variant="standard"
          />
        </FormControl>
        <br />
        <FormControl sx={{ m: 1 }}>
          <Button variant="contained" type="submit">
            Add
          </Button>
        </FormControl>
      </form>
      {isOpen && (
        <Popup
          content={
            <>
              <p>{message}</p>
            </>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
};

export default CreateNode;
