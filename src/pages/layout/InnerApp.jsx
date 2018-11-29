import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { HomePage } from 'pages/home';

import SidebarNavigation from './SidebarNavigation';


class InnerAppLayout extends React.PureComponent {
  static propTypes = {
    history: PropTypes.shape(),
  };

  render() {
    return (
      <div className="flex fade-in">
        <SidebarNavigation />
        <div className="page-inner-content scroll-content">
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route component={() => <h1>404</h1>} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default InnerAppLayout;