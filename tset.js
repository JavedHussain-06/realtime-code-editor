function  total(num,per,days){
    let num1 = num
    for(let i = 1; i <= days ; i++){
        const percentage = per/100*num1
     num1 = num1 + percentage
     console.log((num1).toFixed(2))
    }
}

    total(100,1.2,365)

    // 26 Oct 2023 ===>>>  100 days
    // 1090  ==> $600 for 60 days

    // 539 + 200 $

    // 1342.54  ==>> 60 days for $739

    // 979 + 363 
    
    // console.log(979 + 363)
    //  67.1