import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as SiIcons from 'react-icons/si'



const SubMenu = ({ item, categories }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <Link className="sidebar_link" to={item.path} onClick={item.subNav && showSubnav}>
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
      </Link>
      {subnav &&
        categories.map((item, index) => {
          let href = `/category/${item}`
          return (
            <Link className="Dropdown_Link" to={href} key={index}>
              <SiIcons.SiYourtraveldottv />
              <span className="sidebar_label">{item}</span>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;