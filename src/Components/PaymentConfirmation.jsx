import { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useNavigate } from "react-router-dom";
import { IoBagCheckOutline } from "react-icons/io5";
import { MdOutlinePending } from "react-icons/md";

const PaymentConfirmation = () => {
  const stripe = useStripe();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!stripe) return;

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    console.log("clientSecret:", clientSecret); // ← vérifie qu'il est bien récupéré

    if (!clientSecret) {
      navigate("/");
      return;
    }

    const fetchPaymentIntent = async () => {
      try {
        const { paymentIntent, error } =
          await stripe.retrievePaymentIntent(clientSecret);

        console.log("paymentIntent:", paymentIntent); // ← vérifie le retour
        console.log("error:", error);

        if (error) {
          setStatus("failed");
          return;
        }

        switch (paymentIntent.status) {
          case "succeeded":
            setStatus("succeeded");
            break;
          case "processing":
            setStatus("processing");
            break;
          default:
            setStatus("failed");
        }
      } catch (err) {
        console.error("Erreur fetchPaymentIntent:", err);
        setStatus("failed");
      }
    };

    fetchPaymentIntent();
  }, [stripe]);

  console.log("status:", status); // ← vérifie l'état du composant

  useEffect(() => {
    // UseEffect is used to set the condition for redirection
    setTimeout(() => {
      // Set the timeout
      navigate("/"); // Redirect path to '/home'
    }, 2000); // set time 2000ms which is equal to 2seconds
  }, [status, navigate]);
  if (status === "loading") return <p>Chargement...</p>;

  return (
    <div className="container paymentStatus">
      {status === "succeeded" && (
        <div className="success">
          <span>
            <IoBagCheckOutline size={60} />
          </span>
          <span>Paiement confirmé</span>
        </div>
      )}
      {status === "processing" && (
        <div className="pending">
          <span>
            <MdOutlinePending size={60} />
          </span>
          <span>Paiement en attente</span>
        </div>
      )}
      {status === "failed" && (
        <div className="reject">
          <span>
            <MdOutlinePending size={60} />
          </span>
          <span>Paiement refusé. Veuillez essayer de nouveau</span>
        </div>
      )}
    </div>
  );
};

export default PaymentConfirmation;
