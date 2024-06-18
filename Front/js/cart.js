document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    function renderCartItems() {
        const cartItemsContainer = document.getElementById('cart-items');
        cartItemsContainer.innerHTML = '';

        cart.forEach(product => {
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>${product.name}</td>
                <td>R$ ${product.price.toFixed(2).replace('.', ',')}</td>
                <td>${product.quantity}</td>
                <td>R$ ${(product.price * product.quantity).toFixed(2).replace('.', ',')}</td>
                <td><button class="remove-from-cart" data-id="${product.id}">Remover</button></td>
            `;

            cartItemsContainer.appendChild(tr);
        });

        document.querySelectorAll('.remove-from-cart').forEach(button => {
            button.addEventListener('click', event => {
                const productId = event.target.dataset.id;
                const productIndex = cart.findIndex(item => item.id === productId);
                if (productIndex >= 0) {
                    cart.splice(productIndex, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.dispatchEvent(new Event('storage'));
                    renderCartItems();
                }
            });
        });

        const cartTotalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
        document.getElementById('cart-total-price').innerText = cartTotalPrice.toFixed(2).replace('.', ',');
    }

    renderCartItems();

    window.addEventListener('storage', renderCartItems);

    const checkoutButton = document.getElementById('checkout-button');
    if (checkoutButton) {
        checkoutButton.addEventListener('click', () => {
            alert('Compra finalizada com sucesso!');
            localStorage.removeItem('cart');
            renderCartItems();
        });
    }
});
