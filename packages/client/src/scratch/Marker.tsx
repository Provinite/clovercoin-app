import { stylesheet } from "../utils/emotion";

const ss = stylesheet({
  root: {
    height: "100%",
    width: "20px",
    margin: "0 auto",
    backgroundColor: "#FF5F15",
  },
});
export const Marker = () => <div css={ss.root} />;
