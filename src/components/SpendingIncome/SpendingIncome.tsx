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

function SpendingIncome(){

    const [newCategorySpending, setNewCategorySpending] = useState<string>('');
    const [newCategoryIncome, setNewCategoryIncome] = useState<string>('');
    const [categoriesSpending, setCategoriesSpending] = useState<Categories[]>([]);
    const [categoriesIncome, setCategoriesIncome] = useState<Categories[]>([]);

    const [allCategoriesSpending, setAllCategoriesSpending] = useState<Categories[]>([]);
    const [allCategoriesIncome, setAllCategoriesIncome] = useState<Categories[]>([]);

    const {userId} = useAuth();

    console.log(allCategoriesSpending);
    useEffect(()=>{
        fetch('http://localhost:3000/categoriesSpending')
        .then(response => response.json())
        .then((data:Categories[])=>{
            setAllCategoriesSpending(data);
            const filterUser = data.filter(item=> item.userId === userId)
            setCategoriesSpending(filterUser)
        })
        fetch('http://localhost:3000/categoriesIncome')
        .then(response => response.json())
        .then((data:Categories[])=>{
            setAllCategoriesIncome(data)
            const filterUser = data.filter(item=> item.userId === userId)
            setCategoriesIncome(filterUser)
        })

    },[])

    const deleteCategory = (e: React.MouseEvent<HTMLButtonElement>,) =>{
        const id = e.currentTarget.parentElement?.id;
        fetchDeleteCategory('categoriesSpending', id);
        setCategoriesSpending(prev => prev.filter(items=> String(items.id) !==id))
        
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
    return(
        <div className="wrapper">
            <div className="spending">
                <p>Spending</p>
            <div className="create__form">
                <form onSubmit={(e)=>handleCreateCategory(e, 'spending')}>
                    <input className='create__category' type="text" id='0' placeholder='Create new category' value={newCategorySpending} onChange={(e) => setNewCategorySpending(e.target.value)}/>
                    <button className='create__but' type="submit">+</button>
                </form>
            </div>
            <div className='form__lists'>
                {
                    categoriesSpending.length === 0 ? (
                    <p>Пока нет категорий. Создайте первую выше ↑</p>)
                        : (
                            categoriesSpending.map((item,i)=>(
                                <div className='form__list' key={i}>
                                    <div id={String(item.id)} className='show__form'>
                                        <div className='show__wrapper'>
                                            <label htmlFor={`amount-${i}`}>
                                                {item.name}: 
                                            </label>
                                            <div> {item.safeAmount || '0'}</div>
                                        </div>
                                        <div className='delete' onClick={(e)=>deleteCategory(e)}>delete</div>
                                    </div>
                                    <input
                                        className='create__category'
                                        type="number"
                                        id={`amount-${i}`}
                                        value={item.amount ?? ''}
                                        onChange={(e)=> handleChangeAmount(item.id, e.target.value,'spending')}
                                        placeholder="0" />
                                    <button className='create__but' type="button" onClick={()=>{handleSafeAmount(item.id,'spending')}}>Save</button>
                                </div>
                                
                                )
                            )
                        ) 
                }
            </div>
            </div>
            <div className="income">
                <p>Income</p>
                <div className="create__form">
                <form onSubmit={(e)=>handleCreateCategory(e, 'income')}>
                    <input type="text" className='create__category' id='0' placeholder='Create new category' value={newCategoryIncome} onChange={(e) => setNewCategoryIncome(e.target.value)}/>
                    <button className='create__but' type="submit">+</button>
                </form>
            </div>
                        <div className='form__lists'>
                {
                    categoriesIncome.length === 0 ? (
                    <p>Пока нет категорий. Создайте первую выше ↑</p>)
                        : (
                            categoriesIncome.map((item,i)=>(
                                <div className='form__list' key={i}>
                                    <div className='show__form'>
                                        <label htmlFor={`amount-${i}`}>
                                        {item.name}: 
                                    </label>
                                    <div> {item.safeAmount || '0'}</div>
                                    </div>
                                    <input
                                        className='create__category'
                                        type="number"
                                        id={`amount-${i}`}
                                        value={item.amount ?? ''}
                                        onChange={(e)=> handleChangeAmount(item.id, e.target.value,'income')}
                                        placeholder="0" />
                                    <button className='create__but' type="button" onClick={()=>{handleSafeAmount(item.id,'income')}}>Save</button>
                                </div>
                                
                                )
                            )
                        ) 
                }
            </div>
            </div>
        </div>


    )
}

export default SpendingIncome;