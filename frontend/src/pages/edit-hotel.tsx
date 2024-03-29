import { useMutation, useQuery } from "react-query";
import { useParams } from "react-router-dom"
import * as apiClient from '../api-client';
import ManageHotelForm from "../forms/manage-hotel-form/manage-hotel-form";
import { useAppContext } from "../context/app-context";

const EditHotel = () => {
  const { hotelId } = useParams();
  const { showToast } = useAppContext();
  const {data: hotel} = useQuery("fetchMyHotelById", () => apiClient.fetMyHotelById(hotelId || ""), {
    enabled: !!hotelId
    //This query is going to run only if we have a hotelId
  });

  const { mutate, isLoading } = useMutation(apiClient.updateMyHotelById, {
    onSuccess: () => {
      showToast({ message: "Hotel edited!", type: "SUCCESS" })
    },
    onError: () => {
      showToast({ message: "Failed to edit hotel", type:"ERROR" })
    },
  });

  const handleSave = (hotelFormData: FormData) => {
    mutate(hotelFormData);
  }

  return (
    <ManageHotelForm hotel={hotel} onSave={handleSave} isLoading={isLoading}/>
  )
}

export default EditHotel