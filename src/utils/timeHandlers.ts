export const getTime = (time: number) => {
  return `${Math.floor(time / 60)}:${Math.floor(time % 60)
    .toString()
    .slice(-2)}`;
};

export const getPercentage = (time: number, duration: number) => {
  return Math.floor((time / duration) * 100);
};
