const filterChecker = ["임의", "비속어"];

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
  const saveReview = async function (obj) {
    //#region Validation check
    const Check = async function () {
      // Name
      const check_name = obj.name.replace(/ /g, "");
      if (check_name.length > 3) {
        alert("닉네임 길이는 최대 3글자를 넘을 수 없습니다.");
        return null;
      } else if (check_name.length == 0) {
        alert("닉네임을 다시 입력해주세요!");
        return null;
      }

      // Pw
      const check_pw = obj.pw.replace(/ /g, "");
      if (check_pw.length !== 4) {
        alert("비밀번호의 길이는 4자리의 수이여야 합니다.");
        return null;
      } else if (check_pw.length == 0) {
        alert("비밀번호를 설정해주세요!");
        return null;
      }

      // Content
      const check_content = obj.content.replace(/ /g, "");
      if (check_content.length > 50) {
        alert("리뷰 내용은 50자를 넘을 수 없습니다!");
        return null;
      } else if (check_content.length == 0) {
        alert("리뷰 내용을 적어주세요!");
        return null;
      }

      // Bad language
      for (let text of filterChecker) {
        if (
          check_name.includes(text) ||
          check_pw.includes(text) ||
          check_content.includes(text)
        ) {
          alert("작성 내용에는 비속어를 사용하실 수 없습니다.");
          return null;
        }
      }
      return 1;
    };
    //#endregion

    if ((await Check()) == null) return;

    // Key Create & Apply
    obj.key = await Math.random();
    // Format change
    const value = await JSON.stringify(obj);
    // Save Data (Key = Random)
    localStorage.setItem(obj.key, value);

    await loadReview(obj);

    nameBox.value = "";
    contentBox.value = "";
    pwBox.value = "";
    alert("작성 완료!");
  };
  //#endregion

  //#region Load Method
  const loadReview = async (obj) => {
    const elmt = await CreateElement();
    elmt.innerHTML = `${obj.name} / ${obj.content}`; //더 진행해야함.
    Event_Subscribe(elmt, obj);
  };
  //#endregion

  //#region All Load Methed
  const All_loadReview = async function (id) {
    // Data filtering
    const reviews = await Object.keys(window.localStorage).filter((rv) => {
      const rvData = JSON.parse(localStorage.getItem(rv));
      return rvData.id == id;
    });

    reviews.forEach(async (rv) => {
      const rvData = await JSON.parse(localStorage.getItem(rv));
      const Emt = await CreateElement();
      Event_Subscribe(Emt, rvData);
      Emt.innerHTML = `${rvData.name} / ${rvData.content}`;
    });
  };
  //#endregion

  //#region Subscribe to events
  const Event_Subscribe = async (Element, rvData) =>
    Element.addEventListener("click", async function (event) {
      const aws = prompt("리뷰 삭제 pw를 입력하세요", "pw를 입력해주세요");

      //data 넘겨주기!! 현재 rvData undefined!!
      if (aws && rvData.pw == aws) {
        //Delete data
        localStorage.removeItem(rvData.key + "");
        await Element.remove();
        alert("삭제 되었습니다!");
      } else if (aws != null) {
        alert("비밀번호를 다시 입력해주세요!");
      }
    });
  //#endregion

  //#region Create Element
  const CreateElement = async () => {
    const newElement = await document.createElement("h1"); //변경해야함
    rootBox.appendChild(newElement);
    return newElement;
  };
  //#endregion

  //#region Save button event
  saveBtn.addEventListener("click", function () {
    const obj = {
      id: "255", // 끌어다 올 데이터로  채우기 255는 예시
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
  // All_loadReview(255); // !!! Run only once at startup

  //#endregion

  //export { s };
};
