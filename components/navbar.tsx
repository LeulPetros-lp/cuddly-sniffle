/* eslint-disable react/self-closing-comp */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable no-console */
/* eslint-disable prettier/prettier */
/* eslint-disable import/order */
/* eslint-disable unused-imports/no-unused-imports */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Avatar, AvatarGroup, AvatarIcon } from "@heroui/avatar";
import { Kbd } from "@heroui/kbd";
import { Link } from "@heroui/link";
import { link as linkStyles } from "@heroui/theme";
import { Input } from "@heroui/input";
import NextLink from "next/link";
import Logo from "./Logo";
import clsx from "clsx";
import { signOut } from "firebase/auth";
import { useEffect } from "react";

import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";

import { useAuth } from "../config/context/AuthContext"
import { auth } from "@/config/firebase";


export const Navbar = () => {
  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper: "bg-transparent",
        input: "text-sm text-white",
      }}
      endContent={
        <Kbd className="hidden lg:inline-block text-white" keys={["command"]}>
          K
        </Kbd>
      }
      labelPlacement="outside"
      placeholder="Search..."
      startContent={
        <SearchIcon className="text-base text-white pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );


  const user: any = useAuth()


  useEffect(() => {
    console.log(user)
  }, [])


  const logout = async () => {
    console.log(user)
    await signOut(auth)
      .then((res) => {
        console.log(res)
      }).catch((e) => {
        console.log(e)
      })
  }

  return (
    <HeroUINavbar
      className="bg-[#001E03] bg-opacity-100" // Set background color #001E03 for normal navbar
      maxWidth="xl"
      position="static"
    >
      {/* Left side: Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-end ml-2"></div>
      </NavbarContent>

      {/* Center: Navbar items */}
      {/* <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {siteConfig.navItems.map((item) => (
          <NavbarItem key={item.href}>
            <NextLink
              className={clsx(
                linkStyles({ color: "white" }),
                "data-[active=true]:text-primary data-[active=true]:font-medium"
              )}
              color="white"
              href={item.href}
            >
              {item.label}
            </NextLink>
          </NavbarItem>
        ))}
      </NavbarContent> */}

      {/* Right side: Get started button */}
      <NavbarItem className="hidden md:flex">
        {user?.user ? (
          <div style={{ display: 'flex', gap: 20}}>
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-white bg-transparent border-white border"
              variant="flat"
              onPress={logout} // Call the logout function when the button is pressed
            >
              Logout
            </Button>
            <Avatar name={user.user.displayName[0]} onClick={() => console.log(user)} style={{ fontSize: 18, color: 'white', backgroundColor: "#47A840"}} size="md"/>
          </div>
        ) : (
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-white bg-transparent border-white border"
            variant="flat"
          >
            Learn More  
          </Button>
        )}
      </NavbarItem>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <NavbarMenuToggle /> */}

        {user?.user ? (
          <>
            <Button
              isExternal
              as={Link}
              className="text-sm font-normal text-white bg-transparent border-white border"
              variant="flat"
              onPress={logout} // Call the logout function when the button is pressed
            >
              Logout
            </Button>
            <Avatar name={user.user.displayName} />
          </>
        ) : (
          <Button
            isExternal
            as={Link}
            className="text-sm font-normal text-white bg-transparent border-white border"
            variant="flat"
          >
             Learn More  
          </Button>
        )}
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu className="bg-transparent bg-opacity-0"> {/* Fully transparent */}
        <div className="mx-4 mt-2 flex flex-col gap-2 bg-transparent">
          {/* {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={
                  index === 2
                    ? "primary"
                    : index === siteConfig.navMenuItems.length - 1
                    ? "danger"
                    : "white"
                }
                href="#"
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))} */}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
