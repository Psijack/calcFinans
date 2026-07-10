
const fetchCategory = async (newCategory:string, category:string, userId:number|null) => {
    const response = await fetch(`http://localhost:3000/${category}`,{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name: newCategory,
            amount: '',
            safeAmount:'0',
            data: new Date(),
            userId: userId,
        })
    });
    const result = await response.json();
    return result;
}

const fetchChangeCategory = async (category:string, id:number,  newAmount:string)=>{
   const response = await fetch(`http://localhost:3000/${category}/${id}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
           safeAmount: newAmount,
        })
    });
       
    
}

const fetchDeleteCategory = async (category:string, id:number|string|undefined)=>{
   const response = await fetch(`http://localhost:3000/${category}/${id}`,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    });
       
    
}

const getSafeAmountS = async()=>{
    const response = await fetch(`http://localhost:3000/categoriesSpending`)
    const data = response.json();
    return data;
}
const getSafeAmountI = async()=>{
    const response = await fetch(`http://localhost:3000/categoriesIncome`)
    const data = response.json();
    return data;
}

const getUser = async()=>{
    const response = await fetch('http://localhost:3000/users')
    const data = response.json();
    return data;
}
export {fetchCategory, fetchChangeCategory, getSafeAmountS, getSafeAmountI, getUser,fetchDeleteCategory};