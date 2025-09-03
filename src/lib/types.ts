export type AlumniProfile = {
  id: string;
  name: string;
  avatarUrl: string;
  graduationYear: number;
  major: string;
  profession: string;
  location: string;
  bio: string;
  workExperience: {
    title: string;
    company: string;
    years: string;
  }[];
  contact: {
    email: string;
    linkedin: string;
  };
  skills: string[];
};

export type AlumniEvent = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  date: string;
  snippet: string;
  author: string;
  imageUrl: string;
};

export type SuccessStory = {
  id: string;
  title: string;
  alumniName: string;
  graduationYear: number;
  story: string;
  imageUrl: string;
};
