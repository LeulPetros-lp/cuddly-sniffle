/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable prettier/prettier */
import Image from "next/image";
import React from "react";
import img from "./leaf.png"

const Logo = () => {
  return (
    <div className="flex items-center">
      <h1 className="playfair text-4xl text-white-800">
        GREENBI
        <span className="inline-block relative h-8 w-8">
          <Image
            src={img} // Ensure the correct path
            alt="Leaf"
            layout="fill"
            objectFit="contain"
          />
        </span>
        ME
      </h1>
    </div>
  );
};

export default Logo;
