const fs = require('fs');
const fetch = require('node-fetch');
const path = require('path');

const API_KEY = "02ad24bd8e744f1db5b21f32589e5ebf"; // NewsAPI
const categories = ["technology","sports","business"]; // categorias
const ARTICLES_PER_CATEGORY = 20; // total 60 por execução (pode aumentar)

async function fetchAndSave(){
  let allArticles = [];

  for(const category of categories){
    const url = `https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=${ARTICLES_PER_CATEGORY}&apiKey=${API_KEY}`;
    const res = await fetch(url);
    const data = await res.json();
    const articles = data.articles.map(a=>{
      const slug = a.title.toLowerCase().replace(/[^a-z0-9]+/g,'-');
      saveArticleHtml(a, category, slug);
      return {
        title: a.title,
        description: a.description,
        url: a.url,
        image: a.urlToImage,
        category: category,
        slug: slug
      };
    });
    allArticles = allArticles.concat(articles);
  }

  fs.writeFileSync("./data/articles.json", JSON.stringify(allArticles,null,2));
  updateSitemap(allArticles);
  console.log("Artigos atualizados com sucesso!");
}

// gera HTML individual
function saveArticleHtml(article, category, slug){
  const dir = `./public/articles/${category}`;
  if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
  const html = `
  <html>
  <head>
    <title>${article.title} | NextNews</title>
    <meta name="description" content="${article.description || ''}">
  </head>
  <body>
    <h1>${article.title}</h1>
    <img src="${article.urlToImage || ''}">
    <p>${article.description || ''}</p>
    <a href="${article.url}" target="_blank">Fonte original</a>
  </body>
  </html>
  `;
  fs.writeFileSync(path.join(dir,`${slug}.html`),html);
}

// gera sitemap.xml
function updateSitemap(allArticles){
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
  allArticles.forEach(a=>{
    xml += `<url><loc>https://nextnews.site/articles/${a.category}/${a.slug}.html</loc></url>\n`;
  });
  xml += `</urlset>`;
  fs.writeFileSync("./public/sitemap.xml", xml);
}

fetchAndSave();
