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
  console.log(correctArticle);
};

// const articleIds = document.querySelectorAll(".post");

// for (let art of articleIds) {
//   const idOfArticle = art.getAttribute("id");
//   console.log(idOfArticle);
// }

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list";

let html = "";

function generateTitleLinks() {
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = "";
  /* for each article */
  const articles = document.querySelectorAll(optArticleSelector);
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");
    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    /* create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    /* insert link into titleList */
    html = html + linkHTML;
  }

  titleList.innerHTML = html;
  const links = document.querySelectorAll(".titles a");
  if (links[0]) {
    links[0].classList.add("active");
  }

  for (let link of links) {
    link.addEventListener("click", titleClickHandler);
  }
}

generateTitleLinks();

function generateTags() {
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  console.log(articles);
  /* START LOOP: for every article: */
  for (let article of articles) {
    console.log(article);
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);
    console.log(wrapper);
    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");
    console.log(articleTags);
    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");
    console.log(articleTagsArray);

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      console.log(tag);
      /* generate HTML of the link */
      const linkHtml = `<li><a href="#tag-${tag}">${tag},</a></li>`;
      html = html + linkHtml;

      /* add generated code to html variable */
      /* END LOOP: for each tag */
    }
    wrapper.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */
  }

  /* END LOOP: for every article: */
}

generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  /* make new constant named "clickedElement" and give it the value of "this" */
  /* make a new constant "href" and read the attribute "href" of the clicked element */
  /* make a new constant "tag" and extract tag from the "href" constant */
  /* find all tag links with class active */
  /* START LOOP: for each active tag link */
  /* remove class active */
  /* END LOOP: for each active tag link */
  /* find all tag links with "href" attribute equal to the "href" constant */
  /* START LOOP: for each found tag link */
  /* add class active */
  /* END LOOP: for each found tag link */
  /* execute function "generateTitleLinks" with article selector as argument */
}

function addClickListenersToTags() {
  /* find all links to tags */
  /* START LOOP: for each link */
  /* add tagClickHandler as event listener for that link */
  /* END LOOP: for each link */
}

addClickListenersToTags();
