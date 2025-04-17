import React, { useEffect, useState } from "react";
import styles from "@/styles/heatmap.module.css";
import Button from "./Button";
import LinechartWL from "./LinechartWL";
import { findClosestPoint } from "@/utils/closest_point";
import LineChartWeather from "./LineChartWeather";
import { useRouter } from "next/router";
const GoogleMap = ({ day,
  defaultProps,
  latitude,
  longitude,
  heatMapData,
  markers,
  imageGen,
  stations,
  shelters }) => {
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
  console.log({ shelters });
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


    setClosestPoint({ ...chenimariData, lon: chenimariData.lng })

    setIsOpen((item) => !item);
  };
  defaultProps.center = { latitude, longitude };
  console.log({ chenimariData });
  useEffect(() => {
    const initMap = () => {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 12,
        center: { lng: 94.8922, lat: 27.2709 },
        // mapTypeId: "satellite",
        mapTypeControl: false,
        disableDefaultUI: true,
      });
      map.addListener("click", (event) => {
        handleMapClick(event, map);
      });
      const bounds = new window.google.maps.LatLngBounds(
        new window.google.maps.LatLng(27.1989373, 94.8119725),
        new window.google.maps.LatLng(27.3428911, 94.9728933),
      );
      class USGSOverlay extends window.google.maps.OverlayView {
        bounds;
        imageGen;
        div;

        constructor(bounds) {
          super();
          this.bounds = bounds;
          this.image = imageGen;
        }

        onAdd() {
          this.div = document.createElement("div");
          this.div.style.borderStyle = "none";
          this.div.style.borderWidth = "0px";
          this.div.style.position = "absolute";

          const img = document.createElement("img");
          img.src = `${imageGen}`;
          img.style.width = "100%";
          img.style.height = "100%";
          img.style.position = "absolute";
          this.div.appendChild(img);

          const panes = this.getPanes();
          panes.overlayLayer.appendChild(this.div);
        }

        draw() {
          const overlayProjection = this.getProjection();
          const sw = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getSouthWest()
          );
          const ne = overlayProjection.fromLatLngToDivPixel(
            this.bounds.getNorthEast()
          );

          if (this.div) {
            this.div.style.left = sw.x + "px";
            this.div.style.top = ne.y + "px";
            this.div.style.width = ne.x - sw.x + "px";
            this.div.style.height = sw.y - ne.y + "px";
          }
        }

        onRemove() {
          if (this.div) {
            this.div.parentNode.removeChild(this.div);
            delete this.div;
          }
        }

        hide() {
          if (this.div) {
            this.div.style.visibility = "hidden";
          }
        }

        show() {
          if (this.div) {
            this.div.style.visibility = "visible";
          }
        }

        toggle() {
          if (this.div) {
            if (this.div.style.visibility === "hidden") {
              this.show();
            } else {
              this.hide();
            }
          }
        }

        toggleDOM(map) {
          if (this.getMap()) {
            this.setMap(null);
          } else {
            this.setMap(map);
          }
        }
      }

      const overlay = new USGSOverlay(bounds, imageGen);
      overlay.setMap(map);

      const toggleButton = document.createElement("button");
      toggleButton.textContent = "Toggle";
      toggleButton.classList.add("custom-map-control-button");

      const toggleDOMButton = document.createElement("button");
      toggleDOMButton.textContent = "Toggle DOM Attachment";
      toggleDOMButton.classList.add("custom-map-control-button");

      toggleButton.addEventListener("click", () => {
        overlay.toggle();
      });

      toggleDOMButton.addEventListener("click", () => {
        overlay.toggleDOM(map);
      });

      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        toggleDOMButton
      );
      map.controls[window.google.maps.ControlPosition.TOP_RIGHT].push(
        toggleButton
      );



      shelters?.map((item) => {
        new google.maps.Marker({
          position: {
            lat: item?.lat,
            lng: item?.lng
          },
          map,
          title: "Hello World!",
        });
      })
    };

    if (!window.google) {
      // Load the Google Maps JavaScript API if not already 
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBjX_00GI694FLmt2-_70v4ZHTL8DNa54E&callback=initMap&v=weekly`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      script.onload = () => {
        initMap();
      };
    } else {
      initMap();
    }
  }, [imageGen]);
  return <div>
    <div id="map" style={{ height: "83vh" }}></div>
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
        className={styles.graphDialog}
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
  </div>;
};

export default GoogleMap;
