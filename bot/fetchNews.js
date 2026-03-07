const fs = require("fs");
const fetch = require("node-fetch");

const API_KEY = "02ad24bd8e744f1db5b21f32589e5ebf";

async function getNews(){

const url = `https://newsapi.org/v2/top-headlines?category=technology&pageSize=20&apiKey=${API_KEY}`;

const res = await fetch(url);

const data = await res.json();

const articles = data.articles.map(a => ({
title: a.title,
description: a.description,
url: a.url,
image: a.urlToImage
}));

fs.writeFileSync("./data/articles.json", JSON.stringify(articles,null,2));

console.log("Artigos atualizados");

}

getNews();
