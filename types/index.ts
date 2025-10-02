export type InfoItems = {
  title: string;
  description: string;
};

export type Project = {
  id: string;
  title: string;
  short: string;
  image?: string;
  images?: string[];
  tags?: string[];
  url?: string;
};
