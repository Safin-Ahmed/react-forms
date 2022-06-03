import React, { useEffect, useState } from "react";
import InputGroup from "../components/shared/forms/InputGroup";
import Button from "../components/UI/buttons/Button";
import TextInput from "../components/UI/inputs/TextInput";
import Text from "../components/UI/texts/Text";
import { deepClone, mapStateToValues } from "../utils/object-utils";

const init = {
  title: {
    value: "",
    error: "",
    focus: false,
  },
  bio: {
    value: "",
    error: "",
    focus: false,
  },
  skills: {
    value: "",
    error: "",
    focus: false,
  },
};

let isInitial = true;

const App = () => {
  const [state, setState] = useState(deepClone(init));
  const [hasError, setHasError] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    const values = mapStateToValues(state);
    const { isValid, errors } = checkValidity(values);

    if (isValid) {
      console.log(state);
    } else {
      const newState = deepClone(state);
      Object.keys(errors).forEach((key) => {
        newState[key].error = errors[key];
      });
      setState(newState);
    }
  };

  const handleChange = (e) => {
    const { name: key, value } = e.target;
    const newState = deepClone(state);
    if (value && newState[key].focus) {
      newState[key].error = "";
    }
    newState[key].value = value;
    setState(newState);

    // const values = mapStateToValues(state);
    // const { errors } = checkValidity(values);

    // const validateState = deepClone(state);
    // if (errors[key] && state[key].focus) {
    //   validateState[key].error = errors[key];
    // } else {
    //   validateState[key].error = "";
    // }

    // setState(validateState);
  };

  const handleFocus = (e) => {
    const { name } = e.target;
    const newState = deepClone(state);
    newState[name].focus = true;
    setState(newState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const values = mapStateToValues(state);
    const { errors } = checkValidity(values);
    const newState = deepClone(state);

    if (newState[key].focus && errors[key]) {
      newState[key].error = errors[key];
    } else {
      newState[key].error = "";
    }

    setState(newState);
  };

  const checkValidity = (values) => {
    const errors = {};
    const { title, bio, skills } = values;

    if (!title) {
      errors.title = "Invalid Title";
    }

    if (!bio) {
      errors.bio = "Invalid Bio";
    }

    if (!skills) {
      errors.skills = "Invalid Skills";
    }

    return {
      errors,
      isValid: Object.keys(errors).length === 0,
    };
  };

  return (
    <>
      <div className="root">
        <form onSubmit={handleSubmit}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
          >
            <InputGroup
              value={state.title.value}
              label="Title"
              name="title"
              placeholder="Software Engineer"
              error={state.title.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              value={state.bio.value}
              label="Bio"
              name="bio"
              placeholder="I am a Software Engineer"
              error={state.bio.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <InputGroup
              value={state.skills.value}
              label="Skills"
              name="skills"
              placeholder="Javascript, React"
              error={state.skills.error}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
            />

            <Button type="submit">Submit</Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default App;
