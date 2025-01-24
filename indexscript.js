const URL = `https://striveschool-api.herokuapp.com/api/product/`;

fetch(URL, {
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
  .then((productsData) => {
    const row = document.getElementById("products-grid");

    productsData.forEach((product) => {
      const col = document.createElement("div");
      col.classList.add("col");
      const card = document.createElement("div");
      card.classList.add("card");
      const cardBody = document.createElement("div");
      cardBody.classList.add("card-body");
      const img = document.createElement("img");
      img.src = product.imageUrl;
      img.alt = product.name;
      img.classList.add("bd-placeholder-img", "card-img-top");
      const title = document.createElement("h5");
      title.classList.add("card-title");
      title.innerText = product.name;
      const cardText = document.createElement("p");
      cardText.classList.add("card-text");
      cardText.innerText = product.price;
      const btnContainer = document.createElement("div");
      btnContainer.classList.add("d-flex", "justify-content-between", "align-items-center");
      const btnGroup = document.createElement("div");
      btnGroup.classList.add("btn-group");
      const modifyBtn = document.createElement("button");
      modifyBtn.type = "button";
      modifyBtn.classList.add("btn", "btn-sm", "btn", "btn-primary");
      modifyBtn.innerText = "Modifica prodotto";
      const detailsBtn = document.createElement("button");
      detailsBtn.type = "button";
      detailsBtn.classList.add("btn", "btn-sm", "btn-outline-primary");
      detailsBtn.innerText = "Dettagli prodotto";

      row.appendChild(col);
      col.appendChild(card);
      card.appendChild(img);
      card.appendChild(cardBody);
      cardBody.appendChild(title);
      cardBody.appendChild(cardText);
      cardBody.appendChild(btnContainer);
      btnContainer.appendChild(btnGroup);
      btnGroup.appendChild(detailsBtn);
      btnGroup.appendChild(modifyBtn);
    });
  })
  .catch((err) => {
    console.dir(err);
  });
