import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import SearchBar from "../components/search-bar";

interface Props {
  children: React.ReactNode;
  showSearchBar?: boolean;
}

const Layout = ({ children, showSearchBar = false }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Hero/>
      <div className="container mx-auto">
        {showSearchBar && (
          <SearchBar/>
        )}
      </div>
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;