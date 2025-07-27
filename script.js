let cart = [];

// Add item to cart
function addToCart(title, price) {
    const existing = cart.find(item => item.title === title);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({ title, price, quantity: 1 });
    }
    updateCartView();
}

// Update quantity
function updateQuantity(index, delta) {
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
        cart.splice(index, 1);
    }
    updateCartView();
}

// Show cart popup
function openCart() {
    document.getElementById("cart-modal").style.display = "block";
    updateCartView();
}

// Close cart popup
function closeCart() {
    document.getElementById("cart-modal").style.display = "none";
}

// Update cart view
function updateCartView() {
    const cartItemsContainer = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");

    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        const itemElement = document.createElement("div");
        itemElement.className = "flex justify-between items-center border p-2 rounded";

        itemElement.innerHTML = `
          <div>
            <p class="font-semibold">${item.title}</p>
            <p class="text-sm text-gray-600">₹${item.price} × ${item.quantity} = ₹${itemTotal}</p>
          </div>
          <div class="flex items-center gap-2">
            <button onclick="updateQuantity(${index}, -1)" class="bg-gray-300 px-2">-</button>
            <span>${item.quantity}</span>
            <button onclick="updateQuantity(${index}, 1)" class="bg-gray-300 px-2">+</button>
          </div>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    cartTotal.innerText = total;
}

// Show address form
function showAddressForm() {
    document.getElementById('address-form').style.display = 'block';
}

// Send order via WhatsApp
function sendOrder() {
    const name = document.getElementById('custName').value.trim();
    const phone = document.getElementById('custPhone').value.trim();
    const address = document.getElementById('custAddress').value.trim();

    if (!name || !phone || !address) {
        alert('Please fill all the fields');
        return;
    }

    let summary = "🛒 *Order Details:*\n";
    let total = 0;
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        summary += `- ${item.title} × ${item.quantity} = ₹${itemTotal}\n`;
    });

    summary += `\n*Total: ₹${total}*\n\n`;
    summary += `📦 *Customer Details:*\n`;
    summary += `👤 Name: ${name}\n📱 Phone: ${phone}\n🏠 Address: ${address}`;

    const url = `https://wa.me/918462849906?text=${encodeURIComponent(summary)}`;
    window.open(url, '_blank');
}