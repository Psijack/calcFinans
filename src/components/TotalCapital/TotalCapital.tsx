import { useState, useEffect} from "react";
import { getSafeAmountS, getSafeAmountI } from "../fetch/fetch";
import { useAuth } from "../Autorition/AutoContext/AutoContext";
import './TotalCapital.sass'

interface Categories{
    id: number;
    data:string;
    name: string;
    amount: string;
    safeAmount: string;
    userId: number | null;
}

function TotalCapital(){
    const[spending, setSpending] = useState<number>(0);
    const[income, setIncome] = useState<number>(0);
    const [user, setUser] = useState<Categories>();
    const {userId} = useAuth();
    
    useEffect(()=>{
        getSafeAmountS()
            .then((items: Categories[])=>{
                const userIdSafeAmount = items.filter(item=> item.userId === userId)
                const safeAmount = userIdSafeAmount.map(item => Number(item.safeAmount));
                const calc: number =safeAmount?.reduce((a,b)=> a+b,0);
                setUser(items)
                setSpending(calc)
            });
        getSafeAmountI()
            .then((items: Categories[])=>{
                const userIdSafeAmount = items.filter(item=> item.userId === userId)
                const safeAmount = userIdSafeAmount.map(item => Number(item.safeAmount));
                const calc: number =safeAmount?.reduce((a,b)=> a+b,0);
                setIncome(calc)
            });
    },[])

    // console.log(user.length);
    const remains =income - spending;
   
    return(
        <div className="wrapper wrapper__total">
            <h2 className="title">TotalCapital</h2>
            <div className="total_capital">
                <div className="capital_card">
                    <p className="wallet">Income</p>
                    <p className="money">: {income} </p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Spending</p>
                    <p className="money">: {spending}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Remains</p>
                    <p className="money">: {remains}</p>
                </div>
            </div>      
        </div>
    )
}

export default TotalCapital;