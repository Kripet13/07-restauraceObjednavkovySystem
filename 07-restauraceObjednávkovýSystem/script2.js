document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener("change", () => {
      const input = checkbox.parentElement.querySelector('input[type="number"]');
      input.disabled = !checkbox.checked; 
    });
  });

  document.getElementById("orderForm").addEventListener("submit", procOrder);

  let menu = [
    { id: "honeyChicken", name: "Kuře na medu", price: 195, quantityId: "platesHoneyChicken" },
    { id: "phoBo", name: "Pho Bo polévka", price: 210, quantityId: "platesPhoBo" },
    { id: "noodles", name: "Smažené nudle", price: 149, quantityId: "platesNoodles" },
    { id: "steak", name: "Hovězí steak s bramborem", price: 259, quantityId: "platesSteak" },
    { id: "goulash", name: "Guláš s knedlíkem", price: 229, quantityId: "platesGoulash" },
    { id: "bread", name: "Chleba ve vajíčku", price: 65, quantityId: "platesBread" }
];

  function procOrder(e)
  {
    let data = sumupOrder(e);
    showFinalOrder(data);
  }

  /**
   * Ukazuje výsledek sumupOrder()
   * 
   * @param {*} orderIn OrderIn je výstup z sumuOrder() ve formátu {items[],suma}
   */
  function showFinalOrder(orderIn)
  {
    let finalSummary = document.getElementById("container");
    finalSummary.removeAttribute("hidden");
    let list = finalSummary.querySelector("#List"); 
    list.innerHTML = "";
    orderIn.items.forEach(element => {
      list.innerHTML += `${element.name}: ${element.count} za ${element.total},- <br>`;
    });
    list.innerHTML += `Celková suma: ${orderIn.sum},-<br>`;
  }

  function sumupOrder(e)
  {
    let sum = 0; 
    e.preventDefault();
    let data = new FormData(e.target);

    let everything = [];

    for(let p of data.entries())
    {
      if(p[0].includes("_count"))
        {
          let item = {};
          let menuItem = menu.find(x => x.id == p[0].substring(0,p[0].lastIndexOf('_')));
          item.name = menuItem.name;
          item.id = p[0].substring(0,p[0].lastIndexOf('_'));
          item.count = p[1];
          item.total = p[1] * menuItem.price;

          everything.push(item);

          sum += menuItem.price * p[1];
        }
    }
    return {items: everything, sum: sum};
  }

  function sendOrder() {
    document.getElementById("orderForm").hidden = true;
    document.getElementById("container").hidden = true;
    document.getElementById("thanks").innerHTML = "Děkujeme za objednávku!";
    document.getElementById("thanks").hidden = false;
}