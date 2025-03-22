export type TranslatedPost = {
  id: number;
  slug: string;
  post_category: string;
  tags: string[];
  header_image: string;
  created_at: Date;
  updated_at: Date;
  active?: boolean;
  language_code: string;
  post_title: string;
  post_brief: string;
  table_of_contents: string;
  post_content: string;
  change_freq: string;
  priority: number;
};
