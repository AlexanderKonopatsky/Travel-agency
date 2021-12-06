import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';


const SubMenu2 = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <div className="sidebar_link" onClick={item.subNav && showSubnav}>
        <div>
          {item.icon}
          <span className="sidebar_label">{item.title}</span>
        </div>
        <div>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </div>
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link className="Dropdown_Link" to={item.path} key={index}>
              {item.icon}
              <span className="sidebar_label">{item.title}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu2;
