import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";

const getLocalValue = () => {
  return JSON.parse(localStorage.getItem("data") || "{}");
};

function App() {
  const setLocalValue = (value) => {
    localStorage.setItem("data", JSON.stringify(value));
  };
  const [pid, setPid] = useState("");
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [mainData, setMainData] = useState(getLocalValue());

  // useEffect(()=> {
  //   setMainData(getLocalValue())
  // },[]);

  useEffect(() => {
    setLocalValue(mainData);
  }, [mainData]);

  const handlePid = (event) => {
    setPid(event.target.value);
  };

  const handlePrice = (event) => {
    setPrice(event.target.value);
  };

  const handleName = (event) => {
    setName(event.target.value);
  };

  const handleAdd = (event) => {
    if (pid !== "" && price !== "" && name !== "") {
      const data = { ...mainData };

      data[pid] = {
        orderId: pid,
        expenseamount: price,
        description: name,
      };
      setMainData(data);
    }

  };

  const handleDelete=(value)=>{
    if(mainData[value]){
      const data={...mainData};
      delete data[value];
      setMainData(data)
    };
  }

  const getArray= data=>{
    return Object.values(data)
  }

  const getTotal=data=>{
    return getArray(data).reduce((t,v)=>t+(+v.expenseamount),0)

  }

  return (
    <div>
      <div className="field-block">
        <div className="p-id">
          <label htmlFor="p-id">PRODUCT ID</label>
          <input
            type="number"
            id="p-id"
            value={pid}
            onChange={handlePid}
            min="0"
          />
        </div>
        <div className="price">
          <label htmlFor="price">SELLING PRICE</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={handlePrice}
            min="0"
          />
        </div>
        <div className="name">
          <label htmlFor="name">PRODUCT NAME</label>
          <input type="text" id="name" value={name} onChange={handleName} />
        </div>
        <div className="add-product">
          <button onClick={handleAdd}>add product</button>
        </div>
      </div>

      <div className="result-block">
        <h1>PRODUCT</h1>
        <ul className="display">

          {getArray(mainData).map((element) => 
             
            <li className="row" key={element.orderId}>
              <span>{element.expenseamount}</span>
              <span>{element.description}</span>
              <button onClick={event=>handleDelete(element.orderId)}>delete product</button>
            </li>
          )}
        </ul>
        <div className="total">Total value of worth products:{getTotal(mainData)}</div>
      </div>
    </div>
  );
}

export default App;
