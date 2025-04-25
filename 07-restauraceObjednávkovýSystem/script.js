document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault(); // Zabrání odeslání formuláře

    let menu = [
        { id: "honeyChicken", name: "Kuře na medu", price: 195, quantityId: "platesHoneyChicken" },
        { id: "phoBo", name: "Pho Bo polévka", price: 210, quantityId: "platesPhoBo" },
        { id: "noodles", name: "Smažené nudle", price: 149, quantityId: "platesNoodles" },
        { id: "steak", name: "Hovězí steak s bramborem", price: 259, quantityId: "platesSteak" },
        { id: "goulash", name: "Guláš s knedlíkem", price: 229, quantityId: "platesGoulash" },
        { id: "bread", name: "Chleba ve vajíčku", price: 65, quantityId: "platesBread" }
    ];

    let orderSummary = "";
    let totalPrice = 0;

    menu.forEach(item => {
        let isChecked = document.getElementById(item.id).checked;
        let quantity = parseInt(document.getElementById(item.quantityId).value) || 0;

        if (isChecked && quantity > 0) {
            let itemTotal = item.price * quantity;
            totalPrice += itemTotal;
            orderSummary += `<p>${item.name} - ${quantity}× (${item.price} Kč/ks) = <strong>${itemTotal} Kč</strong></p>`;
        }
    });

    if (orderSummary === "") {
        alert("Vyberte alespoň jedno jídlo a zadejte počet porcí.");
        return;
    }

    // Zobrazit souhrn objednávky
    document.getElementById("List").innerHTML = `<h3>Souhrn objednávky</h3>` + orderSummary;
    document.getElementById("completePrice").innerHTML = `<h3>Celková cena: ${totalPrice} Kč</h3>`;
    document.getElementById("container").hidden = false;
});

function sendOrder() {
    document.getElementById("container").hidden = true;
    document.getElementById("thanks").innerHTML = "Děkujeme za objednávku!";
    document.getElementById("thanks").hidden = false;
}

function editOrder() {
    document.getElementById("container").hidden = true;
    document.querySelector("form").hidden = true;
}