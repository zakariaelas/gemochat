const config = require('../config');
const RATINGS = require('../enums/ratings');
const NUMERICAL_RATINGS = require('../enums/numericalRatings');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const OVERALL_RATINGS = {
  [RATINGS.STRONG_NO]: 1,
  [RATINGS.NO]: 2,
  [RATINGS.YES]: 3,
  [RATINGS.STRONG_YES]: 4,
};

const submitAssessment = async ({
  candidate_id,
  application_id,
  interviewer,
  overall_rating,
  scorecard,
}) => {
  const BASE_URL = `https://app2.greenhouse.io`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const APPLICATION_URL = `${BASE_URL}/people/${candidate_id}?application_id=${application_id}&src=search`;
  await page.goto(APPLICATION_URL, { headless: false });
  await page.type('#user_email', config.greenhouse.email);
  await page.click('#submit_email_button');
  await page.waitForSelector('#user_password', { visible: true });
  await page.waitForSelector('#submit_password_button', { visible: true });
  await page.type('#user_password', config.greenhouse.password);
  await page.click('#submit_password_button');
  await page.waitForNavigation();
  const interviewStageId = await page
    .$(`tr[name="${interviewer}"]`)
    .then((element) => {
      element.click();
      return element;
    })
    .then((element) =>
      page.evaluate((node) => node.getAttribute('stage_id'), element),
    );
  const scorecardHref = await page
    .waitForSelector(
      `tr[stage_id="${interviewStageId}"] td[title="View Interview Kit"]`,
    )
    .then((element) =>
      page.evaluate((node) => node.getAttribute('href'), element),
    );
  const scorecardLink = `${BASE_URL}${scorecardHref}&new=true#scorecard`;
  await page.goto(scorecardLink);
  await page.screenshot({ path: 'scorecard_page_loaded.png', fullPage: true });
  await page.waitForSelector(
    `li[data-rating-id="${OVERALLL_RATINGS[overall_rating]}"]`,
    {
      visible: true,
    },
  );
  await page.screenshot({
    path: 'scorecard_rating_loaded.png',
    fullPage: true,
  });

  const scorecardRatings = _.groupBy(scorecard, 'name');
  await page.evaluate(
    (attributesMap, NUMERICAL_RATINGS) => {
      const attributes = document.querySelectorAll(
        'table.scorecard-attributes-table td.name',
      );
      for (const attributeNode of attributes) {
        if (!attributesMap[attributeNode.innerText]) continue;

        const rating = attributesMap[attributeNode.innerText].rating;
        const ratingNode = attributeNode.nextElementSibling.firstElementChild.querySelector(
          `span[data-rating-id="${NUMERICAL_RATINGS[rating]}"]`,
        );
        ratingNode.click();
      }
    },
    scorecardRatings,
    NUMERICAL_RATINGS,
  );
  await page.screenshot({ path: 'scorecard_filled.png', fullPage: true });

  await page.click(`li[data-rating-id="${OVERALL_RATINGS[overall_rating]}"]`);
  await page.screenshot({ path: 'rating_clicked.png', fullPage: true });
  await page.click('#s2id_scorecard_interviewer_id');
  await page.screenshot({ path: 'autocomplete_clicked.png', fullPage: true });
  await page.type('#s2id_autogen1_search', interviewer);
  await page.screenshot({ path: 'autocomplete_typed.png', fullPage: true });
  await page.waitFor(2500);
  await page.screenshot({ path: 'autocomplete_result.png', fullPage: true });
  await page.type('#s2id_autogen1_search', String.fromCharCode(13));
  await page.screenshot({
    path: 'autocomplete_enter_pressed.png',
    fullPage: true,
  });
};

module.exports = submitAssessment;
