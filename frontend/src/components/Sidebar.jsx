import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import SubMenu from './SubMenu';
import { IconContext } from 'react-icons/lib';

import * as IoIcons from 'react-icons/io';
import * as RiIcons from 'react-icons/ri';
import * as BiIcons from 'react-icons/bi';
import * as SiIcons from 'react-icons/si';

const SidebarData = [
  {
    title: 'Category',
    path: '/',
    icon: <BiIcons.BiCategory />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Business Travel',
        path: '/category/Business_travel',
        icon: <SiIcons.SiYourtraveldottv />
      },
      {
        title: 'Volunteer Travel',
        path: '/category/volunteer_travel',
        icon: <SiIcons.SiYourtraveldottv/>
      },
      {
        title: 'The Group Tour',
        path: '/category/group_travel',
        icon: <SiIcons.SiYourtraveldottv/>
      },
      {
        title: 'Solo travel',
        path: '/category/Solo_travel',
        icon: <SiIcons.SiYourtraveldottv/>
      },
      {
        title: 'Travel with family',
        path: '/category/travel_with_family',
        icon: <SiIcons.SiYourtraveldottv />
      },
      {
        title: 'Travel for an event',
        path: '/category/event_travel',
        icon: <SiIcons.SiYourtraveldottv />
      },

    ]
  },
 /*  {
    title: 'Reports',
    path: '/reports',
    icon: <IoIcons.IoIosPaper />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Reports',
        path: '/reports/reports1',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 2',
        path: '/reports/reports2',
        icon: <IoIcons.IoIosPaper />,
        cName: 'sub-nav'
      },
      {
        title: 'Reports 3',
        path: '/reports/reports3',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  }, */
/*   {
    title: 'Products',
    path: '/products',
    icon: <FaIcons.FaCartPlus />
  }, */
/*   {
    title: 'Team',
    path: '/team',
    icon: <IoIcons.IoMdPeople />
  }, */
  {
    title: 'Messages',
    path: '/messages',
    icon: <FaIcons.FaEnvelopeOpenText />,

    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
      {
        title: 'Message 1',
        path: '/messages/message1',
        icon: <IoIcons.IoIosPaper />
      },
      {
        title: 'Message 2',
        path: '/messages/message2',
        icon: <IoIcons.IoIosPaper />
      }
    ]
  },
  {
    title: 'Support',
    path: '/support',
    icon: <IoIcons.IoMdHelpCircle />
  }
];



const SidebarNav = styled.nav`
  background: #15171c;
  width: 300px;
  height: 100vh;
  display: flex;
  justify-content: center;
  position: fixed;
  top: 0;
  left: ${({ sidebar }) => (sidebar ? '0' : '-100%')};
  transition: 350ms;
  z-index: 10;
`;


const Sidebar = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="nav_item" >
          <Link className="nav_icon_link" to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <SidebarNav sidebar={sidebar}>
          <div className="div_sidebar_wrap">
            <Link className="nav_icon_link" to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </Link>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} />;
            })}
          </div>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;
