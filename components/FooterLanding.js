import React from "react";
import Link from "next/link";
import styles from "@/styles/footerContainer.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSquareXTwitter,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import Button from "./Button";
const FooterLanding = () => {
  return (
    <div className={styles.footerContainer} id="footer">
      <div className={styles.footerTop}>
        <div className={styles.footerLeft}>
          <div>
            <h1>SUBSCRIBE NOW</h1>
            <h2>for latest updates</h2>
          </div>
          <div className={styles.subscribeInput}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter your email address"
            />
            <Button
              text={"Subscribe"}
              alignment="center"
              width="7vw"
              href={"/home"}
            />
          </div>
        </div>
        <div className={styles.footerRight}>
          <div>
            <Link href={"/landing"}>Home</Link>
          </div>
          <div>
            <Link href={"/howItWorks"}>How it works?</Link>
          </div>
          <div>
            <Link href={"/aboutUs"}>About Us</Link>
          </div>
          <div className={styles.contactUs}>
            <Link href={"/contactUs"}>Contact</Link>
            <Link href="/twitter" target="_blank">
              <FontAwesomeIcon icon={faSquareXTwitter} />
            </Link>
            <Link href="/linkedin" target="_blank">
              <FontAwesomeIcon icon={faLinkedin} />
            </Link>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>Copyright ©️ floodSafeGIS.com</div>
    </div>
  );
};

export default FooterLanding;
