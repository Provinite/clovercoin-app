import AttachFile from "@mui/icons-material/AttachFile";
import { Button, InputLabel, InputLabelProps } from "@mui/material";
import { forwardRef } from "react";

export const DropZone = forwardRef<
  HTMLLabelElement,
  InputLabelProps & { onFilesAdd: (files: File[]) => void }
>(({ onFilesAdd: onFileAdd, ...props }, ref) => {
  return (
    <InputLabel
      ref={ref}
      {...props}
      onClick={(e) => e.stopPropagation()}
      css={(theme) => ({
        borderStyle: "solid",
        borderWidth: "2px",
        borderColor: theme.palette.divider,
      })}
    >
      <Button
        css={{ width: "100%", height: "100%" }}
        startIcon={<AttachFile />}
        component="div"
      >
        No Image
      </Button>
      <input
        type="file"
        css={{
          position: "fixed",
          top: "-100vh",
        }}
        onChange={(e) => {
          const { files } = e.target;
          if (files && files.length) {
            onFileAdd(Array.from(files));
          }
        }}
      />
    </InputLabel>
  );
});
