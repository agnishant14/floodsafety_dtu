import React, { useEffect, useState } from "react";
import Button from "./Button";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import styles from "@/styles/layout.module.css";
import { parseCookies } from "nookies";

function Navbar() {
  const router = useRouter();
  const [authtoken, setAuthtoken] = useState(null);
  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies.authToken;
    console.log(token);
    setAuthtoken(token);
    console.log(authtoken);
  }, []);

  return (
    <div
      className="flex justify-between px-16 py-4 items-center border-b-2"
      style={{ height: "100%" }}
    >
      <div
        className={`flex justify-center items-center ${styles.logoFloodSafeGIS}`}
        onClick={() => router.push("/home")}
        id={styles.logoFloodSafeGIS}
      >
        <div className="bg-gray-600 rounded-full h-10 w-10">
          <Image src="/logo.png" alt="Logo" width="100" height="100" />
        </div>
        <div className="text-2vw ml-4 font-semibold">FloodSafeGIS</div>
      </div>
      <div
        className="flex items-center gap-8"
        style={{ fontSize: "1.2vw", fontWeight: "400" }}
      >
        <div>
          {" "}
          <Link href={"/aboutUs"}>About</Link>
        </div>
        <div>
          <Link href={"/home/#features"}>Features</Link>
        </div>
        <div>
          <Link href={"/home/#howItWorks"}>How it Works?</Link>
        </div>
        <div>
          <Link href={"/home/#FAQS"}>FAQS</Link>
        </div>
        <div>
          <Link href={"/home/#footer"}>Contact Us</Link>
        </div>
      </div>
      {authtoken == null ? (
        <div>
          <Button text={"Login/Register"} arrow={true} href={"/login"} />
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default Navbar;
