# Ecologi Trees

## Local Setup

To run the project locally make sure to have installed Node.js and Yarn then launch in the terminal:

```bash
yarn install && yarn dev
```

This will open up the local development of Next.js on `localhost:3000`

## Live Online Demo

You can find an online version of this project here: https://ecologi-trees.vercel.app

## My Approach to the Solution

1. First I cleaned up the API response on the server side, optimizing it once for all users. I grouped the items by day and ordered all the dates in chronological order;
2. Then I switch to the Frontend, looking for the right library to showcase the Graph quickly, I choose ["recharts"](https://github.com/recharts/recharts) being one of the most used with React and also being currently supported;
3. Finally I decided to revalidate the data from the API every 10 seconds with Next.js [`revalidate`](https://nextjs.org/docs/api-reference/data-fetching/get-static-props#revalidate) option.

## Libraries used

1.  "next", "react", "react-dom" to use React with Next.js;
2.  "recharts" used as the library to display the number of trees daily;
3.  "styled-components" used to style the UI elements like on ecologi main site.

## Optimizations to the API?

In a production version of the API I would:

1. Group by Days the items;
2. Order results from API by dates to make it chronological;
3. Add filters to make it possible to query specific timeframes.
