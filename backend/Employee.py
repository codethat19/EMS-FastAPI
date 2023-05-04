def employeeEntity(item) -> dict:
    return {
        "id": item["id"],
        "name": str(item["name"]),
        "age": int(item["age"]),
        "manager": str(item["manager"]),
        "desig": str(item["desig"]),
        "exp": float(item["exp"]),
    }

def EmployeesEntity(entity) -> list:
    return[employeeEntity(emp) for emp in entity]