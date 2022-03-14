import * as React from "react";
import { FunctionComponent } from "react";
import classNames from "classnames";
import "./DataTable.scss";

export interface ColumnDefinition<T> {
  name: string;
  selector: (row: T) => any;
  width: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export interface DataTableProps<T> {
  data: T[];
  columns: ColumnDefinition<T>[];
  classes?: {
    root?: string;
    headRow?: string;
    row?: string;
    bodyRow?: string;
    cell?: string;
    bodyCell?: string;
    headerCell?: string;
    body?: string;
  };
}

type PropTypes<T> = Parameters<FunctionComponent<DataTableProps<T>>>[0];
export const DataTable = <T,>({ classes, columns, data }: PropTypes<T>) => {
  return (
    <div className={classNames("data-table", classes?.root)}>
      <div
        className={classNames(
          "data-table--row",
          "data-table--row__header",
          classes?.headRow,
          classes?.row
        )}
      >
        {columns.map(({ name, width }) => {
          return (
            <div
              className={classNames(
                "data-table--cell",
                "data-table--cell__header",
                classes?.headerCell,
                classes?.cell
              )}
              style={{ width: `${(width / 12) * 100}%` }}
            >
              {name}
            </div>
          );
        })}
      </div>
      <div className={classNames("data-table--body", classes?.body)}>
        {data.map((data) => (
          <div
            className={classNames(
              "data-table--row",
              classes?.bodyRow,
              classes?.row
            )}
          >
            {columns.map(({ selector, width }) => (
              <div
                className={classNames(
                  "data-table--cell",
                  classes?.bodyCell,
                  classes?.cell
                )}
                style={{ width: `${(width / 12) * 100}%` }}
              >
                {selector(data)}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
