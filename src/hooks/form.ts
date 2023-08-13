import { SelectChangeEvent } from "@mui/material";
import { useEffect, useState } from "react";

export type FormValues = {
  [key: string]: string;
};

type FormHookResult<T> = {
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
  onInput: (name: string, value: string) => void;
  onReset: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDropdownChange: (event: SelectChangeEvent<number>) => void;
  onCustomChange: (name: string, value: any) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
  values: T;
};

export const useForm = <T extends FormValues>(
  initialState: T = {} as T,
  initCallback?: (values: T, isValid: boolean) => void,
  submitCallback?: (isValid: boolean) => Promise<void>,
  updateCallback?: (name: string, value: any, values: T, isValid: boolean) => void,
  validationCallback?: (values: T) => boolean,
  shallReset: boolean = false
): FormHookResult<T> => {
  const [values, setValues] = useState<T>(initialState);

  useEffect(() => initCallback && initCallback(values, validate(values)), []);

  function validate(values: T): boolean {
    if (validationCallback) {
      return validationCallback(values);
    }
    return false;
  }

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
    updateCallback && updateCallback(event.target.name, event.target.value, newValues, validate(newValues));
  };

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
    updateCallback && updateCallback(event.target.name, event.target.value, newValues, validate(newValues));
  };

  const onDropdownChange = (event: SelectChangeEvent<number>) => {
    const newValues = { ...values, [event.target.name]: event.target.value };
    setValues(newValues);
    updateCallback && updateCallback(event.target.name, event.target.value, newValues, validate(newValues));
  };

  const onInput = (name: string, value: string) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    updateCallback && updateCallback(name, value, newValues, validate(newValues));
  };

  const onCustomChange = (name: string, value: any) => {
    const newValues = { ...values, [name]: value };
    setValues(newValues);
    updateCallback && updateCallback(name, value, newValues, validate(newValues));
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (shallReset) {
      (event.target as any).reset();
    }
    submitCallback && await submitCallback(validate(values));
  };

  const onReset = () => setValues(initialState);

  return {
    onBlur,
    onInput,
    onReset,
    onChange,
    onDropdownChange,
    onCustomChange,
    onSubmit,
    values,
  };
};