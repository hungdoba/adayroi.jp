import { Link } from '@/i18n/routing';
import { redirect } from 'next/navigation';
import { adminInfo } from '@/utils/session';
import { getTranslations } from 'next-intl/server';
import { ButtonRevalidate } from '@/components/ui/button-revalidate';

export default async function AdminPage() {
  const t = await getTranslations('Button');
  const admin = await adminInfo();

  if (admin == false) {
    redirect('unauthorized');
  }

  return (
    <div className="mx-auto max-w-sm md:max-w-lg flex flex-col">
      <h1 className="leading-tight tracking-tight text-gray-900 dark:text-white mb-4">
        {`Logged in:`}
      </h1>
      <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white mb-8">
        {admin.email}
      </h1>
      <Link
        href={`/admin/create`}
        className="w-full text-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
      >
        {t('createPost')}
      </Link>
      <ButtonRevalidate tag="cache-image" label={t('revalidateImage')} />
      <ButtonRevalidate tag="cache-post" label={t('revalidatePost')} />
    </div>
  );
}
