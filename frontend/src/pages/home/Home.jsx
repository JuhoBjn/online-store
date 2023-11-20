import "./Home.css";
import  { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("currentUser"));
    if (storedUser?.token) {

    }
    else(
      navigate("/frontpage")
    )
  }, [navigate]);

  return 
};

export default Home;
