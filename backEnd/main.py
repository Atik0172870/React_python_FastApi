from uuid import UUID, uuid4
import uvicorn
from fastapi import FastAPI,HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List


class Fruit(BaseModel):
    id: UUID = Field(default_factory=uuid4)   
    name: str
    type: str
    test: str


class Fruits(BaseModel):
    fruits: List[Fruit]


app = FastAPI()

origins = ["http://localhost:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

memory_db = {
    "Fruits": [
        Fruit(name="Apple", type="Fruit", test="Test"),
        Fruit(name="Orange", type="Fruit", test="Wweet"),
        Fruit(name="Banana", type="Fruit", test="Yellow"),
        Fruit(name="Lemon", type="Fruit", test="Sswoord"),
        Fruit(name="WoodAple", type="Fruit", test="Test"),
    ]
}
# Initialize the in-memory database with a sample fruit


@app.get("/fruits", response_model=Fruits)
async def get_fruits():
    return Fruits(fruits=memory_db["Fruits"])


@app.post("/fruit", response_model=Fruit)
async def add_fruit(fruit: Fruit):
    memory_db["Fruits"].append(fruit)
    return fruit


@app.delete("/fruit/{fruit_id}", response_model="")
async def delete_fruit(fruit_id: UUID):
    find = next((fruit for fruit in memory_db["Fruits"] if fruit.id == fruit_id), None)
    print("foundItem",find)
    if find:
        memory_db["Fruits"].remove(find)
        return {"message": "Fruit deleted successfully"}
    else:
        return {"message": "Fruit not found"}
    

@app.put("/fruit/{fruit_id}", response_model=Fruit)
async def update_fruit(fruit_id: UUID, fruit: Fruit):
    for i, find in enumerate(memory_db["Fruits"]):
        if find.id == fruit_id:
            updated_fruit = Fruit(id=fruit_id, name=fruit.name, type=fruit.type, test=fruit.test)
            memory_db["Fruits"][i] = updated_fruit
            print("foundItem", fruit)
            return updated_fruit

    # Moved outside the loop
    raise HTTPException(status_code=404, detail="Fruit not found")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
