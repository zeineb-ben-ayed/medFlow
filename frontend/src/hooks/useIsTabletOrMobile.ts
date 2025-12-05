"use client";
import { useEffect, useState } from "react";

export function useIsTabletOrMobile() {
  const [isTabletOrMobile, setIsTabletOrMobile] = useState(false);

  useEffect(() => {
    const update = () => {
      setIsTabletOrMobile(window.innerWidth < 1024); // <lg breakpoint
    };

    update();
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return isTabletOrMobile;
}
