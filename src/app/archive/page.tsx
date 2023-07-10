"use client";

import { useTheme } from "next-themes"
export default function Archive() {
  const { setTheme } = useTheme()
  return <div> <button onClick={()=>setTheme("light")}>ligth</button> Archive Page</div>;
}
