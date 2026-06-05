import { useState, useEffect} from "react";
import { getSafeAmountS, getSafeAmountI } from "../fetch/fetch";

import './TotalCapital.sass'

interface Categories{
    id: number;
    data:string;
    name: string;
    amount: string;
    safeAmount: string;
}

function TotalCapital(){
    const[spending, setSpending] = useState<number>(0);
    const[income, setIncome] = useState<number>(0);
    
    useEffect(()=>{
        getSafeAmountS()
            .then((items: Categories[])=>{
                const safeAmount = items.map(item => Number(item.safeAmount));
                const calc: number =safeAmount?.reduce((a,b)=> a+b,0);
                setSpending(calc)
            });
        getSafeAmountI()
            .then((items: Categories[])=>{
                const safeAmount = items.map(item => Number(item.safeAmount));
                const calc: number =safeAmount?.reduce((a,b)=> a+b,0);
                setIncome(calc)
            });
    },[])

    const remains = spending - income;
   
    return(
        <div className="wrapper wrapper__total">
            <p className="title">TotalCapital</p>
            <div className="total_capital">
                <div className="capital_card">
                    <p className="wallet">Spending</p>
                    <p className="money">{spending}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Income</p>
                    <p className="money">{income}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Remains</p>
                    <p className="money">{remains}</p>
                </div>
            </div>      
        </div>
    )
}

export default TotalCapital;