# EchoTexts - A Text-Only Social Network 🌐💬📲

## Overview
EchoTexts is a **text-only social network**, inspired by Twitter, designed and developed as a **CRUD web application** by our team of four members using agile methodology, specifically **Scrum**. It allows users to perform basic operations such as creating, reading, updating, and deleting posts, user profiles, likes, reposts, comments etc. The application follows a **three-tier architecture** consisting of front-end, back-end, and database layers.

The development of EchoTexts follows the **Git Flow methodology**, which organizes the codebase into different branches for better collaboration and version control. The main branch serves as the stable release branch, while the develop branch contains ongoing development work for the next release. Additionally, there are several feature branches (prefixed with **'feat/'**), testing branches (prefixed with **'test/'**), and fix branches (prefixed with **'fix/'**) that contain individual features, testing implementations, and bug fixes, respectively.

# Software Stack 🛠️

### Front-end 📱
- **Framework:** React
- **Communication:** RESTful web services
- **Authentication:** JWT COOKIE

### Back-end ⚙️
- **Framework:** Express with Node.js
- **API Layers:** Controllers, Routes, Data Layer (Models) each model corresponds to a table in your database
- **Dependency Injection:** Implemented

### Database 🗄️
- **Type:** PostgreSQL securely hosted in the cloud, eliminating the need for us to manage infrastructure or worry about server maintenance
- **ORM:** Prisma, automatically generates models based on the database schema defined in the prisma.schema file

### Testing 🧪
- **Integration Testing:** Jest & Supertest

## Preview

## Prerequisites

## Getting Started

## Acknowledgements 🙏

- [Supabase](https://supabase.io) for providing the cloud-hosted PostgreSQL database solution.
- [Prisma](https://prisma.io) for auto-generating database models and simplifying database access.

## License 📄
