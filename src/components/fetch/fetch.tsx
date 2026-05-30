
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
    console.log(result);
    return result;
}

const fetchChangeCategory = async (category:string, data:string,  newAmount:string)=>{
   const response = await fetch(`http://localhost:3000/${category}/${data}`,{
        method: 'PATCH',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
           amount: newAmount
        })
    });
        const result = await response.json();
    
}
export {fetchCategory, fetchChangeCategory};