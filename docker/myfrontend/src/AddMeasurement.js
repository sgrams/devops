import React, {useState, useEffect} from "react";
import axios from 'axios';

const AddMeasurement= (props) => {

    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    const handleSubmit = (event) =>{
        console.log(`Data sent ${title} ${body}`);
        axios.post('http://localhost:9090/api/measurement',{
            timestamp: title,
            measurement: body,
        })
        .then(response => console.log(response))
        .catch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
            <h1>Adding a new measurement</h1>
            <label for="add_item_timestamp">Timestamp:</label>
            <input id="add_item_timestamp" type='text' value={title} onChange={event => setTitle(event.target.value)}/><br/>
            <label for="add_item_measurement">Measurement:</label>
            <input id="add_item_measurement" type='text' value={body} onChange={event => setBody(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
        </>
    );
};

export default AddMeasurement;
