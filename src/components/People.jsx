import { useEffect, useState } from "react";

const People = () => {
  const [insanlar, setInsanlar] = useState([]);

  // https://jsonplaceholder.typicode.com/

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setInsanlar(data));
  }, []);
  return (
    <div className="container text-center mt-4">
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
};

export default People;
