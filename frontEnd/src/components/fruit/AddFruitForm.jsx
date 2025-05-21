import React, { useEffect, useState } from "react";
import './addForm.scss'

const AddFruitForm = ({ onAddFruit, fruitObject = { isEdit: false } }) => {

    const [fruitName, setFruitName] = useState("");
    const [fruitType, setFruitType] = useState("");
    const [fruitTest, setFruitTest] = useState("");


    const setEditFruit = () => {
        setFruitName(fruitObject.name || "");
        setFruitType(fruitObject.type || "");
        setFruitTest(fruitObject.test || "");
    }
    const handleSubmit = (e) => {

        e.preventDefault();
        let newFruit = {
            name: fruitName,
            type: fruitType,
            test: fruitTest
        };
        if (fruitObject.isEdit) {
            // newFruit.name = fruitObject.name;
            // newFruit.type = fruitObject.type;
            // newFruit.test = fruitObject.test;
            newFruit.id = fruitObject.id;
            newFruit.isEdit = true;
        }

        onAddFruit(newFruit);
        setFruitName("");
        setFruitType("");
        setFruitTest("");
    }
    useEffect(() => {
        setEditFruit();

    }, [fruitObject]);

    return (
        <form className="add-form">
            <div className="form-body">
                <h2>Add a new fruit</h2>
                <div className="form-group">
                    <label htmlFor="fruitName">Fruit Name</label>
                    <input
                        type="text"
                        id="fruitName"
                        value={fruitName}
                        onChange={(e) => setFruitName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fruitType">Fruit Type</label>
                    <input
                        type="text"
                        id="fruitType"
                        value={fruitType}
                        onChange={(e) => setFruitType(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="fruitTest">Fruit Test</label>
                    <input
                        type="text"
                        id="fruitTest"
                        value={fruitTest}
                        onChange={(e) => setFruitTest(e.target.value)}
                    />
                </div>
                <button type="submit" onClick={handleSubmit}>Add Fruit</button>
            </div>

        </form>
    )
}

export default AddFruitForm;