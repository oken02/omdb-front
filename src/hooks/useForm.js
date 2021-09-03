import React, { useEffect, useState } from "react";
import { mapObj } from "../utils/myFunctions";

const createForm = (defaultValues) => {
  return () => {
    const form = {
      controls: {},
      isValid: false,
      dirty: false,
    };

    for (const key in defaultValues) {
      const [defValue, validators] = defaultValues[key];

      form.controls[key] = {
        dirty: false,
        toString() {
          return defValue;
        },
      };

      form.controls[key] = runvalidations(key, defValue, form, defaultValues);
    }
    return form;
  };
};

function runvalidations(name, value, form, data) {
  const newControl = {
    ...form.controls[name],
    value: value,
    errors: [],
  };

  const validators = data[name][1];

  for (const validator of validators) {
    const error = validator(value, form, name);
    if (error) newControl.errors.push(error);
  }

  return newControl;
}

export default (data) => {
  const [form, setForm] = useState(createForm(data));
  const { controls, isValid } = form;

  const validateFilds = (controlName, value) => {
    form.controls[controlName].dirty = true;
    form.controls[controlName] = runvalidations(controlName, value, form, data);

    form.isValid = true;
    for (const key in form.controls) {
      if (form.controls[key].errors.length != 0) {
        form.isValid = false;
        break;
      }
    }

    setForm({
      ...form,
      dirty: true,
      controls: {
        ...form.controls,
      },
    });
  };

  function getData() {
    const data = mapObj(form.controls, (key, control) => ({
      [key]: control.value,
    }));
    return data;
  }

  const handleInp = ({ target }) => {
    const { name, value } = target;
    validateFilds(name, value);
  };

  const setValue = (key, value) => {
    form.controls[key].dirty = false;

    form.controls[key] = runvalidations(key, value, form, data);

    if (form.controls[key].errors.length != 0) {
      form.isValid = false;
    }

    setForm({ ...form });
  };

  return {
    handleInp,
    setForm,
    form: {
      ...form,
      getData,
      setValue,
    },
  };
};
