# XML-API-TEST

## Table of Contents
1. [Description](#description)
2. [Instructions](#instructions)
4. [Retrospective](#retrospective)
5. [Acknowledgements](#acknowledgments)

## Description
XML-API-TEST is an Express-based application that makes requests to the arXiv API in order to render specific information. It uses `express-handlebars` to also render views, specifically a homepage, a page on articles, and a page on authors.

## Instructions
1. Fork and clone this repository
2. Ensure you are using Node.js `>=14.17.3`. Consider using [avn](https://github.com/wbyoung/avn).
3. Run `npm ci`
4. Run `npm run start`
4. Navigate to http://localhost:3000 on a browser

## Retrospective
### What went well
1. I had the chance to explore Express, which is something I have always wanted to do. I'm excited by how easy it was to create an API, compared to Rails, and I look forward to using it again.
2. I'm pretty proud of the amount of work I was able to put out in a short amount of time.

### What could have gone better
1. The freedom and lack of conventions imposed by Express, especially with regards to code organization, was daunting. I spent a good portion of time thinking through folder structures, and even then I am not 100% satisfied. My prior experience with Rails was somewhat helpful.
2. I am not satisfied with testing the articles routes with `supertest`. As it is currently written, the tests make actual fetch requests to the arXiv API. The relevant function call, `fetchAndParseXML`, doesn't appear to be spyable/mockable by Jest from this test. It might be better to include the route's `indexHandler` in the relevant helper module and unit test the handler there, where `fetchAndParseXML` can be spied/mocked. Subsequently, the route's actions could then be more broadly covered in end-to-end testing, such as with Cypress.

### What would more time afford
1. Initialize an ESLint configuration file, to ensure styling and syntax is correct and consistent across the codebase.
2. Setup Cypress, and at least write a simple end-to-end test for navigating the front-end/HTML pages.
3. Continue working on the logic to obtain data on authors as far back as 6 months, which might include the following steps:
   1. Get the current date on a `GET` request to `/authors`
   2. Fetch information from arXiv with the necessary `sortBy` and `sortOrder` query parameters.
   3. From the parsed fetch response, make note of the total numbers of hits for the query, as well as the value of the `updated` field on the earliest article in the response.
   4. Transform the parsed fetch response as needed
   5. If the `updated` field is less than 6 months back from the current date, paging through the results until either the earliest `updated` is after 6 months, or we've hit reached the end of the results.
4. Add more tests, using the Jest coverage report as a guide.
5. Make it prettier, tbh.

## Acknowledgments
- Thank you to arXiv for use of its open access interoperability.
