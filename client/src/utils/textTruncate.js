export const textTruncateWord = (text,maxLenght = 400) =>{
    if(text.length > maxLenght){
        const truncateToChar = text.slice(0,maxLenght)
        const truncateToWord = truncateToChar.substring(0,Math.min(truncateToChar.length,truncateToChar.lastIndexOf(" ")))
        return truncateToWord + " ..."
        
    }else{
        return text
    }
}
export const textTruncateChar = (text,maxLenght=400) =>{
    if(text.lenght > maxLenght){
        return text.slice(0,maxLenght) + '...'
    }else{
        return text
    }
}