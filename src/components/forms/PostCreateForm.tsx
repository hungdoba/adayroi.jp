'use client';

import toast from 'react-hot-toast';
import { useEffect, useState } from 'react';
import MDXEditor from '@/components/forms/MDXEditor';
import { post_category } from '@prisma/client';
import { PostInfo, PostStatic } from '@/types/Post';
import PostInfoEditor from './PostInfoEditor';
import { routing } from '@/i18n/routing';
import { createPost, updatePost } from '@/actions/post';
import PostStaticInfoEditor from './PostStaticInfoEditor';

interface Props {
  mode: 'create' | 'update';
  categories: post_category[];
  initialPostStatic: PostStatic;
  initialPostInfos: Record<string, PostInfo>;
  initialPostContents: Record<string, string>;
}

export default function PostCreateForm({
  mode,
  categories,
  initialPostStatic,
  initialPostInfos,
  initialPostContents,
}: Props) {
  const [postStatic, setPostStatic] = useState<PostStatic>(initialPostStatic);
  const [postInfos, setPostInfos] =
    useState<Record<string, PostInfo>>(initialPostInfos);
  const [postContents, setPostContents] =
    useState<Record<string, string>>(initialPostContents);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isDirty]);

  const handleContentChange = (value: string) => {
    setPostContents((prev) => ({ ...prev, [postStatic.language]: value }));
    setIsDirty(true);
  };

  const handlePostStaticChange = (newPostStatic: PostStatic) => {
    setPostStatic(newPostStatic);
    setIsDirty(true);
  };

  const handlePostInfoChange = (newPostInfo: PostInfo) => {
    setPostInfos((prev) => ({ ...prev, [postStatic.language]: newPostInfo }));
    setIsDirty(true);
  };

  function verifyPost(
    postStatic: PostStatic,
    postInfos: Record<string, PostInfo>,
    postContents: Record<string, string>
  ): boolean {
    if (postStatic.slug === '') {
      toast.error('Slug is empty');
      return false;
    }
    if (postStatic.category === '') {
      toast.error('Category is empty');
      return false;
    }
    if (postStatic.headerImage === '') {
      toast.error('Header image is empty');
      return false;
    }
    if (postStatic.tags === '') {
      toast.error('Tags are empty');
      return false;
    }

    for (const locale of routing.locales) {
      if (!postInfos[locale]) {
        toast.error(`Title in ${locale} is empty`);
        return false;
      }
      if (postInfos[locale].title === '') {
        toast.error(`Title in ${locale} is empty`);
        return false;
      }
      if (postInfos[locale].brief === '') {
        toast.error(`Brief in ${locale} is empty`);
        return false;
      }
      if (postInfos[locale].tableOfContent === '') {
        toast.error(`Table of content in ${locale} is empty`);
        return false;
      }
      if (postContents[locale] === '') {
        toast.error(`Content in ${locale} is empty`);
        return false;
      }
    }

    return true;
  }

  const handleSubmit = async () => {
    if (!verifyPost(postStatic, postInfos, postContents)) {
      return;
    }

    const formData = new FormData();
    formData.append('slug', postStatic.slug);
    formData.append('post_category', postStatic.category);
    formData.append('tags', postStatic.tags);
    formData.append('header_image', postStatic.headerImage || '');
    formData.append('active', postStatic.visible.toString());

    const translations = Object.keys(postInfos).map((lang) => ({
      language_code: lang,
      post_title: postInfos[lang].title,
      post_brief: postInfos[lang].brief,
      table_of_contents: postInfos[lang].tableOfContent,
      post_content: postContents[lang],
    }));

    formData.append('translations', JSON.stringify(translations));

    let result;
    if (mode === 'update' && postStatic.id) {
      formData.append('id', postStatic.id.toString());
      result = await updatePost(formData);
    } else {
      result = await createPost(formData);
    }

    if (result) {
      toast.success(`${mode === 'update' ? 'Update' : 'Creation'} Succeeded`);
      setIsDirty(false);
    } else {
      toast.error(
        `${
          mode === 'update' ? 'Update' : 'Creation'
        } Failed: Check the console for details`
      );
    }
  };

  return (
    <div className="container mx-auto w-full mt-4 md:max-w-5xl">
      <div className="flex flex-col md:flex-row mx-4 md:mx-8">
        <div className="w-full mb-4 md:mb-0 md:w-1/4">
          <PostStaticInfoEditor
            categories={categories}
            postStatic={postStatic}
            onChange={handlePostStaticChange}
          />
          <PostInfoEditor
            mode={mode}
            postInfo={postInfos[postStatic.language] || initialPostInfos}
            postContent={postContents[postStatic.language] || ''}
            onChange={handlePostInfoChange}
            onSave={handleSubmit}
          />
        </div>
        <hr className="md:hidden mb-4" />
        <div className="z-10 w-full md:w-3/4">
          <MDXEditor
            value={postContents[postStatic.language] || ''}
            onChange={handleContentChange}
          />
        </div>
      </div>
    </div>
  );
}
