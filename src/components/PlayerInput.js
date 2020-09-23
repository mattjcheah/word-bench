import React, { forwardRef, useState } from "react";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  width: 75%;
  flex-direction: row;
  box-shadow: 0px 0px 2px 0px rgba(0, 0, 0, 0.2);

  & > * {
    font-size: 1.25rem;
    font-weight: 900;
  }
`;

const Input = styled.input`
  font-weight: 900;

  flex: 1;
  padding: 0.5rem;
  border: 0;
  border-bottom: 0.25rem solid transparent;

  &:focus {
    outline: none;
    border-bottom: 0.25rem solid var(--darktan);
  }
`;

const Button = styled.button`
  padding: 0.5rem;
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

const PlayerInput = forwardRef(({ onSubmit }, ref) => {
  const [currentInput, setCurrentInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidWord = onSubmit(currentInput);
    if (isValidWord) {
      setCurrentInput("");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Enter a word"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        autoComplete="off"
        ref={ref}
        autoFocus
      />
      <Button type="submit">GO</Button>
    </Form>
  );
});

export default PlayerInput;
