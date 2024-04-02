import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Register from "./pages/register"
import SignIn from "./pages/sign-in"
import AddHotel from "./pages/add-hotel"
import { useAppContext } from "./context/app-context"
import MyHotels from "./pages/my-hotels"
import EditHotel from "./pages/edit-hotel"
import Search from "./pages/search"
import HotelDetails from "./pages/hotel-details"
import Booking from "./pages/booking"


const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout showSearchBar><p>Home Page</p></Layout>}/>
        <Route path="/search" element={<Layout showSearchBar><Search/></Layout>}/>
        <Route path="/register" element={<Layout showSearchBar><Register/></Layout>}/>
        <Route path="/sign-in" element={<Layout showSearchBar><SignIn/></Layout>}/>
        <Route path="/detail/:hotelId" element={<Layout><HotelDetails/></Layout>}/>
        
          {isLoggedIn && (
            <>
              <Route path="/hotel/:hotelId/booking" element={<Layout showSearchBar={false}><Booking/></Layout>}/>
              <Route path="/add-hotel" element={<Layout><AddHotel/></Layout>}/>
              <Route path="/my-hotels" element={<Layout><MyHotels/></Layout>}/>
              <Route path="/edit-hotel/:hotelId" element={<Layout><EditHotel/></Layout>}/>
            </>
          )}
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>    
  )
}

export default App
