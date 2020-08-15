import React, { useMemo, useState } from 'react';
import { withStyles, Tabs } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import NavTab from './NavTab';
import useTabs from '../../hooks/useTabs';

const StyledTabs = withStyles((theme) => ({
  root: {
    flex: 1,
  },
  fixed: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  indicator: {
    backgroundColor: 'white',
    height: '5px',
  },
}))(Tabs);

const NavTabs = ({ children }) => {
  const location = useLocation();

  const initialSelectedTab = useMemo(() => {
    const selectedTab = children.findIndex(
      (tab) => tab.props.path === location.pathname,
    );
    return selectedTab !== -1 ? selectedTab : 0;
  }, [location, children]);

  const [tab, handleChange] = useTabs(initialSelectedTab);

  return (
    <StyledTabs centered value={tab} onChange={handleChange}>
      {children.map((tab) => (
        <NavTab
          component={Link}
          to={tab.props.path}
          key={tab.props.label}
          label={tab.props.label}
        />
      ))}
    </StyledTabs>
  );
};

export default NavTabs;
