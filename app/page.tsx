'use client';
import Image from "next/image";
import AnimatedNavbar from "./components/AnimatedNavbar";
import CanvasNavbar from "./components/CanvasNavbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between" 
         style={{
           background: 'repeating-linear-gradient(230deg, #4338ca, #4338ca 1px, #3730a3 1px, #3730a3 2px)'
         }}>
      <AnimatedNavbar />
    </div>
  );
}
