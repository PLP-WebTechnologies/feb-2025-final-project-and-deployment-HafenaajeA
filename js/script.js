// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("show");
    });
  }

  // Cart functionality
  const cartBtn = document.getElementById("cart-btn");
  const cartOverlay = document.querySelector(".cart-overlay");
  const cartClose = document.querySelector(".cart-close");
  const cartItems = document.querySelector(".cart-items");
  const cartTotal = document.querySelector(".cart-total");
  const cartCount = document.getElementById("cart-count");
  const checkoutBtn = document.querySelector(".checkout-btn");
  const addToCartBtns = document.querySelectorAll(".add-to-cart");

  // Initialize cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Update cart UI
  function updateCartUI() {
    // Update cart count
    cartCount.textContent = cart.reduce(
      (total, item) => total + item.quantity,
      0
    );

    // Update cart items
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
      cartTotal.textContent = "0.00";
      return;
    }

    let total = 0;

    cart.forEach((item) => {
      total += item.price * item.quantity;

      const cartItem = document.createElement("div");
      cartItem.classList.add("cart-item");
      cartItem.innerHTML = `
                <div class="cart-item-img">
                    <img src="images/product${item.id}.jpg" alt="${item.name}">
                </div>
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.name}</h4>
                    <p class="cart-item-price">$${item.price}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                        <span>${item.quantity}</span>
                        <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        <i class="fas fa-trash cart-item-remove" data-id="${item.id}"></i>
                    </div>
                </div>
            `;

      cartItems.appendChild(cartItem);
    });

    cartTotal.textContent = total.toFixed(2);

    // Add event listeners to quantity buttons and remove buttons
    const decreaseBtns = document.querySelectorAll(".decrease");
    const increaseBtns = document.querySelectorAll(".increase");
    const removeBtns = document.querySelectorAll(".cart-item-remove");

    decreaseBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        decreaseQuantity(id);
      });
    });

    increaseBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        increaseQuantity(id);
      });
    });

    removeBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        const id = this.dataset.id;
        removeFromCart(id);
      });
    });
  }

  // Add to cart
  function addToCart(id, name, price) {
    const existingItem = cart.find((item) => item.id === id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      cart.push({
        id,
        name,
        price: parseFloat(price),
        quantity: 1,
      });
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    updateCartUI();

    // Show notification
    showNotification(`${name} added to cart!`);
  }

  // Decrease quantity
  function decreaseQuantity(id) {
    const item = cart.find((item) => item.id === id);

    if (item.quantity > 1) {
      item.quantity--;
    } else {
      removeFromCart(id);
      return;
    }

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    updateCartUI();
  }

  // Increase quantity
  function increaseQuantity(id) {
    const item = cart.find((item) => item.id === id);
    item.quantity++;

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    updateCartUI();
  }

  // Remove from cart
  function removeFromCart(id) {
    cart = cart.filter((item) => item.id !== id);

    // Save to localStorage
    localStorage.setItem("cart", JSON.stringify(cart));

    // Update UI
    updateCartUI();
  }

  // Show notification
  function showNotification(message) {
    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.classList.add("show");
    }, 10);

    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 300);
    }, 2000);
  }

  // Event listeners for cart
  if (cartBtn) {
    cartBtn.addEventListener("click", function (e) {
      e.preventDefault();
      cartOverlay.classList.add("show");
    });
  }

  if (cartClose) {
    cartClose.addEventListener("click", function () {
      cartOverlay.classList.remove("show");
    });
  }

  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", function () {
      if (cart.length === 0) {
        showNotification("Your cart is empty!");
        return;
      }

      alert(
        "Thank you for your purchase! This is a demo website, so no actual purchase will be made."
      );
      cart = [];
      localStorage.removeItem("cart");
      updateCartUI();
      cartOverlay.classList.remove("show");
    });
  }

  // Add to cart buttons
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const price = this.dataset.price;

      addToCart(id, name, price);
    });
  });

  // Initialize cart UI
  updateCartUI();

  // Product filters (for products page)
  const categoryFilters = document.querySelectorAll(".category-filter a");
  const priceRange = document.getElementById("price-range");
  const priceValue = document.getElementById("price-value");
  const sortBy = document.getElementById("sort-by");
  const productsGrid = document.querySelector(".products-grid");
  const productCards = document.querySelectorAll(".product-card");

  if (categoryFilters.length > 0 && productCards.length > 0) {
    // Filter by category
    categoryFilters.forEach((filter) => {
      filter.addEventListener("click", function (e) {
        e.preventDefault();

        // Remove active class from all filters
        categoryFilters.forEach((f) => f.classList.remove("active"));

        // Add active class to clicked filter
        this.classList.add("active");

        const category = this.dataset.category;

        // Filter products
        filterProducts();
      });
    });

    // Filter by price
    if (priceRange) {
      priceRange.addEventListener("input", function () {
        const value = this.value;
        priceValue.textContent = `$${value}`;

        // Filter products
        filterProducts();
      });
    }

    // Sort products
    if (sortBy) {
      sortBy.addEventListener("change", function () {
        // Sort products
        filterProducts();
      });
    }

    // Filter products function
    function filterProducts() {
      const activeCategory = document.querySelector(".category-filter a.active")
        .dataset.category;
      const maxPrice = priceRange ? parseFloat(priceRange.value) : 500;
      const sortValue = sortBy ? sortBy.value : "default";

      // Filter by category and price
      productCards.forEach((card) => {
        const cardCategory = card.dataset.category;
        const cardPrice = parseFloat(card.dataset.price);

        if (
          (activeCategory === "all" || cardCategory === activeCategory) &&
          cardPrice <= maxPrice
        ) {
          card.style.display = "block";
        } else {
          card.style.display = "none";
        }
      });

      // Sort products
      const productsArray = Array.from(productCards).filter(
        (card) => card.style.display !== "none"
      );

      switch (sortValue) {
        case "price-low":
          productsArray.sort(
            (a, b) => parseFloat(a.dataset.price) - parseFloat(b.dataset.price)
          );
          break;
        case "price-high":
          productsArray.sort(
            (a, b) => parseFloat(b.dataset.price) - parseFloat(a.dataset.price)
          );
          break;
        case "name-asc":
          productsArray.sort((a, b) =>
            a
              .querySelector("h3")
              .textContent.localeCompare(b.querySelector("h3").textContent)
          );
          break;
        case "name-desc":
          productsArray.sort((a, b) =>
            b
              .querySelector("h3")
              .textContent.localeCompare(a.querySelector("h3").textContent)
          );
          break;
        default:
          // Default sorting (no sorting)
          break;
      }

      // Append sorted products to grid
      productsArray.forEach((card) => {
        productsGrid.appendChild(card);
      });
    }
  }

  // Form validation (for contact page)
  const contactForm = document.getElementById("contact-form");
  const newsletterForm = document.getElementById("newsletter-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();

      // Get form fields
      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const subjectInput = document.getElementById("subject");
      const messageInput = document.getElementById("message");

      // Get error message elements
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const subjectError = document.getElementById("subject-error");
      const messageError = document.getElementById("message-error");

      // Reset error messages
      nameError.textContent = "";
      emailError.textContent = "";
      subjectError.textContent = "";
      messageError.textContent = "";

      // Validate name
      if (nameInput.value.trim() === "") {
        nameError.textContent = "Please enter your name";
        nameInput.focus();
        return;
      }

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        emailError.textContent = "Please enter a valid email address";
        emailInput.focus();
        return;
      }

      // Validate subject
      if (subjectInput.value.trim() === "") {
        subjectError.textContent = "Please enter a subject";
        subjectInput.focus();
        return;
      }

      // Validate message
      if (messageInput.value.trim() === "") {
        messageError.textContent = "Please enter your message";
        messageInput.focus();
        return;
      }

      // If all validations pass, show success message
      const formMessage = document.getElementById("form-message");
      formMessage.textContent =
        "Your message has been sent successfully! We will get back to you soon.";
      formMessage.classList.add("success");

      // Reset form
      contactForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        formMessage.textContent = "";
        formMessage.classList.remove("success");
      }, 5000);
    });
  }

  // Newsletter form validation
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("newsletter-email");
      const newsletterMessage = document.getElementById("newsletter-message");

      // Validate email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value)) {
        newsletterMessage.textContent = "Please enter a valid email address";
        newsletterMessage.style.color = "#ff3a5e";
        emailInput.focus();
        return;
      }

      // If validation passes, show success message
      newsletterMessage.textContent =
        "Thank you for subscribing to our newsletter!";
      newsletterMessage.style.color = "#fff";

      // Reset form
      newsletterForm.reset();

      // Hide success message after 5 seconds
      setTimeout(() => {
        newsletterMessage.textContent = "";
      }, 5000);
    });
  }

  // FAQ accordion (for contact page)
  const faqItems = document.querySelectorAll(".faq-item");

  if (faqItems.length > 0) {
    faqItems.forEach((item) => {
      const question = item.querySelector(".faq-question");

      question.addEventListener("click", function () {
        // Toggle active class on clicked item
        item.classList.toggle("active");

        // Close other items
        faqItems.forEach((otherItem) => {
          if (otherItem !== item) {
            otherItem.classList.remove("active");
          }
        });
      });
    });
  }
});
