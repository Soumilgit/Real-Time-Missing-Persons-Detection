## Real-Time-Missing-Persons-Detection

## Overview

This **serverless** project uses **Amazon Rekognition** for real-time missing person detection. It lets users upload images (photos or CCTV frames) and matches faces with a database of missing persons. 

The goal is to automate the face-matching process, making it faster and more accurate, so authorities can act quickly. Think of it as upgrading from manually searching through records to instantly identifying a match.

### Key Features:
- **Real-Time Face Matching**: Upload a photo or CCTV frame and get instant results by matching the face to the missing persons' database.
- **Fast and Accurate**: Eliminates manual search and speeds up the process with **Amazon Rekognition**.
- **Scalable Architecture**: Serverless with AWS services, which makes it efficient and easy to scale as the database grows.
  
## Problem

If a civilian spots someone who might be missing:
1. **Manual Search**: They need to open a website, filter by date, district, etc., and scroll through hundreds of images.
2. **Time-Consuming**: It’s slow, error-prone, and relies on visual identification.

### How Our Project Solves It:
With this tool, a civilian can simply:
1. **Upload an image**: Take a picture or use a CCTV frame.
2. **Instantly match**: The system automatically compares the face to the missing persons' database.
3. **Quick and Accurate**: No more waiting or manual searching — just a fast match.

## Real-World Use Case

This tool works for:
1. **Citizens**: They can upload photos or frames and get immediate results.
2. **Police Departments**: Internally use the system to check faces against the database on the go.

## Technologies Used

### Frontend:
- **HTML5**, **CSS3**, **Vanilla JS**
- **TailwindCSS**: Helps in building a responsive, modern UI quickly.

### Backend:
- **Python** for backend functions (Lambda functions)
- **Amazon Rekognition**: Face recognition to compare the uploaded image with the missing persons' dataset.
- **AWS API Gateway**: For creating APIs to connect frontend with backend.
- **Amazon S3**: Store images and JSON feedback securely.
- **Formspree**: Stores the user data from Feedback form.

### Hosting:
- **Static Website Hosting on S3** or deploy via **Vercel/Netlify** for easy CI/CD.

## Project Flow

### Manual Search:
1. **Open the website**, filter by date, district, etc.
2. **Scroll through hundreds of entries** hoping to spot a match.
3. **Takes time** and can result in missed opportunities.

### With Our Tool:
1. Simple **login** & **signup** forms with password validation, **forgot password** option, and error redirection on failure.
2. **Upload a photo** or **CCTV frame**.
3. **Instantly matches** faces with the missing persons' database. Currently, our custom dataset consists of **20+** entries only; planning to increase it later on. 
4. **Quick and accurate** results, helping authorities move faster.

## Benefits

- **Speed**: No more manual searching, results are almost instant.
- **Accuracy**: Leveraging **Amazon Rekognition** for face matching ensures reliable results.
- **User-Friendly**: Simple interface for citizens and quick integration for authorities.

## Impact

By speeding up the process of identifying missing persons, this project **helps families reunite**, providing both **emotional** and **social value**. It empowers authorities to act swiftly, improving the chances of finding a missing person.

## How It Works

1. **Image Upload**: Users can upload an image (photo or CCTV frame).
2. **Face Recognition**: The uploaded image is processed by **Amazon Rekognition**.
3. **Instant Results**: The system checks for matches against the missing persons' database and provides fast results.

## Technical Depth

- **AWS Lambda**: Serverless functions that handle image processing and API logic.
- **Amazon Rekognition**: Uses AI to match faces to the missing persons' database.
- **API Gateway**: Connects frontend to backend through REST APIs.
- **Amazon S3**: Stores uploaded images and feedback securely.

## AWS Rekognition Image for Documentation – Terminal Output for One Dataset Entry
![Screenshot 2025-04-27 040306](https://github.com/user-attachments/assets/84573a4e-d773-4e65-b85a-2e3c48c90257)
![Screenshot 2025-04-27 040316](https://github.com/user-attachments/assets/74b9eac4-0132-4ee5-bb5d-758835765ad7)

## Installation and Setup

### Prerequisites:
- AWS Account with access to **Amazon Rekognition**, **API Gateway**, and **Lambda**.
- Static website hosting set up on **S3** or deploy via **Vercel/Netlify**.

### Steps:
1. **Clone the repository**:
    ```bash
    git clone https://github.com/Soumilgit/Real-Time-Incident-Reporting-and-Analysis-with-Face-Recognition.git
    ```

2. **Set up AWS services**:
   - Create an **S3 bucket** for storing images and feedback.
   - Set up **Lambda functions** for face recognition.
   - Use **API Gateway** to link the frontend to the backend.

3. **Deploy Frontend**:
   - Upload HTML, CSS, JS files to S3 or use Vercel/Netlify for deployment.

4. **Test the system**:
   - Upload an image and make sure the face recognition provides accurate results.

## Scalability

This project is designed to grow:
- **Serverless**: Minimal infrastructure management with **AWS Lambda**.
- **Modular Pages**: Easy to add new features and pages as the project expands.
- **S3 and API Gateway** can handle a growing number of images in the database.

## Conclusion

This project **automates the search** for missing persons using real-time face recognition. It provides a **fast**, **accurate**, and **scalable** solution that can be a game-changer in helping authorities identify missing people and reunite families.
