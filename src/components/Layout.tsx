import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar.tsx';
import FloatingNavbar from './FloatingNavbar.tsx';
import Footer from './Footer';

const Layout: React.FC = () => {
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
