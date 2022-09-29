let menuList = [
  {
    title: "Favoriten",
    menu: ["Cheeseburger", "Pizza Salami", "Gyros Tasche", "Pommes", "Lahmancun"],
    price: [4.5, 6.5, 5.3, 2.5, 5.5],
  },
  {
    title: "Pizza",
    menu: ["Pizza Salami", "Pizza Thunfisch", "Pizza Toscana", "Pizza Hawaii", "Pizza Gyros", "Pizza Mexikana"],
    price: [6.0, 5.5, 4.8, 7.0, 4.9, 6.9],
  },
  {
    title: "Salate",
    menu: ["Bauernsalat", "Gemischter Salat", "Hühnchensalat", "Griechischer Salat", "Nudelsalat"],
    price: [2.3, 2.2, 5.2, 3.0, 4.2],
  },
  {
    title: "Gyros",
    menu: ["Gyros Pita", "Gyros Pita Käse", "Gyros Tasche", "Gyros Teller", "Gyros Box", "Super Dürüm"],
    price: [3.7, 4.7, 6.0, 9.5, 3.0, 6.7],
  },
  {
    title: "Beilagen",
    menu: ["Pommes", "Bratkartoffeln", "Chicken Nuggets", "Currywurst", "Pizzabrötchen"],
    price: [2.5, 3.5, 4.3, 2.5, 1.5],
  },
  {
    title: "Getränke",
    menu: ["Cola", "Fanta", "Sprite", "Wasser", "Bier", "Wein", "Kaffee"],
    price: [2.5, 2.5, 2.3, 2.0, 2.8, 7, 3.2],
  },
];

let menge = [];
let auswahl = [];
let auswahlPreis = [];
let lieferkosten = 3;
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
  document.getElementById("Unten").innerHTML = "";
  for (let i = 0; i < menuList[index].menu.length; i++) {
    const articel = menuList[index].menu[i];
    document.getElementById("Unten").innerHTML += renderMenuHTML(i, articel, index);
  }
}

function changeTitleColor(index) {
  for (let i = 0; i < menuList.length; i++) document.getElementById("menu" + i).classList.remove("white");
  document.getElementById("menu" + index).classList.add("white");
}

function renderMenuHTML(i, articel, index) {
  return `
    <div class="choice" ><div class="desc"><b>${articel}</b><p> ${menuList[index].price[i]
    .toFixed(2)
    .replace(".", ",")} €</p></div><div class="plus" onclick="addChoice('${articel}', ${
    menuList[index].price[i]
  })"><b>+</b></div></div>
`;
}

function addChoice(bestellung, preis) {
  if (auswahl.indexOf(bestellung) == -1) {
    auswahl.push(bestellung);
    auswahlPreis.push(preis);
    menge.push(1);
  } else {
    menge[auswahl.indexOf(bestellung)] += 1;
  }
  renderWarenkorb();
  renderSum();
}

function renderWarenkorb() {
  sum = 0;
  document.getElementById("Warenkorb").innerHTML = "";
  for (let i = 0; i < auswahl.length; i++) {
    const element = auswahl[i];
    sum += auswahlPreis[i] * menge[i];
    document.getElementById("Warenkorb").innerHTML += renderWarenkorbHTML(i, element);
  }
}

function renderWarenkorbHTML(i, element) {
  return `<div>
            <div>
                <div onclick='plusChoice(${i})'><img src="img/plus.png"></div>
                <div onclick='minusChoice(${i})'><img src="img/minus.png"></div>
                <b>${menge[i]} x ${element}</b>
            </div> 
            <div> 
                <b>${auswahlPreis[i].toFixed(2).replace(".", ",")} €</b>
            </div>
        </div>`;
}

function renderSum() {
  let zwischensumme = sum;
  sum += lieferkosten;
  document.getElementById("lieferkosten").innerHTML = `${lieferkosten.toFixed(2).replace(".", ",")} €`;
  document.getElementById("zwischensumme").innerHTML = `${zwischensumme.toFixed(2).replace(".", ",")} €`;
  document.getElementById("total").innerHTML = `${sum.toFixed(2).replace(".", ",")} €`;
}

function renderInfo(){
  document.getElementById('fullscreenInfo').classList.remove('d-none');
}

function changeHeart(){
  let heart = document.getElementById('heart');
  if(heart.src.includes('img/heart-white.png'))
    heart.src = 'img/heart-black.png'
  else
    heart.src = 'img/heart-white.png';
}

function minusChoice(index) {
  if (menge[index] > 1) {
    menge[index]--;
  } else {
    auswahl.splice(index, 1);
    auswahlPreis.splice(index, 1);
    menge.splice(index, 1);
  }
  renderWarenkorb();
  renderSum();
}

function plusChoice(index) {
  menge[index]++;
  renderWarenkorb();
  renderSum();
}

function closeInfoDialog(){
  document.getElementById('fullscreenInfo').classList.add('d-none');
}

fullscreenInfo.addEventListener("click", function (e) {
  closeInfoDialog();
});

infoDialog.addEventListener("click", function (e) {
  e.stopPropagation();
});
