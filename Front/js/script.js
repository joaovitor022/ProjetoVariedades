document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', event => {
            const productElement = event.target.closest('.product');
            const productId = productElement.dataset.id;
            const productName = productElement.querySelector('h3').innerText;
            const productPrice = parseFloat(productElement.querySelector('p').innerText.replace('R$', '').replace(',', '.'));

            const product = {
                id: productId,
                name: productName,
                price: productPrice,
                quantity: 1
            };

            const existingProductIndex = cart.findIndex(item => item.id === productId);
            if (existingProductIndex >= 0) {
                cart[existingProductIndex].quantity++;
            } else {
                cart.push(product);
            }

            localStorage.setItem('cart', JSON.stringify(cart));
            alert(`${productName} foi adicionado ao carrinho.`);
        });
    });
});
