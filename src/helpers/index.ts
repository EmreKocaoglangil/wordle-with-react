import type { wordType } from "@/components/Game";

const handleResult = (wordArray: wordType[]) => {
  const answerArray = "elmas".split("").map((l) => l.toLocaleUpperCase("tr"));

  const correctElements = wordArray.map((el, i) => {
    const { letter } = el;
    if (letter === answerArray[i]) {
      answerArray.splice(i, 1, "");

      return {
        letter,
        priority: 2,
        state: "correct",
      };
    }
    return {
      letter,
      state: "absent",
      priority: 0,
    };
  });

  const presentElements = wordArray.map((el) => {
    const { letter } = el;
    if (answerArray.includes(letter)) {
      return {
        letter,
        state: "present",
        priority: 1,
      };
    }
    return {
      letter,
      state: "absent",
      priority: 0,
    };
  });

  const elements = correctElements.map((el, index) => {
    if (el.priority > presentElements[index].priority) {
      return el;
    }
    return presentElements[index];
  });
  return elements;
};

const testTurkishLetter = (inputText: string) => {
  if (inputText.length > 1) return false;
  if (inputText === "X" || inputText === "Q" || inputText === "W") return false;
  // eslint-disable-next-line prefer-regex-literals
  const regex = new RegExp("[a-zçğıüöş]+", "gi");
  return regex.test(inputText);
};

const whiteSpaceConverter = (size: number) =>
  new Array(size).fill(" ").join("");

export { handleResult, testTurkishLetter, whiteSpaceConverter };
