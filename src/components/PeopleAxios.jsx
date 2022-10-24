import {useState,useEffect}from 'react'
import axios from "axios";

const PeopleAxios = () => {

  const[insanlar,setInsanlar]= useState([])
  
 useEffect(() => {
   axios
     .get("https://jsonplaceholder.typicode.com/users")
     .then((res) => setInsanlar(res.data))
     .catch((error)=>console.log(error));
 },[])

const postInsan=()=>{
  axios.post("https://jsonplaceholder.typicode.com/users",
  {name:"ayse",
   phone:676767676767}).then((res) =>setInsanlar([...insanlar, res.data]))	

}
  
  return (
    <div className="container text-center mt-4">
    <button className='btn btn-success' onClick={postInsan}>POST DATA</button>
      <div className="row">
        {insanlar.map((insan) => {
          const { id, name, phone } = insan;

          return (
            <div className="col-12 col-sm-6 col-md-4 col-lg-2" key={id}>
              <img
                src={`https://avatars.dicebear.com/api/avataaars/${id}.svg`}
                alt=""
              />
              <h5>{name}</h5>
              <h6>{phone}</h6>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default PeopleAxios