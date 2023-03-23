import { Interpolation, Theme } from "@emotion/react";
import {
  Box,
  BoxProps,
  Card,
  CardActionArea,
  CardActionAreaProps,
  CardContent,
  CardMedia,
  CardMediaProps,
  CardProps,
} from "@mui/material";
import { ElementType, ReactNode } from "react";
import { stylesheet } from "../../utils/emotion";
import { DropZone } from "../DropZone/DropZone";

export interface ImageCardProps<
  CardComponent extends ElementType<any> = "div",
  CardMediaComponent extends ElementType<any> = "img",
  CardActionAreaComponent extends ElementType<any> = "button"
> {
  className?: string;
  onUpload?: (files: File[]) => void;
  CardProps?: CardProps<CardComponent> & {
    component?: CardComponent;
    css?: Interpolation<Theme>;
  };
  CardMediaProps?: CardMediaProps<CardMediaComponent> & {
    component?: CardMediaComponent;
    css?: Interpolation<Theme>;
  };
  CardActionAreaProps?: CardActionAreaProps<CardActionAreaComponent> & {
    css?: Interpolation<Theme>;
  };
  children?: ReactNode;
  image?: string;
  clickable?: boolean;
}

export const ImageCard = <
  CardComponent extends ElementType<any> = "div",
  CardMediaComponent extends ElementType<any> = "img"
>({
  image,
  children,
  className,
  CardProps = {} as any,
  CardMediaProps = {} as any,
  CardActionAreaProps = {} as any,
  clickable,
  onUpload,
}: ImageCardProps<CardComponent, CardMediaComponent>) => {
  return (
    <Card<CardComponent>
      className={className}
      component="div"
      elevation={1}
      {...CardProps}
    >
      <ActionAreaOrBox
        actionArea={Boolean(clickable)}
        CardActionAreaProps={{
          ...CardActionAreaProps,
        }}
        BoxProps={{
          css: {
            padding: 0,
          },
        }}
        css={ss.actionArea}
      >
        <CardContent css={ss.content}>
          {!onUpload ? (
            <CardMedia<CardMediaComponent>
              component="img"
              image={image}
              {...CardMediaProps}
              css={[ss.cardMedia, CardMediaProps.css]}
            />
          ) : (
            <CardMedia
              component={DropZone}
              css={[ss.cardMedia, CardMediaProps.css]}
              onFilesAdd={onUpload}
              {...CardMediaProps}
            />
          )}
          {children}
        </CardContent>
      </ActionAreaOrBox>
    </Card>
  );
};

interface ActionAreaOrBoxProps<D extends ElementType<any>> {
  actionArea: boolean;
  CardActionAreaProps?: CardActionAreaProps & { css?: Interpolation<Theme> };
  BoxProps?: BoxProps<D> & { css?: Interpolation<Theme> };
  className?: string;
  children?: ReactNode;
}
const ActionAreaOrBox = <D extends ElementType<any> = "div">({
  actionArea,
  className,
  CardActionAreaProps,
  BoxProps,
  children,
}: ActionAreaOrBoxProps<D>) => {
  if (actionArea) {
    return (
      <CardActionArea
        {...CardActionAreaProps}
        css={[
          (theme) => ({
            paddingBottom: theme.spacing(1),
          }),
          CardActionAreaProps?.css,
        ]}
        className={`${className ?? ""} ${CardActionAreaProps?.className ?? ""}`}
      >
        {children}
      </CardActionArea>
    );
  } else {
    return (
      <Box
        {...BoxProps}
        className={`${className ?? ""} ${BoxProps?.className ?? ""}`}
      >
        {children}
      </Box>
    );
  }
};

const ss = stylesheet({
  actionArea: {
    height: "100%",
  },
  content: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    height: "100%",
  },
  cardMedia: {
    height: "140px",
    width: "100%",
  },
});
