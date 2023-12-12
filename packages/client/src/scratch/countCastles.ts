import { signToSlope, Slope } from "./Slope";

/**
 * Count all of the "peaks" and "valleys" in the supplied landscape
 * profile.
 * @param profile
 * @returns
 */
export const countCastles = (profile: number[]) => {
  if (!profile.length) {
    return 0;
  }

  let result = 0;

  /**
   * Indicates the direction of travel last time height changed.
   */
  let lastVerticalDirection: number | null = null;
  /**
   * The height of the last-visited cell.
   */
  let lastHeight = profile[0];

  // visit each cell in the landscape (starting from the second
  // one), left to right
  for (let i = 1; i < profile.length; i++) {
    // get the current height
    const curHeight = profile[i];

    // compare the current height with previous height to determine
    // whether this cell is higher or lower than the previous
    // cell

    const curVerticalDirection = Math.sign(curHeight - lastHeight);

    if (curVerticalDirection === 0) {
      // we are continuing along an as-of-yet unidentified
      // type of plateau, so just keep going
      continue;
    }

    // any time the direction of vertical travel changes, we know
    // that we've found a peak or valley.
    if (curVerticalDirection !== lastVerticalDirection) {
      result++;
      lastVerticalDirection = curVerticalDirection;
    }
    // If the direction of travel hasn't changed, it a plateau
    // on the side of a hill/valley
    lastHeight = curHeight;
  }

  // the final peak/valley is not accounted for above, so we
  // add it here. This accounts for the plateau with a boundary
  // ending at profile[profile.length - 1]. Note this plateau
  // always exists, and has length: 1 <= length <= profile.length
  return result + 1;
};

export interface CastleAlgorithmFrame {
  col: number;
  curHeight: number;
  lastHeight: number;
  curVerticalDirection: Slope | undefined;
  lastVerticalDirection: Slope | undefined;
  curResult: number;
}

export const detailCountCastles = function* (
  profile: number[]
): Generator<CastleAlgorithmFrame, CastleAlgorithmFrame> {
  if (!profile.length) {
    return {
      col: -1,
      lastHeight: NaN,
      curHeight: NaN,
      curResult: 0,
      curVerticalDirection: undefined,
      lastVerticalDirection: undefined,
    };
  }

  yield {
    col: 0,
    curHeight: profile[0],
    curResult: 0,
    curVerticalDirection: undefined,
    lastVerticalDirection: undefined,
    lastHeight: NaN,
  };

  let result = 0;

  /**
   * Indicates the direction of travel last time height changed.
   */
  let lastVerticalDirection: number | undefined;
  /**
   * The height of the last-visited cell.
   */
  let lastHeight = profile[0];

  // visit each cell in the landscape (starting from the second
  // one), left to right
  for (let i = 1; i < profile.length; i++) {
    // get the current height
    const curHeight = profile[i];

    // compare the current height with previous height to determine
    // whether this cell is higher or lower than the previous
    // cell
    const curVerticalDirection = Math.sign(curHeight - lastHeight);

    if (curVerticalDirection === 0) {
      yield {
        col: i,
        curHeight,
        lastHeight,
        curVerticalDirection: signToSlope(curVerticalDirection),
        lastVerticalDirection:
          lastVerticalDirection === undefined
            ? lastVerticalDirection
            : signToSlope(lastVerticalDirection),
        curResult: result,
      };

      // we are continuing along an as-of-yet unidentified
      // type of plateau, so just keep going
      continue;
    }

    // any time the direction of vertical travel changes, we know
    // that we've found a peak or valley.
    if (curVerticalDirection !== lastVerticalDirection) {
      result++;
      yield {
        col: i,
        curHeight,
        lastHeight,
        curVerticalDirection: signToSlope(curVerticalDirection),
        lastVerticalDirection:
          lastVerticalDirection === undefined
            ? lastVerticalDirection
            : signToSlope(lastVerticalDirection),

        curResult: result,
      };
      lastVerticalDirection = curVerticalDirection;
    }
    // If the direction of travel hasn't changed, it a plateau
    // on the side of a hill/valley
    lastHeight = curHeight;
  }

  // the final peak/valley is not accounted for above, so we
  // add it here. This accounts for the plateau with a boundary
  // ending at profile[profile.length - 1]. Note this plateau
  // always exists, and has length: 1 <= length <= profile.length
  result = result + 1;

  return {
    col: profile.length,
    curHeight: NaN,
    lastHeight,
    curVerticalDirection: undefined,
    lastVerticalDirection: signToSlope(lastVerticalDirection ?? 0),
    curResult: result,
  };
};

// enum Direction {
//   Up,
//   Down,
// }

// // count all of the inflection points in the array
// export const findPlateaus = (profile: number[]): number => {
//   let direction: Direction | undefined;
//   let result: number = 1;
//   for (let i = 1; i < profile.length; i++) {
//     const lastHeight = profile[i - 1];
//     const curHeight = profile[i];
//     if (lastHeight === curHeight) {
//       continue;
//     }
//     const newDirection = lastHeight > curHeight ? Direction.Down : Direction.Up;
//     if (direction === undefined || newDirection !== direction) {
//       // this is an inflection point.
//       result++;
//       direction = newDirection;
//     }
//   }
//   return result;
// };
