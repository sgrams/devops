import './App.css';
import {useState} from "react";
import Measurement from './Measurement';
import AddMeasurement from './AddMeasurement';
import UpdateMeasurement from './UpdateMeasurement';
import DeleteMeasurement from './DeleteMeasurement';
import GetMeasurement from './GetMeasurement';

function App() {
  const [initialValue, setInitialValue] = useState(1234);
  const handleInitialValue = (event) => {
    setInitialValue(event.target.value);
  };
  return (
    <div>

      {/* <input onChange={handleInitialValue}/> */}

      <Measurement initValue={initialValue} changeParentHandler={setInitialValue}/>
      <AddMeasurement/>
      <UpdateMeasurement/>
      <DeleteMeasurement/>
      <GetMeasurement/>
    </div>
  );
}

export default App;
