import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import * as FaIcons from 'react-icons/fa'
import * as AiIcons from 'react-icons/ai'
import SubMenu from './SubMenu.jsx'
import SubMenu2 from './SubMenu2.jsx'
import { IconContext } from 'react-icons/lib'
import * as IoIcons from 'react-icons/io'
import * as RiIcons from 'react-icons/ri'
import * as BiIcons from 'react-icons/bi'
import * as SiIcons from 'react-icons/si'
import * as GrIcons from 'react-icons/gr'
import * as MdIcons from 'react-icons/md'
import { listTourCategories, listTourCountry } from '../redux/actions/tourActions'

import Axios from "axios"

const SidebarData = [
  {
    title: 'Категории',
    path: '/',
    icon: <BiIcons.BiCategory />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: []
  }
];

const SidebarDataCountry = [
  {
    title: 'Страны',
    path: '/',
    icon: <BiIcons.BiCategoryAlt   />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: []
  }
];

const SidebarDataCity = [
  {
    title: 'Города',
    path: '/',
    icon: <MdIcons.MdOutlineLocationCity />,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: []
  }
];

/* const SidebarData2 = [
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
]; */


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
  const [listCountry, setListCountry] = useState('');
  const [listCity, setListCity] = useState('');
  const listTourCategory = useSelector(state => state.listTourCategory)
  const { categories, loading: loadingCategories, error: errorCategories } = listTourCategory
  const dispatch = useDispatch()
  const showSidebar = () => {
    setSidebar(!sidebar)
  }

  const getListField = async () => {
    dispatch(listTourCategories())
    const listCountry = await Axios.get('/api/tours/country')
    setListCountry(listCountry.data.sort())
    const listCity = await Axios.get('/api/tours/city')
    setListCity(listCity.data.sort())
  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className="nav_item">
          <Link className="nav_icon_link" to='#' onClick={getListField}>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <SidebarNav sidebar={sidebar}>
          <div className="div_sidebar_wrap">
            <div className="nav_icon_link" to='#'>
              <AiIcons.AiOutlineClose onClick={showSidebar} />
            </div>
            {SidebarData.map((item, index) => {
              return <SubMenu item={item} key={index} list={categories} path="category"/>;
            })}
            {SidebarDataCountry.map((item, index) => {
              return <SubMenu item={item} key={index} list={listCountry} path="country" />;
            })}
            {SidebarDataCity.map((item, index) => {
              return <SubMenu item={item} key={index} list={listCity} path="city" />;
            })}
          </div>
        </SidebarNav>
      </IconContext.Provider>
    </>
  );
};

export default Sidebar;