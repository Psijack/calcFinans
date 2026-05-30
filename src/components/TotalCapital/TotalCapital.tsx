import { useState, useEffect} from "react";


function TotalCapital(){
    const [money, setMoney] = useState({
        spending:1000,
        income:500
    });

    const remains = money.spending - money.income;
   
    return(
        <div className="wrapper">
            <p className="title">TotalCapital</p>
            <div className="total_capital">
                <div className="capital_card">
                    <p className="wallet">Spending</p>
                    <p className="money">{money.spending}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Income</p>
                    <p className="money">{money.income}</p>
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