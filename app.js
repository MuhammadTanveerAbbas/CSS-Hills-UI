document.addEventListener("DOMContentLoaded", () => {
  const listBg = document.querySelectorAll(".bg");
  const listTab = document.querySelectorAll(".tab");
  const titleBanner = document.querySelector(".banner h1");

  let ticking = false;
  let lastScrollY = window.scrollY;

  function onScroll() {
    lastScrollY = window.scrollY;
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    const scrollY = lastScrollY;

    listBg.forEach((bg, index) => {
      let translateY;
      if (index === 0) {
        translateY = scrollY / 3;
      } else if (index === listBg.length - 1) {
        translateY = 0;
      } else {
        translateY = scrollY * (index / 2);
      }
      bg.style.transform = `translateY(${translateY}px)`;
    });

    if (titleBanner) {
      titleBanner.style.transform = `translateY(${scrollY * 2}px)`;
    }

    listTab.forEach((tab) => {
      const tabTop = tab.getBoundingClientRect().top;
      if (tabTop < 550) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    });

    ticking = false;
  }

  window.addEventListener("scroll", onScroll, { passive: true });
});
