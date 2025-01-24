const form = document.getElementById("product-form");

const params = new URLSearchParams(window.location.search);
const productId = params.get("productId");
const URL = productId
  ? "https://striveschool-api.herokuapp.com/api/product/" + productId
  : "https://striveschool-api.herokuapp.com/api/product/";

window.addEventListener("DOMContentLoaded", () => {
  const submitBtn = document.getElementById("submit-btn");
  const subtitle = document.querySelector("h5");
  const delBtn = document.getElementById("delete-btn");

  if (productId) {
    submitBtn.innerText = "Modifica prodotto";
    submitBtn.classList.add("btn-success");
    subtitle.innerText = "Modifica il prodotto";

    delBtn.classList.remove("d-none");
    delBtn.onclick = handleDelete;

    fetch("https://striveschool-api.herokuapp.com/api/product/" + productId, {
      method: "GET",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTEyY2I3NDcwMTAwMTU4YjJhYzUiLCJpYXQiOjE3Mzc3MDc4MjAsImV4cCI6MTczODkxNzQyMH0.6xr86aB2GYQ89d5Q2JRGZDx9V2FMSz1GTclfEH7ed-w",
      },
    });
    then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Errore durante il recupero del prodotto");
      }
    }).then((product) => {
      form.elements.name.value = product.name;
      form.elements.description.value = product.description;
      form.elements.brand.value = product.brand;
      form.elements.url.value = product.imageUrl;
      form.elements.price.value = product.price;
    });
  } else {
    submitBtn.innerText = "Aggiungi prodotto";
    submitBtn.classList.add("btn-warning", "mb-5");
    subtitle.innerText = "Crea nuovo prodotto";
  }
});

form.onsubmit = function (event) {
  event.preventDefault();

  const newProduct = {
    name: form.elements.name.value,
    description: form.elements.description.value,
    brand: form.elements.brand.value,
    imageUrl: form.elements.url.value,
    price: parseFloat(form.elements.price.value),
  };

  console.log(JSON.stringify(newProduct));
  fetch(URL, {
    method: productId ? "PUT" : "POST",

    body: JSON.stringify(newProduct),
    headers: {
      "Content-Type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTEyY2I3NDcwMTAwMTU4YjJhYzUiLCJpYXQiOjE3Mzc3MDc4MjAsImV4cCI6MTczODkxNzQyMH0.6xr86aB2GYQ89d5Q2JRGZDx9V2FMSz1GTclfEH7ed-w",
    },
  })
    .then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("Errore nella creazione del prodotto, verificare di aver compilato il form correttamente");
      }
    })
    .then((createProd) => {
      if (!productId) {
        alert("Il prodotto " + createProd.name + " creato correttamente, lo potrai visualizzare nella home");

        form.reset();
      } else {
        alert("Il prodotto " + createProd.name + " modificato correttamente!");
      }
    });
};

const handleDelete = () => {
  const hasConfirmed = confirm("sei sicuro di voler eliminare questo prodotto?");

  if (hasConfirmed) {
    fetch(URL, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzkzNTEyY2I3NDcwMTAwMTU4YjJhYzUiLCJpYXQiOjE3Mzc3MDc4MjAsImV4cCI6MTczODkxNzQyMH0.6xr86aB2GYQ89d5Q2JRGZDx9V2FMSz1GTclfEH7ed-w",
      },
    })
      .then((resp) => {
        if (resp.ok) {
          return resp.json();
        }
      })
      .then((deletedProd) => {
        alert("Il prodotto " + deletedProd.name + " è stato eliminato correttamente");

        window.location.assign("./index.html");
      })
      .catch((err) => console.log(err));
  }
};
