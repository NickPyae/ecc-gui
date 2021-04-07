import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

function NavBar() {
  const { pathname } = useLocation();

  return (
    <dds-menu>
      <NavLink exact={true} to="/">
        <dds-menu-item mainNav label="Dashboard" icon="dashboard" active={pathname === '/'}></dds-menu-item>
      </NavLink>
      <NavLink to="/catalog">
        <dds-menu-item mainNav label="Catalog" icon="inventory_list" active={pathname === '/catalog'}></dds-menu-item>
      </NavLink>
    </dds-menu>
  )
}

export default NavBar;
