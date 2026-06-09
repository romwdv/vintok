import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentConfirmation from "../Components/PaymentConfirmation";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBKEY);

const PaymentConfirmationPage = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentConfirmation />
    </Elements>
  );
};

export default PaymentConfirmationPage;
