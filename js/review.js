window.onload = function () {
  //test
  localStorage.clear();

  let obj = { id: "255", name: "수경", content: "내용", pw: "1234" };
  saveReview(obj);
  let obj2 = { id: "255", name: "상우", content: "내용", pw: "4321" };
  saveReview(obj2);

  loadReview(255);
};

const saveReview = function (obj) {
  // Format change
  const value = JSON.stringify(obj);
  // Save Data (Key = Random)
  localStorage.setItem(Math.random(), value);
};

const loadReview = function (id) {
  // Data filtering
  const reviews = Object.keys(window.localStorage).filter((rv) => {
    const rvData = JSON.parse(localStorage.getItem(rv));
    return rvData.id == id;
  });

  //test
  const reviewBox = document.querySelector("#test");
  console.log(reviews);
  reviews.forEach((rv) => {
    const rvData = JSON.parse(localStorage.getItem(rv));
    const item = document.createElement("h1");
    item.innerHTML = `${rvData.name} / ${rvData.content} / ${rvData.pw}`;
    reviewBox.appendChild(item);
  });
  //end test
};
