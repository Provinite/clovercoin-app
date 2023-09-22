import { FC, useEffect } from "react";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, [title]);
};

export interface PageTitleProps {
  children: string;
}
/**
 * {@link usePageTitle}: The Hook: The Component
 */
export const PageTitle: FC<PageTitleProps> = ({ children }) => {
  usePageTitle(children);
  return <></>;
};
