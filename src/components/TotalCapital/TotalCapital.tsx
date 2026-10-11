import { useState, useEffect} from "react";
import { getSafeAmountS, getSafeAmountI } from "../fetch/fetch";
import { useAuth } from "../Autorition/AutoContext/AutoContext";

import './TotalCapital.sass';
import '../../mediaRools/media.sass';

interface Categories{
    id: number;
    data:string;
    name: string;
    amount: string;
    safeAmount: string;
    userId: number | null;
}

type Category = 'spending' | 'income' | 'remains';

function TotalCapital({setOpenMenu, openMenu}){
    const[spending, setSpending] = useState<number>(0);
    const[income, setIncome] = useState<number>(0);
    const {userId} = useAuth();
    

    useEffect(()=>{
        getSafeAmountS()
            .then((items: Categories[])=>{
                const userIdSafeAmount = items.filter(item=> item.userId === userId)
                const safeAmount = userIdSafeAmount.map(item => Number(item.safeAmount));
                const calc: number =safeAmount?.reduce((a,b)=> a+b,0);
                setSpending(calc)
            });
        getSafeAmountI()
            .then((items: Categories[])=>{
                const userIdSafeAmount = items.filter(item=> item.userId === userId)
                const safeAmount = userIdSafeAmount.map(item => Number(item.safeAmount));
                const calc: number = safeAmount?.reduce((a,b)=> a+b,0);
                setIncome(calc)
            });
    },[])

    // console.log(user.length);
    const remains = income - spending;

    const createTotal = (type: Category, calc:number) =>{
        return(
            <div className="capital_card">
                <p className="wallet">{type}</p>
                <p className="money">: {calc} </p>
            </div>
        )
    }

    const useButton = ()=>{
        setOpenMenu(prev => !prev)
    }

    return(
        <div className="wrapper wrapper__total">
            <div className="button" style={openMenu ? {display:'none'}: {display: 'flex'}} onClick={useButton}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            <h2 className="title">TotalCapital</h2>
            <div className="total_capital">
                {createTotal('spending', spending)}
                {createTotal('income', income)}
                {createTotal('remains', remains)}
            </div>
        </div>
    )
}

export default TotalCapital;