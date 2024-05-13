const login = document.querySelector(".btn")
login.addEventListener('click', () => {
  window.location.href = 'http://127.0.0.1:5500/login.html#'
})

'use strict';




/**
 * add event on element
 */

const addEventOnElem = function (elem, type, callback) {
  if (elem.length > 1) {
    for (let i = 0; i < elem.length; i++) {
      elem[i].addEventListener(type, callback);
    }
  } else {
    elem.addEventListener(type, callback);
  }
}


/**
 * navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const navLinks = document.querySelectorAll("[data-nav-link]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
}

addEventOnElem(navTogglers, "click", toggleNavbar);

const closeNavbar = function () {
  navbar.classList.remove("active");
  overlay.classList.remove("active");
}

addEventOnElem(navLinks, "click", closeNavbar);



/**
 * header active when scroll down to 100px
 */

const header = document.querySelector("[data-header]");
const activeElem = function () {
  if (window.scrollY > 100) {
    header.classList.add("active");
  } else {
    header.classList.remove("active");
  }
}

addEventOnElem(window, "scroll", activeElem);


/* Cart */

let listCartHTML = document.querySelector('.listCart');
let iconCart = document.getElementById('cart');
let body = document.querySelector('body');
let closeCart = document.querySelector('.close');

iconCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})
closeCart.addEventListener('click', () => {
  body.classList.toggle('showCart');
})





/*Add to cart*/

document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".addCart");
  const listCart = document.querySelector(".listCart");
  const buttonBadge = document.querySelector(".btn-badge");
  let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

  function updateLocalStorage() {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }

  function loadCartItems() {
    listCart.innerHTML = "";
    cartItems.forEach(item => {
      const listItem = createCartItem(item.title, item.price);
      listCart.appendChild(listItem);
    });
    updateCartBadge(cartItems.length);
  }

  function addToCart(title, price) {
    const isAlreadyAdded = cartItems.some(item => item.title === title);
    if (!isAlreadyAdded) {
      cartItems.push({ title, price });
      updateLocalStorage();
      loadCartItems();
      updateCartBadge(cartItems.length);
    }
  }

  function removeFromCart(index) {
    cartItems.splice(index, 1);
    updateLocalStorage();
    loadCartItems();
    updateCartBadge(cartItems.length);
  }

  function createCartItem(title, price) {
    const listItem = document.createElement("div");
    listItem.classList.add("cart-item");
    listItem.innerHTML = ` 
      <div class="item-info">
        <p class="title" style="text-align:">${title}</p>
        <div class="item-details">
          <p style="text-align: ">Price: $${price}</p>
        </div>
      </div>
      <button class="removeFromCart" style="width: 200px; margin: ">Remove from cart</button>
    `;
    listItem.style.marginBottom = '50px';

    const removeButton = listItem.querySelector(".removeFromCart");
    removeButton.addEventListener("click", function () {
      const itemIndex = cartItems.findIndex(item => item.title === title);
      removeFromCart(itemIndex);
    });

    return listItem;
  }

  function updateCartBadge(count) {
    buttonBadge.textContent = count;
  }

  loadCartItems();

  addToCartButtons.forEach(button => {
    button.addEventListener("click", function () {
      const courseCard = button.closest(".course-card");
      const courseTitle = courseCard.querySelector(".card-title").textContent;
      const coursePrice = courseCard.querySelector(".price").getAttribute("value");
      addToCart(courseTitle, coursePrice);
    });
  });

});
