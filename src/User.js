
async function callApi(){
    try {
        let res=await fetch('https://jsonplaceholder.typicode.com/users')
        let result=await res.json()
        return result
    } catch (error) {
        return error
    }
}

export default callApi