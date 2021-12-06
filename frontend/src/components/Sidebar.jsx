import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import SubMenu from './SubMenu'
import SubMenu2 from './SubMenu2'
import { IconContext } from 'react-icons/lib'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'
import * as SiIcons from 'react-icons/si'
import { listTourCategories } from '../redux/actions/tourActions'

const SidebarData = [
  {
    title: 'Category',
    path: '/',
    icon: <BiIcons.BiCategory />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,

    subNav: [
           /*  {
              title: 'Business Travel',
              path: '/category/Business_travel',
              icon: <SiIcons.SiYourtraveldottv />
            } */

    ]
  },
  /* {
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
  } */
];


const SidebarData2 = [
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

/* const Nav = styled.div`
  background: #15171c;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`; */

const NavIcon = styled(Link)`
  margin-left: 2rem;
  font-size: 2rem;
  height: 80px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const SidebarNav = styled.nav`
  background: #15171c;
  width: 250px;
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

  const listTourCategory = useSelector(state => state.listTourCategory)
  const { categories, loading: loadingCategories, error: errorCategories } = listTourCategory


  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(listTourCategories())
  }, [dispatch])

  const showSidebar = () => {
    setSidebar(!sidebar)
  }


  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="nav_item">
          <Link className="nav_icon_link" to='#'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <SidebarNav sidebar={sidebar}>
          <div className="div_sidebar_wrap">
            <div className="nav_icon_link" to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} categories={categories} />;
            })}
            {SidebarData2.map((item, index) => {
              return <SubMenu2 item={item} key={index} />;
            })}
          </div>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;