const $sortBtnContainer = document.createElement('div');
$sortBtnContainer.classList.add('dropDown');
const $sortBtn = document.createElement('button');
$sortBtn.innerText = '정렬';
const $sortMenu = document.createElement('div');
$sortMenu.classList.add('subMenu');
const $sortMenuA = document.createElement('a');
$sortMenuA.setAttribute('href', '#none');
$sortMenuA.innerText = '오름차순';
$sortMenuA.addEventListener("click", function () {
  searchByFilter(true);
});
const $sortMenuB = document.createElement('a');
$sortMenuB.setAttribute('href', '#none');
$sortMenuB.innerText = '내림차순';
$sortMenuB.addEventListener("click", function () {
  searchByFilter(false);
});

$sortMenu.appendChild($sortMenuA);
$sortMenu.appendChild($sortMenuB);
$sortBtnContainer.appendChild($sortBtn);
$sortBtnContainer.appendChild($sortMenu);

const getSortButtonContainer = () => $sortBtnContainer;

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

export{
  getSortButtonContainer
};






// 정렬 알고리즘 짜야한다
    // 찾아야하는 레이팅값을 받아오기
     // 카드정보 = cardcontariner id = card-container-01
    // card-container-01 를 받아와한다 
    // 어떻게 받아올까 
    // 카드정보 정렬하기
