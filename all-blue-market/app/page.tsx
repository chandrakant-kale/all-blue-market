"use client";
import Link from 'next/link';
import React, { useState } from 'react'

function SearchIcon() {
  return (
    <svg
      width="36"
      height="36"
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="17"
        cy="17"
        r="8.5"
        stroke="#fefefe"
        strokeWidth="1.5"
      />
      <path
        d="M23.5 23.5L31 31"
        stroke="#fefefe"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default function page() {

  const [location, setLocation] = useState<boolean>(true)

  return (
    <div className='h-screen w-full flex flex-col items-center '>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0a2654] px-4 py-4 backdrop-blur-md
       text-white sm:px-6 lg:px-10">
        <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4">

          {/* Brand */}
          <Link href="/" className="shrink-0">
            <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              all
              <span className="font-mono text-blue-400"> blue</span>
              <span className="text-slate-300">-Market</span>
            </p>
          </Link>


          {/* Join */}
          <Link
            href="/join"
            className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl border border-blue-400/30
             bg-[#06438a] px-5 text-sm font-semibold text-white transition-colors hover:border-blue-300/60
              hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 
              focus-visible:ring-offset-2 focus-visible:ring-offset-[#07152b]"
          >
            Join
          </Link>

        </div>
      </header>

      {/* Hero Section */}
      {!location && <section className="flex min-h-125 w-full items-center justify-center px-4 sm:min-h-150">
        <div>
          <p className="text-center text-4xl font-bold leading-tight text-black sm:text-5xl md:text-6xl">
            Find shops & restaurants
            <br />
            near you.
          </p>
        </div>
      </section>}

      {location && (
        <section className="flex w-full flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:items-start lg:p-8">

          {/* Search and location options */}
          <div className="flex w-full flex-col gap-5 lg:w-[40%]">

            <form
              role="search"
              className="flex h-12 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition
               focus-within:border-blue-500"
            >
              <input
                type="search"
                name="location"
                placeholder="Search city, area or food..."
                aria-label="Search location or food"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-slate-900 outline-none placeholder:text-slate-400"
              />

              <button
                type="submit"
                aria-label="Search"
                className="flex w-12 shrink-0 items-center justify-center bg-[#06438a] text-white transition-colors
                 hover:bg-blue-700"
              >
                <SearchIcon />
              </button>

              
            </form>

            {/* Quick options */}
            <div className="grid grid-cols-2 gap-3 rounded-xl border border-slate-200 p-3 shadow-sm sm:p-4">
              <button
                type="button"
                className="flex min-h-16 items-center justify-center rounded-lg border border-slate-200 px-3 text-center 
                text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:bg-blue-50"
              >
                Restaurants
              </button>

              <button
                type="button"
                className="flex min-h-16 items-center justify-center rounded-lg border border-slate-200 px-3 text-center 
                text-sm font-medium text-slate-700 transition hover:border-blue-500 hover:bg-blue-50"
              >
                Food shops
              </button>
            </div>
          </div>

          {/* Map placeholder */}
          <div
            className="flex min-h-72 w-full items-center justify-center rounded-2xl border border-blue-200 bg-[#e8effb]
             text-sm font-medium text-[#0a2654] sm:min-h-96 lg:min-h-120 lg:w-[60%]"
            aria-label="Map showing nearby places"
          >
            Map
          </div>

        </section>
      )}



      <footer className='p-10 bg-[#0a2654] w-full text-white '>
        <div className='flex-1 sm:flex justify-around items-center border-b pb-12'>
          <Link href="/" className="shrink-0">
            <p className="text-xl font-bold tracking-tight text-white sm:text-2xl">
              all
              <span className="font-mono text-blue-400"> blue</span>
              <span className="text-slate-300">-Market</span>
            </p>
          </Link>

          <div className='flex flex-col'>
            <Link href="/about">About us</Link>
            <Link href="/service">Service</Link>
          </div>

          <div className='flex flex-col'>
            <Link href="/privacy/policy">privacy & policy</Link>
            <Link href="/term">Terms & co</Link>
          </div>

        </div>
        <div className='pt-5 flex-1 sm:flex justify-around'>
          <p>© All-blue-market 2026</p>
          <p>Chandrakant kale</p>
        </div>
      </footer>
    </div>
  )
}