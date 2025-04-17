import React from "react";
import GoogleMapReact from "google-map-react";
import { useState, useEffect } from "react";
import styles from "@/styles/heatmap.module.css";
import Button from "./Button";
import LinechartWL from "./LinechartWL";
import { findClosestPoint } from "@/utils/closest_point";
import LineChartWeather from "./LineChartWeather";
import { useRouter } from "next/router";
function HeatMap({
  day,
  defaultProps,
  latitude,
  longitude,
  heatMapData,
  markers,
  stations,
}) {
  const mapOptions = {
    fullscreenControl: false,
  };
  const router = useRouter();
  console.log(router.pathname);
  const [selectedPoint, setSelectedPoint] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [population, setPopulation] = useState("94,927");
  const [showGraph, setShowGraph] = useState(false);
  const [closestPoint, setClosestPoint] = useState(null);
  const [showWL, setShowWL] = useState(false);

  const [chenimariData, setChenimariData] = useState(
    stations.filter((item) => item["site-name"] == "CHENIMARI (KHOWANG)")[0]
  );

  const get_DL_WL = (inputString) => {
    const regex = /(\d+\.\d+);(\d+\.\d+):(\d+\.\d+)/;

    const matches = inputString.match(regex);
    // console.log({inputString});

    if (matches) {
      const [, value1, value2, value3] = matches;

      return {
        WL: value1,
        DL: value2,
        HFL: value3,
      };
    } else {
      console.log("No match found.");
      return {
        WL: 0,
        DL: 0,
        HFL: 0,
      };
    }
  };
  const handleMapClick = (event) => {
    setSelectedPoint({
      lat: event.lat,
      lng: event.lng,
    });

    const pointsArray = stations?.map((item) => {
      return {
        ...item,
        lon: item?.lng,
      };
    });

    setClosestPoint(
      findClosestPoint({ lat: event.lat, lon: event.lng }, pointsArray)
    );

    setIsOpen(!isOpen);
  };
  defaultProps.center = { latitude, longitude };
  console.log({ chenimariData });
  return (
    <div
      className=""
      style={{ height: "100%", width: "100%", borderRadius: "4rem" }}
      id="map"
    >
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBjX_00GI694FLmt2-_70v4ZHTL8DNa54E" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        options={mapOptions}
        heatmapLibrary={true}
        heatmap={heatMapData}
        onClick={handleMapClick}
      ></GoogleMapReact>

      {showGraph && <div className={styles.backdrop}></div>}
      <dialog open={isOpen} className={styles.dialogBox}>
        <p>
          Location:{" "}
          {router.pathname == "/waterlevelmap" && closestPoint
            ? closestPoint["site-name"]
            : chenimariData["site-name"]}
        </p>
        <p>
          Area Status:{" "}
          {router.pathname == "/waterlevelmap" &&
          closestPoint &&
          closestPoint["day-1-forecast"]
            ? closestPoint["day-1-forecast"]["flood-condition"]
            : chenimariData["day-1-forecast"]["flood-condition"]}
        </p>
        <p>
          Warning Level:{" "}
          {router.pathname == "/waterlevelmap" && closestPoint
            ? get_DL_WL(closestPoint["WL;DL;HFL"])?.WL
            : get_DL_WL(chenimariData["WL;DL;HFL"])?.WL}
        </p>
        <p>
          Danger Level:{" "}
          {router.pathname == "/waterlevelmap" && closestPoint
            ? get_DL_WL(closestPoint["WL;DL;HFL"])?.DL
            : get_DL_WL(chenimariData["WL;DL;HFL"])?.DL}
        </p>

        <p>
          River :{" "}
          {router.pathname == "/waterlevelmap" && closestPoint
            ? closestPoint["river"]
            : chenimariData["river"]}
        </p>
        <div
          onClick={() => setShowGraph(!showGraph)}
          className={styles.generateGraphBtn}
        >
          <Button text={"Generate Graph"} alignment="center" />
        </div>
      </dialog>
      {showGraph && (
        <div
          // open={showGraph}
          className={styles.graphDialog}
          // style={{ zIndex: !showGraph && -1 }}
        >
          <div className={styles.toggle}>
            <div
              className={styles.waterLevel}
              onClick={() => setShowWL(true)}
              style={{ background: showWL && "gray" }}
            >
              Water Level
            </div>
            <div
              className={styles.weather}
              style={{ background: !showWL && "gray" }}
              onClick={() => setShowWL(false)}
            >
              Weather
            </div>
          </div>
          <div className={styles.graph}>
            {showWL ? (
              <LinechartWL data={closestPoint} />
            ) : (
              <LineChartWeather
                lat={closestPoint?.lat}
                lng={closestPoint?.lon}
              />
            )}
          </div>
          <div className={styles.closeBtn}>
            <button onClick={() => setShowGraph(!showGraph)}>X</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HeatMap;
