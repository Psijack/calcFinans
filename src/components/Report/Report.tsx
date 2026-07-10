
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

const Reports = () =>{
    const [spending, setSpending] = useState<Categories[]>([]);
    const [income, setIncome] = useState<Categories[]>([]);

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

// spending.map((item)=> console.log(item.safeAmount));
    return(
        <div className="wrapper">
            <div className="spending">
                <p>Category: Spending</p>
                {
                    spending.length === 0 ?<p>need create category to look for filter</p>:
                    (spending.map((item)=>
                        (
                            <ul key={item.id}>
                                <li>name: {item.name}</li>
                                <li>amount: {item.safeAmount}</li>
                            </ul>
                        )
                    ))
                }
            </div>
            <div className="income">
                <p>Category: Income</p>
                {
                    income.length === 0 ?<p>need create category to look for filter</p>:
                    (income.map((item)=>
                        (
                            <ul key={item.id}>
                                <li>name: {item.name}</li>
                                <li>amount: {item.safeAmount}</li>
                            </ul>
                        )
                    ))
                }
            </div>
        </div>

    )
}

export default Reports;