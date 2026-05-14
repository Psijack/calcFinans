import { useState, useEffect} from "react";


function TotalCapital(){
    const [money,setMoney] = useState({
        cardCapital:1000,
        valutCapital:500,
        criptaCapital:500,
    });

    const allCapital = money.cardCapital+money.valutCapital+money.criptaCapital;
   
    return(
        <div className="wrapper">
            <p className="title">TotalCapital</p>
            <div className="total_capital">
                <div className="capital_card">
                    <p className="wallet">All Capital</p>
                    <p className="money">{allCapital}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Card Capital</p>
                    <p className="money">{money.cardCapital}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Valut Capital</p>
                    <p className="money">{money.valutCapital}</p>
                </div>
                <div className="capital_card">
                    <p className="wallet">Cripta Capital</p>
                    <p className="money">{money.criptaCapital}</p>
                </div>
            </div>      
        </div>
    )
}

export default TotalCapital;