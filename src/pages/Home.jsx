import axios from "axios";
import axionsClient from "../utils/axios";
import { useEffect, useState } from "react";

function Home() {
  const [cars, setCars] = useState([]);
  useEffect(() => {
    axionsClient("/products")
      .then((data) => setCars(data.data.products))
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {cars &&
          cars.reverse().map((car) => {
            return (
              <div key={car.id} className="card glass w-full">
                <figure>
                  <img src={car.thumbnail} alt="car!" />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">{car.title}</h2>
                  <p>{car.description}</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary">Learn now!</button>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default Home;
