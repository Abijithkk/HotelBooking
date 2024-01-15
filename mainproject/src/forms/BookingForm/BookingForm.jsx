import { useForm } from "react-hook-form";
// import { PaymentIntentResponse, UserType } from "../../../../backend/src/shared/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import { useParams } from "react-router-dom";
import { useMutation } from "react-query";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";
import PropTypes from "prop-types"; // Import PropTypes

const BookingForm = ({ currentUser, paymentIntent }) => {
  const stripe = useStripe();
  const elements = useElements();

  const search = useSearchContext();
  const { hotelId } = useParams();

  const { showToast } = useAppContext();

  const { mutate: bookRoom, } = useMutation(        // isLoading
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking Saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );

  const { handleSubmit,  } = useForm({
    defaultValues: {
      firstName: currentUser.firstName,
      lastName: currentUser.lastName,
      email: currentUser.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      totalCost: paymentIntent.totalCost,
      paymentIntentId: paymentIntent.paymentIntentId,
    },
  });

  const onSubmit = async (formData) => {
    if (!stripe || !elements) {
      return;
    }

    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid grid-cols-1 gap-5 rounded-lg border border-slate-300 p-5"
    >
      {/* ... (rest of the component code) */}
    </form>
  );
};

// Add PropTypes validation for the paymentIntent prop
BookingForm.propTypes = {
  currentUser: PropTypes.object.isRequired,
  paymentIntent: PropTypes.shape({
    clientSecret: PropTypes.string.isRequired,
    totalCost: PropTypes.number.isRequired,
    paymentIntentId: PropTypes.string.isRequired,
    // Add other properties as needed
  }).isRequired,
};

export default BookingForm;
