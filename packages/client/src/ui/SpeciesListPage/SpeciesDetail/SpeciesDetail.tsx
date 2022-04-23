import * as React from "react";
import { FC, HTMLAttributes, useEffect, useState } from "react";
import { ListViewSpecies } from "../../../models/Species";
import { StyleDeclaration } from "../../aphrodite/StyleDeclaration";
import { StyleSheet, css } from "aphrodite";
import { Color } from "../../lib/styles/colors";
import { Card } from "../../Card/Card";
import { useLipsum } from "../../../hooks/useLipsum";

export interface SpeciesDetailProps extends HTMLAttributes<HTMLDivElement> {
  species?: ListViewSpecies;
  styles?: StyleDeclaration[];
}

const ss = StyleSheet.create({
  root: {
    width: "100%",
    minHeight: "100%",
    backgroundColor: Color.List.activeRow,
    padding: "16px",
  },
  nameCard: {
    marginTop: "32px",
    display: "inline-block",
  },
});

export const SpeciesDetail: FC<SpeciesDetailProps> = ({
  species,
  styles = [],
  ...rest
}) => {
  const { paragraphs } = useLipsum({ seed: species?.name, paragraphs: 2 }, [
    species,
  ]);

  return (
    <div {...rest} className={css(ss.root, ...styles)}>
      <Card styles={[ss.nameCard]}>
        <h1>{species && species.name}</h1>
        {paragraphs.map((p) => (
          <p>{p}</p>
        ))}
      </Card>
    </div>
  );
};
