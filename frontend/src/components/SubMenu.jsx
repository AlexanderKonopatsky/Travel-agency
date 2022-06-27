import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import * as SiIcons from 'react-icons/si'



const SubMenu = ({ item, list, path }) => {
  const [subnav, setSubnav] = useState(false);
  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <button className="sidebar_link" onClick={item.subNav && showSubnav}>
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
      </button>
      {subnav && list &&
        list.map((item, index) => {
          let href = `/${path}/${item}`
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