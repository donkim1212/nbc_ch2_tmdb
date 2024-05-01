const filterChecker = ["임의"];

//비동기 진행해야함.
//loadReview 코드 더 진행해야함.
window.onload = function () {
  //#region Test root & information
  const rootBox = document.querySelector("#test");

  const nameBox = document.querySelector("#nameBox");
  const contentBox = document.querySelector("#contentBox");
  const pwBox = document.querySelector("#pwBox");

  const saveBtn = document.querySelector("#saveReview");
  //#endregion

  //#region Save Methed
  const saveReview = function (obj) {
    //#region Validation check
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
    //#endregion

    // Key Create & Apply
    obj.key = Math.random();
    // Format change
    const value = JSON.stringify(obj);
    // Save Data (Key = Random)
    localStorage.setItem(obj.key, value);

    loadReview(obj);
  };
  //#endregion

  //#region Load Method
  const loadReview = (obj) => {
    const elmt = CreateElement();
    elmt.innerHTML = `${obj.name} / ${obj.content}`; //더 진행해야함.
    Event_Subscribe(elmt);
  };
  //#endregion

  //#region All Load Methed
  const AllloadReview = function (id) {
    // Data filtering
    const reviews = Object.keys(window.localStorage).filter((rv) => {
      const rvData = JSON.parse(localStorage.getItem(rv));
      return rvData.id == id;
    });

    reviews.forEach((rv) => {
      const rvData = JSON.parse(localStorage.getItem(rv));

      const Emt = CreateElement(); //예시 요소 변경해야함.
      Event_Subscribe(Emt);
      Emt.innerHTML = `${rvData.name} / ${rvData.content}`;
    });
  };

  //#endregion
  //#region Subscribe to events
  const Event_Subscribe = (Element) =>
    Element.addEventListener("click", function (event) {
      const aws = prompt("리뷰 삭제 pw를 입력하세요", "pw를 입력해주세요");

      //data 넘겨주기!! 현재 rvData undefined!!
      if (aws && rvData.pw == aws) {
        //Delete data
        localStorage.removeItem(rvData.key + "");
        Element.remove();
        alert("삭제 되었습니다!");
      } else if (aws != null) {
        alert("비밀번호를 다시 입력해주세요!");
      }
    });
  //#endregion

  //#region Create Element
  const CreateElement = () => {
    const newElement = document.createElement("h1"); //변경해야함
    rootBox.appendChild(newElement);
    return newElement;
  };
  //#endregion

  //#region Save button event
  saveBtn.addEventListener("click", function () {
    const obj = {
      id: "255", // 끌어다 올 함수 자리로 채우기
      name: nameBox.value,
      content: contentBox.value,
      pw: pwBox.value,
    };
    saveReview(obj);
  });
  //#endregion

  //#region Initialization for testing
  localStorage.clear();

  // Test data input
  let obj = { id: "255", name: "d", content: "내용", pw: "1234" };
  saveReview(obj);
  let obj2 = { id: "255", name: "상우", content: "내용", pw: "4321" };
  saveReview(obj2);

  //Load data
  AllloadReview(255);

  //#endregion

  //export { saveReview, AllloadReview };
};
