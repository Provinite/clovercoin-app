import { FC } from "react";
import { stylesheet } from "../utils/emotion";
import { Slope } from "./Slope";

const ss = stylesheet({
  root: {
    transform: "scaleX(.75) scaleY(.75)",
    width: "20px",
    height: "8px",
    position: "relative",
  },
  up: {
    rotate: "-90deg",
    backgroundColor: "green",
    "::before": {
      display: "block",
      content: `""`,
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: `10px solid green`,
      width: 0,
      height: 0,
      position: "absolute",
      right: "-10px",
      top: "-1px",
      rotate: "90deg",
    },
  },
  down: {
    rotate: "90deg",
    backgroundColor: "red",
    "::before": {
      display: "block",
      content: `""`,
      borderLeft: "10px solid transparent",
      borderRight: "10px solid transparent",
      borderBottom: `10px solid red`,
      width: 0,
      height: 0,
      position: "absolute",
      right: "-10px",
      top: "-1px",
      rotate: "90deg",
    },
  },
  flat: {
    backgroundColor: "#FFFF00",
  },
});

export const TravelledMarker: FC<{ slope: Slope }> = ({ slope }) => {
  return (
    <div
      css={[
        ss.root,
        { [Slope.Up]: ss.up, [Slope.Down]: ss.down, [Slope.Flat]: ss.flat }[
          slope
        ],
      ]}
    />
  );
};
