import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header/>
      <Hero/>
      <div className="container mx-auto py-10 flex-1">
        {children}
      </div>
      <Footer/>
    </div>
  );
};

export default Layout;