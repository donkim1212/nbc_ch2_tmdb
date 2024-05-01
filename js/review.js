const saveReview = function (obj) {
  const value = JSON.stringify(obj);
  localStorage.setItem(obj.name, value);
};

const loadReview = function () {
  let reviews = Object.keys(window.localStorage);
  reviews.forEach((review) => {
    review;
  });

  console.log(reviews);
};

obj = { name: "수연", content: "내용", pw: "1234" };
saveReview(obj);
