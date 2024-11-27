import { jlpt_mondai, jlpt_question } from '@prisma/client';

export interface JlptTime {
  year: string;
  month: string;
}

export interface MondaiData {
  mondai: jlpt_mondai[];
  questions: jlpt_question[];
}
