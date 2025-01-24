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

    container.innerHTML = `
                    <h2>${product.name}</h2>
                    <p>${product.description}</p>

                    <p class="display-6 text-primary">${product.price}€</p>
                    <a href="./backoffice.html?appId=${productId}" class="btn btn-success">MODIFICA</a>`;
  })
  .catch((err) => console.log(err));
