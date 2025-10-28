# Backend (Django)

## How to run/install


1. create python enviroment in backend directory.
```python
python -m venv .venv 

# ".venv" is environment directory name.
```


2. activate environment in terminal.
```python
(dir where env file exist)> " .\.venv\Scripts\activate " in command prompt

# "(.venv) PS D:\directory>" should show up like this.
```


3. install the requirements.
```python
(.venv) PS D:\directory> pip install -r .\requirements.txt

# if some still missing after try running server, use this.

(.venv) PS D:\directory> python -m pip install ...
```


4.  The Database. **This is important** <br>
```bash
# The project database run by using mysql database.
Writing .env file into backend is required.
```
$${
    \color{white}Here \space 
    \color{lightgreen}.env \space 
    \color{white}file \space
    \color{white}example.
    migrate it also
    cd backend
    python manage.py migrate  
}$$ 
```bash
DATABASE=mysql
MYSQL_NAME="your MySQL Workbench working schema name"
MYSQL_USER="your MySQL Workbench username"
MYSQL_PASSWORD="your MySQL Workbench password"
DB_HOST="your MySQL Workbench hostname" # The host is normally 127.0.0.1 or localhost
DB_PORT="your MySQL Workbench port" # 3306
```
~~Put it into backend folder and you're fine to do next step.~~


5. run the testing server.
```bash
# make sure you're in the same directory as manage.py, in this case is backend.

(.venv) PS D:\directory\backend> python manage.py runserver 
```
$${\color{white}End}$$
