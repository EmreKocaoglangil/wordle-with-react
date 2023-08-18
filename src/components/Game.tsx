/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { handleResult, testTurkishLetter } from "@/helpers";

export interface wordType {
  letter: string;
  state: string | null;
}

type AnimationType = "shake" | "rotate";

function handleAnimation(col: number, row: number, animation: AnimationType) {
  const cells = document.querySelectorAll(`div#row-${row} > span`);
  if (animation === "shake") {
    const currentCell = cells[col];
    currentCell.classList.add("animate-shake");
    currentCell.addEventListener("animationend", () => {
      currentCell.classList.remove("animate-shake");
    });
  }
  if (animation === "rotate") {
    cells.forEach((cell, index) => {
      setTimeout(() => cell.classList.add("animate-rotate"), 100 * index);
    });
  }
}

function Game() {
  const [word, setWord] = useState<wordType[][]>([
    [
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
    ],
    [
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
    ],
    [
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
    ],
    [
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
    ],
    [
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
    ],
    [
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
      {
        letter: "",
        state: null,
      },
    ],
  ]);

  const [pos, setPos] = useState({
    currentCol: 0,
    currentRow: 0,
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // delete
      if (e.key === "Backspace") {
        setWord(
          word.map((row, rowIndex) => {
            if (rowIndex === pos.currentRow) {
              return row.map((col, colIndex) => {
                if (colIndex === pos.currentCol - 1) {
                  col.letter = "";
                  handleAnimation(colIndex, rowIndex, "shake");
                }
                return col;
              });
            }
            return row;
          })
        );
        setPos({
          ...pos,
          currentCol: pos.currentCol > 0 ? pos.currentCol - 1 : 0,
        });
        // check the result
      } else if (
        e.key === "Enter" &&
        pos.currentCol > 4 &&
        pos.currentRow !== 6
      ) {
        setWord(
          word.map((row, rowIndex) => {
            if (rowIndex === pos.currentRow)
              return handleResult(word[pos.currentRow]);
            return row;
          })
        );
        // check animation
        handleAnimation(5, pos.currentRow, "rotate");
        setPos({ currentCol: 0, currentRow: pos.currentRow + 1 });
        // add
      } else if (testTurkishLetter(e.key)) {
        setWord(
          word.map((row, rowIndex) => {
            if (rowIndex === pos.currentRow) {
              return row.map((col, colIndex) => {
                if (colIndex === pos.currentCol) {
                  col.letter = e.key.toLocaleUpperCase("tr");
                  handleAnimation(colIndex, rowIndex, "shake");
                  setPos({ ...pos, currentCol: pos.currentCol + 1 });
                }
                return col;
              });
            }
            return row;
          })
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // clear side effect when unmount
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  return (
    <div className="mt-3">
      {word.map((row: wordType[], rowIdx) => (
        <div
          id={`row-${rowIdx}`}
          className="mx-auto mb-[5px] flex w-fit gap-[5px]"
          key={rowIdx}
        >
          {row.map((col, colIdx) => (
            <span
              className={clsx(
                "flex h-[60px] w-[60px] items-center justify-center border-2 border-ligthGray text-[2rem] font-bold text-primary-foreground dark:border-darkGray",
                {
                  "bg-green": col.state === "correct",
                  "bg-gray": col.state === "absent",
                  "bg-yellow": col.state === "present",
                  "text-white": rowIdx < pos.currentRow,
                }
              )}
              key={colIdx}
            >
              {col.letter}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Game;
