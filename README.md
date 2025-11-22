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
*   **Docker Desktop**

## Method 1: Using Docker
**Step 1:**  
Navigate to your desired directory and run.
```bash
git clone https://github.com/kmsimust/Please_Show_Up.git
```  
  
Navigate to the `backend` directory.
```bash
cd Please_Show_Up/backend
```

In this directory, create a `.env` file with the following configuration and replace [IPv4] with your IPv4 Address.  
(Your IPv4 can be seen by running ```ipconfig```)
```env
MYSQL_NAME="test"
MYSQL_USER="root"
MYSQL_PASSWORD="test"
DB_HOST="[IPv4]"
DB_PORT="3305"
```

**Step 2:**  
Open Docker Desktop.  
Navigate to the root `Please_Show_Up` directory. 
```bash
cd ..
```
And run
```bash
docker-compose up -d
```

**Step 3:**  
Navigate to the `frontend` directory.
```bash
cd frontend
```
Install dependencies.
```bash
npm install
```
Run the development server.
```bash
npm run dev
```
Follow the generated link or open your browser and go to `http://localhost:5173/`.  

**To run again after this:**  
Repeat step 2 and step 3.
However you do not need to install dependecies again.  


## Method 2: Using terminal.
**Step 1:**  
Navigate to your desired directory and run.
```bash
git clone https://github.com/kmsimust/Please_Show_Up.git
```

Navigate to the `backend` directory.
```bash
cd Please_Show_Up/backend
```

In this directory, create a `.env` file with the following configuration and replace [IPv4] with your IPv4 Address.  
(Your IPv4 can be seen by running ```ipconfig```)
```env
MYSQL_NAME="test"
MYSQL_USER="root"
MYSQL_PASSWORD="test"
DB_HOST="127.0.0.1" # The host is normally 127.0.0.1 or localhost
DB_PORT="3306"
```

**Step 2:** 
create python enviroment in backend directory.
```python
python -m venv .venv 
```

".venv" is environment directory name.


activate environment in terminal.
```python
.\.venv\Scripts\activate
```
in command prompt  
"(.venv) PS D:\directory>" should show up like this.


install the requirements.
```python
pip install -r .\requirements.txt
```

if some still missing after try running server, use this.

```python
python -m pip install ...
```

run the testing server.
make sure you're in the same directory as manage.py, in this case is backend.
```bash
python manage.py runserver 
```

**Step 3:** 
go to directory frontend.

Install the dependencies:

```bash
npm install
```

Start the development server with HMR:

```bash
npm run dev
```

*The frontend will start at `http://localhost:5173/`*

Follow the generated link or open your browser and go to `http://localhost:5173/`.  

Open your browser and go to `http://localhost:5173/`.
