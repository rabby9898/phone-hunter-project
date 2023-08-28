const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phoneData = data.data;
  displayPhone(phoneData);
};

const displayPhone = (phoneData) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  const showAllElement = document.getElementById("showAll-btn");

  if (phoneData.length > 12) {
    showAllElement.classList.remove("hidden");
  } else {
    showAllElement.classList.add("hidden");
  }

  phoneData = phoneData.slice(0, 12);

  phoneData.forEach((phone) => {
    console.log(phone);
    const phoneDiv = document.createElement("div");
    phoneDiv.classList = `card w-96 bg-base-100 shadow-xl my-7`;
    phoneDiv.innerHTML = `
        <figure class="px-10 pt-10">
        <img
        src="${phone.image}"
        alt="Shoes"
        class="rounded-xl"
        />
        </figure>
        <div class="card-body items-center text-center">
            <p>Brand: ${phone.brand}</p>
            <h2 class="card-title">Model: ${phone.phone_name}</h2>
            <p>If a dog chews shoes whose shoes does he choose?</p>
            <div class="card-actions">
            <button class="btn btn-primary">Buy Now</button>
            </div>
        </div>
    `;

    phoneContainer.appendChild(phoneDiv);
  });
};

// search handle

const handleSearch = () => {
  const inputElement = document.getElementById("search-input");
  const searchValue = inputElement.value;
  loadPhone(searchValue);
  console.log(searchValue);
};
