import React, { useEffect, useState } from "react";

import AddFruitForm from "./AddFruitForm";
import { addFruit, deleteFruit, getAllFruits, updateFruit } from "../../apiService";
import './fruitList.scss';

const FruitList = () => {

    const [fruits, setFruits] = useState([{ id: 1, name: 'Apple', type: 'Fruit', test: 'Test' }]);
    const [fruitObject, setFruitObject] = useState({ isEdit: false });

    const onSelectFruit = (fruit) => {
        if (fruit.id === fruitObject.id) {
            const obj = { isEdit: false };
            setFruitObject(obj);
            return
        }

        fruit.isEdit = true;
        setFruitObject(fruit);
    }

    const fetchFruits = async () => {

        try {
            const response = await getAllFruits();
            setFruits(response);
        } catch (error) {
            console.error('Error fetching fruits:', error);
        }
    }
    useEffect(() => {
        fetchFruits();
    }, []);

    const onAddFruit = async (fruit) => {
        try {
            if (fruit.name === "" || fruit.type === "" || fruit.test === "") {
                alert("Please fill all the fields");
                return
            }
            if (fruit.isEdit) {
                const updateFruitdas = await updateFruit(fruit);
                await fetchFruits();
                console.log('updateFruitdas  successfully:', updateFruitdas);
            }
            else {
                const response = await addFruit(fruit);
                console.log('Fruit added successfully:', response);
                await fetchFruits();
            }
        } catch (error) {
            console.error('Error adding fruit:', error);
        }
    }

    const deleteFruitItem = async (fruitId) => {
        try {
            const response = await deleteFruit(fruitId);
            console.log('Fruit deleted successfully:', response);
            await fetchFruits();
        } catch (error) {
            console.error('Error deleting fruit:', error);
        }
    }

    return (
        <div className="fruit-list">
            <div>
                <AddFruitForm onAddFruit={onAddFruit} fruitObject={fruitObject} />
            </div>
            <div className="fruit-list-div">
                <h3>Fruit List</h3>
                <table className="fruit-table">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Test</th>
                            <th>Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {fruits.map((fruit) => (
                            <tr key={fruit.id + fruit.name} onClick={() => { onSelectFruit(fruit) }}>
                                <td>{fruit.id}</td>
                                <td>{fruit.name}</td>
                                <td>{fruit.type}</td>
                                <td>{fruit.test}</td>
                                <td className="btn-td" onClick={() => { deleteFruitItem(fruit.id) }}><button className="delete-btn">Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button className="button" onClick={fetchFruits}>Fetch Fruits</button>
            </div>

        </div>
    )

}

export default FruitList;