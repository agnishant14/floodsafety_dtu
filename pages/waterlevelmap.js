import { Inter } from "next/font/google";
import GoogleMapReact from "google-map-react";
import Navbar from "@/components/Navbar";
import HeatMap from "@/components/HeatMap";
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import { get_all_stations_wl_forecast } from "@/utils/api_call";
import { useState } from "react";
import Layout from "@/components/Layout";
import styles from "@/styles/index.module.css";
const inter = Inter({ subsets: ["latin"] });

export default function WaterLevelMap({ stations }) {
  const options = [
    { name: "Chenimari", value: "sv" },
    { name: "Chaparmukh", value: "en" },
  ];

  const [day, setDay] = useState(1);

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
  const get_intensity = (data, forecast) => {
    data = {
      WL: parseFloat(data?.WL),
      DL: parseFloat(data?.DL),
    };
    forecast = parseFloat(forecast);
    if (forecast < data?.WL) {
      return 5;
    } else if (forecast < data?.DL && forecast >= data?.WL) {
      console.log({ forecast, data });
      return (forecast - data?.WL) % data?.DL;
    } else {
      console.log("here", { forecast, data });
      return forecast - data?.DL;
    }
  };

  const stations_lat_lng = stations?.map((item) => {
    return {
      lat: item?.lat,
      lng: item?.lng,
      weight: get_intensity(
        get_DL_WL(item["WL;DL;HFL"]),
        item[`day-${day}-forecast`]["max-WL"]
      ),
    };
  });

  const heatMapData = {

    positions: stations_lat_lng,
    options: {
      radius: 40,
      opacity: 0.6,
    },
  };
  const defaultProps = {
    center: {
      lat: 26.1158,
      lng: 91.7086,
    },
    zoom: 9,
    markers: heatMapData?.positions?.map((item, id) => {
      return {
        id: id,
        lat: item?.lat,
        lng: item?.lng,
      };
    }),
  };
  const [searchText, setSearchText] = useState("");
  const [showViews, setShowViews] = useState(false);
  //Do whatever is needed with this date
  const [date, setDate] = useState(new Date());
  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };
  const handleViewClick = () => {
    setShowViews(!showViews);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  return (
    <>
      <div className={styles.homeContainer}>
        <HeatMap
          stations={stations}
          day={day}
          defaultProps={defaultProps}
          heatMapData={heatMapData}
          markers={heatMapData?.positions}
        />
        <div className={styles.searchAndView}>
          <div className={styles.searchDiv}>
            <input
              type="text"
              placeholder="🔍Search"
              onChange={handleInputChange}
              value={searchText}
            />
          </div>
          <div className={styles.viewDiv} onClick={handleViewClick}>
            👁️ Views{" "}
          </div>
        </div>
        {showViews && (
          <div className={styles.viewList}>
            <div>Data after 30 days</div>
            <div>Data after 10 days</div>
            <div
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px gray solid",
                alignItems: "center",
              }}
            >
              <div>Custom: </div>
              <di>
                <input type="date" onChange={handleDateChange} />
              </di>
            </div>
            <div
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Temperature</div>
              <div>10 Deg</div>
            </div>
            <div
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px gray solid",
              }}
            >
              <div>Trend</div>
              <div>⬆️</div>
            </div>
            <div
              style={{
                padding: "0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div>Water Level</div>
              <div>200</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const resp = await get_all_stations_wl_forecast();
  const stations = resp?.stations;

  return {
    props: { stations },
  };
}

WaterLevelMap.getLayout = function getLayout(page) {
  return <Layout>{page}</Layout>;
};
