// Objects to store numeric values and decimal houses
const units = {
  0: "zero",
  1: "one",
  2: "two",
  3: "three",
  4: "four",
  5: "five",
  6: "six",
  7: "seven",
  8: "eight",
  9: "nine"
}

const tens = {
  10: "ten",
  11: "eleven",
  12: "twelve",
  13: "thirteen",
  14: "fourteen",
  15: "fifteen",
  16: "sixteen",
  17: "seventeen",
  18: "eighteen",
  19: "nineteen"
}

const prefixes = {
  2: "twenty",
  3: "thirty",
  4: "forty",
  5: "fifty",
  6: "sixty",
  7: "seventy",
  8: "eighty",
  9: "ninety"
}

const suffixes = {
  1: "",
  2: "thousand ",
  3: "million ",
  4: "billion ",
  5: "trillion"
}

let button = document.getElementById("button");

// The maximum limit for the input currently set to 1 trillion
let numLimit =  1000000000000;

// The text result of the amount
let numText = "";

/**
 * Collects the input, call the convert function and renders the output
 */
callConvert = () => {
  numText = "";
  let num = document.getElementById("numInput").value;
  let output = document.getElementById("numOutput");
  let convertedNum = convertNum(num);
  let currency = convertedNum === "one" ? "dollar" : "dollars"

  output.innerHTML = `Converted Amount: ${convertedNum} ${currency}`;
};

/**
 * Analyzes the input and call the appropriate converter
 */
convertNum = (num) => {
  const absNum = Math.abs(num);

  try {
    if (num > numLimit) throw `Amount exceeds the limit. Must be below or equal than ${numLimit}`;
  } catch (error) {
    alert(error);
    return "Error trying to convert";
  }

  if (absNum in units) {
    numText += units[absNum];
  } else if (absNum < 100) {
    numText += unitAndDozenConverter(absNum);
  } else {
    const numArray = splitAmount(absNum);

    let count = numArray.length;

    for (i = 0; i < numArray.length; i++) {
      if (numArray[i][0] !== "000") {
        if (numArray[i][0].length === 3) {
          numText += hundredsConverter(parseInt(numArray[i]));
          numText += ` ${suffixes[count]}`;
        } else {
          numText += unitAndDozenConverter(parseInt(numArray[i]));
          numText += ` ${suffixes[count]}`;
        }
        count--;
      } else {
        count --;
      }
    }
  }

  return numText
}

/**
 * Convert three digit amounts
 */
hundredsConverter = (num) => {
  let amountText = "";

  if (num === 0)
    return "";

  if (num < 100) {
    amountText += unitAndDozenConverter(num);
    return amountText;
  }

  amountText += units[num.toString().charAt(0)];
  amountText += " hundred ";

  if (num.toString().substr(1) !== "00") {
    amountText += unitAndDozenConverter(parseInt(num.toString().substr(1)));
  }

  return amountText;
}

/**
 * Convert one or two digit amounts
 */
unitAndDozenConverter = (num) => {
  let amountText = "";
  
  if (num < 10) {
    return units[num];
  }

  if (num in tens) {
    amountText += tens[num];
  } else {
    amountText += prefixes[num.toString().charAt(0)];

    if (num.toString().charAt(1) !== "0") {
      amountText += "-" + units[num.toString().charAt(1)];
    }
  }
  return amountText;
}

/**
 * Splits the amount into arrays of three digits less
 */ 
splitAmount = (num) => {
  let numArray = [];
  const numString = num.toString();
  let count = 0;
  let tempArray = [];
  let singleDigits = numString.split("");

  let digits = singleDigits.length;
  for (i = digits - 1; i >= 0; i--) {
    tempArray[0] = singleDigits[i] + tempArray[0];
    count++;

    tempArray[0] = tempArray[0].replace("undefined", "");

    if (count % 3 === 0) {
      numArray.unshift(tempArray);
      tempArray = [];
    }
  }


  if (tempArray.length !== 0) {
    numArray.unshift(tempArray);
  }

  return numArray;
}

module.exports = convertNum
