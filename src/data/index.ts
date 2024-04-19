import watchesData from './db.json';

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

export const watches = watchesData;
