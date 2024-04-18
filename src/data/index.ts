import watches from './db.json';

export const brands = watches
  .map((watch) => {
    return { brandName: watch.brandName };
  })
  .filter((obj, index) => {
    return (
      index === watches.findIndex((watch) => obj.brandName === watch.brandName)
    );
  });
