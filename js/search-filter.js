
let $dropDown = null;


function searchByFilter(){

    // 정렬 알고리즘 짜야한다
    // 찾아야하는 레이팅값을 받아오기
     // 카드정보 = cardcontariner id = card-container-01
    // card-container-01 를 받아와한다 
    // 어떻게 받아올까 
    // 카드정보 정렬하기
    
    let cardContariner = document.getElementById("card-container-01") // 카드정보 = cardcontariner id = card-container-01
    let arr = cardContariner.children
    arr.sort((a,b) => { 

       let aRating = Number(a.getElementsByClassName("card-back").lastChild.value)
       let bRating = Number(b.getElementsByClassName("card-back").lastChild.value)

       if(aRating > bRating ){

        return -1;

       }
      
       else if(aRating == bRating){

        return 0;

       }

       else{

        return 1;

       }
        

    }) 

    cardContariner.innerHTML='';

    for(i=0;i<arr.length;i++)

    cardContariner.appendChild(arr[i])
   
}

function setDropdown(elementId){

    if(!(typeof elementId == "string")) return;
         
    $dropDown = document.getElementById(elementId);

}


searchByFilter();





export{searchByFilter}