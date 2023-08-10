import { Community, Critter, Species } from "@clovercoin/api-client";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  Grid,
  Typography,
} from "@mui/material";
import { FC, useEffect, useMemo, useState } from "react";
import { AppRoutes } from "../../AppRoutes";
import { GridRow } from "../../lib/GridRow";
import { Link } from "../../Link/Link";
import { EditButton } from "../../EditButton/EditButton";
import { useInView } from "react-intersection-observer";
import { DeepPick } from "../../../typing/types";
export interface CritterListCardProps extends CardProps {
  species: Pick<Species, "name" | "id">;
  community: Pick<Community, "id">;
  critters: DeepPick<Critter, "id" | "name" | "traitList.name">[];
}

// TODO:
// PERF: Performance here suffers badly for large lists. Need to create
// a real virtual scroll (with buffers on both sides, not just this lazy
// loading)
export const CritterListCard: FC<CritterListCardProps> = ({
  species,
  community,
  critters,
  ...props
}) => {
  const { ref: lastElementRef, inView: lastElementInView } = useInView();
  useEffect(() => {
    lastElementInView &&
      setCrittersToDisplay((crittersToDisplay) => [
        ...crittersToDisplay,
        ...critters.slice(
          crittersToDisplay.length,
          crittersToDisplay.length + 25
        ),
      ]);
  }, [lastElementInView]);
  const [crittersToDisplay, setCrittersToDisplay] = useState<
    CritterListCardProps["critters"]
  >(() => critters.slice(0, 50));

  const rows = useMemo(
    () =>
      crittersToDisplay.map((critter, i) => (
        <GridRow
          key={critter.id}
          ref={i === crittersToDisplay.length - 1 ? lastElementRef : undefined}
          xs={[6, 4, 2]}
        >
          <Typography p={2} variant="body1">
            {critter.name}
          </Typography>
          <Typography p={2} variant="body1">
            {critter.traitList.name}
          </Typography>
          <EditButton
            to={AppRoutes.critterDetail(community.id, species.id, critter.id)}
          />
        </GridRow>
      )),
    [crittersToDisplay]
  );
  return (
    <Card {...props}>
      <CardHeader
        title={`${species.name} Critter List`}
        action={
          <Link to={AppRoutes.addCritter(community.id, species.id)}>
            <Button variant="contained">Add One</Button>
          </Link>
        }
        subheader={`Find specific ${species.name} here`}
      />
      <CardContent>
        <Grid container component={Box}>
          <GridRow xs={[6, 6]}>
            <Typography p={1} variant="body1">
              Name
            </Typography>
            <Typography p={2} variant="body1">
              Variant
            </Typography>
          </GridRow>
          {...rows}
        </Grid>
      </CardContent>
    </Card>
  );
};

// const CrittersListRow: FC<{
//   critter: Pick<Critter, "id" | "name">;
//   community: Pick<Community, "id">;
//   species: Pick<Species, "id">;
//   onEnterView: () => void;
// }> = ({ critter, community, species, onEnterView }) => {
//   const { ref, inView } = useInView();
//   const onEnterViewRef = useRef(onEnterView);
//   useEffect(() => {}, [onEnterView]);
//   useEffect(() => {
//     if (inView) {
//       onEnterView();
//     }
//   }, [inView]);
//   return (
//     <GridRow ref={ref} key={critter.id} xs={[10, 2]}>
//       <Typography p={2} variant="body1">
//         {critter.name}
//       </Typography>
//       <EditButton
//         to={AppRoutes.critterDetail(community.id, species.id, critter.id)}
//       />
//     </GridRow>
//   );
// };
