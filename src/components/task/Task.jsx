import React from "react";
import useForm from "../../hooks/useForm";
const init = {
  text: "",
  checked: false,
  group: "home",
  priority: "medium",
  file: "",
};

const Task = () => {
  const {
    formState: state,
    handleChange,
    handleSubmit,
  } = useForm({ init, validate: true });

  const submitCb = ({ values }) => {
    console.log(values);
  };
  return (
    <div>
      <h1>Tasks</h1>
      <form onSubmit={(e) => handleSubmit(e, submitCb)}>
        <input
          type="checkbox"
          name="checked"
          checked={state.checked.value}
          onChange={handleChange}
        />
        <input
          type="text"
          name="text"
          value={state.text.value}
          onChange={handleChange}
        />
        <select name="group" value={state.group.value} onChange={handleChange}>
          <option value="home">Home</option>
          <option value="office">Office</option>
        </select>
        <input
          type="radio"
          name="priority"
          value={"low"}
          onChange={handleChange}
        />
        Low
        <input
          type="radio"
          name="priority"
          value="medium"
          onChange={handleChange}
        />
        Medium
        <input
          type="radio"
          name="priority"
          value="high"
          onChange={handleChange}
        />
        High
        <input
          type="file"
          name="file"
          value={state.file.value}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Task;
