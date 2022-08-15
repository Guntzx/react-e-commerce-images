import { useState, useEffect } from "react";

const useFetchImg = (img) => {
  const imgquery = img || "random";
  const [data, setData] = useState([]);
  const url = `https://api.unsplash.com/search/photos?per_page=20&query=${imgquery}`;
  const auth = "Client-ID 8LF9B5gNzRRn8DXLPE6xlm9OrYH7UXQ4bWnZlMuk5Qs";

  useEffect(() => {
    const fetchData = async () => {
      fetch(url, {
        headers: {
          Authorization: auth,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result.results);
        });
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchImg;
