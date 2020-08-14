const config = require('../config/');
const puppeteer = require('puppeteer');
const CREDENTIALS = {
  email: config.greenhouse.email,
  password: config.greenhouse.password,
};

const mappings = {
  strong_no: 1,
  no: 2,
  yes: 3,
  strong_yes: 4,
};

const attributesMap = {
  'Build Automation': { rating: 'no' },
  'Version Control': { rating: 'no' },
  'Error Handling': { rating: 'strong_yes' },
};

(async (data) => {
  const { overall_rating, interviewName } = data;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(
    'https://app2.greenhouse.io/people/46134249002?application_id=51668993002&src=search',
    { headless: false },
  );
  await page.type('#user_email', CREDENTIALS.email);
  await page.click('#submit_email_button');
  await page.waitForSelector('#user_password', { visible: true });
  await page.waitForSelector('#submit_password_button', { visible: true });
  await page.type('#user_password', CREDENTIALS.password);
  await page.click('#submit_password_button');
  await page.waitForNavigation();
  const interviewStageId = await page
    .$(`tr[name="${interviewName}"]`)
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
  const scorecardLink = `https://app2.greenhouse.io${scorecardHref}&new=true#scorecard`;
  console.log(scorecardLink);
  await page.goto(scorecardLink);
  await page.screenshot({ path: 'scorecard_page_loaded.png', fullPage: true });
  await page.waitForSelector(
    `li[data-rating-id="${mappings[overall_rating]}"]`,
    {
      visible: true,
    },
  );
  await page.screenshot({
    path: 'scorecard_rating_loaded.png',
    fullPage: true,
  });

  await page.evaluate(
    (attributesMap, mappings) => {
      const attributes = document.querySelectorAll(
        'table.scorecard-attributes-table td.name',
      );
      for (const attributeNode of attributes) {
        if (!attributesMap[attributeNode.innerText]) continue;

        const rating = attributesMap[attributeNode.innerText].rating;
        const ratingNode = attributeNode.nextElementSibling.firstElementChild.querySelector(
          `span[data-rating-id="${mappings[rating]}"]`,
        );
        ratingNode.click();
      }
    },
    attributesMap,
    mappings,
  );
  await page.screenshot({ path: 'scorecard_filled.png', fullPage: true });

  await page.click(`li[data-rating-id="${mappings[overall_rating]}"]`);
  await page.screenshot({ path: 'rating_clicked.png', fullPage: true });
  await page.click('#s2id_scorecard_interviewer_id');
  await page.screenshot({ path: 'autocomplete_clicked.png', fullPage: true });
  await page.type('#s2id_autogen1_search', 'Salim');
  await page.screenshot({ path: 'autocomplete_typed.png', fullPage: true });
  await page.waitFor(5000);
  await page.screenshot({ path: 'autocomplete_result.png', fullPage: true });
  await page.type('#s2id_autogen1_search', String.fromCharCode(13));
  await page.screenshot({
    path: 'autocomplete_enter_pressed.png',
    fullPage: true,
  });
  console.log('done');
})({ overall_rating: 'yes', interviewName: 'Technical Interview' });
