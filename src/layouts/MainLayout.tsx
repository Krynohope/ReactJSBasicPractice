import Footer from '../partials/Footer';
import Header from '../partials/Header';
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
    return (
        <>
            <Header></Header>
            <Outlet></Outlet>
            <Footer></Footer>
        </>
    );
}

export default MainLayout;