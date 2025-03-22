export const EMPTY_FORM_STATE: FormState = {
  status: 'UNSET' as const,
  message: '',
};

export type FormState = {
  status: 'TWO_FACTOR_REQUIRED' | 'UNSET' | 'SUCCESS' | 'ERROR';
  message: string;
};
