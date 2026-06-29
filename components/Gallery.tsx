"use client";

import { useState } from "react";
import Image from "next/image";

const PHOTOS = [
  {
    src: "/photos/van-extra3.jpg",
    alt: "Opel Zafira Life Business – widok z przodu",
    caption: "Nowoczesna sylwetka i sportowe felgi — ten bus robi wrażenie już na parkingu",
    big: true,
  },
  {
    src: "/photos/van-rear.jpg",
    alt: "Tył z hakiem holowniczym",
    caption: "Hak w standardzie — możesz zabrać przyczepkę lub bagażnik rowerowy",
    big: false,
  },
  {
    src: "/photos/van-side.jpg",
    alt: "Widok boczny – przestronna bryła",
    caption: "Imponująca długość kabiny — każdy pasażer ma gdzie wyciągnąć nogi",
    big: false,
  },
  {
    src: "/photos/interior-seats.jpg",
    alt: "Wnętrze – przestronne tylne rzędy",
    caption: "Wygodne fotele z zagłówkami — jak biznes klasa, tylko na kółkach",
    big: false,
  },
  {
    src: "/photos/interior-rear.jpg",
    alt: "Wnętrze – panorama siedzeń",
    caption: "Trzy rzędy siedzeń, każde z pasami — 9 osób jedzie komfortowo i bezpiecznie",
    big: false,
  },
  {
    src: "/photos/van-door.jpg",
    alt: "Otwarte drzwi przesuwne",
    caption: "Szerokie drzwi przesuwne — wsiadanie z torbami i wózkami bez problemu",
    big: false,
  },
  {
    src: "/photos/van-extra.jpg",
    alt: "Kokpit i przednie fotele",
    caption: "Ergonomiczny kokpit z automatyczną skrzynią — kierowca jedzie bez stresu",
    big: false,
  },
];

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {PHOTOS.map((photo, i) => (
          <button
            key={photo.src}
            onClick={() => setLightbox(i)}
            className={`group relative text-left focus:outline-none focus:ring-2 focus:ring-[#3a7a50] rounded-xl overflow-hidden ${
              i === 0 ? "col-span-2 row-span-2" : ""
            }`}
          >
            <div className={`relative overflow-hidden rounded-xl bg-gray-200 ${i === 0 ? "aspect-[16/10]" : "aspect-[4/3]"}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, 33vw"
              />
              {/* overlay z lupą */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                <svg
                  className="w-9 h-9 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
            {/* opis */}
            <p className="mt-2 text-xs text-gray-500 leading-snug px-0.5 text-left">
              {photo.caption}
            </p>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          {/* zamknij */}
          <button
            className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10"
            onClick={() => setLightbox(null)}
            aria-label="Zamknij"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* zdjęcie */}
          <div
            className="relative w-full max-w-4xl aspect-[4/3]"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PHOTOS[lightbox].src}
              alt={PHOTOS[lightbox].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />
          </div>

          {/* opis w lightboxie */}
          <p
            className="mt-4 text-white/80 text-sm text-center max-w-lg px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {PHOTOS[lightbox].caption}
          </p>

          {/* nawigacja */}
          <button
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox - 1 + PHOTOS.length) % PHOTOS.length);
            }}
            aria-label="Poprzednie"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              setLightbox((lightbox + 1) % PHOTOS.length);
            }}
            aria-label="Następne"
          >
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          {/* licznik */}
          <p className="absolute bottom-4 text-white/40 text-xs">
            {lightbox + 1} / {PHOTOS.length}
          </p>
        </div>
      )}
    </>
  );
}
