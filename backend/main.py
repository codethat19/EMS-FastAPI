from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.encoders import jsonable_encoder
from pydantic import BaseModel
from typing import List

app = FastAPI()
origins = ['http://localhost:3000', 'https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class Employee(BaseModel):
    id: int
    name: str
    age: int
    manager: str
    desig: str
    exp: float

db: List[Employee] = [
    Employee(id=1, name = "Aayush", age = 26, manager = "A", desig="DSE", exp=2.2),
    Employee(id=2, name = "Mukund", age = 25, manager = "B", desig="SSE", exp=1.2),
    Employee(id=3, name = "Shivam", age = 27, manager = "C", desig="TA", exp=1)
]

@app.get("/all")
async def getAllEmployees():
    return db

@app.get("/employee/{id}")
def getEmployee(id: int):
    for em in db:
        if(em.id == id):
            return em
    return {"Error" : "Invalid ID"}

@app.post("/create-emp")
def createEmployee(employ: Employee):
    for em in db:
        if em.id == employ.id:
            return {"Error" : "Already exist"}

    db.append(employ)
    return db

@app.put("/edit-emp/{id}")
def updateEmployee(id: int, employee: Employee):
    print(id)
    for em in db:
        if (em.id == id):
            em.name = employee.name
            em.age = employee.age
            em.manager = employee.manager
            em.desig = employee.desig
            em.exp = employee.exp
            return db
    return {"Error" : "Doesn't exist"}
    

@app.delete("/delete-emp/{id}")
def deleteEmployee(id:int):
    for em in db:
        if em.id == id:
            db.remove(em)
    return db

