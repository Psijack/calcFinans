import { Outlet, Link } from 'react-router-dom';
import './Menu.sass'

function Menu() {
  return (
    <>
      <section>
        <nav>
            <div>
                <Link to={'TotalCapital'}>Total Capital</Link>
                <Link to={'SpendingIncome'}>Spending/Income</Link>
                <Link to={'Category'}>Category</Link>
                <Link to={'Schedule'}>Schedule</Link>
                <Link to={'Wallets'}>Wallets</Link>
            </div>
        </nav>
        <Outlet/>
      </section>
    </>
  )
}

export default Menu
