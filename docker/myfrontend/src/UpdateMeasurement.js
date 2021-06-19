import React, {useState, useEffect} from "react";
import axios from 'axios';


const UpdateMeasurement = (props) => {

    const [itemID, setItemID] = useState("");
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    // TODO: Add call to get item of specified id to populate the initial data
    // Both parameters have to be passed (name and age)
    const handleSubmit = (event) =>{
        console.log(`Data sent ${title} ${body}`);
        //axios.put(`http://localhost:9090/api/measurement/${itemID}`,{
        axios.put(`/api/measurement/${itemID}`,{
            timestamp: title,
            measurement: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Update a measurement</h1>
            <label for="updateitemid">ID:</label>
            <input id="updateitemid" type='number' value={itemID} onStar onChange={event => setItemID(event.target.value)}/><br/>
            <label for="updateitemname">Timestamp:</label>
            <input id="updateitemname" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label for="updateitemage">Measurement:</label>
            <input id="updateitemage" type='number' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default UpdateMeasurement;
