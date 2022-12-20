export const getIncentiveList = async function(){
    return fetch(`/api/tiplist`)
        .then(res => res.json())
        .then(res =>  res.data)
}