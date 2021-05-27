"use strict";
const templates = {
  articleLink: Handlebars.compile(
    document.querySelector("#template-article-link").innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector("#template-tag-cloud-link").innerHTML
  ),
  authorsLink: Handlebars.compile(
    document.querySelector("#template-author-link").innerHTML
  ),
};

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

const optArticleSelector = ".post",
  optTitleSelector = ".post-title",
  optTitleListSelector = ".titles",
  optArticleTagsSelector = ".post-tags .list",
  optTagsListSelector = ".tags.list",
  optCloudClassCount = "5",
  optCloudClassPrefix = "tag-size-";

function generateTitleLinks(customSelector = "") {
  let html = "";
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);

  titleList.innerHTML = "";
  /* for each article */

  const articles = document.querySelectorAll(
    optArticleSelector + customSelector
  );

  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute("id");
    /* find the title element */

    const articleTitle = article.querySelector(optTitleSelector).innerHTML;

    /* get the title from the title element */
    /* create HTML of the link */

    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
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

function calculateTagsParams(tags) {
  const params = {
    min: 99,
    max: 0,
  };

  for (let tag in tags) {
    if (tags[tag] > params.max) {
      params.max = tags[tag];
    } else if (tags[tag] < params.min) {
      params.min = tags[tag];
    }
  }
  return params;
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

  return optCloudClassPrefix + classNumber;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const wrapper = article.querySelector(optArticleTagsSelector);

    /* make html variable with empty string */
    let html = "";
    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute("data-tags");

    /* split tags into array */
    const articleTagsArray = articleTags.split(" ");

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      html = html + linkHTML;

      /* add generated code to html variable */
      /* [NEW] check if this link is NOT already in allTags */
      if (!allTags[tag]) {
        /* [NEW] add tag to allTags object */
        allTags[tag] = 1;
      } else {
        allTags[tag]++;
      }
      /* END LOOP: for each tag */
    }

    wrapper.innerHTML = html;
    /* insert HTML of all the links into the tags wrapper */
  }

  /* END LOOP: for every article: */
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(".tags");

  const tagsParams = calculateTagsParams(allTags);

  /* [NEW] create variable for all links HTML code */
  // let allTagsHTML = "";
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags: */

  for (let tag in allTags) {
    /* [NEW] generate code of a link and add it to allTagsHTML */

    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
  }
  /* [NEW] END LOOP: for each tag in allTags: */

  /*[NEW] add HTML from allTagsHTML to tagList */

  tagList.innerHTML = templates.tagCloudLink(allTagsData);
}

function addClickListenersToTagsCloud() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll(`.tags a`);

  /* START LOOP: for each link */
  for (let link of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
  }
  /* END LOOP: for each link */
}

generateTags();
addClickListenersToTagsCloud();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();
  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute("href");

  /* make a new constant "tag" and extract tag from the "href" constant */

  const tag = href.replace("#tag-", "");

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let link of activeLinks) {
    /* remove class active */
    link.classList.remove("active");
  }
  /* END LOOP: for each active tag link */

  clickedElement.classList.add("active");
  /* add class active */

  /* END LOOP: for each found tag link */

  /* execute function "generateTitleLinks" with article selector as argument */

  generateTitleLinks('[data-tags~="' + tag + '"]');
}

function addClickListenersToTags() {
  /* find all links to tags */

  const tagLinks = document.querySelectorAll(`.list-horizontal a`);

  /* START LOOP: for each link */
  for (let link of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    link.addEventListener("click", tagClickHandler);
  }
  /* END LOOP: for each link */
}

addClickListenersToTags();

function generateAuthors() {
  let allAuthorsData = {};

  const articles = document.querySelectorAll(optArticleSelector);

  for (let article of articles) {
    let html = "";
    const articleAuthor = [article.getAttribute("post-author")];

    for (let author of articleAuthor) {
      const linkHTML = `<li><a href="#tag-${author}">${author}</a></li>`;
      html = html + linkHTML;
      if (!allAuthorsData[author]) {
        allAuthorsData[author] = 1;
      } else {
        allAuthorsData[author]++;
      }
    }
  }

  const wrapper = document.querySelector(".authors");
  const allAuthors = { articles: [] };

  for (let tag in allAuthorsData) {
    allAuthors.articles.push({
      tag: tag,
      count: allAuthorsData[tag],
    });
  }

  wrapper.innerHTML = templates.authorsLink(allAuthors);
}

generateAuthors();

function authorClickHandler(event) {
  event.preventDefault();

  const clickedElement = event.target;

  const href = clickedElement.getAttribute("href");

  const activeLinks = document.querySelectorAll(".authors a");

  for (let link of activeLinks) {
    link.classList.remove("active");
  }

  const articleAttribute = clickedElement.getAttribute("href");

  clickedElement.classList.add("active");

  generateTitleLinks('[post-author="' + href + '"]');
}

function addClickListenersToAuthors() {
  const tagLinks = document.querySelectorAll(".sidebar .authors");

  for (let link of tagLinks) {
    link.addEventListener("click", authorClickHandler);
  }
}
addClickListenersToAuthors();
