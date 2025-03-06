# Next-Gen Candidate Evaluation Integrating Multi-Model Analysis

## Overview
The **Next-Gen Candidate Evaluation Integrating Multi-Model Analysis** is a full-stack, AI-powered mock interview application designed to assess candidates' **technical, behavioral, and cognitive abilities** using a **comprehensive multi-model framework**.

This system leverages cutting-edge AI and ML technologies to **provide objective and data-driven evaluations** while mitigating hiring biases. It integrates **text, speech, and facial expression recognition** to deliver a **holistic assessment** of candidates.

## Features
- **Multi-Modal Evaluation**: Analyzes candidate interactions using text, voice, and facial expressions.
- **Real-Time Sentiment Analysis**: Powered by **Google's Gemini AI** for NLP and sentiment analysis.
- **Facial Expression & Body Language Analysis**: Utilizes **OpenCV and TensorFlow** for evaluating confidence and emotional intelligence.
- **Technical Proficiency Assessment**: A **custom ML model** analyzes coding skills and problem-solving approaches.
- **Secure User Authentication**: Integrated with **Clerk** for scalable authentication.
- **Explainable AI (XAI) Integration**: Ensures transparency in evaluation metrics.
- **Efficient Database Management**: Uses **Drizzle ORM with PostgreSQL** for structured data handling.
- **Seamless UI/UX**: Developed using **Next.js** for a responsive and smooth user experience.
- **Cloud Deployment**: Hosted on **Vercel** for scalability and performance.

## Technologies Used
- **Frontend**: Next.js (React framework for dynamic and responsive UI)
- **Backend**: Drizzle ORM (for efficient database interactions)
- **AI/ML Models**:
  - **Google's Gemini AI**: NLP and sentiment analysis
  - **OpenCV & TensorFlow**: Facial expression & body language analysis
  - **Custom ML Model**: Technical proficiency assessment
- **Database**: PostgreSQL (for structured data storage and retrieval)
- **Authentication**: Clerk (for secure user authentication)
- **Deployment**: Vercel (for hosting and scalability)

## Installation & Setup
### Prerequisites
Ensure you have the following installed:
- Node.js & npm
- PostgreSQL
- Git

### Steps
1. **Clone the repository**:
   ```sh
   git clone https://github.com/ParikshitJ20/AI-Mock-Interview-Platform.git
   cd AI-Mock-Interview-Platform
   ```

2. **Install dependencies**:
   ```sh
   npm install
   ```

3. **Set up environment variables**:
   - Create a `.env.local` file in the root directory.
   - Add required API keys and database credentials.

4. **Run the application**:
   ```sh
   npm run dev
   ```
   The application should now be accessible at `http://localhost:3000`.

## Usage
1. **Sign up/login** securely using Clerk authentication.
2. **Initiate a mock interview**: Choose from technical, behavioral, or cognitive assessments.
3. **Interact with the AI**: Respond to questions via text, voice, and facial expressions.
4. **Receive AI-driven feedback**: Get insights on technical proficiency, sentiment analysis, and confidence levels.
5. **View reports**: Access detailed evaluation metrics with explainable AI insights.

## Contributions
Contributions are welcome! Follow these steps:
1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit.
4. Open a pull request.

---
This AI-driven mock interview platform revolutionizes recruitment by enhancing **objectivity, transparency, and efficiency** in candidate evaluations. 🚀

