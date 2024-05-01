const filterChecker = ["임의"];

window.onload = function () {
  // Initialization for testing
  localStorage.clear();

  // Test data input
  let obj = { id: "255", name: "임의", content: "내용", pw: "1234" };
  saveReview(obj);
  let obj2 = { id: "255", name: "상우", content: "내용", pw: "4321" };
  saveReview(obj2);

  //Load data
  loadReview(255);
};

//Save Methed
const saveReview = function (obj) {
  //Validation check

  // Name
  const check_name = obj.name.replace(/ /g, "");
  if (check_name.length > 3) {
    alert("닉네임 길이는 최대 3글자를 넘을 수 없습니다.");
    return;
  } else if (check_name.length == 0) {
    alert("닉네임을 다시 입력해주세요!");
    return;
  }

  // Pw
  const check_pw = obj.pw.replace(/ /g, "");
  if (check_pw.length > 4) {
    alert("비밀번호의 길이는 4개를 넘을 수 없습니다!");
    return;
  } else if (check_pw.length == 0) {
    alert("비밀번호를 다시 입력해주세요!");
    return;
  }

  // Content
  const check_content = obj.content.replace(/ /g, "");
  if (check_content.length > 50) {
    alert("리뷰 내용은 50자를 넘을 수 없습니다!");
    return;
  } else if (check_content.length == 0) {
    alert("비밀번호를 다시 입력해주세요!");
    return;
  }

  // Bad language
  for (let text of filterChecker) {
    if (
      check_name.includes(text) ||
      check_pw.includes(text) ||
      check_content.includes(text)
    ) {
      alert("작성 내용에는 비속어를 사용하실 수 없습니다.");
      return;
    }
  }

  // Key Create & Apply
  obj.key = Math.random();
  // Format change
  const value = JSON.stringify(obj);
  // Save Data (Key = Random)
  localStorage.setItem(obj.key, value);
};

//Load Methed
const loadReview = function (id) {
  // Data filtering
  const reviews = Object.keys(window.localStorage).filter((rv) => {
    const rvData = JSON.parse(localStorage.getItem(rv));
    return rvData.id == id;
  });

  //Test
  const reviewBox = document.querySelector("#test");

  reviews.forEach((rv) => {
    const rvData = JSON.parse(localStorage.getItem(rv));
    const h1 = document.createElement("h1");
    h1.innerHTML = `${rvData.name} / ${rvData.content}`;
    reviewBox.appendChild(h1);

    h1.addEventListener("click", function (event) {
      const aws = prompt("리뷰 삭제 pw를 입력하세요", "pw를 입력해주세요");

      if (aws && rvData.pw == aws) {
        //Delete data
        localStorage.removeItem(rvData.key + "");
        h1.remove();
        alert("삭제 되었습니다!");
      } else if (aws != null) {
        alert("비밀번호를 다시 입력해주세요!");
      }
    });
  });
};
