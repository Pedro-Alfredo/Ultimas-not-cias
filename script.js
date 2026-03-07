const apiKey = "02ad24bd8e744f1db5b21f32589e5ebf";

const container = document.getElementById("news-container");

async function loadNews(category="general"){

container.innerHTML="Carregando...";

const url=`https://newsapi.org/v2/top-headlines?category=${category}&language=en&pageSize=10&apiKey=${apiKey}`;

const response = await fetch(url);
const data = await response.json();

container.innerHTML="";

data.articles.forEach(article=>{

const div=document.createElement("div");

div.className="news";

div.innerHTML=`

<img src="${article.urlToImage || ''}">

<h2>${article.title}</h2>

<p>${article.description || ''}</p>

<a href="${article.url}" target="_blank">Ler notícia</a>

`;

container.appendChild(div);

});

}

document.getElementById("searchInput").addEventListener("keypress",async function(e){

if(e.key==="Enter"){

const query=this.value;

const url=`https://newsapi.org/v2/everything?q=${query}&sortBy=publishedAt&apiKey=${apiKey}`;

container.innerHTML="Pesquisando...";

const response=await fetch(url);

const data=await response.json();

container.innerHTML="";

data.articles.forEach(article=>{

const div=document.createElement("div");

div.className="news";

div.innerHTML=`

<img src="${article.urlToImage || ''}">

<h2>${article.title}</h2>

<p>${article.description || ''}</p>

<a href="${article.url}" target="_blank">Ler notícia</a>

`;

container.appendChild(div);

});

}

});

loadNews();
