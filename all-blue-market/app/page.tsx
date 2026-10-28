import Link from 'next/link';
import React from 'react'

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


  return (
    <div className='h-screen w-full flex flex-col items-center '>
      <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#07152b]/85 px-4 py-4 backdrop-blur-md
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

          {/* Search */}
          <form
            role="search"
            className="order-3 flex h-11 w-full min-w-0 overflow-hidden rounded-xl border border-white/10 bg-white/6
             transition focus-within:border-blue-400/70 sm:order-0 sm:w-auto sm:flex-1 sm:max-w-lg sm:mx-6"
          >
            <input
              type="search"
              name="location"
              placeholder="Search by your current location..."
              aria-label="Search by location"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-white outline-none placeholder:text-slate-400 sm:px-4"
            />

            <button
              type="submit"
              aria-label="Search"
              className="flex w-12 shrink-0 items-center justify-center bg-[#06438a] text-white transition-colors
               hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset
                focus-visible:ring-blue-300"
            >
              <SearchIcon />
            </button>
          </form>

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
      <section className="flex min-h-125 w-full items-center justify-center px-4 sm:min-h-150">
        <div>
          <p className="text-center text-4xl font-bold leading-tight text-black sm:text-5xl md:text-6xl">
            Find shops & restaurants
            <br />
            near you.
          </p>
        </div>
      </section>
    </div>
  )
}
