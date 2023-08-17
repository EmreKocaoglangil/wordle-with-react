/* eslint-disable react/no-array-index-key */
import { useState, useEffect } from "react";
import { clsx } from "clsx";
import { handleResult, testTurkishLetter } from "@/helpers";

export interface wordType {
  letter: string;
  state: string | null;
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
          word.map((row, index) => {
            if (index === pos.currentRow) {
              return row.map((col, idx) => {
                if (idx === pos.currentCol - 1) {
                  col.letter = "";
                }
                return col;
              });
            }
            return row;
          })
        );
        setPos({
          currentCol: pos.currentCol > 0 ? pos.currentCol - 1 : 0,
          currentRow: pos.currentRow,
        });
        // check the result
      } else if (
        e.key === "Enter" &&
        pos.currentCol > 4 &&
        pos.currentRow !== 6
      ) {
        setWord(
          word.map((row, i) => {
            if (i === pos.currentRow) return handleResult(word[pos.currentRow]);
            return row;
          })
        );
        setPos({ currentCol: 0, currentRow: pos.currentRow + 1 });
        // add
      } else if (testTurkishLetter(e.key)) {
        setWord(
          word.map((row, index) => {
            if (index === pos.currentRow) {
              return row.map((col, idx) => {
                if (idx === pos.currentCol) {
                  col.letter = e.key.toLocaleUpperCase("tr");
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

    return () => window.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <div className="mt-3 ">
      {word.map((row: wordType[], rowIdx) => (
        <div className="mx-auto mb-[5px] flex w-fit gap-[5px]" key={rowIdx}>
          {row.map((col, colIdx) => (
            <span
              className={clsx(
                "flex h-[60px] w-[60px] items-center justify-center border-2 border-ligthGray text-[2rem] font-bold text-primary-foreground dark:border-darkGray",
                {
                  "animate-shake-animate":
                    pos.currentCol === colIdx && rowIdx === pos.currentRow,
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
