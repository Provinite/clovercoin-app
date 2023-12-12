import { FC, useMemo, useRef } from "react";
import { stylesheet } from "../utils/emotion";

const ss = stylesheet({
  cell: {
    backgroundColor: "#87CEEB",
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    userSelect: "none",
  },
  topCell: {
    backgroundImage:
      "linear-gradient(#7CFC00 0, #7CFC00 15%, #9B7653 15%, #9B7653 100%, #9B7653 110%)",
    color: "white",
    fontSize: "18px",
  },
  activeCell: {
    backgroundColor: "#9B7653",
  },
  calloutCell: {
    borderColor: "white",
  },
  grid: {
    display: "grid",
    gridAutoRows: "1fr",
    columnGap: 0,
    margin: "128px auto",
  },
});

interface LandscapeProps {
  width: number;
  min: number;
  max: number;
  profile: number[];
  setProfile: (col: number, height: number) => void;
  renderCellContents: (
    col: number,
    height: number,
    landscapeHeight: number
  ) => JSX.Element;
}
export const Landscape: FC<LandscapeProps> = ({
  width,
  min,
  max,
  profile,
  setProfile,
  renderCellContents,
}) => {
  const height = max - min;

  const gridStyle = useMemo(
    () => ({
      ...ss.grid,
      height: height * 50 + "px",
      width: width * 50 + "px",
      gridTemplateColumns: "1fr ".repeat(width),
    }),
    [width, height]
  );

  const selectionHeightRef = useRef<number | null>(null);

  const cells: JSX.Element[] = [];

  for (let row = max; row > min; row--) {
    for (let col = 0; col < width; col++) {
      cells.push(
        <div
          key={`${row}-${col}`}
          css={[
            ss.cell,
            profile[col] > row && ss.activeCell,
            profile[col] === row && ss.topCell,
          ]}
          onDragStartCapture={(e) => e.preventDefault()}
          onMouseDown={() => {
            setProfile(col, row);
            selectionHeightRef.current = row;
          }}
          onMouseOver={(e) => {
            if ((e.buttons & 1) === 1 && selectionHeightRef.current !== null) {
              setProfile(col, selectionHeightRef.current);
            }
          }}
        >
          {renderCellContents(col, row, profile[col])}
        </div>
      );
    }
  }
  return <div css={gridStyle}>{cells}</div>;
};
