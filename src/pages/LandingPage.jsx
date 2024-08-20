// rrd imports
import { useParams } from "react-router-dom";

// axios
import axiosClient from "../utils/axios";
import { useEffect, useState } from "react";

function LandingPage() {
  const [product, setProduct] = useState(null);
  const { id } = useParams();
  useEffect(() => {
    axiosClient.get(`/cars/${id}`)
    .then((res)=>{
      i
    })
  }, []);
  return <div></div>;
}

export default LandingPage;
