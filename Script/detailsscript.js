const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");

console.log("RESOURCE ID", productId);

fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
  method: "GET",
  headers: {
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTEyY2I3NDcwMTAwMTU4YjJhYzUiLCJpYXQiOjE3Mzc3MDc4MjAsImV4cCI6MTczODkxNzQyMH0.6xr86aB2GYQ89d5Q2JRGZDx9V2FMSz1GTclfEH7ed-w",
  },
})
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error();
    }
  })
  .then((product) => {
    const container = document.getElementById("details-container");

    const titolo = document.querySelector("h4 + h5");
    titolo.innerText = product.name;

    const row = document.getElementById("rowDettaglio");
    row.classList.add("row");
    const col8 = document.createElement("div");
    col8.classList.add("col-12", "col-md-6");
    const col4 = document.createElement("div");
    col4.classList.add("col-12", "col-md-6");
    const marca = document.createElement("h2");
    marca.innerText = product.brand;
    marca.classList.add("text-dark");
    const descrizione = document.createElement("p");
    descrizione.innerText = product.description;
    descrizione.classList.add("text-dark");
    const prezzo = document.createElement("p");
    prezzo.classList.add("display-6", "text-success");
    prezzo.innerText = "€ " + product.price;
    const immagine = document.createElement("img");
    immagine.src = product.imageUrl;
    immagine.alt = product.name;

    row.appendChild(col8);
    row.appendChild(col4);
    col4.appendChild(marca);
    col4.appendChild(descrizione);
    col4.appendChild(prezzo);
    col8.appendChild(immagine);

    const spinner = document.querySelector(".spinner-border");
    if (spinner) {
      spinner.remove();
    }
  })
  .catch((err) => console.log(err));
