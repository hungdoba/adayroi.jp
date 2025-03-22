'use server';

import prisma from '@/libs/prisma';
import { JlptTime, MondaiData } from '@/types/Jlpt';
import { jlpt_chokai } from '@prisma/client';
import { unstable_cache } from 'next/cache';

// Has cache function
async function getJLPTTimes(): Promise<JlptTime[]> {
  const times = await prisma.jlpt_mondai.findMany({
    orderBy: [{ year: 'asc' }, { month: 'asc' }],
    select: {
      year: true,
      month: true,
    },
  });

  const data = Array.from(
    new Set(times.map((time) => `${time.year}-${time.month}`))
  ).map((uniqueTime) => {
    const [year, month] = uniqueTime.split('-').map(Number);
    return { year: year.toString(), month: month.toString() };
  });
  return data;
}

// Has cache function
export async function getJLPTListenFullDetail(
  year: string,
  month: string
): Promise<jlpt_chokai[]> {
  const data = await prisma.jlpt_chokai.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
    },
  });

  return data;
}

// Has cache function
export async function getJLPTReadFullDetail(
  year: string,
  month: string
): Promise<MondaiData> {
  const mondaiList = await prisma.jlpt_mondai.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
    },
  });

  const questionList = await prisma.jlpt_question.findMany({
    where: {
      year: parseInt(year, 10),
      month: parseInt(month, 10),
    },
    orderBy: {
      question_number: 'asc',
    },
  });

  return { mondai: mondaiList, questions: questionList } as MondaiData;
}

// Cache function
export const getJLPTTimesCache = unstable_cache(
  async () => getJLPTTimes(),
  ['jlpt-times'],
  { tags: ['jlpt-times'] }
);

export const getJLPTListenFullDetailCache = unstable_cache(
  async (year: string, month: string) => getJLPTListenFullDetail(year, month),
  ['jlpt-listen-full-detail'],
  { tags: ['jlpt-listen-full-detail'] }
);

export const getJLPTReadFullDetailCache = unstable_cache(
  async (year: string, month: string) => getJLPTReadFullDetail(year, month),
  ['jlpt-read-full-detail'],
  { tags: ['jlpt-read-full-detail'] }
);
