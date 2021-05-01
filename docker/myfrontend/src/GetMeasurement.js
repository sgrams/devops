import React, {useState, useEffect} from "react";
import axios from 'axios';

const GetMeasurement = (props) => {

    const [itemID, setItemID] = useState("");
    const [item, setItem] = useState([{timestamp:""}]);

    const handleSubmit = (event) =>{
        axios.get(`http://localhost:9090/api/measurement/${itemID}`)
        .then(response => setItem(response.data[0]))
        .itemch(error => console.log(error));
        event.preventDefault();
    };

    return (
        <>
        <div>
            <h1>Find a measurement</h1>
            <label for="getitemid">ID:</label>
            <input id="getitemid" type='number' value={itemID} onStar onChange={event => setItemID(event.target.value)}/><br/>
            <input type='submit' value='OK' onClick={handleSubmit}/>
            <br/>
            Timestamp: {item.timestamp}<br/>
            Measurement: {item.measurement}
        </div>
        </>
    );
};

export default GetMeasurement;
