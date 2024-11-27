export interface PostStatic {
  id?: number;
  language: string;
  slug: string;
  category: string;
  headerImage?: string;
  visible: boolean;
  tags: string;
}

export interface PostInfo {
  title: string;
  brief: string;
  tableOfContent?: string;
}
