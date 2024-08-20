// axois
import { useSelector } from "react-redux";
import axiosClient from "../utils/axios";
import { useEffect, useRef, useState } from "react";

function Home() {
  const title = useRef();
  const price = useRef();
  const [cars, setCars] = useState([]);
  const { user } = useSelector((state) => state.user);

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosClient
      .post(
        "/cars",
        {
          title: title.current.value,
          price: price.current.value,
        },
        {
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setCars([...cars, response.data.data]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    axiosClient
      .get("/cars", {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((data) => setCars(data.data.data))
      .catch((error) => console.log(error));
  }, []);

  const handleDelete = (id) => {
    axiosClient
      .delete("/cars/" + id, {
        headers: {
          Authorization: `Bearer ${window.localStorage.getItem("token")}`,
        },
      })
      .then((data) => setCars(data.data.data))
      .catch((error) => console.log(error));

    const newCars = cars.filter((prod) => prod.id !== id);
    setCars(newCars);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md mx-auto w-full sm:w-3/4 lg:w-1/2 mb-8">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Add a Car
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-semibold">Title</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out"
              type="text"
              ref={title}
              placeholder="Enter car title"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">Price</label>
            <input
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200 ease-in-out"
              type="number"
              ref={price}
              placeholder="Enter car price"
            />
          </div>
          <button className="w-full bg-purple-600 text-white p-3 rounded-lg font-semibold hover:bg-purple-700 hover:shadow-lg transition duration-300 ease-in-out">
            Add
          </button>
        </form>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 justify-center">
        {cars &&
          cars.map((car) => (
            <div key={car.id} className="card glass w-full max-w-xs">
              <figure>
                <img
                  src={car.thumbnail}
                  alt="car!"
                  className="w-full h-48 object-cover"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{car.title}</h2>
                <p>{car.description}</p>
                <div className="card-actions justify-between mt-4">
                  <button className="btn btn-primary">Learn now!</button>
                  {user.id === car.user_id && (
                    <button
                      onClick={() => handleDelete(car.id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Home;
