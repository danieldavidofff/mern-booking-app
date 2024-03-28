import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Layout from "./layouts/layout"
import Register from "./pages/register"
import SignIn from "./pages/sign-in"


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout><p>Home Page</p></Layout>}/>
        <Route path="/search" element={<Layout><p>Search Page</p></Layout>}/>
        <Route path="/register" element={<Layout><Register/></Layout>}/>
        <Route path="/sign-in" element={<Layout><SignIn/></Layout>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </Router>    
  )
}

export default App
