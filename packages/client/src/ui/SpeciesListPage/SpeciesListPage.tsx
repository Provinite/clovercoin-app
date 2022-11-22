import { FC, useEffect, useState } from "react";
import { StyleSheet, css } from "aphrodite";
import { HeaderBar } from "../HeaderBar/HeaderBar";
import { HeaderBarProps } from "../HeaderBar/HeaderBarProps";
import { GetSpeciesListViewQuery } from "../../generated/graphql";
import { SpeciesCard } from "../SpeciesCard/SpeciesCard";
import { useFetcher } from "react-router-dom";
import { If } from "../util/If";
import { useRouteCommunity } from "../SpeciesDetailPage/useRouteCommunity";
import { AddBadge } from "../AddBadge/AddBadge";
import MovieFilterIcon from "@mui/icons-material/MovieFilter";
import {
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Toolbar,
} from "@mui/material";
import { SideNav } from "../SideNav/SideNav";
export interface SpeciesListPageProps {
  headerBarProps: HeaderBarProps;
  data: GetSpeciesListViewQuery;
  onSpeciesClick?: (
    species: GetSpeciesListViewQuery["species"][number]
  ) => void;
}

const ss = StyleSheet.create({
  root: {},
  listContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
  listItem: {
    marginLeft: "80px",
    marginRight: "80px",
    marginTop: "40px",
    marginBottom: "40px",
  },
  addCard: {
    paddingTop: "32px",
    width: "300px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px solid #CCC",
    position: "relative",
  },
  form: {
    display: "flex",
    flexDirection: "column",
  },
  formLabel: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "16px",
  },
  formLabelText: {
    display: "block",
  },
  formInput: {
    display: "block",
  },
  clickableCard: {
    cursor: "pointer",
  },
  addCardHeader: {
    margin: "0 auto",
  },
});

export const SpeciesListPage: FC<SpeciesListPageProps> = ({
  headerBarProps,
  data,
  onSpeciesClick,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const fetcher = useFetcher();
  const community = useRouteCommunity();
  useEffect(() => {
    setShowAddForm(false);
  }, [fetcher.state]);

  return (
    <>
      <HeaderBar {...headerBarProps} title={`${community.name} Species`} />
      <div
        css={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
        }}
      >
        <SideNav
          navItems={[
            {
              to: `/community/${community.id}/species/`,
              children: "Species",
              icon: <MovieFilterIcon />,
            },
          ]}
        />
        <div css={{ flexGrow: 1 }}>
          <Toolbar />
          <Grid container css={{ paddingTop: "18px" }} spacing={2}>
            {data.species.map((s) => (
              <SpeciesCard
                key={s.name}
                species={s}
                onClick={onSpeciesClick ? () => onSpeciesClick(s) : undefined}
              />
            ))}
            {/* Species Add Card */}
            <Grid
              item
              xs={6}
              sm={4}
              lg={3}
              css={{
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Card
                onClick={() => setShowAddForm(true)}
                css={{ width: "200px", height: "250px" }}
              >
                <If condition={!showAddForm}>
                  <CardActionArea css={{ height: "100%" }}>
                    <AddBadge to="">Add One</AddBadge>
                  </CardActionArea>
                </If>
                <CardContent>
                  <If condition={showAddForm}>
                    <span className={css(ss.addCardHeader)}>Add One</span>
                  </If>
                  <fetcher.Form
                    action="."
                    method="post"
                    className={css(ss.form)}
                  >
                    <If condition={showAddForm}>
                      <label className={css(ss.formLabel)}>
                        <span className={css(ss.formLabelText)}>Name</span>
                        <input
                          autoFocus
                          autoComplete="off"
                          type="text"
                          name="name"
                          className={css(ss.formInput)}
                        />
                      </label>
                      <label className={css(ss.formLabel)}>
                        <span className={css(ss.formLabelText)}>Icon</span>
                        <input
                          type="string"
                          name="iconUrl"
                          className={css(ss.formInput)}
                        />
                      </label>
                      <input type="submit" value="+ Add" />
                    </If>
                  </fetcher.Form>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
};
