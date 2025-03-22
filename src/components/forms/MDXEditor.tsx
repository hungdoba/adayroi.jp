'use client';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { uploadImage } from '@/actions/image';
import { toast } from 'sonner';
import type { Options as EasyMDEOptions } from 'easymde';

const SimpleMdeReact = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
});

if (typeof window !== 'undefined') {
  import('easymde/dist/easymde.min.css');
}

interface MDXEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function MDXEditor({ value, onChange }: MDXEditorProps) {
  const handleImageUpload = async (
    file: File,
    onSuccess: (url: string) => void,
    onError: (error: string) => void
  ) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      formData.append(
        'folder',
        process.env.NEXT_PUBLIC_CLOUDINARY_POST_FOLDER ?? 'posts'
      );

      const imageUrl = await uploadImage(formData);

      if (imageUrl) {
        onSuccess(imageUrl);
        toast.success('Image uploaded successfully');
      } else {
        toast.error('Failed to upload image');
        onError('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading image:', error);
      onError('Error uploading image. The image may be too large.');
    }
  };

  const editorOptions = useMemo<EasyMDEOptions>(
    () => ({
      autofocus: true,
      lineNumbers: true,
      spellChecker: true,
      uploadImage: true,
      imageUploadFunction: handleImageUpload,
    }),
    []
  );

  return (
    <div className="w-full prose dark:prose-invert prose-headings:text-black prose-a:no-underline prose-a:text-cyan-500 prose-p:text-black prose-li:text-black prose-strong:text-black">
      <SimpleMdeReact
        className="editor-text-black editor-toolbar-gray"
        value={value}
        onChange={onChange}
        options={editorOptions}
      />
    </div>
  );
}
