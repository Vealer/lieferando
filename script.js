let array = ["Beliebte Gerichte", "Pizza", "Salate", "Gyros", "Beilagen", "Getränke"];
let menu = [
    ["Cheeseburger", "Pizza Salami", "Gyros Tasche", "Pommes", "Lahmancun"],
    ["Pizza Salami", "Pizza Thunfisch", "Pizza Toscana", "Pizza Hawaii", "Pizza Gyros", "Pizza Mexikana"],
    ["Bauernsalat", "Gemischter Salat", "Hühnchensalat", "Griechischer Salat", "Nudelsalat"],
    ["Gyros Pita", "Gyros Pita Käse", "Gyros Tasche", "Gyros Teller", "Gyros Box", "Super Dürüm"],
    ["Pommes", "Bratkartoffeln", "Chicken Nuggets", "Currywurst", "Pizzabrötchen"],
    ["Cola", "Fanta", "Sprite", "Wasser", "Bier", "Wein", "Kaffee"]
];
let preis = [
    [4.5, 6.5, 5.3, 2.5, 5.5],
    [6.0, 5.5, 4.8, 7.0, 4.9, 6.9],
    [2.3, 2.2, 5.2, 3.0, 4.2],
    [3.7, 4.7, 6.0, 9.5, 3.0, 6.7],
    [2.5, 3.5, 4.3, 2.5, 1.5],
    [2.5, 2.5, 2.3, 2.0, 2.8, 7, 3.2]
];

let menge = [];

let auswahl = [];
let auswahlPreis = [];

function render() {
    document.getElementById("Oben").innerHTML = "";
    for (let i = 0; i < array.length; i++) {
        const element = array[i];
        document.getElementById("Oben").innerHTML += `
    <div onclick='renderUnten(${i})' id='menu${i}'>${element}</div>
    `;
    }
    renderUnten(0);
}

function renderUnten(index) {
    for (let i = 0; i < array.length; i++) {
        document.getElementById("menu" + i).classList.remove("white");
    }
    document.getElementById("menu" + index).classList.add("white");
    document.getElementById("Unten").innerHTML = "";
    for (let j = 0; j < menu[index].length; j++) {
        const x = menu[index][j];
        document.getElementById("Unten").innerHTML += `
        <div class="choice" ><div class="desc"><b>${x}</b><p> ${preis[index][j].toFixed(2).replace(".", ",")} €</p></div><div class="plus" onclick="addChoice('${x}', ${preis[index][j]})"><b>+</b></div></div>
        `;
    }
}

function addChoice(bestellung, bestellungpreis) {
    if (auswahl.indexOf(bestellung) == -1) {
        auswahl.push(bestellung);
        auswahlPreis.push(bestellungpreis);
        menge.push(1);
    } else {
        menge[auswahl.indexOf(bestellung)] += 1;
    }

    renderWarenkorb();
}

function renderWarenkorb() {
    document.getElementById("Warenkorb").innerHTML = "";
    let sum = 0;
    let zwischensumme = 0;
    for (let i = 0; i < auswahl.length; i++) {
        const element = auswahl[i];
        sum += auswahlPreis[i] * menge[i];
        document.getElementById("Warenkorb").innerHTML += `
        <div ><div><div onclick='deleteChoice(${i})'><img src="img/LogoMakr-waste.png"></div><b>${menge[i]} x   ${element}</b></div> <div> <b>${auswahlPreis[i].toFixed(2).replace(".", ",")} €</b></div></div>
        `;
    }
    zwischensumme = sum;
    sum += 3;
    document.getElementById(
        "summe"
    ).innerHTML = `
  <div class="sumelement">
    <div>Lieferkosten: </div>
    <div>3,00 €</div>
  </div>
  <div class="sumelement">
    <div>Zwischensumme: </div>
    <div>${zwischensumme.toFixed(2).replace(".", ",")} €</div>
  </div>
  <div class="sumelement">
    <div><b>Gesamt:</b> </div>
    <div><b>${sum.toFixed(2).replace(".", ",")} €</b></div>
  </div>
  `;
}

function deleteChoice(index) {
    auswahl.splice(index, 1);
    auswahlPreis.splice(index, 1);
    menge.splice(index, 1);
    renderWarenkorb();
}
