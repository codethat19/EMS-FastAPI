from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from config.db import conn
from Employee import employeeEntity,EmployeesEntity

app = FastAPI()
origins = ['http://localhost:3000', 'https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods = ["*"],
    allow_headers = ["*"],
)

class Employee(BaseModel):
    id: int
    name: str
    age: int
    manager: str
    desig: str
    exp: float

# db = [
#     Employee(id = 1, name = "Aayush", age = 26, manager = "A", desig="DSE", exp = 2.2),
#     Employee(id = 2, name = "Mukund", age = 25, manager = "B", desig="SSE", exp = 1.2),
#     Employee(id = 3, name = "Shivam", age = 27, manager = "C", desig="TA", exp = 4)
# ]
# conn.local.Employee.insert_one(dict({"id": 1, "name": "Aayush", "age": 26, "manager": "A", "desig": "DSE", "exp": 2.2}))

# @app.get("/all")
# async def getAllEmployees():
#     return db

@app.get("/all")
async def getAllEmployees():
    res = conn.local.Employee.find()
    if (res != None):
        return EmployeesEntity(res)
    else:
        return {"Error" : "No Employees"}

# @app.get("/employee/{id}")
# async def getEmployee(id: int):
#     for em in db:
#         if(em.id == id):
#             return em
#     return {"Error" : "Invalid ID"}
@app.get("/employee/{id}")
async def getEmployee(id: int):
    res = conn.local.Employee.find_one({'id': id})
    if (res != None):
        em = employeeEntity(res)
        return em
    else:
        return {"Error" : "Invalid ID"}

# @app.post("/create-emp")
# async def createEmployee(employ: Employee):
#     for em in db:
#         if em.id == employ.id:
#             return {"Error" : "Already exist"}

#     db.append(employ)
#     return db

@app.post("/create-emp")
async def createEmployee(employ: Employee):
    res = conn.local.Employee.find_one({'id': employ.id})
    if (res != None):
        return {"Error" : "Already exist"}
    else:
        conn.local.Employee.insert_one(dict(employ))
        return EmployeesEntity(conn.local.Employee.find())

# @app.put("/edit-emp/{id}")
# async def updateEmployee(id: int, employee: Employee):
#     print(id)
#     for em in db:
#         if (em.id == id):
#             em.name = employee.name
#             em.age = employee.age
#             em.manager = employee.manager
#             em.desig = employee.desig
#             em.exp = employee.exp
#             return db
#     return {"Error" : "Doesn't exist"}
# @app.put("/edit-emp/{id}")
# async def updateEmployee(id: int, employee: Employee):
#     res = conn.local.Employee.find_one({'id': id})
#     if (res == None):
#         return {"Error" : "Doesn't exist"}
#     else:
#         conn.local.Employee.find_one_and_update({'id': id}, {
#             "name" : employee.name,
#             "age" : employee.age,
#             "manager" : employee.manager,
#             "desig" : employee.desig,
#             "exp" : employee.exp,
#         })
#         return EmployeesEntity(conn.local.Employee.find())
@app.put("/edit-emp/{id}")
async def updateEmployee(id: int, employee: Employee):
    res = conn.local.Employee.find_one({'id': id})
    if (res == None):
        return {"Error" : "Doesn't exist"}
    else:
        conn.local.Employee.find_one_and_update({'id': id}, {
            "$set" : dict(employee)
        })
        return EmployeesEntity(conn.local.Employee.find())   

# @app.delete("/delete-emp/{id}")
# async def deleteEmployee(id: int):
#     for em in db:
#         if em.id == id:
#             db.remove(em)
#     return db

@app.delete("/delete-emp/{id}")
async def deleteEmployee(id: int):
    res = conn.local.Employee.find_one({'id': id})
    if (res != None):
        conn.local.Employee.delete_one({'id': id})
        return EmployeesEntity(conn.local.Employee.find())
    else:
        return {"Error" : "Invalid ID"}


