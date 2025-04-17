import React from "react";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
function Button({
  text,
  alignment = "left",
  width = null,
  arrow = null,
  href = null,
  fontSize = null,
  borderRadius = null,
  color = null,
}) {
  return (
    <div
      className="bg-blue-400 text-white font-medium rounded-md py-2 px-4"
      style={{
        fontSize: fontSize ? fontSize : "1vw",
        textAlign: alignment,
        width: width && width,
        borderRadius: "4px",
        cursor: "pointer",
        background:color && color
      }}
    >
      {href && (
        <Link href={href}>
          {text} {arrow && <FontAwesomeIcon icon={faArrowRight} />}
        </Link>
      )}
      {href == null && (
        <>
          {text} {arrow && <FontAwesomeIcon icon={faArrowRight} />}
        </>
      )}
    </div>
  );
}

export default Button;
