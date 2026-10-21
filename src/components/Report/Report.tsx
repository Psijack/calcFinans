
import { useState, useEffect } from "react";
import { getSafeAmountI, getSafeAmountS } from "../fetch/fetch";
import { useAuth } from "../Autorition/AutoContext/AutoContext";

import './Report.sass'

interface Categories{
    id: number;
    data:string;
    name: string;
    amount: string;
    safeAmount: string;
    userId: number | null;
}

type Category = 'spending' | 'income'

const Reports = ({openMenu, setOpenMenu}) =>{
    const [spending, setSpending] = useState<Categories[]>([]);
    const [income, setIncome] = useState<Categories[]>([]);

    const useButton = ()=>{
        setOpenMenu(prev => !prev)
    }

    const {userId} = useAuth();

    useEffect(()=>{
            getSafeAmountS()
                .then((items: Categories[])=>{
                    const filterUser = items.filter(item=> item.userId === userId)
                    const arr = [...filterUser].sort((a, b) => {
                        const amountA = parseFloat(a.safeAmount) || 0;
                        const amountB = parseFloat(b.safeAmount) || 0;
                        return amountB - amountA;   // от большего к меньшему
                    });
                    setSpending(arr)

                })
            getSafeAmountI()
                .then((items: Categories[])=>{
                    const filterUser = items.filter(item=> item.userId === userId)
                    const arr = [...filterUser].sort((a, b) => {
                        const amountA = parseFloat(a.safeAmount) || 0;
                        const amountB = parseFloat(b.safeAmount) || 0;
                        return amountB - amountA;   // от большего к меньшему
                    });
                    setIncome(arr)
                });
    },[])

    const createReport = ( type: Category) =>{

        const state = type === 'spending' ? spending : income;

        return(<div className={type}>
                <p>Category: {type}</p>
                {
                    state.length === 0 ?<p>need create category to look for filter</p>:
                    (state.map((item)=>
                        (
                            <ul key={item.id}>
                                <li>name: {item.name}</li>
                                <li>amount: {item.safeAmount}</li>
                            </ul>
                        )
                    ))
                }
            </div>)
    }
    return(
        <div className="wrapper__report wrapper">
           <div className="button" style={openMenu ? {display:'none'}: {display: 'flex'}} onClick={useButton}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {createReport('spending')}
            {createReport('income')}
        </div>

    )
}

export default Reports;