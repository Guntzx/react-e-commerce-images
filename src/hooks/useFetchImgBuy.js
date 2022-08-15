import { useState, useEffect } from "react";
import Cookies from "universal-cookie";

const useFetchImgGet = () => {
  const [data, setData] = useState([]);
  const url = "http://192.168.100.2:7000/user/buy/images";
  const cookies = new Cookies();
  const token = "Bearer " + cookies.get("access-token");

  useEffect(() => {
    const fetchData = async () => {
      fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
          Authorization: token,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };
    fetchData();
  }, []);

  return data;
};

export default useFetchImgGet;
