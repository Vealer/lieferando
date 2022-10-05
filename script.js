let menuList = [
  {
    title: "Favoriten",
    menu: ["Cheeseburger", "Pizza Salami", "Gyros Tasche", "Pommes", "Lahmancun"],
    price: [4.5, 6.5, 5.3, 2.5, 5.5],
    desc: "",
    selectable: [],
    select: [],
    dialog: "",
    img: "img/burger.jpg",
  },
  {
    title: "Pizza",
    menu: ["Pizza Salami", "Pizza Thunfisch", "Pizza Toscana", "Pizza Hawaii", "Pizza Gyros", "Pizza Mexikana"],
    price: [6.0, 5.5, 4.8, 7.0, 4.9, 6.9],
    desc: "Wahl aus: Extra Käse, Zaziki, Hackfleischsauce, Extra Zwiebeln",
    selectable: ["Extra Käse", "Zaziki", "Hackfleischsauce", "Extra Zwiebeln"],
    select: [],
    dialog: "Auswahl Größe:",
    img: "img/pizza.jpg",
  },
  {
    title: "Salate",
    menu: ["Bauernsalat", "Gemischter Salat", "Hühnchensalat", "Griechischer Salat", "Nudelsalat"],
    price: [2.3, 2.2, 5.2, 3.0, 4.2],
    desc: "Wahl aus: mit Balsamico-Dressing, mit Joghurt-Dressing, mit Amercian-Dressing, mit French-Dressing.",
    selectable: ["Balsamico-Dressing", "Joghurt-Dressing", "American-Dressing", "French-Dressing"],
    select: [],
    dialog: "Auswahl Dressing:",
    img: "img/salat.jpg",
  },
  {
    title: "Gyros",
    menu: ["Gyros Pita", "Gyros Pita Käse", "Gyros Tasche", "Gyros Teller", "Gyros Box", "Super Dürüm"],
    price: [3.7, 4.7, 6.0, 9.5, 3.0, 6.7],
    desc: "Wahl aus: mit Zaziki, mit Kräutersauce, mit Fetakäse, mit Gurken, scharf, extra und mehr.",
    selectable: ["Zaziki", "Kräutersauce", "Fetakäse", "Scharf"],
    select: [],
    dialog: "Auswahl Extras:",
    img: "img/gyros.jpeg",
  },
  {
    title: "Beilagen",
    menu: ["Pommes", "Cheeseburger", "Chicken Nuggets", "Currywurst", "Pizzabrötchen"],
    price: [2.5, 4.5, 4.3, 2.5, 1.5],
    desc: "Wahl aus: mit Ketchup, mit Mayonaise, mit Pommessauce, mit Kräuterbutter.",
    selectable: ["Ketchup", "Mayonaise", "Pommessauce", "Kräuterbutter"],
    select: [],
    dialog: "Auswahl Dip:",
    img: "img/burger.jpg",
  },
  {
    title: "Getränke",
    menu: [
      "Coca Cola 0,33l",
      "Fanta Mandarine 0,33l",
      "Sprite 0,33l",
      "Mineralwasser 0,5l",
      "Orangensaft 0,5l",
      "Rotwein 0,5l",
      "Cappucino 0,4l",
    ],
    price: [2.5, 2.5, 2.3, 2.0, 2.8, 7, 3.2],
    desc: "",
    select: [],
    img: "img/drink.jpg",
  },
];

let amount = [];
let select = [];
let selectPrice = [];
let selectExtra = [];
let delivery = 3;
let sum = 0;

function init() {
  renderTitle();
  renderMenu(0);
  renderSum();
}

function renderTitle() {
  document.getElementById("Oben").innerHTML = "";
  for (let i = 0; i < menuList.length; i++) {
    const element = menuList[i].title;
    document.getElementById("Oben").innerHTML += renderTitleHTML(i, element);
  }
}

function renderTitleHTML(i, element) {
  return `<div onclick='renderMenu(${i})' id='menu${i}'>${element}</div>`;
}

function renderMenu(index) {
  changeTitleColor(index);
  document.getElementById("Unten").innerHTML = renderMenuImgHTML(index);
  for (let i = 0; i < menuList[index].menu.length; i++) {
    const articel = menuList[index].menu[i];
    document.getElementById("Unten").innerHTML += renderMenuHTML(i, articel, index);
  }
}

function renderMenuImgHTML(index) {
  return `<div class="choiceImg">
  <img src="${menuList[index].img}">
</div>`;
}

function changeTitleColor(index) {
  for (let i = 0; i < menuList.length; i++) document.getElementById("menu" + i).classList.remove("white");
  document.getElementById("menu" + index).classList.add("white");
}

function renderMenuHTML(i, articel, index) {
  return `
    <div id="choice${i}" onclick="openChoiceDialog(${index}, ${i})" class="choice" >
      <div class="desc">
        <b>${articel}</b>
        <span>${menuList[index].desc}</span>
        <p> ${menuList[index].price[i].toFixed(2).replace(".", ",")} €</p>
      </div>
      <div class="plus" onclick="addChoice('${articel}', ${menuList[index].price[i]}, '')">
        <b>+</b>
      </div>
    </div>
`;
}

