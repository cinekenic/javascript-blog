"use strict";

// document.getElementById("test-button").addEventListener("click", function () {
//   const links = document.querySelectorAll(".titles a");
//   console.log("links:", links);
// });

const titleClickHandler = function (event) {
  event.preventDefault();
  const clickedElement = this;

  /* remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll(".titles a.active");

  for (let activeLink of activeLinks) {
    activeLink.classList.remove("active");
  }

  /* add class 'active' to the clicked link */

  clickedElement.classList.add("active");

  /* remove class 'active' from all articles */
  const activeArticles = document.querySelectorAll("article.active");
  for (let activeArticl of activeArticles) {
    activeArticl.classList.remove("active");
  }

  /* get 'href' attribute from the clicked link */

  const articleAttribute = clickedElement.getAttribute("href");

  /* find the correct article using the selector (value of 'href' attribute) */
  const correctArticle = document.querySelector(articleAttribute);

  /* add class 'active' to the correct article */
  correctArticle.classList.add("active");
};

const links = document.querySelectorAll(".titles a");

for (let link of links) {
  link.addEventListener("click", titleClickHandler);
}
