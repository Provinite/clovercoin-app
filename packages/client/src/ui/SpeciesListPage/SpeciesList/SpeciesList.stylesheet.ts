import { StyleSheet } from "aphrodite";
export const stylesheet = StyleSheet.create({
  actionColumn: {
    flexGrow: 1,
    display: "flex",
    justifyContent: "flex-start",
    flexDirection: "row",
    borderLeft: "2px solid rgba(0, 0, 0, 0.1)",
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
    gridTemplateColumns: "3fr 1fr",
    gridTemplateAreas: "header header",
  },
  gridRow: {
    display: "contents",
  },
  tableCell: {
    padding: "16px",
    borderBottom: "2px solid rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
  },
  cellInHoverRow: {
    backgroundColor: "rgba(0, 0, 128, 0.1)",
  },
  headerRow: {
    display: "contents",
    gridArea: "header",
  },
  searchInput: {
    margin: "16px",
    borderRadius: "12px",
    padding: "4px 8px",
    border: "2px solid rgba(0,0,0,0.1)",
    fontWeight: 300,
    fontSize: "16px",
    outline: 0,

    ":focus": {
      border: "2px solid rgba(0,0,0,0.2)",
    },
    ":placeholder-shown": {
      fontStyle: "italic",
    },
  },
});
