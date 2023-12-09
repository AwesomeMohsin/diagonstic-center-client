import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckOutForm from "./CheckoutForm";
import SectionTitle from "../../../components/SectionTitle";




// TODO add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK)

const Payment = () => {
    
    const discountedPrice = JSON.parse(localStorage.getItem('appointment-info'))?.price;
    console.log(discountedPrice);

    return (
        <div className="pb-20 shadow-lg">
            <SectionTitle title="Payment"></SectionTitle>
        

                <Elements stripe={stripePromise}>
                <CheckOutForm discountedPrice={discountedPrice}></CheckOutForm>
                </Elements>

            
            
        </div>
    );
};

export default Payment;