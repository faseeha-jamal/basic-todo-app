let showItems = document.querySelector(".out-container");
let err = document.querySelector(".err");
let inpVal = document.querySelector(".inp");
let addBtn = document.querySelector(".btn");
let i = 1;
// import localStorage
todos = JSON.parse(localStorage.getItem("data")) || [];

createItem();
// enter key event
inpVal.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    inpErr();
  }
});
// add buttone event
addBtn.addEventListener("click", () => {
  inpErr();
});

function inpErr() {
  if (inpVal.value) {
    let arr = { item: inpVal.value, id: i++ };
    todos.push(arr);

    localStorage.setItem("data", JSON.stringify(todos));
    inpVal.value = "";
    createItem();
    err.innerText = "";
  } else {
    err.innerText = "Enter You'r item";
  }
}
// Creat elements
function createItem() {
  showItems.innerHTML = "";
  inpVal.value = "";

  todos.forEach((obj) => {
    console.log(obj);
    let div = document.createElement("div");
    let list = document.createElement("div");
    let upd = document.createElement("button");
    let del = document.createElement("button");

    div.className = "list";
    list.className = "item";

    list.innerHTML = `<input type="text" value='${obj.item}' readonly />`;

    upd.innerText = "Update";
    del.innerText = "Remov";

    console.log(list);

    div.append(list, upd, del);
    showItems.appendChild(div);
    // Remove section
    del.addEventListener("click", () => {
      todos = todos.filter((itm) => itm != obj);
      localStorage.setItem("data", JSON.stringify(todos));
      createItem();
    });
    // Edit section
    upd.addEventListener("click", (e) => {
      const input = list.children[0];
      input.removeAttribute("readonly");
      input.focus();

      input.addEventListener("blur", (e) => {
        console.log("hello");
        obj.item = e.target.value;
        localStorage.setItem("data", JSON.stringify(todos));
        createItem();
      });
    });
  });
}
