import React from 'react';
import Form from 'react-bootstrap/Form';
import './index.css';

export default function ({
  label,
  options,
  optionValueKey,
  optionNameKey,
  errorMessage,
  onChange,
  value
}) {
  return (
    <Form.Group hasValidation controlId={label}>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        as="select"
        value={value}
        onChange={onChange}
        required
        isInvalid={errorMessage}
      >
        <option value="">------</option>
        {options?.map((option) => (
          <option value={option[optionValueKey]} key={option[optionValueKey]}>
            {option[optionNameKey]}
          </option>
        ))}
      </Form.Control>
      <Form.Control.Feedback type="invalid">
        {errorMessage}
      </Form.Control.Feedback>
    </Form.Group>
  );
}
