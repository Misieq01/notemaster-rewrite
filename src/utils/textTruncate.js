export const textTruncateWord = (text,maxLenght = 400) =>{
    if(text.length > maxLenght){
        return text.slice(0, maxLenght).substring(0, Math.min(text.length, text.lastIndexOf(" "))) + "...";
        
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