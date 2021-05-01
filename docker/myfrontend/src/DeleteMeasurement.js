import React, {useState, useEffect} from "react";
import axios from 'axios';

const DeleteMeasurement = (props) => {
    const [itemID, setItemID] = useState("");
    const handleSubmit = (event) =>{
        console.log(`Data sent ${title} ${body}`);
        axios.delete(`http://localhost:9090/api/measurement/${itemID}`)
        .then(response => console.log(response))
        .itemch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Delete a measurement</h1>
            <label for="deleteitemid">ID:</label>
            <input id="deleteitemid" type='number' value={itemID} onStar onChange={event => setItemID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default DeleteMeasurement;
