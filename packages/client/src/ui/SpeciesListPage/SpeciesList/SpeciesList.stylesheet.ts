import { StyleSheet } from "aphrodite";
import { Color } from "../../lib/styles/colors";
import { borderRadius } from "../../lib/styles/misc";

export const listBorderStyle = `1px solid ${Color.List.cellBorder}`;

export const stylesheet = StyleSheet.create({
  actionColumn: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderLeft: `2px solid ${Color.List.cellBorder}`,
  },
  flareBeforeHoverRow: {
    borderRadius: `0 0 ${borderRadius} 0`,
    borderRight: listBorderStyle,
  },
  flareAfterHoverRow: {
    borderRadius: `0 ${borderRadius} 0 0`,
    borderRight: listBorderStyle,
  },
  actionEdit: {
    cursor: "pointer",
    display: "block",
  },
  actionRemove: {
    cursor: "pointer",
    display: "block",
    marginLeft: "16px",
  },
  actionRemoveHover: {
    color: "red",
  },
  gridContainer: {
    display: "grid",
    gridAutoRows: "1fr",
    gridTemplateColumns: "1fr",
    backgroundColor: Color.List.activeRow,
  },
  gridRow: {
    display: "contents",
  },
  tableCell: {
    padding: "32px",
    borderBottom: listBorderStyle,
    borderTop: listBorderStyle,
    borderRight: listBorderStyle,
    cursor: "pointer",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    backgroundColor: Color.List.background,
  },
  cellInHoverRow: {
    backgroundColor: Color.List.activeRow,
  },
  cellInSelectedRow: {
    backgroundColor: Color.List.activeRow,
    borderColor: "transparent",
  },
  headerRow: {
    display: "contents",
  },
  headerCell: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    fontWeight: 300,
    backgroundColor: Color.List.background,
    padding: "32px",
    borderBottom: listBorderStyle,
    borderRight: listBorderStyle,
  },
  transparent: {
    visibility: "hidden",
  },
  dummyCell: {
    borderBottom: 0,
    borderBottomRightRadius: borderRadius,
  },
});
