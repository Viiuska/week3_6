if (document.readyState !== "loading") {
  console.log("Document is ready!");
  initializeCode();
} else {
  document.addEventListener("DOMContentLoaded", function () {
    console.log("Document is ready after waiting");
    initializeCode();
  });
}

function initializeCode() {
  const table = document.getElementById("tbody");
  data();

  async function data() {
    const url =
      "https://statfin.stat.fi/PxWeb/sq/4e244893-7761-4c4f-8e55-7a8d41d86eff";
    const dataPromise = await fetch(url);
    let dataJSON = await dataPromise.json();

    const url2 =
      "https://statfin.stat.fi/PxWeb/sq/5e288b40-f8c8-4f1e-b3b0-61b86ce5c065";
    const dataPromise2 = await fetch(url2);
    let dataJSON2 = await dataPromise2.json();

    //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    Object.values(dataJSON).forEach((dataset) => {
      let i = 0;
      let division;
      while (dataset.value[i] !== undefined) {
        let tr = document.createElement("tr");
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");

        td1.innerText = Object.values(dataset.dimension.Alue.category.label)[i];
        td2.innerText = dataset.value[i];

        Object.values(dataJSON2).forEach((employmentData) => {
          td3.innerText = employmentData.value[i];

          division = (employmentData.value[i] / dataset.value[i]) * 100;
          division = division.toFixed(2);

          td4.innerText = division + "%";
        });

        i++;

        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);

        table.appendChild(tr);

        //https://stackoverflow.com/questions/8666500/changing-background-cell-of-table-depending-on-value
        if (division > 45) {
          tr.style.backgroundColor = "#abffbd";
        }
        if (division < 25) {
          tr.style.backgroundColor = "#ff9e9e";
        }
      }
    });
  }
}
