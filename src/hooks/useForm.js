/**
 * Create Forms Using this useForm Hook Easily
 * @typedef {object} Param
 * @property {Object} init
 * @property {(Object | boolean)} validate
 * @param {Object} param
 * @returns {object}
 */

import { useState } from "react";
import {
  deepClone,
  isObjEmpty,
  mapStateToKeys,
  mapValuesToState,
} from "../utils/object-utils";

const useForm = ({ init, validate }) => {
  const [formState, setFormState] = useState(mapValuesToState(init));

  const handleChange = (e) => {
    const { name: key, value, type, checked } = e.target;

    const oldState = deepClone(formState);

    if (type === "checkbox") {
      oldState[key].value = checked;
    } else {
      oldState[key].value = value;
    }

    const { errors } = getErrors(oldState);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    setFormState(oldState);
  };

  const handleFocus = (e) => {
    const { name } = e.target;

    const oldState = deepClone(formState);
    oldState[name].focused = true;

    if (!oldState[name].touched) {
      oldState[name].touched = true;
    }

    setFormState(oldState);
  };

  const handleBlur = (e) => {
    const key = e.target.name;
    const { errors } = getErrors();

    const oldState = deepClone(formState);

    if (oldState[key].touched && errors[key]) {
      oldState[key].error = errors[key];
    } else {
      oldState[key].error = "";
    }

    oldState[key].focused = false;
    setFormState(oldState);
  };

  const handleSubmit = (e, cb) => {
    e.preventDefault();
    const { hasError, errors, values } = getErrors();
    cb({
      hasError,
      errors,
      values,
      touched: mapStateToKeys(formState, "touched"),
      focused: mapStateToKeys(formState, "focused"),
    });
  };

  const clear = () => {
    const newState = mapValuesToState(init, true);
    setFormState(newState);
  };

  const getErrors = (cloneState = null) => {
    let hasError = null;
    let errors = null;

    const values = mapStateToKeys(cloneState ? cloneState : formState, "value");

    if (typeof validate === "boolean") {
      hasError = validate;
      errors = mapStateToKeys(formState, "error");
    } else if (typeof validate === "function") {
      const errorsFromCB = validate(values);
      hasError = !isObjEmpty(errorsFromCB);
      errors = errorsFromCB;
    } else {
      throw new Error("validate property must be boolean or function");
    }

    return {
      values,
      errors,
      hasError,
    };
  };

  return {
    formState,
    handleChange,
    handleFocus,
    handleBlur,
    handleSubmit,
    clear,
  };
};

export default useForm;
