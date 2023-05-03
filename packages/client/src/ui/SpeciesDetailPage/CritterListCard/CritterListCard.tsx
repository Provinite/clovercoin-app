import { Community, Species } from "@clovercoin/api-client";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardProps,
  List,
  ListItem,
} from "@mui/material";
import { FC } from "react";
import { appRoute, AppRoutes } from "../../AppRoutes";
import { Link } from "../../Link/Link";

export interface CritterListCardProps extends CardProps {
  species: Pick<Species, "name" | "id">;
  community: Pick<Community, "id">;
}

export const CritterListCard: FC<CritterListCardProps> = ({
  species,
  community,
  ...props
}) => {
  appRoute("root.community.species.trait-add");

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
        <List>
          <ListItem>This is where a species list would go</ListItem>
        </List>
      </CardContent>
    </Card>
  );
};
