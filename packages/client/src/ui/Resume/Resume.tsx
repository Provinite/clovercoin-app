import { Box, Divider, Link, Stack, Typography } from "@mui/material";
import { ComponentProps, FC } from "react";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import GitHubIcon from "@mui/icons-material/GitHub";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Interpolation, Theme } from "@emotion/react";
import AbxLogo from "./icons/akitabox.jpg";
import NdusCtsLogo from "./icons/ndus-cts.png";
import UndLogo from "./icons/und.png";
import StackOverflowLogo from "./icons/stackoverflow.png";
import TotLogo from "./icons/tot.png";
import PrideBear from "./icons/pridebear.png";
import { stylesheet } from "../../utils/emotion";
// ==========================================================
// =                                                        =
// =             Config                                     =
// =                                                        =
// ==========================================================
const jobs: ComponentProps<typeof ExperienceItem>[] = [
  {
    title: "Staff Software Engineer",
    companyName: "Polco",
    description: `Designed and built cloud infrastructure for a web application
    offering unprecedented access to local government for millions of residents 
    across the US and internationally. Coordinated projects across 4 engineering teams,
    consulting on technical design and implementation strategies. Created and maintained
    a pipeline of tech debt, performance, and security driven tasks supporting the
    existant and upcoming needs for all of the engineering teams. Mentor and sponsor 
    engineers to facilitate growth opportunities.
    
    Introduced feature flags, a solution that allowed us to fully decouple deployment
    and release of features. Combined with improvements to our CI/CD process, doubled
    our deployment frequency, with a roadmap in place to achieve fully automated deployments
    and promotions.

    Containerized multiple legacy PHP & Node applications to resolve reliability and scaling
    limitations, and bring their performance in-line with SLAs.

    Optimized existing AWS infrastructure, reducing costs by 30%. Proposed and architected
    a migration of heroku infrastructure to comparable AWS solution with an expected
    cost reduction of 60%.`,
    startDate: new Date("2023-06-15"),
    endDate: new Date("2023-11-28"),
    tags: [
      "graphql",
      "react",
      "hashicorp terraform",
      "aws-ecs",
      "heroku",
      "postgresql",
      "social media",
      "node.js",
      "docker",
      "process engineering",
    ],
    icon: AbxLogo,
  },
  {
    title: "Principal Software Engineer",
    companyName: "AkitaBox",
    description: `Work with stakeholders across the business to plan and prioritize
    engineering efforts. Led the day-to-day work of a team of 5 engineers.
    Identified and resolved technical onboarding roadblocks while integrating a 
    large team of offshore contractors, reducing initial time to contribution from 
    5-10 days to less than 1. Overhauled development experience, build processes,
    and frontend framework to improve efficiency of new team members with more
    modern experience.`,
    startDate: new Date("2021-12-15"),
    endDate: new Date("2023-05-15"),
    icon: AbxLogo,
    tags: [
      "hashicorp terraform",
      "devops",
      "react",
      "mongodb",
      "aws",
      "node.js",
      "typescript",
      "javascript",
      "express",
    ],
  },
  {
    title: "Senior Software Engineer",
    companyName: "AkitaBox",
    description: `Perform high-level technical design and planning. Research, prototype, and present technologies for novel projects. Mentor and
    train new employees. Full-stack engineering position.
    
    Led efforts to improve code quality and testing practices throughout the codebase,
    reducing the amount of manual testing significantly and enabling a full ci/cd pipeline
    to deploy multiple times per day. Our ability to preempt and respond to quality issues within
    as little as 90 minutes was a key factor in maintaining the company's <1% churn rate.`,
    startDate: new Date("2018-04-15"),
    endDate: new Date("2021-12-15"),
    icon: AbxLogo,
    tags: [
      "react",
      "mongodb",
      "node.js",
      "aws",
      "typescript",
      "javascript",
      "express",
    ],
  },
  {
    title: "Lead Web Applications Developer",
    companyName: "North Dakota University System - Core Technology Services",
    startDate: new Date("2015-04-15"),
    endDate: new Date("2018-04-15"),
    icon: NdusCtsLogo,
    tags: [
      "java",
      "coldfusion",
      "angularjs",
      "node.js",
      "spring",
      "apache",
      "redhat",
      "mysql",
      "oracle",
      "php",
      "python",
    ],
    description: `Oversee a team of web developers to develop and maintain custom solutions for the eleven North Dakota state higher
    educational institutions. Prioritize, plan, and manage projects from initial information gathering through completion. Reduced engineering
    hours spent on manual data processes and maintenance from 2 FTEs to 0 over my first 6 months.`,
  },
  {
    title: "Web Application Developer",
    companyName:
      "University of North Dakota - Student Affairs Technology Services",
    startDate: new Date("2013-02-15"),
    endDate: new Date("2015-04-15"),
    tags: ["php", "mysql", "ms-access", "python", "django"],
    description: `Provide custom web development services for the Student Affairs division. Mentor and oversee student web development staff.
    Re-engineer legacy applications into fully featured web accessible services.
    Configure and maintain web and database servers in Linux and Windows environments`,
    icon: UndLogo,
  },
  {
    title: "Various",
    companyName: "Freelance Consulting",
    startDate: new Date("2005-04-15"),
    endDate: "Present",
    description: `I've been working with local organizations everywhere I've lived for the last
    18 years.
    Creating marketing websites for small businesses, volunteer on-site IT work for 
    charity organizations, and building custom web-based solutions for complex
    processes such as used commercial vehicle sales and inventory management.`,
    tags: ["php", "discord", "node.js", "aws", "react", "mysql", "postgresql"],
    icon: PrideBear,
  },
];

