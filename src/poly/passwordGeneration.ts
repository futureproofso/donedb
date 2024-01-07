const DefaultOptions = {
  length: 14,
  minLength: 5,
  ambiguous: false,
  number: true,
  minNumber: 1,
  uppercase: true,
  minUppercase: 0,
  lowercase: true,
  minLowercase: 0,
  special: false,
  minSpecial: 1,
  type: "password",
  numWords: 3,
  wordSeparator: "-",
  capitalize: false,
  includeNumber: false,
};

/** Ensures internal options consistency.
 *  @param options The options to cascade. These options are not altered.
 *  @returns A new password generation request with cascade applied.
 *  @remarks  This method fills null and undefined values by looking at
 *  pairs of flags and values (e.g. `number` and `minNumber`). If the flag
 *  and value are inconsistent, the flag cascades to the value.
 */
function sanitize(options: any): any {
  function cascade(enabled: boolean, value: number): [boolean, number] {
    const enabledResult = enabled ?? value > 0;
    const valueResult = enabledResult ? value || 1 : 0;

    return [enabledResult, valueResult];
  }

  const boundaryLength = Object.freeze({
    min: 5,
    max: 128,
  });

  const [lowercase, minLowercase] = cascade(
    options.lowercase,
    options.minLowercase,
  );
  const [uppercase, minUppercase] = cascade(
    options.uppercase,
    options.minUppercase,
  );
  const [number, minNumber] = cascade(options.number, options.minNumber);
  const [special, minSpecial] = cascade(options.special, options.minSpecial);

  // minimums can only increase the length
  const minConsistentLength =
    minLowercase + minUppercase + minNumber + minSpecial;
  const minLength = Math.max(minConsistentLength, boundaryLength.min);
  const length = Math.max(options.length ?? minLength, minLength);

  return {
    ...options,
    length,
    minLength,
    lowercase,
    minLowercase,
    uppercase,
    minUppercase,
    number,
    minNumber,
    special,
    minSpecial,
  };
}

export class PasswordGenerationService {
  _getRandomValues: any;


  constructor(getRandomValues: any) {
    this._getRandomValues = getRandomValues;
  }

  generatePassword(): string {
    const o = sanitize({ ...DefaultOptions });

    const positions: string[] = [];
    if (o.lowercase && o.minLowercase > 0) {
      for (let i = 0; i < o.minLowercase; i++) {
        positions.push("l");
      }
    }
    if (o.uppercase && o.minUppercase > 0) {
      for (let i = 0; i < o.minUppercase; i++) {
        positions.push("u");
      }
    }
    if (o.number && o.minNumber > 0) {
      for (let i = 0; i < o.minNumber; i++) {
        positions.push("n");
      }
    }
    if (o.special && o.minSpecial > 0) {
      for (let i = 0; i < o.minSpecial; i++) {
        positions.push("s");
      }
    }
    while (positions.length < o.length) {
      positions.push("a");
    }

    // shuffle
    this.shuffleArray(positions);

    // build out the char sets
    let allCharSet = "";

    let lowercaseCharSet = "abcdefghijkmnopqrstuvwxyz";
    if (o.ambiguous) {
      lowercaseCharSet += "l";
    }
    if (o.lowercase) {
      allCharSet += lowercaseCharSet;
    }

    let uppercaseCharSet = "ABCDEFGHJKLMNPQRSTUVWXYZ";
    if (o.ambiguous) {
      uppercaseCharSet += "IO";
    }
    if (o.uppercase) {
      allCharSet += uppercaseCharSet;
    }

    let numberCharSet = "23456789";
    if (o.ambiguous) {
      numberCharSet += "01";
    }
    if (o.number) {
      allCharSet += numberCharSet;
    }

    const specialCharSet = "!@#$%^&*";
    if (o.special) {
      allCharSet += specialCharSet;
    }

    let password = "";
    for (let i = 0; i < o.length; i++) {
      let positionChars: string = "";
      switch (positions[i]) {
        case "l":
          positionChars = lowercaseCharSet;
          break;
        case "u":
          positionChars = uppercaseCharSet;
          break;
        case "n":
          positionChars = numberCharSet;
          break;
        case "s":
          positionChars = specialCharSet;
          break;
        case "a":
          positionChars = allCharSet;
          break;
        default:
          break;
      }

      const randomCharIndex = this.randomNumber(0, positionChars.length - 1);
      password += positionChars.charAt(randomCharIndex);
    }

    return password;
  }

  private randomNumber(min: number, max: number) {
    const randomBuffer = new Uint32Array(1);
    this._getRandomValues(randomBuffer);
    
    let randomNumber = randomBuffer[0] / (0xffffffff + 1);

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(randomNumber * (max - min + 1)) + min;
  }

  // ref: https://stackoverflow.com/a/12646864/1090359
  private shuffleArray(array: string[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = this.randomNumber(0, i);
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
