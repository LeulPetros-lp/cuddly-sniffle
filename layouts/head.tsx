/* eslint-disable react/jsx-sort-props */
/* eslint-disable prettier/prettier */
import React from "react";
import NextHead from "next/head";

import { siteConfig } from "@/config/site";

export const Head = () => {
  return (
    <NextHead>
        <title>{siteConfig.name}</title>
        <meta key="title" content={siteConfig.name} property="og:title" />
        <meta content={siteConfig.description} property="og:description" />
        <meta content={siteConfig.description} name="description" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Quicksand:wght@300..700&display=swap" rel="stylesheet" />
        <meta
          key="viewport"
          content="viewport-fit=cover, width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
          name="viewport"
        />
        <link href="/favicon.ico" rel="icon" />
    </NextHead>
  );
};
