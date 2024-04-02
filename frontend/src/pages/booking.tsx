import { useQuery } from 'react-query';
import * as apiClient from '../api-client';
import BookingForm from '../forms/booking-form/booking-form';
import { useSearchContext } from '../context/search-context';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import BookingDetailSummary from '../components/booking-detail-summary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../context/app-context';

const Booking = () => {
  const search = useSearchContext();
  const { hotelId } = useParams();
  const {stripePromise} = useAppContext();

  const [numberOfNights, setNumberOfNight] = useState<number>(0);

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights = Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) / (1000 * 60 * 60 * 24);

      setNumberOfNight(Math.ceil(nights))
    }
  },[search.checkIn, search.checkOut]);

  const {data: paymentIntentData} =  useQuery("createPaymentIntent", () => apiClient.createPaymentIntent(hotelId as string, numberOfNights.toString()), 
    {
      enabled: !!hotelId && numberOfNights > 0,
    }
  )

  const {data: hotel } = useQuery("fetchHotelById", () => apiClient.fetchHotelById(hotelId as string), {
    enabled: !!hotelId
  });


  const {data: currentUser} = useQuery("fetchCurrentUser", apiClient.fetchCurrentUser);

  if (!hotel) {
    return <></>
  }

  return (
    <div className='grid md:grid-cols-[1fr_2fr]'>
      <BookingDetailSummary 
        checkIn={search.checkIn} 
        checkOut={search.checkOut}
        adultCount={search.adultCount} 
        childCount={search.childCount}
        numberOfNights={numberOfNights}
        hotel={hotel}
      />
      {currentUser && paymentIntentData && ( 
        <Elements stripe={stripePromise} options={{
          clientSecret: paymentIntentData.clientSecret,
        }}>
          <BookingForm currentUser={currentUser} paymentIntent={paymentIntentData}/>
        </Elements>
      )}
    </div>
  )
}

export default Booking