const filterChecker = ["임의", "비속어"];
const rgx_Name = /^[^\s]{1,8}$/;
const rgx_Pw = /^\d{4,8}$/;
const rgx_Content = /^.{3,50}$/;

// 간단 정리
// 1. 해당 영화에 대한 상세페이지에 접속시 All_loadReview 함수에 영화의 id값을 넣고 한번 사용해주면 원래 작성해둔 리뷰가 등장합니다. (각 영화의 상세페이지 로드시 딱 한번만 실행)
// 2. 리뷰 작성 버튼을 눌러 저장할 때에 Save_Review 함수에 obj_data (이 객체의 내용물은 제일 하단의 saveBtn.addEventListener 메서드에서 확인할 수 있습니다. 현재 id는 test값)
// 3. 리뷰 추가시 생성되는 태그는 Create_Element 확인이 가능합니다. (구역, 작성자 이름, 리뷰 내용, 삭제 버튼, 수정 버튼 으로 구성.)

//#region Test root & information
const rootBox = document.querySelector("#test");

const nameBox = document.querySelector("#nameBox");
const contentBox = document.querySelector("#contentBox");
const pwBox = document.querySelector("#pwBox");

const saveBtn = document.querySelector("#saveReview");
//#endregion

const Return_Contents = {
  Check_Name: (obj_Data) => {
    if (!rgx_Name.test(obj_Data.name)) {
      alert("닉네임은 1글자 이상 8글자 이하만 가능합니다.");
      return null;
    }

    return "clear";
  },

  Check_Pw: (obj_Data) => {
    if (!rgx_Pw.test(obj_Data.pw)) {
      alert("비밀번호는 4개 이상 8개 이하의 숫자로만 설정이 가능합니다.");
      return null;
    }

    return "clear";
  },

  Check_Content: (obj_Data) => {
    const data = obj_Data.content.replace(/\s/g, "");
    if (!rgx_Content.test(data)) {
      alert("3글자 이상, 50글자 이하로만 리뷰를 작성하실 수 있습니다.");
      return null;
    }

    return "clear";
  },

  Check_BadLanguage: (obj_Data) => {
    for (let contents of filterChecker) {
      if (
        obj_Data.name.includes(contents) ||
        obj_Data.content.includes(contents) ||
        obj_Data.pw.includes(contents)
      ) {
        alert("작성 내용에는 비속어를 사용하실 수 없습니다.");
        return null;
      }
      return "clear";
    }
  },

  Check_All: (obj_Data) => {
    if (
      Return_Contents.Check_Name(obj_Data) &&
      Return_Contents.Check_Pw(obj_Data) &&
      Return_Contents.Check_Content(obj_Data) &&
      Return_Contents.Check_BadLanguage(obj_Data)
    ) {
      return "clear";
    }
  },
};

const Save_Review = async function (obj_Data) {
  //Checking
  if (await Return_Contents.Check_All(obj_Data)) {
    obj_Data.key = await Math.random();
    const value = await JSON.stringify(obj_Data);
    localStorage.setItem(obj_Data.key, value);
    await Load_NewReview(obj_Data);

    nameBox.value = "";
    contentBox.value = "";
    pwBox.value = "";
    alert("작성 완료!");
  }
};

const Load_NewReview = async (obj_Data) => {
  const elmt = await Create_Element();
  elmt.reviewer.innerHTML = obj_Data.name;
  elmt.reviewContent.innerHTML = obj_Data.content;

  Registration_ButtonEvent(elmt, obj_Data);
};

const All_loadReview = async function (id) {
  const obj_Datas = await Object.keys(window.localStorage).filter((rv) => {
    const data = JSON.parse(localStorage.getItem(rv));
    return data.id == id;
  });

  obj_Datas.forEach(async (obj_Data) => {
    const elmt = await Create_Element();
    Registration_ButtonEvent(elmt, obj_Data);
    ReTouch_Text(elmt, obj_Data);
  });
};

const Registration_ButtonEvent = (elmt, obj_Data) => {
  elmt.Delete.addEventListener("click", () => {
    const answer = prompt("pw를 입력하세요", "pw를 입력해주세요");

    if (answer && obj_Data.pw == answer) {
      localStorage.removeItem(obj_Data.key + "");
      elmt.wrap.remove();
      alert("삭제 되었습니다!");
    } else if (answer) {
      alert("비밀번호를 다시 입력해주세요!");
    }
  });

  elmt.Patch.addEventListener("click", () => {
    const answer = prompt("pw를 입혁하세요", "pw를 입력해주세요");

    if (answer && obj_Data.pw == answer) {
      const inf_Prompt = prompt("리뷰 내용을 수정하십시오", obj_Data.content);

      const temp = obj_Data.content;
      obj_Data.content = inf_Prompt;
      if (
        Return_Contents.Check_Content(obj_Data) &&
        Return_Contents.Check_BadLanguage(obj_Data)
      ) {
        let patch_data = JSON.parse(localStorage.getItem(obj_Data.key));
        localStorage.setItem(patch_data.key, JSON.stringify(patch_data));
        ReTouch_Text(elmt, obj_Data);
        alert("수정 되었습니다!");
      } else {
        obj_Data.content = temp;
        return;
      }
    } else if (answer) alert("비밀번호를 다시 입력해주세요!");
  });
};

const Create_Element = () => {
  const reviewBox = document.createElement("div");
  const reviewer = document.createElement("h2");
  const reviewContent = document.createElement("h3");
  const btn_Delete = document.createElement("button");
  const btn_Patch = document.createElement("button");

  reviewBox.appendChild(reviewer);
  reviewBox.appendChild(reviewContent);
  reviewBox.appendChild(btn_Delete);
  reviewBox.appendChild(btn_Patch);

  btn_Delete.innerHTML = "삭제";
  btn_Patch.innerHTML = "수정";

  rootBox.appendChild(reviewBox);

  const elmt = {
    wrap: reviewBox,
    reviewer: reviewer,
    reviewContent: reviewContent,
    Patch: btn_Patch,
    Delete: btn_Delete,
  };

  return elmt;
};

const ReTouch_Text = (elmt, obj_Data) => {
  elmt.reviewer.innerHTML = obj_Data.name;
  elmt.reviewContent.innerHTML = obj_Data.content;
};

saveBtn.addEventListener("click", function () {
  const obj_Data = {
    id: "255",
    name: nameBox.value,
    content: contentBox.value,
    pw: pwBox.value,
  };
  Save_Review(obj_Data);
});

//#region Initialization for testing

localStorage.clear();

// Test data input
let obj = { id: "255", name: "d", content: "내용입니다", pw: "1234" };
Save_Review(obj);
let obj2 = { id: "255", name: "상우", content: "내용입니다", pw: "4321" };
Save_Review(obj2);

//Load data
// All_loadReview(255); // !!! Run only once at startup

//#endregion

export { All_loadReview, Save_Review };
