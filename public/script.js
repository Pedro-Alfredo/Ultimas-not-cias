fetch("../data/articles.json")
.then(res => res.json())
.then(data => {

const container = document.getElementById("news");

data.forEach(article => {

const div = document.createElement("div");

div.innerHTML = `
<h2>${article.title}</h2>
<img src="${article.image}">
<p>${article.description}</p>
<a href="${article.url}" target="_blank">Ler mais</a>
`;

container.appendChild(div);

});

});
