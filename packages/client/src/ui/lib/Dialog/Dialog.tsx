import classNames from "classnames";
import * as React from "react";
import {
  FunctionComponent,
  useRef,
  useEffect,
  EventHandler,
  MouseEvent,
} from "react";
import { createPortal } from "react-dom";
import { VscClose } from "react-icons/vsc";
import "./Dialog.scss";

export const Portal: FunctionComponent<{
  className: string;
  onClick?: EventHandler<MouseEvent>;
}> = ({ children, className }) => {
  const containerRef = useRef(document.createElement("div"));
  const container = containerRef.current;
  useEffect(() => {
    container.classList.add(className);
    document.body.prepend(container);
    return () => {
      document.body.removeChild(container);
    };
  }, []);

  return createPortal(children, container);
};

export const Dialog: FunctionComponent<{
  title: string;
  isOpen: boolean;
  onClose: () => void;
  className?: string;
}> = ({ children, title, isOpen, onClose, className }) =>
  isOpen ? (
    <Portal className="portal">
      <div
        onClick={(e) => {
          if (e.currentTarget === e.target) {
            onClose();
          }
        }}
        className="modal"
      >
        <div className={classNames("dialog", className)}>
          <div className="dialog--header">
            <div className="dialog--close">
              <VscClose onClick={onClose} />
            </div>
            <div>{title}</div>
          </div>
          <div className="dialog--content">{children}</div>
        </div>
      </div>
    </Portal>
  ) : (
    <></>
  );
