import React, { useEffect, useState } from 'react'
import { SVG_MOON, SVG_SUN } from './SVGs'

export default function Header() {
    const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("isDark") === "true") {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);
  function toggleTheme(){
    document.documentElement.classList.toggle("dark");
    setIsDark(!isDark);
    localStorage.setItem("isDark", !isDark);
  }
    return (
        <div className='h-14 w-full sticky top-0 flex justify-end z-20'>
            <button className='mr-6 mt-4 hover:scale-95 active:scale-90 transition-transform ease-in-out duration-200 flex justify-center items-center' onClick={toggleTheme} title="Change Theme">
                {isDark ? <SVG_MOON/> : <SVG_SUN/>}
            </button>
        </div>
    )
}
