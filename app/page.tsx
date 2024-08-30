'use client';
import Image from "next/image";
import AnimatedNavbar from "./components/AnimatedNavbar";
import CanvasNavbar from "./components/CanvasNavbar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24 bg-blue-500">
      <AnimatedNavbar />
    </div>
  );
}
