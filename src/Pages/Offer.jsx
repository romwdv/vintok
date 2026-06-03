import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs().format();
dayjs.extend(relativeTime);

dayjs.locale("fr");

const Offer = () => {
  const id = useParams();
  const { state } = useLocation();
  const [offer, setOffer] = useState(state?.item || null);
  const [isLoading, setIsLoading] = useState(!state?.item);
  const [activeImg, setActiveImg] = useState(0);

  console.log(state);

  useEffect(() => {
    if (state?.item) return; // data déjà disponible, pas besoin d'appel

    const fetchOffers = async () => {
      const response = await axios.get(
        "https://lereacteur-vinted-api.herokuapp.com/offers",
      );
      const found = response.data.offers.find((item) => item._id === id);
      setOffer(found);
      setIsLoading(false);
    };
    fetchOffers();
  }, [id]);

  console.log(offer);

  if (isLoading) return <p>Chargement...</p>;
  if (!offer) return <p>Offre introuvable</p>;

  return (
    <div className="container">
      <div className="offer">
        <div className="pictures">
          <div className="main_picture">
            <img
              src={offer.product_pictures[activeImg].url}
              alt={offer.product_name}
            />
          </div>
          <div className="thum_picture">
            {offer.product_pictures.map((picture, index) => (
              <img
                key={index}
                src={picture.url}
                alt={`photo ${index + 1}`}
                className={index === activeImg ? "active" : ""}
                onClick={() => setActiveImg(index)}
              />
            ))}
          </div>
        </div>
        <div className="product_info">
          <h3>{offer.product_name}</h3>
          <div className="info">
            {(() => {
              const taille = offer.product_details.find(
                (d) => d.TAILLE,
              )?.TAILLE;
              const etat = offer.product_details.find((d) => d.ÉTAT)?.ÉTAT;

              return (
                <>
                  {taille && <span>{taille}</span>}
                  {etat && <span>{etat}</span>}
                </>
              );
            })()}
          </div>
          <div className="date">
            <span>Ajouté {dayjs(offer.product_date).fromNow()}</span>
          </div>
        </div>
      </div>
      <Link to="/">Home</Link>
    </div>
  );
};

export default Offer;
