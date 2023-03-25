import { registerEnumType } from "type-graphql";

export enum ImageContentType {
  Jpg = "image/jpg",
  Png = "image/png",
  Gif = "image/gif",
}

registerEnumType(ImageContentType, {
  name: "ImageContentType",
  description: "Acceptable MIME types for images",
});
