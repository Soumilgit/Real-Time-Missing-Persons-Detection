# Real-Time Missing Persons Detection

## Overview

This **serverless** project uses **Amazon Rekognition** for real-time missing person detection. Users can upload images (photos or CCTV frames),fill a few form details and the system matches them with a database of missing persons.

The goal is to **automate face-matching**, reducing delays and human error, enabling fast action by citizens and authorities.

---

## Key Features

- **Real-Time Face Matching**: Upload an image or CCTV snapshot to get instant results via **Amazon Rekognition**.
- **Enhanced Upload Form** *(NEW)*: Collects detailed information like time, location, and description to aid in analysis.
- **Fast & Accurate**: Eliminates manual search with AI-powered facial comparison.
- **Serverless Architecture**: Scales seamlessly using **AWS Lambda**, **API Gateway**, and **S3**.

---

## AWS Rekognition Image for Documentation – Terminal Output for One Dataset Entry
![Screenshot 2025-04-27 040306](https://github.com/user-attachments/assets/9ed439e2-eff7-4957-8cc1-b997add07c0c)
![Screenshot 2025-04-27 040316](https://github.com/user-attachments/assets/71469c60-ced0-4bac-a2b9-61e2603cd2eb)

---

##  Problem

### Manual Process:
- Civilians browse websites and manually compare faces.
- Time-consuming, error-prone, and inefficient.

### Our Solution:
- Upload a single image, and fill few form details.
- Automatically match against missing persons.
- Instant, accurate, and user-friendly, also stores user data via Formspree.

---

## 🆕 What’s New?

### Upload Form Enhancements:
- Added fields: **Location**, **Date & time**, **Name**, **Email**, **Phone**, **Additional Details**, etc.
- Data stored securely via **Formspree** for later analysis by investigators.

---

## 💼 Real-World Use Cases

- **Civilians**: Upload images using mobile or camera footage.
- **Law Enforcement**: Cross-check faces with missing person records in real-time.

---

## 🛠️ Technologies Used

### Frontend:
- **HTML5**, **CSS3**, **Vanilla JS**
- **TailwindCSS** for fast, responsive UI design

### Backend:
- **AWS Lambda (Python)** for processing logic
- **Amazon Rekognition** for facial matching
- **Amazon API Gateway** for REST API endpoints
- **Amazon S3** for storing images and results
- **Formspree** for handling form submissions with added fields

---

## How It Works

1. **Image Upload**: User uploads a photo and fills out the enhanced form.
2. **Face Matching**: Rekognition compares the face with the missing persons dataset.
3. **Results**: Matches (or no matches) returned instantly.
4. **Formspree**: Metadata is stored for further analysis.

---

## Project Flow

### Old Method:
- Open website
- Manually search using filters
- Visually compare entries

### New Method:
1. **Login/Signup** with validation & forgot password options
2. **Fill the enhanced form** with contextual fields
3. **Upload a photo**
4. **Instant result** via Rekognition
5. **Formspree stores details** for backend processing

---

## Testing & Validation

- **AWS Lambda** tested with base64 image payloads and test events.
- **Postman** used to verify deployed API endpoints with JSON inputs.
- **Video Demo** available showing the updated upload form in action : https://youtu.be/kIx9YpGx90E .

---

## Installation & Setup

### Prerequisites:
- AWS Account with access to **Lambda**, **Rekognition**, **API Gateway**, **S3**
- **Formspree** account for form data storage

### Setup Steps:

```bash
git clone https://github.com/Soumilgit/Real-Time-Missing-Persons-Detection.git
  ```

2. **Set up AWS services**:
   - Create an **S3 bucket** for storing images and feedback.
   - Set up **Lambda functions** for face recognition.
   - Use **API Gateway** to link the frontend to the backend.

3. **Deploy Frontend**:
   - Upload HTML, CSS, JS files to S3 or use Vercel/Netlify for deployment.

4. **Test the system**:
   - Upload an image, fill additional form details and make sure the face recognition provides accurate results.

## Scalability

This project is designed to grow:
- **Serverless**: Minimal infrastructure management with **AWS Lambda**.
- **Modular Pages**: Easy to add new features and pages as the project expands.
- **S3 and API Gateway** can handle a growing number of images in the database.

## Conclusion

This project **automates the search** for missing persons using real-time face recognition. It provides a **fast**, **accurate**, and **scalable** solution that can be a game-changer in helping authorities identify missing people and reunite families.
