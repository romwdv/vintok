import hero from "../assets/banner-wide.jpg";
import axios from "axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ dataFetch, setDataFetch, userSearch }) => {
  const [IsLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/offers`,
      );

      setDataFetch(response.data);
      setIsLoading(false);
    };
    fetchData();
  }, [setDataFetch]);

  const searchText = userSearch?.toLowerCase() || "";

  console.log(userSearch);

  if (IsLoading) return <p>on load</p>;
  return (
    <>
      <div className="hero">
        <img src={hero} alt="hero section" />
      </div>
      <section className="products">
        <div className="container">
          {dataFetch.offers
            .filter((item) =>
              (item.product_description || "")
                .toLowerCase()
                .includes(searchText),
            )
            .map((item) => {
              const marque = item.product_details.find((d) => d.MARQUE)?.MARQUE;
              const taille = item.product_details.find((d) => d.TAILLE)?.TAILLE;
              // const etat = item.product_details.find((d) => d.ÉTAT)?.ÉTAT;
              return (
                <Link
                  to={`/offer/${item._id}`}
                  key={item._id}
                  className="product"
                  state={{ item }}
                >
                  <img src={item.product_image.url} alt={item.product_name} />
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
