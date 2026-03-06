const apiKey = "S02ad24bd8e744f1db5b21f32589e5ebf";
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const newsContainer = document.getElementById('news');
    data.articles.forEach(article => {
      const div = document.createElement('div');
      div.innerHTML = `<h3>${article.title}</h3>
                       <p>${article.description}</p>
                       <a href="${article.url}" target="_blank">Leia mais</a>`;
      newsContainer.appendChild(div);
    });
  })
  .catch(err => console.error(err));
