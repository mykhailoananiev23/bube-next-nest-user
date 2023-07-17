const searchEngin = (searchWord: any) => {
  var query = "";
  Object.entries(searchWord).forEach(([key, value]: any, index) => {
    if (value) {
      query += key + "=" + value + "&";
    }
  });
  return query;
};

export default searchEngin;
