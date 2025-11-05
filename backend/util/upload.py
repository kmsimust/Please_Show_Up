import time
import os
from django.conf import settings

def upload_file(serializer, uploaded_file, table_name, var_name = ""):
    serializer_dict = dict(serializer.data) #make it to dict for easy acess
    new_id = serializer_dict["id"]#this get a group id for folder making
    uploaded_path = f"{settings.BASE_DIR}/public/upload/{table_name}/{serializer_dict["id"]}" #this is just a path to upload file to
    file_ext = uploaded_file.name.split(".")[-1] # to get the file surname
    uploaded_name = f"{var_name}{table_name}_{serializer_dict["id"]}_{int(time.time() * 1000)}.{file_ext}" #get the file name and it's type

    if not os.path.isdir(uploaded_path):#check if the directory exist or not if not create it so file can be upload
        os.mkdir(uploaded_path)

    with open(f"{uploaded_path}/{uploaded_name}", "wb+") as f: #just upload file to the path 
        for chunk in uploaded_file.chunks():
            f.write(chunk)
    
    return new_id, uploaded_name
