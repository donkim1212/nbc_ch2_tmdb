
let $dropDown = null;


function searchByFilter(asc){
    
    let cardContainer = document.getElementById("card-container-01") // 카드정보 = cardcontariner id = card-container-01
    let arr = cardContainer.children;
    let arr2 = Array.from(arr)
   
    if (arr.length <= 0) return;
    arr2.sort((a,b) => { 
        
       let aRating = Number(a.querySelector("#rating-id").textContent);
       let bRating = Number(b.querySelector("#rating-id").textContent);

      if(aRating>bRating){

        return asc ? 1 : -1
      }
      
       else if(aRating == bRating){

        return 0;

       }

       else{

        return asc ? -1 : 1;

       }


    }) 

    cardContainer.innerHTML='';

    for(let i=0;i<arr2.length;i++) {
       
        cardContainer.appendChild(arr2[i]);
    }
   
}






function searchByFilter2(){
    
 
  let cardContainer = document.getElementById("card-container-01") // 카드정보 = cardcontariner id = card-container-01
  let arr = cardContainer.children;
  let arr2 = Array.from(arr)
 
  if (arr.length <= 0) return;
  arr2.sort((c,d) => { 
      
     let cName = c.querySelector("h1").innerText.toLowerCase();
     let dName = d.querySelector("h1").innerText.toLowerCase();

    for(let i=0; i<Math.min(cName.length,dName.length); i++)
      {
      
     if(cName.charCodeAt(i) < dName.charCodeAt(i))
      {
        return -1;
      }


       if(cName.charCodeAt(i) > dName.charCodeAt(i))
        {
          return 1;
        } 
    }

     if(cName.length == dName.length)
      {
        return 0;
      }
      
      return cName.length > dName.length ? 1 : -1

  }) 

  cardContainer.innerHTML='';

  for(let i=0;i<arr2.length;i++) {
     
      cardContainer.appendChild(arr2[i]);
  }
 
}




function setDropdown(elementId){

    if(!(typeof elementId == "string")) return;
         
    $dropDown = document.getElementById(elementId);

}


const $sor1btn = document.getElementById("sort-a1");
const $sor2btn = document.getElementById("sort-a2");
const $sor3btn = document.getElementById("sort-a3")

$sor1btn.addEventListener("click", function () {
    searchByFilter(true);

  });


  $sor2btn.addEventListener("click", function () {
    searchByFilter(false);

  });


  $sor3btn.addEventListener("click", function () {
    searchByFilter2();

  });



export{searchByFilter,searchByFilter2}






// 정렬 알고리즘 짜야한다
    // 찾아야하는 레이팅값을 받아오기
     // 카드정보 = cardcontariner id = card-container-01
    // card-container-01 를 받아와한다 
    // 어떻게 받아올까 
    // 카드정보 정렬하기
