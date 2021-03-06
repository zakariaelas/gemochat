# 💼 Gemochat

Gemochat is a web application that enables standard, consistent, and fast candidate evaluation for external interviewers by leveraging the interviewing experience the Gemography team has spent years fine-tuning. The application provides real-time questions that map to specific attributes on scorecards and makes use of the Twilio Programmable Video API to provide live video calls.

# 📖 Table of Contents
  - [1. Installation](#️-installation)
  - [2. Features](#-features)
    - [2.1 Twilio API](#twilio-api)
    - [2.2 Core Business Logic](#core-business-logic)
    - [2.3 Integration](#integration)
      - [2.3.1 Interview Assessment Submission](#interview-assessment-submission)
      - [2.3.2 Interviewers' Interviews](#interviewers-interviews)
    - [2.4 Admin Platform](#admin-platform)
  - [3. Improvements and Future Work](#-improvements-and-future-work)
  - [4. Feature requests](#-feature-requests)

## ⚒️ Installation

Use git to clone the gemochat repository locally

with HTTPS:

```bash
git clone git@github.com:zakariaelas/gemochat.git
```

with SSH:

```bash
git clone git@github.com:zakariaelas/gemochat.git
```

Futhermore, you will need the following software installed on your computer:
- [Node.js](https://nodejs.org/en/download/)
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- [Redis](https://redis.io/download)

Once you change directories to `backend` or `frontend`, you will need to install all dependencies.

```bash
cd backend
npm install
cd ../frontend
npm install
```

Following is a list of env variables necessary to spin up the server and for all features to work:

```bash
NODE_ENV=development
PORT=
DATABASE_URL=
JWT_SECRET=
JWT_EXPIRATION_TIME=
TWILIO_ACCOUNT_SID=
TWILIO_API_KEY_SID=
TWILIO_API_KEY_SECRET=
TWILIO_MAX_ALLOWED_SESSION_DURATION=
HARVEST_API_KEY=
GREENHOUSE_EMAIL=
GREENHOUSE_PASSWORD=
```

These can also be found in the `.env.example` file.

In order to help you get started quickly, you can make use of a seed script. The repo comes with two JSON files that you can leverage to add or remove seed data. The two files are located under the following paths: 
`./backend/db/seeds/users.json` and `./backend/db/seeds/jobs.json`

In order to run the seed script, execute the following command:

```bash
npm run seed
```

This will create users from the `users.json` file located in `./backend/db/seeds/users.json`, jobs from the `jobs.json` file located in `./backend/db/seeds/jobs.json`, and a dummy interview. The interview is hardcoded and mapped to the "Playground job", it also uses **Akram Saouri's** application for the playground job. The idea is to provide a quick interview for testing. Feel free to delete it and add a custom one through the app's interface.

`users.json` and `jobs.json` come with a default user and job. 

The user has the following credentials:


```bash
email: test@test.com
password: testaccount123
```

The job is the "Playground job" I had access to during my internship.

If you want to programmatically create users and jobs quickly, you can import the `createJobs` and `createUsers` functions from the `./backend/db/seeds/jobs.js` and `./backend/db/seeds/users.js` files respectively, and call them from additional scripts or files. 

## 💡 Features

The app's **main** features will be discussed in this section. I believe it would be best to break this down into what I think are the **building blocks** of the application.

### Twilio API

In order to power the app with real-time video and audio streaming capabilities, we have used the Twilio Programmable Video service.

Once we generate an access token from our application server, it can then be consumed by our React application to start a WebRTC Peer Connection through the Twilio Video JS sdk. I came across an open source Github [repo](https://github.com/twilio/twilio-video-app-react) from the Twilio team that implements a small video chat app. I found it particularly useful because it does align with what we need and also uses Material UI. Modifications where made accordingly to fit the context of our application.

### Core Business Logic

The added value of this project lies in the interviewing experience. We tried to optimize the experience by providing support for different steps or stages of the interview.

**During The Interview**

During the interview, interviewers are provided with a set of questions to ask the candidate. Based on their answer, they can assign one score from the following: *strong no*, *no*, *mixed*, *yes*, *strong yes*. These ratings were used to stay in sync with what is already available and used in greenhouse.

Furthermore, adjacent to each question, a text field that can be used to take notes. These notes should capture whatever goes beyond a simple score (follow up questions, discussions, etc) starting from when the question was asked, until when the interviewer decides to move to the next question. Basically, each set of notes is mapped to a specific question.

On the right hand side, you will be able to see, browse, and reorder the questions in the "Questions" tab.

**End of The Interview**

Hopefully, at this stage, the candidate's answers to the questions have helped build strong opinion about the interview. As soon as you click the hang up button, the **assessment** phase starts.

You will be prompted to fill out a scorecard, which is a standard way to assess candidates and mitigate interviewer bias. The scorecard contains a set of attributes, where each can be scored following the same rating scale as before.

To fill out the scorecard, you can use the **"Generate ratings"** button. This will use the ratings you have filled on the questions, as well as any notes taken, and will automatically score + compile notes for the relevant attributes. Each question is in fact, mapped to a set of attributes, each with a predetermined weight. We then compute the weighted average for each attribute and determine the ratings accordingly. The question-to-attribute mappings take place through an admin platform (not yet implemented).

Once the scorecard is filled, you can choose your overall recommendation of the interview. This is arguably the most important input from the interviewer, as this is what represents the final decision whether the candidate advances to the next stage or not.

### Integration

The company uses Greenhouse as its main recruiting software so we wanted to keep this as our single source of truth and try to integrate Gemochat with it.

### Interview Assessment Submission

Ideally, we want to be able to submit the scorecard + overall rating to Greenhouse. I believe there are 3 main options:

**Option 1: Use the Harvest API to submit scorecard or final interview decision**

Unfortunately, the Harvest API (built by Greenhouse) does not support submission of interview scorecard nor final decision.

**Option 2: Create custom_fields through the Harvest API (just like Eval)**

Just like there is a "Backend quiz" attribute on each application on greenhouse for example, we could add an "{Interview type} overall rating" custom field to capture the most important information of the assessment. However, this was a bit difficult to achieve because of the way custom fields work.

If a custom field was to be created through the following route 
```
POST https://harvest.greenhouse.io/v1/custom_fields
```
It would be added to **ALL** applications on greenhouse, including the real ones coming from authentic candidates, not just the "Playground Job" (we don't want this behavior). Then we'll have to fill it accordingly through this route:
```
PATCH https://harvest.greenhouse.io/v1/applications/{id}
```

**Option 3: Use a headless browser**

By using a headless browser, we could load relevant web pages on greenhouse and fill the scorecard, as well as the overall recommendation. Theoretically speaking, this would work great. However, in the future, any changes to the Greenhouse website might break our code. In addition, this would be very slow compared to hitting an endpoint if it was supported.

### Solution

The solution I ended up going for was based on **Option 3**. I used Puppeteer as a headless browser to target the relevant pages, fill the scorecard, fill the final decision, and finally submit the assessment. As a preventative measure in case things go wrong, all interview assessments are saved on Gemochat as well.

In order to try and deal with the performance issues, I have used redis as a pub/sub implementation to publish a message once interviewers submit their assessment. On the other side, our web scraper worker subscribes to this type of messages, and when received, starts its work. This would allow us to easily split the application into two services if performance becomes an issue. One service would simply deal with incoming requests, and another would do the "heavy" work that comes with scraping. Currently, there is only one service, but I hope this helps prepare for any future changes in case performance becomes a problem.

### Interviewers' Interviews

The way things work currently, each interviewer can add his or her own interview. All they have to provide is the following:

```bash
{
	interview_type: String,
	application_id: String,
	date: Date,
}
```

The `application_id` is then used to hit the following Harvest API [route](https://developers.greenhouse.io/harvest.html#get-retrieve-application): 
```
GET https://harvest.greenhouse.io/v1/applications/{id}
```

The response is then used to get the `job_id`, `job_name`, and `candidate_id`. These are important for our web scraper to work correctly.

I am well aware that this is not ideal. I believe that, as potential improvement, you can use **webhooks** from the scheduling software that you use or greenhouse to hit a Gemochat endpoint. This endpoint would simply add an interview given a date, an interview_type, and an application_id.

### Admin Platform

Currently, jobs are simply created through our seed script. An admin platform can be used to create jobs, scorecards, questions and their mappings, and perhaps manage interviewers.

## 🧠 Improvements and Future Work

Following is a recap on what has already been mentioned and further improvements that can be brought to the software:

### Better Test Coverage

I have only written a couple dozens of test cases to try and give the software some amount of reliability. However, there are probably a lot of features to be tested more extensively. The scraper service feels like one of those things that should be heavily tested to overcome its frail nature.

### Better Authentication System

I believe it would be best to use the company's auth system, if existing, to login to Gemochat. It would be cumbersome for interviewers, who work at the company, and possibly have an Eval (or other platforms) account to have to create a new one.

### Admin Platform

Just like we discussed in a different section, this is an important part of the system.

### Webhooks Integration

I see it as a good solution to the shortcomings of *Interviewers' Interviews*. I believe Greenhouse also supports a variety of webhooks, that can be used in combination with MixMax's webhooks to achieve the intended behavior.

### Screensharing

The current solution does not support streaming the media devices, however, this should be feasible through the Twilio Video API. You can get inspired from this [code](https://github.com/twilio/twilio-video-app-react/blob/master/src/hooks/useScreenShareToggle/useScreenShareToggle.tsx).

## 🤔 Feature Requests

Feature requests are features that were suggested by other engineers during different demo calls. These features are considered *nice-to-have* but are not a priority. 

### On demand recording of audio/video

The idea is to record a short but specific audio/video clip of the interview. Use cases include interviewers recording candidate's answers to some questions. I have looked into this a tiny bit, and i have stumbled across an interesting [library](https://github.com/muaz-khan/RecordRTC) that can be used to implement this.

### Addition of Questions and Mappings by Interviewers

At the moment, questions and their mappins are added through the back office. Ideally, we would like interviewers to be able to add their own questions as well and map them to specific attributes. The only concern is that this feature ends up re-introducing the bias we have tried to eliminate 😅. One thing worth thinking about is having interviewers request to add questions and perhaps an admin validating them before the interview, or increasing the amount of questions and let interviewers craft their own interview from a specific and pre-determined set of questions.
