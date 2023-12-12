import { Button, Stack } from "@mui/material";
import { useState } from "react";
import {
  CastleAlgorithmFrame,
  countCastles,
  detailCountCastles,
} from "./countCastles";
import { generatorToArray } from "./generatorToArray";
import { Landscape } from "./Landscape";
import { Marker } from "./Marker";
import { Slope } from "./Slope";
import { TravelledMarker } from "./TravelledMarker";

export const Castles = () => {
  const min = -5;
  const max = 10;
  const width = 20;

  const [profile, setProfile] = useState<number[]>(() =>
    Array(width)
      .fill(null)
      .map(() => rand(0, 3))
      .map((v, i, arr) => (i % 2 === 1 ? arr[i - 1] : v))
  );

  const getLeftSlope = (i: number): Slope => {
    if (i === 0) {
      return Slope.Flat;
    }
    const diff = profile[i] - profile[i - 1];
    if (diff > 0) {
      return Slope.Up;
    } else if (diff < 0) {
      return Slope.Down;
    }
    return Slope.Flat;
  };

  const getRightSlope = (i: number): Slope => {
    if (i === profile.length - 1) {
      return Slope.Flat;
    }
    const diff = profile[i + 1] - profile[i];
    if (diff > 0) {
      return Slope.Up;
    } else if (diff < 0) {
      return Slope.Down;
    }
    return Slope.Flat;
  };

  const [progress, setProgress] = useState(0);
  const [info, setInfo] = useState<CastleAlgorithmFrame[]>([]);

  const curInfo = info[progress];

  return (
    <>
      <code>
        <pre>
          profile: [
          {profile
            .map((v) => (v >= 0 ? `+${v}` : `${v}`))
            .map((v) => padLeft(v, 3, " "))
            .join(", ")}
          ]
        </pre>
        <pre>solution: {countCastles(profile)}</pre>
      </code>
      <Button
        variant="contained"
        color="primary"
        css={{ width: "200px" }}
        onClick={() => {
          const detail = detailCountCastles(profile);
          setInfo(generatorToArray(detail));
          setProgress(0);
        }}
      >
        Show Solution
      </Button>
      <Button
        variant="contained"
        color="secondary"
        css={{ width: "200px" }}
        onClick={() => {
          setProgress((p) => p + 1);
        }}
      >
        &rarr;
      </Button>
      {curInfo && (
        <Stack direction="row">
          <ul>
            <li>Column:</li>
            <li>Height:</li>
            <li>Prev. Height:</li>
            <li>Result:</li>
            <li>Prev Direction:</li>
            <li>Cur Direction:</li>
          </ul>
          <ul>
            <li>{curInfo.col}</li>
            <li>{curInfo.curHeight}</li>
            <li>{curInfo.lastHeight}</li>
            <li>{curInfo.curResult}</li>
            <li>{slopeName(curInfo.lastVerticalDirection)}</li>
            <li>{slopeName(curInfo.curVerticalDirection)}</li>
          </ul>
        </Stack>
      )}
      <Landscape
        max={max}
        min={min}
        profile={profile}
        width={width}
        setProfile={(col, height) => {
          setProfile((profile) => {
            profile = [...profile];
            profile[col] = height;
            return profile;
          });
        }}
        renderCellContents={(col, height, landscapeHeight) => (
          <>
            {(height < landscapeHeight || height > landscapeHeight + 2) &&
              col === progress && <Marker />}
            {col <= progress && (
              <>
                {height === landscapeHeight + 1 && (
                  <>
                    <TravelledMarker slope={getLeftSlope(col)} />
                    <TravelledMarker slope={getRightSlope(col)} />
                  </>
                )}
                {height === landscapeHeight && (
                  <div css={{ width: "100%", textAlign: "center" }}>
                    {landscapeHeight}
                  </div>
                )}
              </>
            )}
          </>
        )}
      />
    </>
  );
};

const padLeft = (str: string, len: number, fill: string) =>
  str.length >= len ? str : `${fill.repeat(len - str.length)}${str}`;

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function slopeName(slope?: Slope) {
  if (slope !== undefined) {
    return Slope[slope];
  }
  return "Unknown";
}