const stackOverflowPercentiles: ComponentProps<typeof PercentileItem>[] = [
  {
    percentile: 5,
    tags: ["javascript", "java"],
  },
  {
    percentile: 10,
    tags: ["typescript", "html", "php", "arrays"],
  },
  {
    percentile: 15,
    tags: ["css", "mysql"],
  },
];

const preferredTechnologies = [
  "web",
  "typescript",
  "reactjs",
  "node.js",
  "graphql",
  "aws",
];

const degrees: ComponentProps<typeof EducationItem>[] = [
  {
    degree: "B.S. Mathematics (Unfinished)",
    icon: UndLogo,
    institution: "University of North Dakota",
    tags: [
      "math",
      "discrete-mathematics",
      "number-theory",
      "encryption",
      "information-theory",
    ],
    yearStart: "2010",
    yearEnd: "2014",
  },
  {
    degree: "B.S. Computer Science (Unfinished)",
    icon: UndLogo,
    institution: "University of North Dakota",
    tags: [
      "algorithms",
      "data-structures",
      "database-design",
      "computer-science",
    ],
    yearStart: "2010",
    yearEnd: "2014",
  },
];

const achievements: ComponentProps<typeof AchievementItem>[] = [
  {
    date: new Date("2021-08-15"),
    icon: TotLogo,
    tags: [
      "discord",
      "postgresql",
      "aws-rds",
      "aws-cdk",
      "aws-lambda",
      "aws-sqs",
      "aws-xray",
    ],
    title: "CloverCoin Designs 2021 Halloween Trick or Treat (Discord Bot)",
    url: "https://github.com/provinite/halloween-discord",
    description: `Discord bot for running free giveaway events in the CloverCoin community server. Serverless CDK construct with postgresql
    backing. Allows community members to "knock" several times per day, each time having a chance to win a prize from the pool. Safely
    and efficiently handles thousands of concurrent users. Utilizes a queueing system to ensure exactly-once non-blocking delivery of each prize
    in the pool.
    `,
  },
  {
    date: new Date("2020-08-15"),
    icon: AbxLogo,
    tags: ["reactjs", "typescript", "javascript", "node.js", "mongodb"],
    title: "AkitaBox Inspections",
    url: "https://home.akitabox.com/software/akitabox-inspections/",
    description: `Lead technical design of robust facilities inspections tracking and auditing software, as well as implementation with a team of 8 engineers.`,
  },
  {
    date: new Date("2018-10-15"),
    icon: AbxLogo,
    tags: ["paperjs", "angularjs", "d3.js", "express", "node.js", "mongodb"],
    description:
      "Implemented location-based asset management software at AkitaBox.",
    title: "AkitaBox PlanView",
    url: "https://home.akitabox.com/software/akitabox-platform/#asset-management",
  },
];

