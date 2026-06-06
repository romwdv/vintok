import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
// import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/fr";
dayjs().format();
dayjs.extend(relativeTime);

dayjs.locale("fr");

const Offer = () => {
  function capitalizeFirst(string) {
    const strLower = string.toLowerCase();
    return strLower
      .split("")
      .map((char, index) => (index === 0 ? char.toUpperCase() : char))
      .join("");
  }
  const id = useParams();
  const { state } = useLocation();
  const [offer, setOffer] = useState(state?.item || null);
  const [isLoading, setIsLoading] = useState(!state?.item);
  const [activeImg, setActiveImg] = useState(0);

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

  const marque = offer.product_details.find((d) => d.MARQUE)?.MARQUE;
  const taille = offer.product_details.find((d) => d.TAILLE)?.TAILLE;
  const etat = offer.product_details.find((d) => d.ÉTAT)?.ÉTAT;
  const couleur = offer.product_details.find((d) => d.COULEUR)?.COULEUR;

  if (isLoading) return <p>Chargement...</p>;
  if (!offer) return <p>Offre introuvable</p>;

  return (
    <>
      <div className="container">
        <div className="offer">
          <div className="pictures">
            <div className="main_picture">
              <img
                src={offer.product_pictures[activeImg].url}
                alt={offer.product_name}
              />
            </div>
            <div className="thumb_picture">
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
          <aside>
            <div className="product_info">
              <h3>{offer.product_name}</h3>
              <div className="info">
                <div className="info-details">
                  {(() => {
                    const taille = offer.product_details.find(
                      (d) => d.TAILLE,
                    )?.TAILLE;
                    const etat = offer.product_details.find(
                      (d) => d.ÉTAT,
                    )?.ÉTAT;

                    return (
                      <>
                        {taille && <span>{taille}</span>}
                        {etat && <span>{capitalizeFirst(etat)}</span>}
                      </>
                    );
                  })()}
                  <span>Ajouté {dayjs(offer.product_date).fromNow()}</span>
                </div>
                <div className="price">
                  <span>{Number(offer.product_price).toFixed(2)} €</span>
                  <span className="priceTax">
                    {Number(offer.product_price + 1.4).toFixed(2)} €
                  </span>
                  <span>Inclut la protection des acheteurs</span>
                </div>
              </div>
              <div className="product_detail">
                <div className="brand">
                  {marque && (
                    <>
                      <span>Marque</span>
                      <span>{capitalizeFirst(marque)}</span>
                    </>
                  )}
                </div>
                <div className="size">
                  {taille && (
                    <>
                      <span>Taille</span>
                      <span>{taille}</span>
                    </>
                  )}
                </div>
                <div className="etat">
                  {etat && (
                    <>
                      <span>Etat</span>
                      <span>{capitalizeFirst(etat)}</span>
                    </>
                  )}
                </div>
                <div className="couleur">
                  {couleur && (
                    <>
                      <span>Couleur</span>
                      <span>{capitalizeFirst(couleur)}</span>
                    </>
                  )}
                </div>
                <div className="date">
                  <span>Ajouté</span>
                  <span>{dayjs(offer.product_date).fromNow()}</span>
                </div>
              </div>
              <div className="description">
                <p>{capitalizeFirst(offer.product_description)}</p>
              </div>
              <div className="product_actions">
                <button className="sell-article">Acheter</button>
                <button>Faire une offre</button>
                <button>Message</button>
              </div>
            </div>
            <div className="user-info">
              <img src={offer.owner.account.avatar.secure_url} />
              <p>{offer.owner.account.username}</p>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
};

export default Offer;
