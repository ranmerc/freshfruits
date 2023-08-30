import { AddCircle, RemoveCircle } from "@mui/icons-material";
import { IconButton, Typography } from "@mui/material";
import { MouseEventHandler } from "react";

type CounterProps = {
  count: number;
  incrementLabel: string;
  decrementLabel: string;
  incrementDisabled?: boolean;
  decrementDisabled?: boolean;
  onDecrement: MouseEventHandler<HTMLButtonElement>;
  onIncrement: MouseEventHandler<HTMLButtonElement>;
};

export default function Counter({
  count,
  incrementLabel,
  decrementLabel,
  onDecrement,
  onIncrement,
  incrementDisabled = false,
  decrementDisabled = false,
}: CounterProps) {
  return (
    <>
      <IconButton
        onClick={onDecrement}
        aria-label={decrementLabel}
        disabled={decrementDisabled}
      >
        <RemoveCircle />
      </IconButton>
      <Typography fontSize={"1.2rem"}>{count}</Typography>
      <IconButton
        onClick={onIncrement}
        aria-label={incrementLabel}
        disabled={incrementDisabled}
      >
        <AddCircle />
      </IconButton>
    </>
  );
}
