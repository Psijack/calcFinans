
import { Outlet, Link } from 'react-router-dom';
import './Menu.sass';
import './MenuMedia.sass';

import {useState, useEffect } from 'react';

interface ChildProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function Menu({openMenu, setOpenMenu}) {
  const [isMobile, setIsMobile] = useState(false);

    const useButton = ()=>{
        setOpenMenu(prev => !prev)
    }

    const closeMenu = (e) =>{
      const mediaQuery = window.matchMedia('(max-width: 1024px)');
      const handleChange = (e) => setIsMobile(e.matches);
      setIsMobile(mediaQuery.matches);
      if(isMobile){  
        setOpenMenu(prev => !prev)
        console.log(isMobile);
      }
      
    }

  
  return (
    <>
      <section>
        <nav>
            <div className='menu' style={openMenu ? {display: 'flex'} : {display:'none'}}>
                <div className="menu__button" onClick={useButton}>close</div>
                <Link to={'TotalCapital'} onClick={(e)=>{closeMenu(e)}}>Total Capital</Link>
                <Link to={'SpendingIncome'} onClick={(e)=>{closeMenu(e)}}>Spending/Income</Link>
                <Link to={'Reports'} onClick={(e)=>{closeMenu(e)}}>Reports</Link>
            </div>
        </nav>
        <Outlet/>
      </section>
    </>
  )
}

export default Menu
