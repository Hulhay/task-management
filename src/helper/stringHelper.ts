export const titleCase = (str: string, charJoin?: string, splitChar?: string) => {
  const strSlice = str.toLowerCase().split(splitChar || ' ');
  const stringJoin = charJoin || ' ';

  const final = [];

  for (const word of strSlice) {
    final.push(word.charAt(0).toUpperCase() + word.slice(1));
  }

  return final.join(stringJoin);
};
