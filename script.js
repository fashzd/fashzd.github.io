document.querySelectorAll("[data-project]").forEach((project) => {
  const mainImage = project.querySelector("[data-main-image]");
  const buttons = project.querySelectorAll("[data-image]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextImage = button.getAttribute("data-image");
      if (!nextImage || !mainImage) return;

      mainImage.src = nextImage;
      buttons.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
    });
  });
});
