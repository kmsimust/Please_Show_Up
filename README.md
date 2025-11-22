# Please Show Up!

## 🍵 Background

Most groups of people are struggling to make an appointment for a certain event because everyone does not have common freetime. This causes frustration, inefficient work and confusion. Currently the solutions are chat, calendar and call. 


## 🎯 Objective

‘Please show up’ is a website where groups create schedules to display as a table with dates, times and event name. Members will tick “Yes,” “No,” or “Maybe” for each appointment to let others in the group know if they are available or not. 

Attendance will be recorded which you can come back and look at the previous schedule, and there will be a system called social credit point and this point will be deducted if a person is late and does not show up with no reason despite clicking yes. The point will go up if they click yes and be on time. This will encourage people to be more responsible for an appointment.

Moreover, it will be more convenient in a project for bosses to keep track of their group and punish them according to their policies. A tier list will be displayed to make it easier to keep track of their reliability.


## 📘 Documents

- [📑 GoogleDoc](https://docs.google.com/document/d/1llBzp3PViO052-bYdj2gJExWpR_8H1eHP4JyIaei_Os/edit?usp=sharing) 
- [🎨 MockUp UI](https://www.figma.com/design/ipQhiaDhrvJzCVRj48IRSp/Please_Show_Up-?node-id=617-2&t=ubJu8vFyddEIbaQ8-1)
- [📆 Jira Board](https://ku-team-y210t4g2.atlassian.net/jira/software/projects/ISP/boards/36?atlOrigin=eyJpIjoiZDViMzI1ZmI5N2YwNDYxZTk3ZTlkMmQ4YTkxOWVmMWEiLCJwIjoiaiJ9)


## 👥 Team Members

1.  6710545474   Jirakorn Chaitanaporn
2.  6710545636   Tat Tanprasert 
3.  6710545814   Phubet Ueananta 
4.  6710545971   Adithep Sukcharoen
 


## 💾 Tech Stack

- **Frontend**: React + React-Router
- **Backend**: Django REST Framework
- **Database**: MySQL
- **Project Management**: Jira  



## 🍵 Background

Most groups of people are struggling to make an appointment for a certain event because everyone does not have common freetime. This causes frustration, inefficient work and confusion. Currently the solutions are chat, calendar and call. 



## 🎯 Objective

‘Please show up’ is a website where groups create schedules to display as a table with dates, times and event name. Members will tick “Yes,” “No,” or “Maybe” for each appointment to let others in the group know if they are available or not. 

Attendance will be recorded which you can come back and look at the previous schedule, and there will be a system called social credit point and this point will be deducted if a person is late and does not show up with no reason despite clicking yes. The point will go up if they click yes and be on time. This will encourage people to be more responsible for an appointment.

Moreover, it will be more convenient in a project for bosses to keep track of their group and punish them according to their policies. A tier list will be displayed to make it easier to keep track of their reliability.



## 📘 Documents

- [📑 GoogleDoc](https://docs.google.com/document/d/1llBzp3PViO052-bYdj2gJExWpR_8H1eHP4JyIaei_Os/edit?usp=sharing) 
- [🎨 MockUp UI](https://www.figma.com/design/ipQhiaDhrvJzCVRj48IRSp/Please_Show_Up-?node-id=617-2&t=ubJu8vFyddEIbaQ8-1)
- [📆 Jira Board](https://ku-team-y210t4g2.atlassian.net/jira/software/projects/ISP/boards/36?atlOrigin=eyJpIjoiZDViMzI1ZmI5N2YwNDYxZTk3ZTlkMmQ4YTkxOWVmMWEiLCJwIjoiaiJ9)



## 👥 Team Members

1.  6710545474   Jirakorn Chaitanaporn
2.  6710545636   Tat Tanprasert 
3.  6710545814   Phubet Ueananta 
4.  6710545971   Adithep Sukcharoen
 


## 📹 Video Presentation

- [Youtube](https://youtu.be/SEtLJMosBLw) — Sprint 1
- [Youtube](https://youtu.be/lO1jIbKyTTU) — Sprint 2
- [Youtube](https://youtu.be/Pro8c8oYaro) — Sprint 3
- [Youtube](https://youtu.be/N8GAk3oWems) — Sprint 4
- [Youtube](https://youtu.be/PahZSmFQs9s) — Sprint 5
- [Youtube](https://youtu.be/jLclorgcZBs) — Sprint 6 (Software Demonstration)
- [Youtube](https://youtu.be/rBmmBbH0_iY) — Sprint 6 (Software Development)



## ⚙️ Installation & Running Guide

**Prerequisites:**
*   **Node.js** (v18 or higher recommended)
*   **Python** (v3.10 or higher recommended)
*   **Git**
*   **MySQL Database** (Ensure you have a MySQL server running)

### You can choose to run by docker use frontend+backend Setup.

### run by using docker

```bash
docker-compose up -d
```


### run by using frontend+backend Setup

---
### 1. Backend Setup (Django)

**Step 1.1: Clone and Navigate**
```bash
git clone https://github.com/your-repo/Please_Show_Up.git
```
```bash
cd Please_Show_Up/backend
```

**Step 1.2: Create `.env` File**
Create a file named `.env` inside the `backend` folder and add your database configuration:
```env
MYSQL_NAME=your_db_name
MYSQL_USER=your_db_user
MYSQL_PASSWORD=your_db_password
DB_HOST=localhost or ipv4 which is get from running ipconfig in terminal and put it here
DB_PORT=3305
```

**Step 1.3: Install Dependencies & Run**

*For Windows:*
```bash
python -m venv venv
```
```bash
.\venv\Scripts/activate
```
```bash
pip install -r requirements.txt
```
```bash
python manage.py migrate
```
```bash
python manage.py runserver
```

*For Mac/Linux:*
```bash
python3 -m venv venv
```
```bash
source venv/bin/activate
```
```bash
pip install -r requirements.txt
```
```bash
python manage.py migrate
```
```bash
python manage.py runserver
```
*The backend will start at `http://127.0.0.1:8000/`*

### 2. Frontend Setup (React + Vite)

**Step 2.1: Navigate and Install**
Open a **new terminal** in the project root:
```bash
cd frontend
```
```bash
npm install
```
```bash
npm install bootstrap@5.3.2 if needed
```
*(Note: `npm install` automatically installs all required packages including Bootstrap, React Router, etc.)*

**Step 2.2: Run Development Server**
```bash
npm run dev
```
*The frontend will start at `http://localhost:5173/`*

### 3. Open the App
Open your browser and go to `http://localhost:5173/`.


