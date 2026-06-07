import hero from "../assets/banner-wide.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Filtres from "../Components/Filtres";

const Home = ({ dataFetch, setDataFetch, userSearch }) => {
  const [IsLoading, setIsLoading] = useState(true);
  const [sortDesc, setSortDesc] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/offers?sort=${!sortDesc ? "product-asc" : "product-desc"}`,
      );
      setDataFetch(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [sortDesc, setDataFetch]);

  console.log("datafetch", dataFetch);

  const searchText = userSearch?.toLowerCase() || "";
  if (IsLoading) return <p>on load</p>;
  return (
    <>
      <div className="hero">
        <img src={hero} alt="hero section" />
      </div>
      <Filtres sortDesc={sortDesc} setSortDesc={setSortDesc} />
      <section className="products">
        <div className="container">
          {(dataFetch || [])
            .filter((item) =>
              (item.product_description || "")
                .toLowerCase()
                .includes(searchText),
            )
            .map((item) => {
              const marque = (item.product_details || []).find(
                (d) => d.MARQUE,
              )?.MARQUE;
              const taille = (item.product_details || []).find(
                (d) => d.TAILLE,
              )?.TAILLE;
              // const etat = item.product_details.find((d) => d.ÉTAT)?.ÉTAT;
              return (
                <Link
                  to={`/offer/${item._id}`}
                  key={item._id}
                  className="product"
                  state={{ item }}
                >
                  <img
                    src={
                      Array.isArray(item.product_image)
                        ? item.product_image[0].secure_url
                        : item.product_image.secure_url
                    }
                    alt={item.product_name}
                  />
                  {marque && <span>{marque}</span>}
                  <div className="product_desc">
                    {taille && <span>{taille} </span>}
                    {/* {etat && <span>{etat}</span>} */}
                  </div>
                  {item.product_price && (
                    <span>{Number(item.product_price).toFixed(2)} €</span>
                  )}
                </Link>
              );
            })}
        </div>
      </section>
    </>
  );
};

export default Home;
