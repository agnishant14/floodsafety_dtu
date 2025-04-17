import React from "react";
import styles from "@/styles/dashboard.module.css";
import { useState } from "react";
import AdminMap from "./adminMap";
import ShelterListing from "./ShelterListing";
import Button from "./Button";
import axios from "axios";
import { parseCookies } from "nookies";
import { ToastContainer, toast } from 'react-toastify';

const DashboardComp = ({shelters}) => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toggle, setToggle] = useState("addNew");
  const [authToken, setAuthToken] = useState(null);
  const [formData, setFormData] = useState({
    lat: "",
    lng: "",
    name: "",
    description: "",
  });

  useState(() => {
    const cookies = parseCookies();
    const token = cookies.authToken;
    console.log(token)
    setAuthToken(token);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleContinue = async () => {
    try {
      const response = await axios.post(`https://hydro-predict.onrender.com/api/add-shelter/`,
        formData,
        {
          headers: {
            Authorization: `Token ${authToken}`,
          },
        }
      );
      console.log(response)
      setModalIsOpen(false);
      toast.success("Shelter Added !!")
    } catch (error) {
      toast.error("Something Went Wrong !!")
      console.log('Something went wrong...', error)
    }
  };
  return (
    <div className={styles.parentContainer}>
      <div className={styles.toggleContainer}>
        <div
          className={styles.newListing}
          style={{
            color: toggle === "addNew" && "black",
            fontWeight: toggle === "addNew" && "bold",
          }}
          onClick={() => setToggle("addNew")}
        >
          ADD NEW
        </div>
        <div
          className={styles.viewListing}
          style={{
            color: toggle === "listing" && "black",
            fontWeight: toggle === "listing" && "bold",
          }}
          onClick={() => setToggle("listing")}
        >
          LISTINGS
        </div>
      </div>
      <div className={styles.bottomContainer}>
        {toggle === "addNew" ? <AdminMap toggleModel={setModalIsOpen} updateForm={setFormData} shelters={shelters} /> : <ShelterListing />}
      </div>
      <dialog
        open={modalIsOpen}
      >

        <div className={styles.modal}>
          <button className={styles.closeButton} onClick={() => setModalIsOpen(false)}>
            &times;
          </button>
          <h2>Add New Shelter</h2>
          <div className={styles.inputList}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              placeholder="Latitude"
              name="lat"
              value={formData.lat}
              onChange={handleInputChange}
              disabled
            />
            <input
              type="text"
              placeholder="Longitude"
              name="lng"
              value={formData.lng}
              onChange={handleInputChange}
              disabled
            />
            <textarea
              type="text"
              placeholder="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
            />
            <div onClick={handleContinue}>
              <Button text={"Continue"} alignment="center" />
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default DashboardComp;
