'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import toast from 'react-hot-toast';
import { uploadImage } from '@/actions/image';

// Dynamically import 'react-simplemde-editor' to ensure it's only loaded client-side.
const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

// Dynamically import the CSS to avoid bundling it in the initial load.
if (typeof window !== 'undefined') {
  import('easymde/dist/easymde.min.css');
}

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function MDXEditor({ value, onChange }: Props) {
  const handleImageUpload = async (
    file: File,
    onSuccess: (url: string) => void,
    onError: (message: string) => void
  ) => {
    if (file) {
      try {
        const formData = new FormData();
        formData.append('image', file);
        formData.append(
          'folder',
          process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER!
        );
        const imageUrl = await uploadImage(formData);
        if (imageUrl) {
          onSuccess(imageUrl);
          toast.success('Upload image success');
        } else {
          toast.error('Upload image fail');
        }
      } catch (error) {
        console.error('Error uploading image:', error);
        onError('Upload image error, maybe size of image too big');
      }
    }
  };

  const defaultOptions = useMemo(() => {
    return {
      autofocus: true,
      lineNumbers: true,
      spellChecker: true,
      uploadImage: true,
      imageUploadFunction: handleImageUpload,
    } as EasyMDE.Options;
  }, []);

  return (
    <div className="w-full prose dark:prose-invert prose-headings:text-black prose-a:no-underline prose-a:text-cyan-500 prose-p:text-black prose-li:text-black prose-strong:text-black">
      <SimpleMdeReact
        className="editor-text-black editor-toolbar-gray"
        value={value}
        onChange={onChange}
        options={defaultOptions}
      />
    </div>
  );
}
