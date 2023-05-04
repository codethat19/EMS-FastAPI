from pymongo import MongoClient

conn = MongoClient("mongodb://localhost:27017/emp")
# mydb = conn["Employees"]

# mycol = mydb["Employees"]