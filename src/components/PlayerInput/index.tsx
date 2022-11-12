import {
  FormEventHandler,
  forwardRef,
  KeyboardEventHandler,
  useState,
} from "react";
import { Form, Input, Button } from "./styles";

type Props = {
  onSubmit: (word: string) => boolean;
  onKeyDown: KeyboardEventHandler<HTMLInputElement>;
};

const PlayerInput = forwardRef<HTMLInputElement, Props>(
  ({ onSubmit, onKeyDown }, ref) => {
    const [currentInput, setCurrentInput] = useState("");

    const handleSubmit: FormEventHandler = (e) => {
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
          placeholder="Enter a Word..."
          value={currentInput}
          onChange={(e) => setCurrentInput(e.target.value)}
          autoComplete="off"
          ref={ref}
          autoFocus
          onKeyDown={onKeyDown}
        />
        <Button type="submit">GO</Button>
      </Form>
    );
  }
);

export default PlayerInput;
