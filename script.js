const BASE_URL = "http://api.weatherapi.com/v1";
const API_KEY = "d7cdf8ae43744760803135544240209";
const searchForm = document.querySelector(".search");
const cardInfo = document.querySelector(".card__info");

searchForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  async function getData() {
    const query = searchForm.querySelector(".search__input").value.trim();
    if (!query) {
      alert("Введите название города.");
      return;
    }
    const data = await fetchCurrentWeather(query);
    if (data && !data.error) {
      render(data);
    } else {
      alert("Город не найден. Введите корректное название города.");
    }
  }
  getData();
});

function render(data) {
  cardInfo.innerHTML = "";
  cardInfo.innerHTML = `
 <h3 class="card__city">${data.location.name}</h3>
 <p class="card__date">${new Date(data.location.localtime).toLocaleString(
   "en-US",
   {
     weekday: "long",
     day: "numeric",
     month: "short",
   }
 )}</p>
 <h2 class="card__temp">${data.current.temp_c}°C</h2>
 <img src="https:${data.current.condition.icon}" alt="" class="card__image" />
 <h3 class="card__weather">${data.current.condition.text}</h3>`;
}

async function fetchCurrentWeather(q) {
  try {
    const response = await fetch(
      `${BASE_URL}/current.json?key=${API_KEY}&q=${q}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error:", error);
    alert(
      "Произошла ошибка при получении данных о погоде.Пожалуйста, попробуйте снова."
    );
  }
}