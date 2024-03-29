import React from "react";
import InputGroup from "../components/shared/forms/InputGroup";
import Task from "../components/task/Task";
import useForm from "../hooks/useForm";

const init = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
};

const validate = (values) => {
  const errors = {};

  if (!values.firstName) {
    errors.firstName = "First Name is Required!";
  }

  if (!values.lastName) {
    errors.lastName = "Last Name is Required";
  }

  if (!values.email) {
    errors.email = "Email is Required";
  }

  if (!values.password) {
    errors.password = "Password is Required";
  } else if (values.password.length < 6) {
    errors.password = "Password Length Must Be 6 Character";
  }

  return errors;
};

const App = () => {
  const {
    formState: state,
    handleBlur,
    handleChange,
    handleFocus,
    handleSubmit,
    clear,
  } = useForm({ init, validate });

  const cb = ({ hasError, values, errors }) => {
    if (hasError) {
      alert("[ERROR]" + JSON.stringify(errors));
    } else {
      alert("[SUCCESS]" + JSON.stringify(values));
    }
  };
  return (
    <div>
      <h1>My Custom Hook Form</h1>
      <form onSubmit={(e) => handleSubmit(e, cb)}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <InputGroup
            value={state.firstName.value}
            label="First Name"
            name="firstName"
            placeholder="John"
            error={state.firstName.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.lastName.value}
            label="Last Name"
            name="lastName"
            placeholder="Doe"
            error={state.lastName.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.email.value}
            label="Email"
            name="email"
            placeholder="test@example.com"
            error={state.email.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <InputGroup
            value={state.password.value}
            label="Password"
            name="password"
            placeholder="****"
            error={state.password.error}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <div>
            <button type="reset" onClick={clear}>
              Clear
            </button>
            <button type="submit">Submit</button>
          </div>
        </div>
      </form>

      <Task />
    </div>
  );
};

export default App;
