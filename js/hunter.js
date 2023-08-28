const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phoneData = data.data;
  displayPhone(phoneData, isShowAll);
};

const displayPhone = (phoneData, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");
  phoneContainer.innerHTML = "";

  const showAllElement = document.getElementById("showAll-btn");

  if (phoneData.length > 12 && !isShowAll) {
    showAllElement.classList.remove("hidden");
  } else {
    showAllElement.classList.add("hidden");
  }
  if (!isShowAll) {
    phoneData = phoneData.slice(0, 12);
  }

  phoneData.forEach((phone) => {
    // console.log(phone);
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
            <button onclick="showDetailsModal('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
    `;

    phoneContainer.appendChild(phoneDiv);
  });
  toggleLoadingSpinner(false);
};

// search handle
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);
  const inputElement = document.getElementById("search-input");
  const searchValue = inputElement.value;
  loadPhone(searchValue, isShowAll);
  console.log(searchValue);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingElement = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingElement.classList.remove("hidden");
  } else {
    loadingElement.classList.add("hidden");
  }
};

const showAllHandle = () => {
  handleSearch(true);
};

// show details
const showDetailsModal = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  console.log(phone);
  show_details_modal.showModal();
  const showDetailsElement = document.getElementById("modal-container");
  showDetailsElement.innerHTML = `
    <img
        src="${phone.image}"
        alt="mobile"
        class="rounded-xl mx-auto"
        />
        <h5 class="text-2xl text-black font-semibold my-3">${phone.name}</h5>
        <h5 class="text-xl text-black font-semibold mt-3 mb-8">Brand: ${phone.brand}</h5>
        <h5 class="text-md text-black font-semibold my-3">Storage: <span class="font-normal text-gray-600">${phone.mainFeatures.storage}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">Chipset: <span class="font-normal text-gray-600">${phone.mainFeatures.chipSet}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">Display: <span class="font-normal text-gray-600">${phone.mainFeatures.displaySize}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">Memory: <span class="font-normal text-gray-600">${phone.mainFeatures.memory}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">Bluetooth: <span class="font-normal text-gray-600">${phone.others.Bluetooth}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">GPS: <span class="font-normal text-gray-600">${phone.others.GPS}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">WLAN: <span class="font-normal text-gray-600">${phone.others.WLAN}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">USB: <span class="font-normal text-gray-600">${phone.others.USB}</span></h5>
        <h5 class="text-md text-black font-semibold my-3">Release: <span class="font-normal text-gray-600">${phone.releaseDate}</span></h5>

  `;
};
