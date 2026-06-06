const Test = ({ dataFetch, userSearch }) => {
  const offers = dataFetch;
  const userFilter = userSearch;

  const tabFilter = offers.offers
    .map((keyword) => keyword.product_description)
    .filter((keyword) => keyword.includes(userFilter && userFilter));

  console.log(tabFilter);

  return <div>Test</div>;
};

export default Test;
