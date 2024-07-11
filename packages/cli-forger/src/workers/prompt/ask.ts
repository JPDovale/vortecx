import inquirer from "inquirer";
import {
  Answers,
  Question,
  QuestionAnswerMap,
  QuestionArray,
  QuestionObservable,
} from "inquirer/dist/cjs/types/types";
import { workers } from "..";

export async function ask<T extends Answers>(
  questions:
    | QuestionArray<T>
    | QuestionAnswerMap<T>
    | QuestionObservable<T>
    | Question<T>,
  answers?: Partial<T>,
) {
  try {
    const res = await inquirer.prompt(questions, answers);
    return res;
  } catch {
    workers.logger.exit.error("Canceled");
  }
}