import React, {useState, useEffect} from "react";
import axios from 'axios';

const Measurement = (props) => {
    const [measurements, setMeasurements] = useState([]);
    const[number, setNumber] = useState(-1);
    useEffect(() =>{
        axios.get('http://localhost:9090/api/measurement')
        .then(response => setMeasurements(response.data))
        .catch(error => console.log(error));
    }, []);

    const handleMeasurementClick = (event) => {
        console.log(event.target);
    }

    return (
    <>
    <h1>Measurements</h1>
        <div>
            {measurements.map(item => (<div key={item.id} onClick={handleMeasurementClick}>{item.id}. {item.timestamp} {item.measurement}</div>))}
        </div>
    </>
    );
}

export default Measurement;
