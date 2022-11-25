const filterResult = (ebookList, valueToFilter) => {
  const result = ebookList.filter((item) => item.genreIds.includes(valueToFilter));
  return (result);
};

export default filterResult;