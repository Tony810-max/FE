import Footer from "../components/Footer";
import Header from "../components/Header";

function MainLayout({ children }) {
    return (
        <div>
            <Header />
            <div className="main">
                {children}
            </div>
            <Footer />

        </div>
    );
}

export default MainLayout;