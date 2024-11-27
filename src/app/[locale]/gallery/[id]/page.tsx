import ImageView from '../../../../components/forms/ImageView';
import { getAllImagesCache } from '@/actions/image';

interface Props {
  params: Promise<{ id: number }>;
}

export default async function page({ params }: Props) {
  const images = await getAllImagesCache();
  const { id } = await params;
  return <ImageView images={images} initSelectedId={Number(id)} />;
}
