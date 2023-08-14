import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Card,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { stylesheet } from "../../utils/emotion";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export const AboutPage: FC = () => {
  const faq = [
    [
      "How can I get an invite code?",
      `Invitations are limited to the Cloverse team for now. We'll be
      expanding the availability of the app to include additional closed
      species communities and members over the coming months!`,
    ],
    [
      "What is a species?",
      `A closed or open species is a collection of related fictional characters.
       Some creators may choose to create characters in a species and provide
       licenses to use these characters. Many creators host events for their
       creative community to engage with eachother and the species creator
       artistically!`,
    ],
    [
      "What data do you collect?",
      `We collect the information that you are asked directly to
        provide. Your personal information such as email addresses,
        usernames, and passwords are used only to fulfill the functionality
        of this system at your request as a user.`,
      `We will never share your information except as strictly necessary to comply
        with legal requirements as well as provide system functionality at your request.
        An example of a situation where we may share your data is that we are required
        to send your email address in the "To" field when we send emails via our email
        provider service when you request a password reset. We will keep these disclosures
        as limited as possible.`,
      `We may collect analytics, device, and usage data to ensure the quality and reliability
        of the site, as well as determine what features people do and don't use. This
        information will be handled securely, but will likely be shared with a 3rd
        party provider such as Google Analytics.`,
      `You may request your data at any time, or ask for it to be removed. Just contact us.`,
    ],
  ];
  return (
    <>
      <Card css={ss.root}>
        <CardHeader title="About Cloverse Species" />
        <CardContent>
          <Typography variant="body1" css={ss.answerParagraph}>
            The cloverse species app is a place for Species creators to connect
            with their community. Manage your rarities, characters, and their
            traits, track and approve ownership changes, and design new species
            all in one handy spot.
          </Typography>
          <Typography variant="body1">
            This site is in an invite-only phase for Cloverse species right now,
            but it is being built with others in mind as well. If you're a
            species creator interested in learning more, please reach out.
          </Typography>
        </CardContent>
      </Card>
      <Card css={ss.root}>
        <CardHeader title="FAQ" />
        <CardContent>
          {faq.map(([q, ...p]) => (
            <Accordion key={q} disableGutters css={ss.accordion}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h5">{q}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                {p.map((p) => (
                  <Typography variant="body1" css={ss.answerParagraph}>
                    {p}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </CardContent>
      </Card>
    </>
  );
};

const ss = stylesheet({
  root: (theme) => ({
    margin: theme.spacing(2),
  }),
  answerParagraph: (theme) => ({ marginBottom: theme.spacing(2) }),
  accordion: (theme) => ({
    "& .MuiAccordionSummary-content.Mui-expanded": {
      color: theme.palette.text.primary,
    },
    "& .MuiAccordionSummary-content": {
      color: theme.palette.text.secondary,
    },
  }),
});
