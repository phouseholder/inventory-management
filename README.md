# Parker Householder's Next JS Inventory

This repository acts as a small sample CRUD application for tracking inventory using NextJS, Redux Toolkit, Prisma, Tailwind, and MUI. Next JS Inventory has a sample dashboard page, pages for listing users and inventory, a user settings menu (filler/sample data), and a Products page with full CRUD funcationality.

## Prerequisites

To get started, please ensure your local machine has the following installed

- **Node 21 or higher** 📦
- **pgAdmin 4** 🛠️

## Installation Guide

### Step 1: Clone Repository from Github

Clone this repository to your local machine

```sh
git clone https://github.com/phouseholder/inventory-management
cd inventory-management
```

### Step 2: Install Dependencies

Install all dependencies using npm

```sh
npm install
```

### Step 3: Seed Database

Seed the POSTgreSQL database using Prisma

> [!IMPORTANT]
> Please ensure you are running these commands in the `server` directory

```sh
cd server
npx prisma generate
npx prisma migrate dev --name init
npm run seed
```

### Step 4: Start Development Client

Kick off your development client using npm. This will run on http://localhost:3001. This will display your frontend

```sh
cd client
npm run dev
```

### Step 5: Start Development Server

Kick off your development server using npm. This will run on http://localhost:8000. This will act as your backend API which communicates with POSTgreSQL.

> [!TIP]
> You can install an application like Postman or Insomnia for easier API testing

```sh
cd server
npm run dev
```

## Available Components

List of all componenets available within this template

### CRUDModal

This is a modal component designed to handle all pop-up data mutations. The Default configuration of the modal is Create.<br/><br/>

Props:
`data` - Any data type for sending data from any of the modeled tables<br/>
`fieldType` - String value that specifies fields to render<br/>
`isDelete?` - Boolean for if the mutation is Delete<br/>
`isEdit?` - Boolean for if the mutation is Edit<br/>
`isOpen` - Boolean for determing open state of modal<br/>
`onClose` - Handler for when the modal is closed<br/>
`onSubmit` - Handler for then the modal is submitted<br/>

### Panel

This component is used as a building block for dividing out content on a grid.<br/><br/>

Props:<br/>
`children` - Panel content<br/>
`title` - String value for header text<br/>
`isLoading` - Boolean value to determine loading state<br/>
`classes` - String value that applies classes to outer body
