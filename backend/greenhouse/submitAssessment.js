const config = require('../config');
const RATINGS = require('../enums/ratings');
const puppeteer = require('puppeteer');
const _ = require('lodash');
const OVERALL_RATINGS = {
  [RATINGS.STRONG_NO]: 1,
  [RATINGS.NO]: 2,
  [RATINGS.YES]: 3,
  [RATINGS.STRONG_YES]: 4,
};

const NUMERICAL_RATINGS = {
  [RATINGS.STRONG_NO]: 1,
  [RATINGS.NO]: 2,
  [RATINGS.YES]: 3,
  [RATINGS.STRONG_YES]: 4,
  [RATINGS.MIXED]: 5,
};

const submitAssessment = async ({
  candidate_id,
  application_id,
  interviewer,
  interview_type,
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
    .$(`tr[name="${interview_type}"]`)
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

  await page.waitForSelector(
    `li[data-rating-id="${OVERALL_RATINGS[overall_rating]}"]`,
    {
      visible: true,
    },
  );

  const scorecardRatings = scorecard.reduce(
    (acc, curr) => ({
      ...acc,
      [curr.name]: { ...curr },
    }),
    {},
  );

  // page.on('console', (msg) => {
  //   for (let i = 0; i < msg._args.length; ++i)
  //     console.log(`${i}: ${msg._args[i]}`);
  // });

  await page.evaluate(
    (attributesMap, NUMERICAL_RATINGS, RATINGS) => {
      const attributes = document.querySelectorAll(
        'table.scorecard-attributes-table td.name',
      );

      for (const attributeNode of attributes) {
        const assessmentAttribute = attributesMap[attributeNode.innerText];
        const has_rating =
          assessmentAttribute &&
          assessmentAttribute.rating !== RATINGS.NO_DECISION;

        if (!assessmentAttribute || !has_rating) continue;

        const rating = assessmentAttribute.rating;
        const ratingNode = attributeNode.nextElementSibling.firstElementChild.querySelector(
          `span[data-rating-id="${NUMERICAL_RATINGS[rating]}"]`,
        );
        ratingNode.click();
      }
    },
    scorecardRatings,
    NUMERICAL_RATINGS,
    RATINGS,
  );

  await page.click(`li[data-rating-id="${OVERALL_RATINGS[overall_rating]}"]`);

  await page.click('#s2id_scorecard_interviewer_id');

  await page.type('#s2id_autogen1_search', interviewer);

  await page.waitFor(3500);

  await page.type('#s2id_autogen1_search', String.fromCharCode(13));
  await page.click('#submit_scorecard_button');

  await page.waitFor(2000);

  await page.close();
  await browser.close();
  console.log('done');
};

module.exports = submitAssessment;
