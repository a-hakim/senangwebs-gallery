class SenangWebsGallery {
  constructor(galleryElement) {
    this.gallery = galleryElement;
    this.currentIndex = 0;
    this.items = [];
    this.modal = null;
    this.modalImage = null;
    this.caption = null;
    this.counter = null;
    this.prevButton = null;
    this.nextButton = null;
    this.isOpen = false;
    this.isAnimating = false;
    this.showCounter = this.gallery.hasAttribute("data-swg-page");

    // Store event handler references for proper cleanup
    this.keydownHandler = null;

    // Touch support for swipe gestures
    this.touchStartX = 0;
    this.touchEndX = 0;

    this.init();
  }

  init() {
    // Initialize only items from this specific gallery
    const items = this.gallery.querySelectorAll("[data-swg-item]");
    items.forEach((item, index) => {
      this.items.push({
        element: item,
        src: item.querySelector("img")?.src || "",
        alt: item.querySelector("img")?.alt || "",
        caption: item.getAttribute("data-swg-caption") || "",
      });

      item.addEventListener("click", (e) => {
        e.preventDefault();
        this.openModal(index);
      });
    });

    this.createModal();
    this.bindEvents();
  }

  createModal() {
    const icons = require('@bookklik/senangstart-icons/icons');
    const modal = document.createElement("div");
    modal.className = "swg-modal";
    modal.innerHTML = `
            <div class="swg-modal-overlay"></div>
            <div class="swg-modal-content">
                ${this.showCounter ? '<div class="swg-counter"></div>' : ""}
                <button class="swg-close">
                    ${icons['x-mark']}
                </button>
                <button class="swg-prev">
                    ${icons['arrow-left']}
                </button>
                <button class="swg-next">
                    ${icons['arrow-right']}
                </button>
                <div class="swg-image-container">
                    <div class="swg-loader"></div>
                    <img class="swg-modal-image" src="" alt="">
                </div>
                <div class="swg-caption"></div>
            </div>
        `;

    document.body.appendChild(modal);

    this.modal = modal;
    this.modalImage = modal.querySelector(".swg-modal-image");
    this.loader = modal.querySelector(".swg-loader");
    this.caption = modal.querySelector(".swg-caption");
    this.counter = modal.querySelector(".swg-counter");
    this.prevButton = modal.querySelector(".swg-prev");
    this.nextButton = modal.querySelector(".swg-next");

    // Handle image load events for loading indicator
    this.modalImage.addEventListener("load", () => {
      if (this.loader) {
        this.loader.style.display = "none";
      }
    });

    this.updateButtonVisibility();
  }

  bindEvents() {
    this.modal
      .querySelector(".swg-close")
      .addEventListener("click", () => this.closeModal());
    this.modal
      .querySelector(".swg-prev")
      .addEventListener("click", () => this.showPrevious());
    this.modal
      .querySelector(".swg-next")
      .addEventListener("click", () => this.showNext());

    this.modal
      .querySelector(".swg-modal-overlay")
      .addEventListener("click", (e) => {
        if (e.target === e.currentTarget) {
          this.closeModal();
        }
      });

    // Store keyboard handler reference for proper cleanup
    this.keydownHandler = (e) => {
      if (!this.isOpen) return;

      switch (e.key) {
        case "Escape":
          this.closeModal();
          break;
        case "ArrowLeft":
          this.showPrevious();
          break;
        case "ArrowRight":
          this.showNext();
          break;
      }
    };

    document.addEventListener("keydown", this.keydownHandler);

    // Touch swipe support for mobile
    const modalContent = this.modal.querySelector(".swg-modal-content");

    modalContent.addEventListener(
      "touchstart",
      (e) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    modalContent.addEventListener(
      "touchend",
      (e) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );
  }

  handleSwipe() {
    const swipeThreshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (Math.abs(diff) < swipeThreshold) return;

    if (diff > 0) {
      this.showNext();
    } else {
      this.showPrevious();
    }
  }

  destroy() {
    if (this.keydownHandler) {
      document.removeEventListener("keydown", this.keydownHandler);
      this.keydownHandler = null;
    }

    if (this.modal && this.modal.parentNode) {
      this.modal.parentNode.removeChild(this.modal);
      this.modal = null;
    }
  }

  openModal(index) {
    this.currentIndex = index;
    this.isOpen = true;

    this.modalImage.style.opacity = "0";
    this.modal.classList.add("active");

    requestAnimationFrame(() => {
      this.modalImage.style.opacity = "1";
      this.updateImage();
    });

    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modalImage.style.opacity = "0";

    setTimeout(() => {
      this.isOpen = false;
      this.modal.classList.remove("active");
      document.body.style.overflow = "";
      this.modalImage.classList.remove("slide-left", "slide-right");
    }, 300);
  }

  showPrevious() {
    if (this.isAnimating || this.items.length <= 1) return;
    this.animateSlide("right", () => {
      this.currentIndex =
        (this.currentIndex - 1 + this.items.length) % this.items.length;
      this.updateImage();
    });
  }

  showNext() {
    if (this.isAnimating || this.items.length <= 1) return;
    this.animateSlide("left", () => {
      this.currentIndex = (this.currentIndex + 1) % this.items.length;
      this.updateImage();
    });
  }

  animateSlide(direction, callback) {
    this.isAnimating = true;

    this.modalImage.classList.add(`slide-${direction}`);
    this.modalImage.style.opacity = "0";

    setTimeout(() => {
      callback();
    }, 300);
  }

  updateImage() {
    const item = this.items[this.currentIndex];

    if (this.loader) {
      this.loader.style.display = "block";
    }

    this.modalImage.style.opacity = "0";

    const onImageReady = () => {
      if (this.loader) {
        this.loader.style.display = "none";
      }

      this.modalImage.classList.remove("slide-left", "slide-right");

      requestAnimationFrame(() => {
        this.modalImage.style.opacity = "1";
        this.isAnimating = false;
      });
    };

    this.modalImage.onload = onImageReady;

    this.modalImage.onerror = () => {
      console.error("Failed to load image");
      this.isAnimating = false;
      if (this.loader) this.loader.style.display = "none";
    };

    this.modalImage.src = item.src;
    this.modalImage.alt = item.alt || item.caption || "";

    if (this.caption) {
      if (item.caption !== "") {
        this.caption.textContent = item.caption;
        this.caption.style.display = "block";
      } else {
        this.caption.style.display = "none";
      }
    }

    if (this.showCounter && this.counter) {
      this.counter.textContent = `${this.currentIndex + 1} / ${
        this.items.length
      }`;
    }

    this.preloadNeighbors();
  }

  preloadNeighbors() {
    const nextIndex = (this.currentIndex + 1) % this.items.length;
    const prevIndex =
      (this.currentIndex - 1 + this.items.length) % this.items.length;

    const preloadImg = new Image();
    preloadImg.src = this.items[nextIndex].src;

    const preloadImgPrev = new Image();
    preloadImgPrev.src = this.items[prevIndex].src;
  }

  updateButtonVisibility() {
    if (this.items.length <= 1) {
      if (this.prevButton) {
        this.prevButton.style.display = "none";
      }
      if (this.nextButton) {
        this.nextButton.style.display = "none";
      }
    } else {
      if (this.prevButton) {
        this.prevButton.style.display = "flex";
      }
      if (this.nextButton) {
        this.nextButton.style.display = "flex";
      }
    }
  }
}

// Initialize each gallery separately
function initGalleries() {
  document.querySelectorAll("[data-swg]").forEach((gallery) => {
    if (!gallery.hasAttribute('data-swg-initialized')) {
      new SenangWebsGallery(gallery);
      gallery.setAttribute('data-swg-initialized', 'true');
    }
  });
}

// Handle both cases: script loaded before or after DOMContentLoaded
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initGalleries);
} else {
  // DOM already loaded, initialize immediately
  initGalleries();
}

// Support for SPA navigation like Livewire and Turbo
document.addEventListener("livewire:navigated", initGalleries);
document.addEventListener("turbo:load", initGalleries);

// Export for module usage
if (typeof module !== "undefined" && module.exports) {
  module.exports = SenangWebsGallery;
}
