import React from 'react';
import { NavLink, withRouter } from 'react-router-dom';

const NAV_ITEMS = [{
  label: 'Home',
  url: '/home',
}, {
  label: 'Contacts',
  url: '/contacts',
}];

const SidebarNavigation = () => (
  <nav className="sidebar-navigation">
    {NAV_ITEMS.map(item => (
      <div key={item.label} className="navigation-item">
        <NavLink className="flex flex-middle" activeClassName="active" to={item.url}>
					{item.label}
        </NavLink>
      </div>
    ))}
  </nav>
);

export default withRouter(SidebarNavigation);
