const apiKey="02ad24bd8e744f1db5b21f32589e5ebf"

async function loadNews(category){

const url=`https://newsapi.org/v2/top-headlines?category=${category}&pageSize=12&apiKey=${apiKey}`

const res=await fetch(url)

const data=await res.json()

const headline=document.getElementById("headline")

const grid=document.getElementById("news-grid")

headline.innerHTML=""
grid.innerHTML=""

const first=data.articles[0]

headline.innerHTML=`

<div class="headline">

<h2>${first.title}</h2>

<img src="${first.urlToImage}">

<p>${first.description}</p>

</div>

`

data.articles.slice(1).forEach(article=>{

const card=document.createElement("div")

card.className="card"

card.innerHTML=`

<img src="${article.urlToImage || ""}">

<h3>${article.title}</h3>

<a href="${article.url}" target="_blank">Ler mais</a>

`

grid.appendChild(card)

})

}

loadNews("technology")
