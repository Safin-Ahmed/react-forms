import React from "react";
import InputGroup from "../components/shared/forms/InputGroup";
import Button from "../components/UI/buttons/Button";
import TextInput from "../components/UI/inputs/TextInput";
import Text from "../components/UI/texts/Text";

const App = () => {
  const handleFocus = (e) => {
    console.log(e.target.value);
  };
  return (
    <>
      <div className="root">
        <InputGroup name="title" placeholder="Enter Your Title" label="Title" />
      </div>
    </>
  );
};

export default App;
