# VoltWise - US Energy Demand and Generation Forecasting Solution

![voltwise](https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/375e0d91-217f-421e-bb48-631c085e8be6)


## Project Proposal

An energy insights platform that utilizes AWS services, machine learning algorithms, and user-friendly visualization tools to transform the way energy trends are understood and utilized. With the ability to forecast energy demand and net generation predictions across multiple U.S. regions, VoltWise empowers utilities, energy providers, and businesses to make better data-driven decisions.

Additionally, VoltWise isn't just about energy – it's versatile! This Proof of Concept can guide any company's journey by analyzing historical trends, whether it's about demand, sales, profit, or revenue. Get insights, make smart calls, and drive growth!

Check out the project live at https://voltwise.vercel.app/

From a learning perspective, we set out to explore how to build a visualization dashboard using React.js and Next.js. We also dived into understanding how to integrate various AWS cloud services for creating a serverless and automated backend.

## Tech Stack

- Frontend: React.js, Next.js, CSS, Material UI, React Query, Zustand, ApexCharts
- Backend: Amazon Web Services (Lambda, S3, API Gateway, EventBridge, ECS, ECR, Step Functions)
- Deployment: Vercel, CircleCI, GitHub Actions

## Demo

https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/d25bafeb-f69d-4ecc-8062-1996aaeb5c16

## Screenshots

![voltwise-1](https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/dc3e4642-6801-4d8f-8d73-906c33957079)

![voltwise-2](https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/75c38583-d5d4-4612-b4d7-4bd059e544bb)



## SSR + On-demand Revalidation

The primary sections of the website—Plot, Compare, and Analytics—are generated on the server side during the build process using [**Static Site Generation (SSG)**](https://nextjs.org/docs/pages/building-your-application/rendering/static-site-generation) in Next.js. This approach allows us to prefetch data for the default parameters on these pages, effectively reducing the initial load time.

When the user modifies the search parameters, an API call is initiated, and React Query handles the caching of API responses. However, considering that historical data is updated daily on the backend, we've implemented a strategy called [**On-demand Revalidation**](https://nextjs.org/docs/pages/building-your-application/rendering/incremental-static-regeneration#on-demand-revalidation) in Next.js to rebuild only these specific pages without needing to initiate a complete app rebuild.

Within the app's pages/api directory, there are three files acting as API endpoints. In these files, we utilize the res.revalidate("path to page") method, specifying the route of the page we wish to rebuild. To facilitate this, we make calls to these API endpoints whenever we anticipate a backend data change. GitHub Actions are instrumental in orchestrating this process, as outlined in the [**cron_job.yml**](https://github.com/shubhambhagat98/voltwise-fe/blob/main/.github/workflows/cron_job.yml), containing the GitHub workflow code that triggers our revalidation API endpoints. For security measures, we employ a secret token to safeguard these revalidation API endpoints.


## Backend


The backend is deployed on AWS cloud platform and it is mainly divided into 3 components

### Data Ingestion and Updation
<p>
  
  <img src="https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/56b4d7e8-99f2-448a-a6ec-3134d21443b3" align="right" width="400"/>

  We have successfully implemented and deployed our Data Extraction logic, which involves segmenting historical data by region and storing it in separate parquet files. Our process begins by running a Python script that retrieves data from the EIA API for the last four days, with the fourth day being the previous day when the script is executed.

To ensure data completeness, if any data is missing for the previous day, we fill in the gaps by using the median of the available data for that day. For the remaining three days, where updated values are likely to be present, we update the historical data with the latest information for matching dates and append new data for the previous day (non-matching date).

Once the historical data is updated, we store the region-wise parquet files in our designated S3 bucket. This entire process is automated on AWS using a lambda function called "daily-ingestion," which is triggered by Amazon EventBridge every day at 6:00 am EDT.
</p>
<br/>


## Model Retraining & Prediction

<p>


<img src="https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/f0c06011-bee7-4ac3-9c66-237458e0c278" align="left" width="500"/>
  
Our automated ML modeling process consists of two main tasks: model retraining and generating predictions. This process runs weekly when new data for the entire week becomes available

To achieve this, we utilize AWS Step Functions as our orchestration tool. Using Step Functions, we create a simple workflow. The workflow begins with the retraining task, which involves running a Docker container in an ECS cluster. This container retrieves updated data from S3, performs model retraining, and stores the updated model files in S3 as pickle files.

Once the model is trained on the new data, the next step is to generate a 1-year forecast. Step Functions triggers another task in ECS to run a Docker container in the ECS cluster. This container generates the new predictions and saves them in the designated S3 bucket. The entire workflow is scheduled to run automatically every week using Amazon EventBridge.
</p>
<br/>


## API Gateway and Frontend Integration

<p>


<img src="https://github.com/shubhambhagat98/voltwise-fe/assets/53030762/37363d16-7273-40a1-aa71-0a930788da96" align="right" width="600"/>

  We utilize a combination of technologies for our frontend development. Next.js serves as our frontend framework, ApexCharts.js handles interactive data visualization components, and Material UI is used for CSS styling.

To communicate with our backend, the frontend makes API calls to our AWS API Gateway endpoint. These calls are in the form of HTTP GET requests, accompanied by query parameters. For forecasting purposes, additional parameters such as region, model, frequency, and time are also included.

Upon receiving the request, the API Gateway routes it to the associated Lambda function. The query parameters are proxied to the Lambda function, which fetches the relevant data from the S3 buckets. The Lambda function performs aggregation and filtering based on parameters like region, frequency, time, and model.

The retrieved data is then visualized using ApexCharts.js, which provides chart components with interactive functionalities such as zooming, panning, and data resetting. To optimize performance, we incorporated ReactQuery to cache API responses for 5 minutes, reducing unnecessary API calls when data remains unchanged. The frontend of the project is deployed on Vercel, a cloud platform.
</p>

