const apiKey = "02ad24bd8e744f1db5b21f32589e5ebf"; // Substitua aqui
const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

const container = document.getElementById('news-container');

fetch(url)
  .then(response => response.json())
  .then(data => {
    if(data.articles.length === 0){
      container.innerHTML = "<p>Nenhuma notícia encontrada.</p>";
      return;
    }
    data.articles.forEach(article => {
      const newsDiv = document.createElement('div');
      newsDiv.classList.add('news-item');
      newsDiv.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || ''}</p>
        <a href="${article.url}" target="_blank">Leia mais</a>
      `;
      container.appendChild(newsDiv);
    });
  })
  .catch(err => {
    console.error(err);
    container.innerHTML = "<p>Erro ao carregar notícias.</p>";
  });
