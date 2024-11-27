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
async function getJLPTListenFullDetail(
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
async function getJLPTReadFullDetail(
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

// For admin update jlpt explain
export async function updateQuestionExplain(
  formData: FormData
): Promise<boolean> {
  const id = formData.get('id') as string;
  const explanation = formData.get('explanation') as string;

  try {
    await prisma.jlpt_question.update({
      where: {
        id: Number(id),
      },
      data: {
        explanation: explanation,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating question explanation:', error);
    return false;
  }
}

// For admin update jlpt mondai content
export async function updateMondaiContent(
  formData: FormData
): Promise<boolean> {
  const id = formData.get('id') as string;
  const mondai_content = formData.get('mondai_content') as string;

  try {
    await prisma.jlpt_mondai.update({
      where: {
        id: Number(id),
      },
      data: {
        mondai_content: mondai_content,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating question explanation:', error);
    return false;
  }
}

// For admin update jlpt mondai note
export async function updateMondaiNote(formData: FormData): Promise<boolean> {
  const id = formData.get('id') as string;
  const note = formData.get('note') as string;

  try {
    await prisma.jlpt_mondai.update({
      where: {
        id: Number(id),
      },
      data: {
        note: note,
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating question explanation:', error);
    return false;
  }
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
