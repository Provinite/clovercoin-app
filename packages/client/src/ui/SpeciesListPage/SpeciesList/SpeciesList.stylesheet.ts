import { StyleSheet } from "aphrodite";
import { createClassDef } from "../../aphrodite/StyleDeclaration";
import { Color } from "../../lib/styles/colors";
import { borderRadius } from "../../lib/styles/misc";

export const listBorderStyle = `1px solid ${Color.List.cellBorder}`;

const cellStyles = createClassDef({
  // common styles for all cells
  tableCell: {
    padding: "32px",
    borderBottom: listBorderStyle,
    borderTop: listBorderStyle,
    borderRight: listBorderStyle,
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    backgroundColor: Color.List.background,
  },
  // cell in the header row
  headerCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontWeight: 300,
  },
  // flared "trumpet horn" shape around selected row
  flareBeforeHoverRow: {
    borderBottomRightRadius: borderRadius,
    borderRight: listBorderStyle,
  },
  flareAfterHoverRow: {
    borderTopRightRadius: borderRadius,
    borderRight: listBorderStyle,
  },
  // hover styling
  hoverableCell: {
    ":hover": {
      backgroundColor: Color.List.activeRow,
    },
  },
  // Selected row
  cellInSelectedRow: {
    backgroundColor: Color.List.activeRow,
    borderColor: "transparent",
  },
  // Dummy cell used for styling in the case where we do not
  // have successor item
  dummyCell: {
    borderBottom: 0,
    borderBottomRightRadius: borderRadius,
  },
});

const gridContainerStyles = createClassDef({
  // list container element
  gridContainer: {
    display: "grid",
    gridAutoRows: "1fr",
    gridTemplateColumns: "1fr",
    backgroundColor: Color.List.activeRow,
  },
});

const utilityStyles = createClassDef({
  clickable: {
    cursor: "pointer",
  },
});

export const stylesheet = StyleSheet.create({
  ...utilityStyles,
  ...cellStyles,
  ...gridContainerStyles,
});
