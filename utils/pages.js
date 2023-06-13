export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount/limit)
}

export const getPagesArray = (totalaPages) => {
    let result = [];

     for (let i = 0; i<totalaPages; i++){
        result.push(i+1)
     }
     return result;
}