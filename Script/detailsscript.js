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
    col8.classList.add("col-8");
    const col4 = document.createElement("div");
    col4.classList.add("col-4");
    const marca = document.createElement("h2");
    marca.innerText = product.brand;
    const descrizione = document.createElement("p");
    descrizione.innerText = product.description;
    const prezzo = document.createElement("p");
    prezzo.classList.add("display-6, text-success");
    prezzo.innerText = product.prezzo;
    const immagine = document.createElement("img");
    immagine.src = product.imageUrl;
    img.alt = product.name;

    row.appendChild(col4);
    col4.appendChild(marca);
    col4.appendChild(descrizione);
    col4.appendChild(prezzo);
    col8.appendChild(immagine);

    /*
    container.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>

                    <p class="display-6 text-primary">${product.price}€</p>
                    <a href="./backoffice.html?appId=${productId}" class="btn btn-success">MODIFICA</a>`;*/
  })
  .catch((err) => console.log(err));