const introStatement = `I am a quality-focused and team-oriented engineer with
16 years of experience in professional fullstack web application development. I
enjoy building products that really help people, and improving the processes and
tools that get those products built. An ideal day for me includes teaching something
and learning something. Javascript expert &amp; Typescript fanatic.`;

const name = "Collin Driscoll";
const pronouns = "he/him";
const title = "Software Engineer";
const contacts: ComponentProps<typeof ContactLine>[] = [
  {
    icon: MailOutlineIcon,
    text: "Collin.R.Driscoll@gmail.com",
  },
  {
    icon: GitHubIcon,
    text: "github.com/provinite",
  },
  {
    icon: LocationOnIcon,
    text: "458 S Midvale Blvd Madison, WI 53711",
  },
];

// ==========================================================
// =                                                        =
// =             /Config                                    =
// =                                                        =
// ==========================================================

export const Resume: FC = () => (
  <Box
    css={{
      marginTop: "2rem",
      marginLeft: "4rem",
      marginRight: "4rem",
      marginBottom: "4rem",
      width: "1000px",
    }}
  >
    <Stack direction="row" justifyContent="space-between">
      <Stack spacing={1}>
        <Typography variant="h4">{name}</Typography>
        <Typography variant="body1">{pronouns}</Typography>
        <Typography variant="body1" css={{ fontSize: "1.2rem" }}>
          {title}
        </Typography>
        {contacts.map((contact) => (
          <ContactLine {...contact} />
        ))}
      </Stack>
      <img
        css={{ width: "100px", height: "100px", borderRadius: "16px" }}
        src={PrideBear}
      />
    </Stack>

    <SectionHeader text="intro statement" />
    <Typography variant="body1" css={{ fontSize: "1.2rem" }}>
      {introStatement}
    </Typography>

    <SectionHeader text="technologies" />
    <Stack justifyContent="space-evenly" direction="row">
      <Stack spacing={2}>
        <Typography variant="h5">Preferred Technologies</Typography>
        <Stack direction="row" spacing={1}>
          {preferredTechnologies.map((technology) => (
            <Chip label={technology} />
          ))}
        </Stack>
      </Stack>
      <Stack spacing={2}>
        <Typography variant="h5">StackOverflow Contributions</Typography>
        <Stack spacing={2}>
          {stackOverflowPercentiles.map((props) => (
            <PercentileItem {...props} />
          ))}
        </Stack>
      </Stack>
    </Stack>

    <SectionHeader text="experience" />
    <Stack spacing={4}>
      {jobs.map((job) => (
        <ExperienceItem {...job} />
      ))}
    </Stack>

    <SectionHeader text="education" />
    <Stack spacing={4}>
      {degrees.map((degree) => (
        <EducationItem {...degree} />
      ))}
    </Stack>

    <SectionHeader text={"Apps & Software"} />
    <Stack spacing={4}>
      {achievements.map((achievement) => (
        <AchievementItem {...achievement} />
      ))}
    </Stack>
  </Box>
);

const ContactLine: FC<{
  icon: FC<{ css?: Interpolation<Theme> }>;
  text: string;
}> = ({ icon: Icon, text }) => (
  <Stack direction="row" spacing={0.5}>
    <Icon css={{ color: "#858c94" }} />
    <Typography variant="body1" css={{ color: "#37373a", fontSize: "1.1rem" }}>
      {text}
    </Typography>
  </Stack>
);

const SectionHeader: FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => (
  <>
    <Divider
      css={(theme) => ({
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4),
      })}
      className={className}
      textAlign="left"
    >
      <Typography variant="overline" fontWeight="bold" fontSize="1rem">
        {text}
      </Typography>
    </Divider>
  </>
);

