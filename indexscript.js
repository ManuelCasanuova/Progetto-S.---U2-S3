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
    productsData.array.forEach((product) => {
      const col = document.createElement("div");
    });
  });
