import watchesData from './db.json';

export type Watch = {
  id: string;
  watchName: string;
  price: number;
  description: string;
  brandName: string;
  automatic: boolean;
  image: string;
  feedbacks?: {
    rating: number;
    comment: string;
    author: string;
    date: string;
  }[];
  rating: number;
};

export const brands = watchesData
  .map((watch) => {
    return { brandName: watch.brandName };
  })
  .filter((obj, index) => {
    return (
      index ===
      watchesData.findIndex((watch) => obj.brandName === watch.brandName)
    );
  });

export const watches: Watch[] = watchesData
  .map((watch) => {
    const totalRating = watch.feedbacks
      ? watch.feedbacks?.reduce((sum, feedback) => sum + feedback.rating, 0)
      : 0;
    const rating = watch.feedbacks?.length
      ? totalRating / watch.feedbacks?.length
      : 0;
    return { ...watch, rating };
  })
  .sort((a, b) => b.rating - a.rating);

export const getWatchDetail = (watchId: string) => {
  const watch = watches.find((watch) => watch.id === watchId);
  if (watch?.feedbacks?.length)
    watch.feedbacks = watch?.feedbacks?.sort((a, b) => b.rating - a.rating);
  return watch;
};
