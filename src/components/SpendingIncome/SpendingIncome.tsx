import './SpendingIncome.sass';

import { useState,useEffect } from 'react';
import {fetchCategory, fetchChangeCategory, fetchDeleteCategory} from '../fetch/fetch';
import { useAuth } from '../Autorition/AutoContext/AutoContext';

interface Categories{
    id: number;
    data:string;
    name: string;
    amount: string;
    safeAmount: string;
    userId: number | null;
}
type CategoryType = 'spending' | 'income';

function SpendingIncome({openMenu, setOpenMenu}){

    const [newCategorySpending, setNewCategorySpending] = useState<string>('');
    const [newCategoryIncome, setNewCategoryIncome] = useState<string>('');
    const [categoriesSpending, setCategoriesSpending] = useState<Categories[]>([]);
    const [categoriesIncome, setCategoriesIncome] = useState<Categories[]>([]);

    const {userId} = useAuth();

    useEffect(()=>{
        fetch('http://localhost:3000/categoriesSpending')
        .then(response => response.json())
        .then((data:Categories[])=>{
            const filterUser = data.filter(item=> item.userId === userId)
            setCategoriesSpending(filterUser)
        })
        fetch('http://localhost:3000/categoriesIncome')
        .then(response => response.json())
        .then((data:Categories[])=>{
            const filterUser = data.filter(item=> item.userId === userId)
            setCategoriesIncome(filterUser)
        })

    },[])

    const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>, type: CategoryType ) =>{
        const state = type === 'spending' ? 'categoriesSpending' : 'categoriesIncome';
        const setState = type === 'spending' ? setCategoriesSpending : setCategoriesIncome
        const id = e.currentTarget.parentElement?.id;
        fetchDeleteCategory(state, id);
        setState(prev => prev.filter(items=> String(items.id) !==id))
        
    }
    const handleCreateCategory = async(e: React.FormEvent, category:CategoryType)=>{
        e.preventDefault();
        const spend = categoriesSpending.some(item => item.name === newCategorySpending);
        const income = categoriesIncome.some(item => item.name === newCategoryIncome);

        if (newCategorySpending === '' && newCategoryIncome ==='') {
            alert('need typed category');
            
        } 
        else if(spend){
            alert('This category created in Spending');
            setNewCategorySpending('');
        }else if(income){
            alert('This category created in Income')
            setNewCategoryIncome('');
        } 
        else{
            if (category === 'spending') {
                const newitem:Categories = await fetchCategory(
                      newCategorySpending,
                      'categoriesSpending',
                      userId
                );
                setCategoriesSpending(prev => [...prev, newitem]);
                setNewCategorySpending('');
               
            }else {
                const newitem: Categories = await fetchCategory(
                       newCategoryIncome,
                      'categoriesIncome',
                      userId
                )
                setCategoriesIncome(prev => [...prev, newitem]);
                setNewCategoryIncome('');
            }
        }
    }
    const handleChangeAmount = (id:number, value:string, category: CategoryType)=>{
       if (category === 'spending') {
         setCategoriesSpending(prev => 
            prev.map(item =>
                 item.id === id ? { ...item, amount:value}: item
                )
            );
       }else{
        setCategoriesIncome(prev => 
            prev.map(item =>
                 item.id === id ? { ...item,amount:value}: item
                )
            );
       }
        };

    const handleSafeAmount = async (id:number, category: CategoryType)=>{
        const categories = category === 'spending' ? categoriesSpending : categoriesIncome;
        const currentItem = categories.find(item => item.id === id);
        const endpoint = category === 'spending' ? 'categoriesSpending' : 'categoriesIncome';
        if (!currentItem?.amount) return;

        const calcAmount = (parseFloat(currentItem.safeAmount || '0') + parseFloat(currentItem.amount || '0')).toString();
        try{
            await fetchChangeCategory(endpoint, id, calcAmount)
            if (category === 'spending') {
                setCategoriesSpending(prev=>
                    prev.map(item=>
                        item.id === id
                        ? {...item, safeAmount:calcAmount, amount:''}
                        :item
                    )
                )
            }else{
                setCategoriesIncome(prev=>
                    prev.map(item=>
                        item.id === id
                        ? {...item, safeAmount:calcAmount, amount:''}
                        :item
                    )
                )
            }
        }catch{
            console.error('Ошибка сохранения')
        }
    }

        const useButton = ()=>{
        setOpenMenu(prev => !prev)
    }

    const createSpendingIncome = (type: CategoryType) =>{
        const state = type === 'spending' ? categoriesSpending: categoriesIncome;
        const setNewCategory = type === 'spending' ? setNewCategorySpending : setNewCategoryIncome;
        const stateNewCategory = type === 'spending' ? newCategorySpending : newCategoryIncome;

        return(<div className={type}>
                <p>{type == 'spending'? 'Spending' : 'Income'}</p>
            <div className="create__form">
                <form onSubmit={(e)=>handleCreateCategory(e, type)}>
                    <input className='create__category' type="text" id='0' placeholder='Create new category' value={stateNewCategory} onChange={(e) => setNewCategory(e.target.value)}/>
                    <button className='create__but' type="submit">+</button>
                </form>
            </div>
            <div className='form__lists'>
                {
                    state.length === 0 ? (
                    <p>Пока нет категорий. Создайте первую выше ↑</p>)
                        : (
                            state.map((item,i)=>(
                                <div className='form__list' key={i}>
                                    <div id={item.id} className='show__form'>
                                        <div className='show__wrapper'>
                                            <label htmlFor={`amount-${i}`}>
                                                {item.name}: 
                                            </label>
                                            <div> {item.safeAmount || '0'}</div>
                                        </div>
                                        <div className='delete' onClick={(e)=>deleteCategory(e, type)}>delete</div>
                                    </div>
                                    <input
                                        className='create__category'
                                        type="number"
                                        id={`amount-${i}`}
                                        value={item.amount ?? ''}
                                        onChange={(e)=> handleChangeAmount(item.id, e.target.value,type)}
                                        placeholder="0" />
                                    <button className='create__but' type="button" onClick={()=>{handleSafeAmount(item.id,type)}}>Save</button>
                                </div>
                                
                                )
                            )
                        ) 
                }
            </div>
            </div>)
    }
    return(
        <div className="wrapper wrapper__Spending_Income">
            <div className="button__spending"  style={openMenu ? {display:'none'}: {display: 'flex'}} onClick={useButton}>close</div>
            {createSpendingIncome('spending')}
            {createSpendingIncome('income')}
        </div>
    )
}

export default SpendingIncome;
