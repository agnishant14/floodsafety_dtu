// FloodPredictionLandingPage.js
import React from "react";
// import landingImage from "@/public/Rectangle 26.png";
import styles from "@/styles/landing.module.css";
import Button from "./Button";
import FAQStrip from "./FAQStrip";
import { Fade, Reveal } from "react-reveal";
import Link from "next/link";
import Image from "next/image";

const Landing = () => {
  const features = [
    {
      title: "Accurate Flood Extent Maps",
      content:
        "FloodSafeGIS provides precise and up-to-date flood extent maps, aiding authorities in strategic planning during flood events.",
      slide: "left",
    },
    {
      title: "Water Depth Estimation",
      content:
        "Using CWC flood forecasts, FloodSafeGIS estimates water depth, offering valuable insights for effective disaster response.",
      slide: "right",
    },
    {
      title: "Alert System",
      content:
        "Implement an alert system to notify residents, emergency services, and government agencies about potential flooding risks in real-time.",
      slide: "left",
    },
  ];

  const FAQS = [
    {
      question: "What is FloodSafeGIS?",
      answer:
        "FloodSafeGIS, our innovative AI-powered Geographic Information System (GIS) application, utilizes historical satellite imagery to predict and visualize flood inundation extent and water depth in near real-time for specific Central Water Commission (CWC) forecast sites. By offering real-time flood extent maps, this technology equips local governments and disaster management agencies with a crucial tool to swiftly identify vulnerable areas during floods, enabling them to prioritize and optimize rescue and relief efforts effectively.",
    },
    {
      question: "How does FloodSafeGIS work?",
      answer:
        "FloodSafeGIS, leveraging Sentinel-1 SAR datasets, predicts floods in three stages. Stage 1 employs U-NET and Encoder-Decoder models to estimate inundation extent. In Stage 2, flood prediction imagery and DEM yield water depth estimates. Stage 3 visualizes results in Google Maps GIS, enhancing accessibility and utility.",
    },
    {
      question: "How can I get started with FloodSafeGIS?",
      answer:
        "To initiate your journey with FloodSafeGIS, start by navigating our intuitive user interface. Familiarize yourself with the diverse functionalities offered, allowing you to seamlessly explore the robust features that FloodSafeGIS provides. This user-friendly experience will pave the way for a smooth and efficient utilization of the platform's capabilities.",
    },
    {
      question: "Is there customer support available for users?",
      answer: "Customer support is coming soon",
    },
  ];
  return (
    <div style={{ height: "auto" }} className={styles.parentLanding}>
      <section
        style={{
          height: "100vh",
          width: "100%",
        }}
        className={styles.landingBg}
      >
        <div className={styles.heroBackdrop}>
          <div className={styles.heroTitle1}>
            FloodSafeGIS: Real-Time Flood <div>Inundation Monitoring</div>
          </div>
          <div style={{ fontSize: "1.3vw", textAlign: "center" }}>
            Predict, Plan, and Respond Effectively{" "}
            <div> with Our Advanced GIS Application</div>
          </div>
          <div
            style={{
              marginTop: "4vh",
              display: "flex",
              justifyContent: "center",
            }}
          >
            {" "}
            <Button
              text={"Get Started "}
              alignment="center"
              width="20vw"
              arrow={true}
              href={"/map"}
              fontSize="2vw"
            />
          </div>
        </div>
      </section>
      <section>
        {" "}
        <Fade>
          <p
            style={{
              maxWidth: "100%",
              margin: "22vh auto 22vh",
              textAlign: "center",
              lineHeight: "1.6",
              fontSize: "1.8vw",
              padding: "0 8vw",
            }}
          >
            FloodSafeGIS is a trailblazer in the field of Geographic Information
            Systems (GIS) and artificial intelligence (AI) applications. We
            envision a world where communities are resilient in the face of
            water-related challenges. Through our technology, we aim to create a
            safer, more sustainable future where the impact of floods is
            minimized, and every individual is equipped with the knowledge to
            navigate and mitigate potential risks.
          </p>
        </Fade>
      </section>{" "}
      <section className={styles.features} id="features">
        <h1>Features</h1>
        {features.map((feature, idx) => {
          return (
            <Fade
              key={idx}
              left={feature.slide === "left"}
              right={feature.slide === "right"}
            >
              <div className={styles.feature}>
                <p className={styles.featureTitle}>{feature.title}</p>
                <p className={styles.featureContent}>{feature.content}</p>
              </div>
            </Fade>
          );
        })}
        <div
          style={{
            textAlign: "center",
            marginTop: "4vh",
            color: "#3498DB",
            fontWeight: "bold",
            textDecoration: "underline",
          }}
        ></div>
      </section>
      <section className={styles.howItWorks} id="howItWorks">
        <h1>How it works?</h1>
        <div className={styles.howItWorksContent}>
          <Image src={"/video.svg"} width={"1000"} height={"1000"} alt="" />
        </div>
      </section>
      <section className={styles.FAQS} id="FAQS">
        <h1>Frequently Asked Questions</h1>
        <div>
          {FAQS.map((FAQ, idx) => {
            return (
              <FAQStrip key={idx} question={FAQ.question} answer={FAQ.answer} />
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Landing;