function addChoice(bestellung, preis, extra) {
  if (select.indexOf(bestellung) == -1) {
    select.push(bestellung);
    selectPrice.push(preis);
    selectExtra.push(extra);
    amount.push(1);
  } else {
    amount[select.indexOf(bestellung)] += 1;
  }
  renderBasket();
  renderSum();
}

function renderBasket() {
  sum = 0;
  document.getElementById("basket").innerHTML = "";
  for (let i = 0; i < select.length; i++) {
    const element = select[i];
    sum += selectPrice[i] * amount[i];
    document.getElementById("basket").innerHTML += renderBasketHTML(i, element);
  }
}

function renderBasketHTML(i, element) {
  return `<div>
            <div>
                <div onclick='plusChoice(${i})'><img src="img/plus.png"></div>
                <div onclick='minusChoice(${i})'><img src="img/minus.png"></div>
                <b>${amount[i]} x ${element} </b>
            </div> 
            <div> 
                <b>${selectPrice[i].toFixed(2).replace(".", ",")} €</b>
            </div>
        </div>
        <h6>${selectExtra[i]}</h6>

        `;
}

function renderSum() {
  let zwischensumme = sum;
  sum += delivery;
  document.getElementById("delivery").innerHTML = `${delivery.toFixed(2).replace(".", ",")} €`;
  document.getElementById("zwischensumme").innerHTML = `${zwischensumme.toFixed(2).replace(".", ",")} €`;
  document.getElementById("total").innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
}

function renderInfo() {
  document.getElementById("fullscreenInfo").classList.remove("d-none");
}

function changeHeart() {
  let heart = document.getElementById("heart");
  if (heart.src.includes("img/heart-white.png")) heart.src = "img/heart-black.png";
  else heart.src = "img/heart-white.png";
}

function openChoiceDialog(index, i) {
  if (menuList[index].desc) {
    document.getElementById("fullscreenChoice").classList.remove("d-none");
    renderExtras(index, i);
  } else {
    let bestellung = menuList[index].menu[i];
    let preis = menuList[index].price[i];
    addChoice(bestellung, preis, '');
  }
}

function renderExtras(index, i) {
  let extras = document.getElementById("choiceDialog");
  extras.innerHTML = renderExtrasHTML(index, i);
}

function renderExtrasHTML(index, i) {
  return `
    <div>
      <h4>${menuList[index].menu[i]}</h4>
      <h6>${menuList[index].dialog}</h6>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${menuList[index].selectable[0]}" id="box0" checked>
        <label class="form-check-label" >
        ${menuList[index].selectable[0]}
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${menuList[index].selectable[1]}" id="box1"  >
        <label class="form-check-label">
        ${menuList[index].selectable[1]}
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${menuList[index].selectable[2]}" id="box2" >
        <label class="form-check-label" >
        ${menuList[index].selectable[2]}
        </label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="${menuList[index].selectable[3]}" id="box3" >
        <label class="form-check-label">
        ${menuList[index].selectable[3]}
        </label>
      </div>
      <div class="bottom"><button type="button" onclick="addChoiceExtra(${index}, ${i})" class="btn btn-primary center mt-4">${menuList[
    index
  ].price[i]
    .toFixed(2)
    .replace(".", ",")} €</button></div>
    </div>
  `;
}

function addChoiceExtra(index, i) {
  let _extra = [];
  for (let j = 0; j < 4; j++) {
    if(document.getElementById('box' + j).checked)
      _extra.push(" mit " + document.getElementById('box' + j).value);
  }
  let bestellung = menuList[index].menu[i];
  let preis = menuList[index].price[i];
  addChoice(bestellung, preis, _extra);
  closeChoiceDialog();
  renderBasket();
}

function minusChoice(index) {
  if (amount[index] > 1) {
    amount[index]--;
  } else {
    select.splice(index, 1);
    selectPrice.splice(index, 1);
    amount.splice(index, 1);
  }
  renderBasket();
  renderSum();
}

function plusChoice(index) {
  amount[index]++;
  renderBasket();
  renderSum();
}

function closeInfoDialog() {
  document.getElementById("fullscreenInfo").classList.add("d-none");
}

fullscreenInfo.addEventListener("click", function (e) {
  closeInfoDialog();
});

infoDialog.addEventListener("click", function (e) {
  e.stopPropagation();
});

function closeChoiceDialog() {
  document.getElementById("fullscreenChoice").classList.add("d-none");
}

fullscreenChoice.addEventListener("click", function (e) {
  closeChoiceDialog();
});

choiceDialog.addEventListener("click", function (e) {
  e.stopPropagation();
});

btnOrder.addEventListener("click", function (e) {
  confirm("Ist bestellt!");
  window.location.reload();
});

