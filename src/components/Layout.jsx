import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import FloatingNavbar from './FloatingNavbar';
import Footer from './Footer';

const Layout = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <Navbar />
            <FloatingNavbar />
            <main style={{ flex: 1 }}>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
