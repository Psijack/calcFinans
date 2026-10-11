
import { Outlet, Link } from 'react-router-dom';
import './Menu.sass';
import './MenuMedia.sass';

import { Dispatch, SetStateAction } from 'react';

interface ChildProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

function Menu({openMenu, setOpenMenu}) {


    const useButton = ()=>{
        setOpenMenu(prev => !prev)
    }
  
  return (
    <>
      <section>
        <nav>
            <div className='menu' style={openMenu ? {display: 'flex'} : {display:'none'}}>
                <div className="menu__button" onClick={useButton}>close</div>
                <Link to={'TotalCapital'}>Total Capital</Link>
                <Link to={'SpendingIncome'}>Spending/Income</Link>
                <Link to={'Reports'}>Reports</Link>
            </div>
        </nav>
        <Outlet/>
      </section>
    </>
  )
}

export default Menu
