import React, { useContext } from 'react';
import { NavbarContext } from './NavbarContext';
import { Link } from 'react-router-dom';

const AdminHome = () => {
    const { menuItems } = useContext(NavbarContext);

    return (
        <div>
            <h2>Admin Home</h2>
            <ul>
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link to={`/admin/edit${item.path}`}>{item.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminHome;
