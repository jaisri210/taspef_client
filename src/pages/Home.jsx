import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import { gsap } from "gsap";
import FloatingBar from "../components/FloatingBar";
import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import FloatingQuizButton from "../components/FloatingQuizButton";
import HERO_IMAGES from "../data/heroImages";

const Home = () => {
  const { t, i18n } = useTranslation();
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const waveTLRef = useRef(null);
  const subWaveRef = useRef(null);
  const shimmerRef = useRef(null);

  // ✅ FINAL WORD WRAP FIX (ENGLISH + TAMIL)
  const splitToSpans = (el, color = "#FFFFFF") => {
    if (!el) return;

    el.innerHTML = el.textContent;
    delete el.dataset.split;

    const text = el.textContent || "";
    const frag = document.createDocumentFragment();

    const segmenter = new Intl.Segmenter("ta", {
      granularity: "grapheme",
    });

    text.split(" ").forEach((word, wordIndex, arr) => {
      const wordSpan = document.createElement("span");

      //  MAIN FIX
      wordSpan.style.display = "inline-block";
      wordSpan.style.whiteSpace = "nowrap";

      const chars = [...segmenter.segment(word)].map((s) => s.segment);

      chars.forEach((ch) => {
        const charSpan = document.createElement("span");
        charSpan.className = "char";

        charSpan.style.color = color;
        charSpan.style.display = "inline-block";
        charSpan.style.fontWeight = "700";
        charSpan.style.lineHeight = "1.2";

        charSpan.textContent = ch;
        wordSpan.appendChild(charSpan);
      });

      frag.appendChild(wordSpan);

      if (wordIndex < arr.length - 1) {
        const space = document.createElement("span");
        space.innerHTML = "&nbsp;";
        frag.appendChild(space);
      }
    });

    el.innerHTML = "";
    el.appendChild(frag);
    el.dataset.split = "true";
  };

  useEffect(() => {
    const title = titleRef.current;
    const subtitle = subtitleRef.current;
    if (!title || !subtitle) return;

    waveTLRef.current?.kill();
    subWaveRef.current?.kill();

    // FIX: Delay execution to allow layout to stabilize
    const timer = setTimeout(() => {
      splitToSpans(title, "#FFFFFF");
      splitToSpans(subtitle, "#FFD700");

      const titleChars = title.querySelectorAll(".char");
      const subChars = subtitle.querySelectorAll(".char");

      gsap.fromTo(
        titleChars,
        { y: 60, opacity: 0, rotationX: -18 },
        {
          y: 0,
          opacity: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          stagger: { each: 0.03, from: "center" },
        },
      );

      gsap.fromTo(
        subChars,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          stagger: { each: 0.02, from: "center" },
          delay: 0.5,
        },
      );
    }, 100); // KEY LINE

    return () => clearTimeout(timer);
  }, [i18n.language]);

  //  FEATURES
  const features = [
    {
      title: t("e_magazine"),
      description: t("e_magazine_desc"),
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
        </svg>
      ),
      link: "/e-magazines",
    },
    {
      title: t("office_bearers"),
      description: t("office_bearers_desc"),
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
        </svg>
      ),
      link: "/Office-Bearers",
    },
    {
      title: t("our_members"),
      description: t("our_members_desc"),
      icon: (
        <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
        </svg>
      ),
      link: "/members",
    },
  ];

  //  UPDATES
  const latestUpdates = [
    {
      title: t("agm_title"),
      description: t("agm_desc"),
      date: "September 14, 2025",
      image: "/assets/Gallery/gallery-19.png",
    },
    {
      title: t("magazine_release"),
      description: t("magazine_release_desc"),
      date: "Feb 15, 2026",
      image: "/assets/images/i-11.png",
    },
    {
      title: t("wildlife_title"),
      description: t("wildlife_desc"),
      date: "March 10, 2024",
      image: "/assets/Gallery/covers/wildlife-cover.jpg",
    },
  ];

  return (
    <div>
      <FloatingBar />
      <FloatingQuizButton />

      {/* HERO */}
      <section className="relative w-full min-h-[80vh] md:min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* 🌄 IMAGE SLIDER */}
        <Swiper
          modules={[Autoplay]}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          loop
          speed={1000}
          className="absolute inset-0 w-full h-full -z-20"
        >
          {HERO_IMAGES.map((img, i) => (
            <SwiperSlide key={i}>
              <img
                src={img}
                className="w-full h-full object-cover"
                alt={`slide-${i}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 🌫️ OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-green-900/40 to-transparent z-10" />

        {/* 💬 CONTENT */}
        <div className="relative z-20 text-center px-4">
          <h1
            ref={titleRef}
            className="text-white text-3xl sm:text-4xl md:text-5xl font-extrabold max-w-[1200px] mx-auto leading-tight break-normal"
          >
            {t("main_title")}
          </h1>

          <p
            ref={subtitleRef}
            className="text-lg text-yellow-400 md:text-3xl mb-10 mt-[220px] leading-snug font-semibold"
          >
            {t("forest_message")}
          </p>

          <button
            onClick={() => (window.location.href = "/gallery")}
            className="px-6 py-3 rounded-md border border-white bg-white/10 text-white hover:bg-white hover:text-green-700 transition-all text-lg mt-[140px]"
          >
            {t("view_more")}
          </button>
        </div>
      </section>
      {/* FEATURES */}
      <section className="py-16 md:py-24 bg-background-light">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("our_services")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="card p-8 text-center">
                <div className="inline-flex items-center justify-center bg-primary-100 rounded-full w-20 h-20 mx-auto mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4">{f.title}</h3>
                <p className="mb-6">{f.description}</p>
                <Link to={f.link}>
                  <Button variant="outline" size="sm">
                    {t("view_more")}
                  </Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* UPDATES */}
      <section className="py-16 md:py-24">
        <div className="container">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            {t("latest_updates")}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestUpdates.map((u, i) => (
              <article key={i} className="card overflow-hidden">
                <img
                  src={u.image}
                  alt={u.title}
                  className="h-48 w-full object-cover"
                />
                <div className="p-6">
                  <time>{u.date}</time>
                  <h3 className="text-xl font-bold mt-2">{u.title}</h3>
                  <p>{u.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-24 bg-primary-500 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          {t("join_title")}
        </h2>
        <p className="mb-8">{t("join_desc")}</p>
        <Button
          variant="secondary"
          size="lg"
          onClick={() => (window.location.href = "/members")}
        >
          {t("become_member")}
        </Button>
      </section>
    </div>
  );
};

export default Home;
