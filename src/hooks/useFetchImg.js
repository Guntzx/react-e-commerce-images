import { useState, useEffect } from "react";

const useFetchImg = (img) => {
  const imgquery = img || "random";
  const [data, setData] = useState([]);
  const url = `https://api.unsplash.com/search/photos?per_page=20&query=${imgquery}`;
  const auth = "Your Auth";

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
