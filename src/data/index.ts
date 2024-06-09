import perfumesData from './db.json';

export type Perfume = {
  id: string;
  perfumeName: string;
  price: number;
  description: string;
  brandName: string;
  isForFemale: boolean;
  image: string;
  feedbacks?: {
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
  rating: number;
};

const brandData = perfumesData
  .map((perfume) => {
    return { brandName: perfume.brandName };
  })
  .filter((obj, index) => {
    return (
      index ===
      perfumesData.findIndex((perfume) => obj.brandName === perfume.brandName)
    );
  });
export const brands = [{ brandName: 'All' }, ...brandData];

export const perfumes: Perfume[] = perfumesData
  .map((perfume) => {
    const totalRating = perfume.feedbacks
      ? perfume.feedbacks?.reduce((sum, feedback) => sum + feedback.rating, 0)
      : 0;
    const rating = perfume.feedbacks?.length
      ? totalRating / perfume.feedbacks?.length
      : 0;
    return { ...perfume, rating };
  })
  .sort((a, b) => b.rating - a.rating);

export const getPerfumeDetail = (perfumeId: string) => {
  const perfume = perfumes.find((perfume) => perfume.id === perfumeId) as Perfume;
  if (perfume?.feedbacks?.length)
    perfume.feedbacks = perfume?.feedbacks?.sort((a, b) => b.rating - a.rating);
  return perfume;
};
