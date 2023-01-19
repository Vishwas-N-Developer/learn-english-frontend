import React, {useState} from "react";
import axios from 'axios';

const Learn = () => {
  const [item, setItem] = useState("");
  const [apiData, setapiData] = useState(null);
  const [alert, setAlert] = useState(false);
  const baseURL="http://localhost:3001/api/v1/learn"

  var config = {
    method: 'post',
    url: baseURL,
    headers: { 
      // 'Content-Type': 'application/json',
      'Content-Type': 'application/json;charset=UTF-8',
      "Access-Control-Allow-Origin": "*",
    },
    data :  {text: item},
 
  };
    
  const checkMethod = (e) => {
    e.preventDefault();
    if (item !== "") {
      axios(config).then((response) => {
        setapiData(response.data);
        setAlert(true);
      });  

    } else {
      setAlert(true);
    }
    // setTimeout(() => {
    //   setAlert(false);
    // }, 15000);
  }

  const handleOnChange = (e) => {
    setItem(e?.target?.value)
    setAlert(false)
  }

  return (
    <div className="container my-5">
      <form>
        <label className="mb-3 display-6" htmlFor="text">Write text here to check:</label>
        <textarea 
          className="form-control w-100 mb-3"
          rows={5}
          name="text" 
          onChange={(e)=>handleOnChange(e)}>
        </textarea>
        <div className="actions text-end">
          <button  
            className="btn btn-lg mb-3 btn-primary"
            onClick={checkMethod}>
              Check
          </button>  
        </div>
        {item === "" && <div className="alert alert-danger">Field should not be empty.</div>}
        {alert && item !== "" && apiData?.learner && <div className="alert alert-success">Your text is correct.</div>}
        {alert && item !== "" && apiData?.non_english_words && 
        <div><div className="alert alert-danger">Your text is wrong.</div>
        <div className="alert alert-info"><strong>Non English Word</strong>: {apiData?.non_english_words?.join(", ")}</div></div> }
      </form>
    </div>
   );
};

export default Learn;
