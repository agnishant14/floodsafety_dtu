import React, { useState, useEffect } from "react";
import styles from "@/styles/dashboard.module.css";
import axios from 'axios';
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


const ShelterListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [shelters, setShelters] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://hydro-predict.onrender.com/api/shelters/'); // Replace with your API endpoint
        setShelters(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
  
  // const handleDelete = async (shelterId) => {
  //   try {
  //     await axios.delete(`https://hydro-predict.onrender.com/api/shelters/${shelterId}`);
  
  //     setShelters((prevShelters) => prevShelters.filter((shelter) => shelter._id !== shelterId));
  //   } catch (error) {
  //     console.error('Error deleting shelter:', error);
  //   }
  // };  
  
  const filteredShelters = shelters.filter(shelter =>
    shelter.name.toLowerCase().startsWith(searchQuery.toLowerCase())
  );
  
  return (
    <div className={styles.shelterListing}>
      <div className={styles.searchinputcontainer}>
        <input
          type="text"
          placeholder="🔍 Search past listings..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div style={{ marginBottom:"2vh", border:"1px solid gray"}}>  
        <div className={styles.gridContainer}>
        <div>Location</div>
        <div>Latitude</div>
        <div>Longitude</div>  
        <div>Description</div>
        
        </div>
        <div className={styles.listingsGrid} style={{height:"46vh",overflow:"auto",}}>
        {filteredShelters.map((shelter,idx) => (
          <div key={idx} className={styles.contentGrid}>
          <div>{shelter.name}</div> 
          <div>{parseFloat(shelter.lat).toFixed(4)}</div>
          <div>{parseFloat(shelter.lng).toFixed(4)}</div>  
          <div>{shelter.description}</div>
          {/* <div style={{display:"flex",alignItems:"center", gap:"2vw"}}>           */}
          {/* <button className={styles.button} onClick={() => handleEditClick(shelter._id)}>Edit</button> */}
            {/* <p>Identifier: {shelter.identifier.username}</p>
            <button className={styles.trashCan} onClick={() => handleDelete(shelter._id)}>
            <FontAwesomeIcon icon={faTrashCan} />
            </button> */}
            {/* </div> */}

          </div>
        ))}
        </div>
        </div>  
    </div>
  );
};

export default ShelterListing;
