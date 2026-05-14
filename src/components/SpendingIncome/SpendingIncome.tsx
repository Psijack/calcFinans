import './SpendingIncome.sass';

import { useState } from 'react';

interface Categories{
    name: string;
    amount: string;
}

function SpendingIncome(){
    const [newCategory, setNewCategory] = useState('');
    const [categories, setCategories] = useState<Categories[]>([]);

    const handleCreateCategory = (e: React.FormEvent)=>{
        e.preventDefault();
        setCategories(prev => [...prev, {
            id: Date.now(),
            name: newCategory,
            amount: ''
        }]);
        setNewCategory('');
    }

    
    return(
        <div className="wrapper">
            <p>SpendingIncome</p>
            <div className="create__form">
                <form onSubmit={handleCreateCategory}>
                    <label htmlFor="0" >Create new category</label>
                    <input type="text" id='0' value={newCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                    <button type="submit">Create</button>ФЕНЭ.
                </form>
            </div>
            <div className='create__form'>
                {
                    categories.length === 0 ? (
                    <p>Пока нет категорий. Создайте первую выше ↑</p>)
                        : (
                            categories.map((item,i)=>(
                                <div key={i}>
                                    <label htmlFor={`amount-${i}`}>
                                        {item.name}
                                    </label>
                                    <input 
                                        type="number"
                                        id='amount-i'
                                        value={item.amount}
                                        // onChange={(e)=> handleAmountChange(item.name, e.target.value)}
                                        placeholder="0" />
                                    <button type="button">Save</button>
                                </div>
                                
                                )
                            )
                        ) 
                }
            </div>
        </div>


    )
}

export default SpendingIncome;