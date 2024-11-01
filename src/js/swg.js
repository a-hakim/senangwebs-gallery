// SenangWebs Gallery (SWG) - Lightweight Modal Image Gallery
// Version 1.4.0

class SenangWebsGallery {
    constructor(galleryElement) {
        this.gallery = galleryElement;
        this.currentIndex = 0;
        this.items = [];
        this.modal = null;
        this.modalImage = null;
        this.caption = null;
        this.counter = null;
        this.isOpen = false;
        this.isAnimating = false;
        this.showCounter = this.gallery.hasAttribute('data-swg-page');

        this.init();
    }

    init() {
        // Initialize only items from this specific gallery
        const items = this.gallery.querySelectorAll('[data-swg-item]');
        items.forEach((item, index) => {
            this.items.push({
                element: item,
                src: item.querySelector('img')?.src || '',
                caption: item.getAttribute('data-swg-caption') || ''
            });

            item.addEventListener('click', (e) => {
                e.preventDefault();
                this.openModal(index);
            });
        });

        this.createModal();
        this.bindEvents();
    }

    createModal() {
        const modal = document.createElement('div');
        modal.className = 'swg-modal';
        modal.innerHTML = `
            <div class="swg-modal-overlay"></div>
            <div class="swg-modal-content">
                ${this.showCounter ? '<div class="swg-counter"></div>' : ''}
                <button class="swg-close">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352 512" fill="currentColor" width="16" height="16"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M242.7 256l100.1-100.1c12.3-12.3 12.3-32.2 0-44.5l-22.2-22.2c-12.3-12.3-32.2-12.3-44.5 0L176 189.3 75.9 89.2c-12.3-12.3-32.2-12.3-44.5 0L9.2 111.5c-12.3 12.3-12.3 32.2 0 44.5L109.3 256 9.2 356.1c-12.3 12.3-12.3 32.2 0 44.5l22.2 22.2c12.3 12.3 32.2 12.3 44.5 0L176 322.7l100.1 100.1c12.3 12.3 32.2 12.3 44.5 0l22.2-22.2c12.3-12.3 12.3-32.2 0-44.5L242.7 256z"/></svg>
                </button>
                <button class="swg-prev">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16" height="16"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M257.5 445.1l-22.2 22.2c-9.4 9.4-24.6 9.4-33.9 0L7 273c-9.4-9.4-9.4-24.6 0-33.9L201.4 44.7c9.4-9.4 24.6-9.4 33.9 0l22.2 22.2c9.5 9.5 9.3 25-.4 34.3L136.6 216H424c13.3 0 24 10.7 24 24v32c0 13.3-10.7 24-24 24H136.6l120.5 114.8c9.8 9.3 10 24.8 .4 34.3z"/></svg>
                </button>
                <button class="swg-next">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" width="16" height="16"><!--!Font Awesome Free 6.6.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path d="M190.5 66.9l22.2-22.2c9.4-9.4 24.6-9.4 33.9 0L441 239c9.4 9.4 9.4 24.6 0 33.9L246.6 467.3c-9.4 9.4-24.6 9.4-33.9 0l-22.2-22.2c-9.5-9.5-9.3-25 .4-34.3L311.4 296H24c-13.3 0-24-10.7-24-24v-32c0-13.3 10.7-24 24-24h287.4L190.9 101.2c-9.8-9.3-10-24.8-.4-34.3z"/></svg>
                </button>
                <div class="swg-image-container">
                    <img class="swg-modal-image" src="" alt="">
                </div>
                <div class="swg-caption"></div>
            </div>
        `;

        document.body.appendChild(modal);

        this.modal = modal;
        this.modalImage = modal.querySelector('.swg-modal-image');
        this.caption = modal.querySelector('.swg-caption');
        this.counter = modal.querySelector('.swg-counter');
    }

    bindEvents() {
        this.modal.querySelector('.swg-close').addEventListener('click', () => this.closeModal());
        this.modal.querySelector('.swg-prev').addEventListener('click', () => this.showPrevious());
        this.modal.querySelector('.swg-next').addEventListener('click', () => this.showNext());

        this.modal.querySelector('.swg-modal-overlay').addEventListener('click', (e) => {
            if (e.target === e.currentTarget) {
                this.closeModal();
            }
        });

        const handleKeydown = (e) => {
            if (!this.isOpen) return;

            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        };

        document.addEventListener('keydown', handleKeydown);

        // Clean up event listener when modal is removed
        this.modal.addEventListener('remove', () => {
            document.removeEventListener('keydown', handleKeydown);
        });
    }

    openModal(index) {
        this.currentIndex = index;
        this.isOpen = true;
        
        this.modalImage.style.opacity = '0';
        this.modal.classList.add('active');
        
        requestAnimationFrame(() => {
            this.modalImage.style.opacity = '1';
            this.updateImage();
        });
        
        document.body.style.overflow = 'hidden';
    }

    closeModal() {
        this.modalImage.style.opacity = '0';
        
        setTimeout(() => {
            this.isOpen = false;
            this.modal.classList.remove('active');
            document.body.style.overflow = '';
            this.modalImage.classList.remove('slide-left', 'slide-right');
        }, 300);
    }

    showPrevious() {
        if (this.isAnimating) return;
        this.animateSlide('right', () => {
            this.currentIndex = (this.currentIndex - 1 + this.items.length) % this.items.length;
            this.updateImage();
        });
    }

    showNext() {
        if (this.isAnimating) return;
        this.animateSlide('left', () => {
            this.currentIndex = (this.currentIndex + 1) % this.items.length;
            this.updateImage();
        });
    }

    animateSlide(direction, callback) {
        this.isAnimating = true;
        this.modalImage.classList.add(`slide-${direction}`);
        this.modalImage.style.opacity = '0';
        
        setTimeout(() => {
            callback();
            this.modalImage.classList.remove(`slide-${direction}`);
            
            requestAnimationFrame(() => {
                this.modalImage.style.opacity = '1';
                this.isAnimating = false;
            });
        }, 300);
    }

    updateImage() {
        const item = this.items[this.currentIndex];
        this.modalImage.src = item.src;

        if (this.caption && item.caption !== '') {
            this.caption.textContent = item.caption;
            this.caption.style.display = 'block';
        } else {
            this.caption.style.display = 'none';
        }
        
        if (this.showCounter && this.counter) {
            this.counter.textContent = `${this.currentIndex + 1} / ${this.items.length}`;
        }
    }
}

// Initialize each gallery separately
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-swg]').forEach(gallery => {
        new SenangWebsGallery(gallery);
    });
});

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SenangWebsGallery;
}