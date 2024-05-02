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

  //#region Validation check
  const Check = async function (obj) {
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
      ㅠ;
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
    return "clear";
  };
  //#endregion

  const saveReview = async function (obj_Data) {
    //Checking
    if ((await Check(obj_Data)) != "clear") return;

    // Key Create & Apply
    obj_Data.key = await Math.random();

    // Format change
    const value = await JSON.stringify(obj_Data);

    // Save Data (Key = Random)
    localStorage.setItem(obj_Data.key, value);

    await Load_NewReview(obj_Data);

    nameBox.value = "";
    contentBox.value = "";
    pwBox.value = "";
    alert("작성 완료!");
  };

  const Load_NewReview = async (obj_Data) => {
    const Elmt = await CreateElement();
    Elmt[review].innerHTML = `${obj_Data.name} : ${obj_Data.content}`;
    Registration_ButtonEvent(Elmt, obj_Data);
  };

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

      const btn_delete = await document.createElement("button");
      Emt.appendChild(btn_delete);
      btn_delete.innerHTML = "삭제";

      const btn_patch = await document.createElement("button");
      Emt.appendChild(btn_patch);
      btn_patch.innerHTML = "수정";

      Registration_ButtonEvent(Emt, btn_delete, btn_patch, rvData);
      Emt.innerHTML = `${rvData.name} / ${rvData.content}`;
    });
  };
  //#endregion

  //#region Subscribe to events
  const Registration_ButtonEvent = (Elmt, obj_Data) => {
    Elmt[Delete].addEventListener("click", () => {
      const answer = prompt("리뷰 삭제 pw를 입력하세요", "pw를 입력해주세요");

      if (answer && obj_Data.pw == answer) {
        localStorage.removeItem(obj_Data.key + "");
        Elmt.remove();
        alert("삭제 되었습니다!");
      } else if (answer != null) {
        alert("비밀번호를 다시 입력해주세요!");
      }
    });

    Elmt[Patch].addEventListener("click", () => {
      const answer = prompt("리뷰 수정 pw를 입혁하세요", "pw를 입력해주세요");

      if (answer && obj_Data.pw == answer) {
        const text = prompt("리뷰 내용을 수정하십시오", obj_Data.content);
        if (text.length > 50) {
          alert("리뷰 내용은 50자를 넘을 수 없습니다!");
          return;
        } else if (text.length == 0) {
          alert("리뷰 내용을 적어주세요!");
          return;
        } else {
          const temp = obj_Data.content;
          obj_Data.content = text;
          ////////////////////////이 부분 수정!! //////////////////////
          if (Check(obj_Data) == "clear") {
            let patch_data = JSON.parse(localStorage.getItem(obj_Data.key));
            Elmt.review.content = text;
            localStorage.setItem(patch_data.key, JSON.stringify(patch_data));

            elmt.innerHTML = `${obj_Data.name} : ${text}`;
            alert("수정 되었습니다!");
          } else {
            obj_Data.content = temp;
            console.log("실행되었다.");
            return;
          }
        }
      } else if (answer != null) alert("비밀번호를 다시 입력해주세요!");
    });
  };
  //#endregion

  //#region Create Element
  const CreateElement = () => {
    const reviewBox = document.createElement("h1"); //변경해야함
    const btn_Delete = document.createElement("button");
    const btn_Patch = document.createElement("button");

    newElement.appendChild(btn_delete);
    newElement.appendChild(btn_patch);

    btn_delete.innerHTML = "삭제";
    btn_patch.innerHTML = "수정";

    rootBox.appendChild(newElement);

    const element = { review: reviewBox, Patch: btn_Patch, Delete: btn_Delete };

    return element;
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
