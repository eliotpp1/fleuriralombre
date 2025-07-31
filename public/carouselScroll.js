document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".projects-carousel");
  const carouselContainer = document.querySelector(
    ".projects-carousel-container"
  );
  let isScrolling = false;
  let lastScrollTop = 0;

  const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return rect.top <= 0 && rect.bottom >= 0;
  };

  window.addEventListener(
    "wheel",
    (event) => {
      if (!isInViewport(carousel)) return;
      event.preventDefault();
      const deltaY = event.deltaY;
      const scrollAmount = 400;
      const currentScroll = carouselContainer.scrollLeft;
      const maxScroll =
        carouselContainer.scrollWidth - carouselContainer.clientWidth;

      if (deltaY > 0) {
        if (currentScroll < maxScroll) {
          carouselContainer.scrollTo({
            left: currentScroll + scrollAmount,
            behavior: "smooth",
          });
        } else {
          window.scrollBy({
            top: window.innerHeight,
            behavior: "smooth",
          });
        }
      } else if (deltaY < 0) {
        if (currentScroll > 0) {
          carouselContainer.scrollTo({
            left: currentScroll - scrollAmount,
            behavior: "smooth",
          });
        } else {
          window.scrollBy({
            top: -window.innerHeight,
            behavior: "smooth",
          });
        }
      }
    },
    { passive: false }
  );

  carouselContainer.addEventListener(
    "touchstart",
    (event) => {
      if (isInViewport(carousel)) {
        event.preventDefault();
      }
    },
    { passive: false }
  );

  carouselContainer.addEventListener(
    "touchmove",
    (event) => {
      if (isInViewport(carousel)) {
        event.preventDefault();
      }
    },
    { passive: false }
  );
});