const ExperienceItem: FC<{
  title: string;
  companyName: string;
  tags: string[];
  startDate: Date;
  endDate: Date | "Present";
  description: string | JSX.Element;
  icon: string;
}> = ({ title, companyName, tags, startDate, endDate, description, icon }) => {
  const formatDate = (date: Date) =>
    date.toLocaleDateString("en-us", {
      month: "short",
      year: "numeric",
    });

  const formatDiff = (startDate: Date, endDate: Date) => {
    const pluralize = (num: number, str: string) =>
      `${num} ${num === 1 ? str : `${str}s`}`;

    let yearDiff = endDate.getFullYear() - startDate.getFullYear();
    let monthDiff = endDate.getMonth() - startDate.getMonth();

    if (monthDiff < 0) {
      monthDiff += 12;
      yearDiff -= 1;
    }

    let result = "";
    if (yearDiff) {
      result += pluralize(yearDiff, `year`);
    }
    if (monthDiff) {
      if (result) {
        result += ", ";
      }
      result += pluralize(monthDiff, "month");
    }

    return result;
  };

  const isCurrent = endDate === "Present";

  return (
    <Stack direction="row" spacing={4}>
      <img src={icon} css={ss.icon} />
      <Stack direction="column" spacing={1}>
        <Box>
          <Typography variant="h6">{title}</Typography>
          <Typography css={ss.itemSubHeading}>{companyName}</Typography>
        </Box>
        <Typography variant="body1">
          {formatDate(startDate)} &rarr;{" "}
          {isCurrent ? "Present" : formatDate(endDate)} (
          {formatDiff(startDate, isCurrent ? new Date() : endDate)})
        </Typography>
        <Stack direction="row" spacing={1}>
          {tags.map((tag) => (
            <Chip label={tag} />
          ))}
        </Stack>
        <Typography>{description}</Typography>
      </Stack>
    </Stack>
  );
};

const EducationItem: FC<{
  degree: string;
  institution: string;
  yearStart: string;
  yearEnd: string;
  tags: string[];
  icon: string;
}> = ({ icon, degree, institution, yearStart, yearEnd, tags }) => (
  <Stack direction="row" spacing={4}>
    <img src={icon} css={ss.icon} />
    <Stack direction="column" spacing={1}>
      <Typography variant="h6">{degree}</Typography>
      <Typography css={ss.itemSubHeading}>{institution}</Typography>
      <Typography variant="body1">
        {yearStart} &rarr; {yearEnd}
      </Typography>
      <Stack direction="row" spacing={1}>
        {tags.map((tag) => (
          <Chip label={tag} />
        ))}
      </Stack>
    </Stack>
  </Stack>
);

const PercentileItem: FC<{ percentile: number; tags: string[] }> = ({
  percentile,
  tags,
}) => (
  <Stack direction="row" spacing={0.5}>
    <img src={StackOverflowLogo} css={{ width: "2rem", height: "2rem" }} />{" "}
    <Typography variant="body1" css={{ width: "72px", fontWeight: "bold" }}>
      Top {percentile}%
    </Typography>
    <Stack direction="row" spacing={1}>
      {tags.map((tag) => (
        <Chip label={tag} />
      ))}
    </Stack>
  </Stack>
);

const AchievementItem: FC<{
  icon: string;
  title: string;
  date: Date;
  tags: string[];
  url: string;
  description: string;
}> = ({ icon, title, date, tags, url, description }) => (
  <Stack direction="row" spacing={4}>
    <img css={ss.icon} src={icon} />
    <Stack direction="column" spacing={1}>
      <Typography variant="h6">{title}</Typography>
      <Typography variant="body1">
        {date.toLocaleDateString("en-us", { month: "short", year: "numeric" })}{" "}
        -{" "}
        <Link
          css={{ textDecoration: "none", fontStyle: "italic" }}
          href={url}
          target="_blank"
        >
          {url}
        </Link>
      </Typography>
      <Stack direction="row" spacing={1}>
        {tags.forEach((tag) => (
          <Chip label={tag} />
        ))}
      </Stack>
      <Typography>{description}</Typography>
    </Stack>
  </Stack>
);

const Chip: FC<{ label: string }> = ({ label }) => (
  <Typography
    variant="caption"
    css={{ color: "#6e89b1", fontSize: "1rem", fontWeight: 500 }}
  >
    {label}
  </Typography>
);

const ss = stylesheet({
  icon: {
    maxWidth: "4rem",
    maxHeight: "4rem",
    objectFit: "contain",
  },
  itemSubHeading: {
    fontSize: "1.25rem",
  },
});
