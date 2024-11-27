import { useTranslations } from 'next-intl';

export default function TermsAndConditions() {
  const t = useTranslations('TermsAndConditions');

  return (
    <div className="max-w-3xl mb-8 mx-auto p-6 pt-0 bg-white dark:bg-gray-900 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-gray-100">
        {t('title')}
      </h1>

      <p className="text-gray-700 dark:text-gray-300 mb-6">{t('intro')}</p>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('acceptanceTitle')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('acceptanceContent')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('registrationTitle')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('registrationContent')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('userConductTitle')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('userConductContent')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('privacyPolicyTitle')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('privacyPolicyContent')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('changesToTermsTitle')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('changesToTermsContent')}
        </p>
      </section>

      <section className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
          {t('contactUsTitle')}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">
          {t('contactUsContent')}
        </p>
      </section>

      <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
        {t('thankYou')}
      </p>
    </div>
  );
}
