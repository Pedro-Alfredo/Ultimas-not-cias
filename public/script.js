// Mostra notícias do JSON gerado pelo bot
async function loadNews(category){
  const res = await fetch("../data/articles.json");
  const data = await res.json();

  const headline = document.getElementById("headline");
  const grid = document.getElementById("news-grid");

  headline.innerHTML = "";
  grid.innerHTML = "";

  const filtered = data.filter(a => a.category === category);
  if(filtered.length === 0) return;

  // primeira notícia em destaque
  const first = filtered[0];
  headline.innerHTML = `
    <div class="headline">
      <h2>${first.title}</h2>
      <img src="${first.image || ''}">
      <p>${first.description}</p>
      <a href="articles/${first.slug}.html">Ler completo</a>
    </div>
  `;

  // resto no grid
  filtered.slice(1).forEach(article => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <img src="${article.image || ''}">
      <h3>${article.title}</h3>
      <a href="articles/${article.slug}.html">Ler completo</a>
    `;
    grid.appendChild(card);
  });
}

// pesquisa simples
document.getElementById("search").addEventListener("keypress", async function(e){
  if(e.key === "Enter"){
    const query = this.value.toLowerCase();
    const res = await fetch("../data/articles.json");
    const data = await res.json();
    const results = data.filter(a => a.title.toLowerCase().includes(query));
    const headline = document.getElementById("headline");
    const grid = document.getElementById("news-grid");
    headline.innerHTML = "";
    grid.innerHTML = "";
    results.forEach(article => {
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `
        <img src="${article.image || ''}">
        <h3>${article.title}</h3>
        <a href="articles/${article.slug}.html">Ler completo</a>
      `;
      grid.appendChild(card);
    });
  }
});

loadNews("technology");
