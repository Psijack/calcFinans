
const fetchCategory = async (newCategory:string) => {
    const response = await fetch('http://localhost:3000/categories',{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            name: newCategory,
            amount: 0,
            date: new Date().toISOString()
        })
    });
    const result = await response.json();
    console.log(result);
}

export default fetchCategory;