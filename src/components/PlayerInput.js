import React, { useState, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";

const Form = styled.form`
  display: flex;
  width: 50%;
  margin: 0.25rem auto;
  flex-direction: row;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  & > * {
    font-size: 1.25rem;
    font-weight: 900;
  }
`;

const invalidIndicator = keyframes`
  from {
    border-bottom: 0.25rem solid red;
  }

  to {
    border-bottom: 0.25rem solid var(--darktan);
  }
`;

const Input = styled.input`
  font-weight: 900;

  flex: 1;
  padding: 0.6em;
  border: 0;
  border-bottom: 0.25rem solid transparent;

  &:focus {
    outline: none;
    border-bottom: 0.25rem solid var(--darktan);
  }

  ${(props) =>
    props.invalid &&
    css`
      animation: ${invalidIndicator} 0.5s linear;
    `}
`;

const Button = styled.button`
  padding: 0.6em 0.8em;
  background-color: var(--darktan);
  color: #fff;
  border: none;

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const PlayerInput = ({ onSubmit }) => {
  const [invalid, setInvalid] = useState(false);
  const [currentInput, setCurrentInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidWord = onSubmit(currentInput);
    setInvalid(!isValidWord);
    setCurrentInput("");
  };

  useEffect(() => {
    if (invalid) {
      setTimeout(() => {
        setInvalid(false);
      }, 500);
    }
  }, [invalid]);

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter a Word..."
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        autoComplete="off"
        invalid={invalid}
      />
      <Button type="submit">GO</Button>
    </Form>
  );
};

export default PlayerInput;
