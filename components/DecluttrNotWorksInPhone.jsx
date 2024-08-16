import Image from "next/image";
import React from "react";
import NavBar from "./NavBar";

export default function DecluttrNotWorksInPhone() {
  return (
    <>
      <NavBar className={"lg:hidden"} />
      <div className="w-full h-full flex flex-col -mt-20 justify-center items-center max-w-sm mx-auto lg:hidden">
        <Image src="/designer-desk.png" alt="phone" width={1000} height={1000} className="w-2/3 object-contain" />
        <h1 className="font-semibold -mt-8 px-6 text-lg text-center">Uh-oh! Looks like you're on a mobile device…</h1>
        <h3 className="px-4 mt-2 text-xs text-center text-[#031B1580]">
          Dcluttr is best experienced on a desktop or laptop.
          <br />
          Please visit us on a bigger screen. We promise it’ll be worth it.
        </h3>
        <h1 className="font-semibold mt-4 px-6 text-lg text-center">See you there!</h1>
      </div>
    </>
  );
}
