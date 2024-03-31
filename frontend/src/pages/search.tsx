import { useQuery } from "react-query";
import { useSearchContext } from "../context/search-context"
import * as apiClient from '../api-client';
import { useState } from "react";
import SearchResultCard from "../components/search-results-card";
import Pagination from "../components/pagination";
import StarRatingFilter from "../components/star-rating-filter";
import HotelTypesFilter from "../components/hotel-types-filter";
import FacilitiesFilter from "../components/facilities-filter";
import PriceFilter from "../components/price-filter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [selectedHotelTypes, setSelectedHotelTypes] = useState<string[]>([]); 
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState<number | undefined>();
  const [sortOption, setSortOption] = useState<string>("");

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;

    //Checking if the user checked or unchecked this checkbox from the event
    //if they did check it then we want to copy the prevStars that are currently in the state
    // and we want to add the new star that they checked to the end of the array and we want to
    //save the array in to state (setSelectedStars),
    // if they unchecked it take the current stars that are in the state and is going to filter out the star that
    // was just selected and is going to return a  new array of all the stars except thoose stars
    // and set everything into the state
    setSelectedStars((prevStars) => event.target.checked ? [...prevStars, starRating] : prevStars.filter((star) => star !== starRating))
  }
  
  const handleHotelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;
    setSelectedHotelTypes((prevHotelType) => event.target.checked ? [...prevHotelType, hotelType] : prevHotelType.filter((type) => type !== hotelType))
  }

  const handleFacilityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const facility = event.target.value;
    setSelectedFacilities((prevFacilities) => event.target.checked ? [...prevFacilities, facility] : prevFacilities.filter((prevFacility) => prevFacility !== facility))
  }

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: selectedHotelTypes,
    facilities: selectedFacilities,
    maxPrice: selectedPrice?.toString(),
    sortOption,
  };
 
  const { data: hotelData } = useQuery(["searchHotels", searchParams], () => apiClient.SearchHotels(searchParams));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300 pb-5">Filter by:</h3>
          <StarRatingFilter selectedStars={selectedStars} onChange={handleStarsChange}/>
          <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelChange}/>
          <FacilitiesFilter selectedFacilities={selectedFacilities} onChange={handleFacilityChange}/>
          <PriceFilter selectedPrice={selectedPrice} onChange={(value?:number) => setSelectedPrice(value)}/>
        </div>
      </div>
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span className="text-xl font-bold">
            {hotelData?.pagination.total} Hotels found
            {search.destination ? ` in ${search.destination}` : ""}
          </span>
          <select 
            value={sortOption} 
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">Price Per Night (low to high)</option>
            <option value="pricePerNightDesc">Price Per Night (high to low)</option>
          </select>
        </div>
        {hotelData?.data.map((hotel) => (
          <SearchResultCard hotel={hotel}/>
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page)=> setPage(page)}
          />
        </div>
      </div>
    </div>
  )
}

export default Search