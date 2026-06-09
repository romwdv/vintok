import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../Components/CheckoutForm";
import { useEffect, useState } from "react";
import { useLocation, Navigate } from "react-router-dom";
import axios from "axios";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBKEY);

const Paiment = ({ token }) => {
  const [offer, setOffer] = useState(null);
  const location = useLocation();
  const offerId = location.state?.offerId || location.state?.id;

  useEffect(() => {
    const fetchOffers = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/offer/${offerId}`,
      );
      setOffer(response.data);
    };
    if (offerId) {
      fetchOffers();
    }
  }, [offerId]);

  if (!offerId) return <Navigate to="/" replace />;
  if (!token)
    return (
      <Navigate
        to="/login"
        state={{ from: { pathname: "/paiement", state: { offerId } } }}
        replace
      />
    );
  if (!offer) return <p>Chargement...</p>;

  const totalPrice = offer.product_price * 100 + 140;
  console.log(totalPrice);

  const options = {
    // Type de transaction
    mode: "payment",
    // Montant de la transaction
    amount: totalPrice,
    // Devise de la transaction
    currency: "eur",
    payment_method_types: ["card"],
    fields: {
      billingDetails: {
        name: "never",
        email: "never",
        phone: "never",
        address: "never",
      },
      wallets: {
        link: "never",
      },
    },
    appearance: {
      theme: "flat",
      labels: "floating",
      variables: {
        colorPrimary: "#097a85",
        colorSuccess: "#097a85",
        gridColumnSpacing: "var(--p-spacing4)",
      },
    },
  };

  const paymentData = {
    amount: totalPrice,
    currency: "eur",
  };

  return (
    <div className="container paiement">
      <p>Montant à payer: {(totalPrice / 100).toFixed(2)}€</p>
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm paymentData={paymentData} />
      </Elements>
    </div>
  );
};

export default Paiment;
