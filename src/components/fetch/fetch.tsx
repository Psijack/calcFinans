
const fetchCategory = async (newCategory:string, category:string, ) => {
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
export {fetchCategory, fetchChangeCategory};