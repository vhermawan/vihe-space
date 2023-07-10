"use client";

import React, {useState, useEffect, useLayoutEffect, useCallback} from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Moon, Sun, Menu } from "lucide-react"
import { motion } from "framer-motion";
import { useTheme } from "next-themes";
import { usePathname } from 'next/navigation'
import { COLOR_GRADIENT } from "@/common/constant";
import { Separator } from "../ui/separator";

const listRoute = [
  {
    id:1,
    path: '/',
    title: 'Home',
  },
  {
    id: 2,
    path: '/about',
    title: 'About',
  },
  {
    id: 3,
    path: '/archive',
    title: 'Archive'
  },
  {
    id: 4,
    path : '/blog',
    title: 'Blog'
  },
  {
    id:5,
    path: '/journey',
    title: 'Journey'
  }
]

export default function Navbar() {
  const pathname = usePathname()
  const { setTheme, theme } = useTheme()

  const [activeColor, setActiveColor] = useState('')
  const [customClass, setCustomClass] = useState('')
  const [isOpen, setIsOpen] = useState(false)
  const [iconToogle, setIconToogle] = useState<React.JSX.Element>(<Moon size={17} />)

  const handleScroll = useCallback(() => {
    if(window.scrollY < 15){
      setActiveColor(`${COLOR_GRADIENT} font-bold bg-clip-text text-transparent`)
      setCustomClass('bg-transparent text-black dark:text-white')
    }else{
      setActiveColor('text-black font-bold')
      setCustomClass(`${COLOR_GRADIENT} text-white backdrop-filter backdrop-blur-lg duration-300`)
    }
  },[]);

  useLayoutEffect(() => {
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll);
  });

  useEffect(()=>{
    if(theme === 'light') setIconToogle(<Sun size={17} />)
    else setIconToogle(<Moon size={17} />)
  },[theme])

  return (
    <NavigationMenu>
      <h1 className="font-bold ml-3">Vihermawan</h1>
    
      <NavigationMenuList className={`hidden md:flex ${customClass}`}>
        {listRoute.map((data)=> {
          return (
            <NavigationMenuItem key={data.id}>
              <Link href={data.path} legacyBehavior passHref >
                <NavigationMenuLink 
                  className={`${navigationMenuTriggerStyle()} 
                  ${pathname === data.path && activeColor}`}
                >
                  {data.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          )
        })}
      </NavigationMenuList>
      
      <div id="toogle-button" className="hidden md:block">
        <motion.button
          className="mr-3 border-2 p-2 rounded-lg"
          whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
          onClick={()=>setTheme(theme === 'light' ? 'dark' : 'light')}
        >
          {iconToogle}
        </motion.button>
      </div>

      <div id="hamburger-menu" className="block md:hidden">
        <Dialog open={isOpen}>
          <DialogTrigger asChild>
            <motion.button
              className="mr-3 border-2 p-2 rounded-lg"
              whileTap={{ scale: 0.9, x: "-5px", y: "5px" }}
              onClick={()=>setIsOpen(true)}
            >
              <Menu size={17}/>
            </motion.button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[300px]">
            <DialogHeader>
              <DialogTitle>Vihermawan</DialogTitle>
              <div className="text-sm">
                {listRoute.map((data)=> {
                  return (
                    <React.Fragment key={data.id}>
                      <div className="flex w-full justify-between mt-4">
                        <Link href={data.path} onClick={()=>setIsOpen(false)}>{data.title}</Link>
                        <h1>⌘T</h1>
                      </div>
                      <Separator className="" />
                    </React.Fragment>
                  )
                })}
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </NavigationMenu>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
