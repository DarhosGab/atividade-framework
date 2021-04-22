let carts = {
  products: [],
  quantity: 0,
};
let products = [
  {
    item: 'Teclado Gamer REDRAGON',
    description: 'Gaming RGB wired USB Keyboard',
    quantity: 250,
    price: 332.9,
    image: 'https://cdn.pichau.com.br/wysiwyg/Descricao/Pichau/PGK-P421-RGB/PGK-P421-RGB7.png',
    id: 1,
    selected: false
  },

  {
    item: 'Mouse Gamer REDRAGON',
    description: 'Gaming RGB wired USB Mouse',
    quantity: 250,
    price: 232.90,
    image: 'https://img.terabyteshop.com.br/produto/g/mouse-gamer-redragon-m720-vampire-rgb-10000dpi-8-botoes-black-pn-m720-rgb_107021.png',
    id: 2,
    selected: false
  },

  {
    item: 'Porta Copos',
    description: 'Porta copos com tema do Simpsons',
    quantity: 250,
    price: 49.90,
    image: 'https://images.tcdn.com.br/img/img_prod/437561/570_1_20161019154633.jpg',
    id: 3,
    selected: false
  },

  {
    item: 'Xiaomi Mi Band 4',
    description: 'Relógio Smart Watch Xiaomi',
    quantity: 250,
    price: 199.90,
    image: 'https://images-submarino.b2w.io/produtos/01/00/img/1509235/0/1509235099_1GG.jpg',
    id: 4,
    selected: false
  },

  {
    item: 'Amazon Alexa Dot',
    description: 'Smart Speaker Amazon Echo Dot',
    quantity: 250,
    price: 549.90,
    image: 'https://i.zst.com.br/images/smart-speaker-amazon-echo-dot-4-geracao-com-relogio-alexa-photo1294420350-12-24-32.jpg',
    id: 5,
    selected: false
  },

  {
    item: 'Webcam Logitech HD',
    description: 'Webcam Full HD Logitech Plus',
    quantity: 250,
    price: 759.90,
    image: 'https://www.logitechstore.com.br/media/catalog/product/cache/1/image/634x545/9df78eab33525d08d6e5fb8d27136e95/s/t/streamcam.png',
    id: 6,
    selected: false
  },

  {
    item: 'Headset Gamer Fallen 7.1',
    description: 'Headset Gamer Fallen Morcego',
    quantity: 250,
    price: 699.90,
    image: 'https://static.cdnlive.com.br/uploads/602/produto/16148186668419_zoom.jpg',
    id: 7,
    selected: false
  },
];

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var span = document.getElementsByClassName('close')[0];


document.getElementById("search-input").onkeydown = (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredProducts = products.filter(product => product.item.toLowerCase().includes(searchString));

  document.getElementById("products-container").innerHTML = '';

  filteredProducts.map(product => { createHTMLforProducts(product) })
}

span.onclick = () => {
  modal.style.display = 'none';
};


function createHTMLforProducts(product) {
  product.price = product.price.toString().replace('.', ',')

  const productItem =
    `
    <div id='product-div'>
      <img src=${product.image}>
      <h2>${product.item}</h2>
      <p>${product.description}</p>
      <div>
        <h5><p>RS</p>${product.price}</h5>
      </div>
      <form id="submit">
        <input type="hidden" value=${product.id}>
        <button>COMPRAR</button>
      </form>
    </div>
  `

  document.getElementById('products-container').innerHTML += productItem;
}

function createHTMLcartShop(regenerate = false) {
  carts.products.map((product) => {
    if (!product.selected && !regenerate) {
      const cartItem =
        `
        <div id='cart-div'>
          <div id='product-image-div'>
            <img src=${product.image} >
          </div>
          <div id='product-section-div'>
            <h1>${product.item}<h1>
            <h2>${product.description}</h1>
            <p>quantidade restante: <span id="product-quantity${product.id}">${product.quantity}</span></p>
            <p>quantidade no carrinho: <span id="user-quantity${product.id}">1</span></p>
            <div class="forms">
              <form id="add">
                <button value="-" id="add">+</button>
                <input type="hidden" value=${product.id}>
              </form>
              <form id="subtract">
                <button value="-" id="subtract">-</button>
                <input type="hidden" value=${product.id}>
              </form>
            </div>
          </div>
          <h2 id="product-price${product.id}">R$: ${product.price}</h2>
        </div>
      `
      product.selected = true

      document.getElementById('cart-products-container').innerHTML += cartItem;
    }
  })
}

products.map(product => createHTMLforProducts(product))

function getProductById(e, i) {
  let inputId = +e.srcElement.childNodes[i].value;

  const existingProduct = products.filter((item) => item.id === inputId);

  if (!existingProduct) alert('Product out of range')

  return existingProduct
}

document.addEventListener('submit', (e) => {
  e.preventDefault();
  if (e.target.id == 'submit') {
    const existingProduct = getProductById(e, 1)
    const quantity = carts.products.length;

    existingProduct[0].quantity -= 1
    carts.products.push(existingProduct[0]);
    carts.quantity = quantity + 1

    modal.style.display = 'block';

    createHTMLcartShop()

  } else if (e.target.id == 'add') {
    const existingProduct = getProductById(e, 3)

    if (existingProduct[0].quantity > 0) {
      existingProduct[0].quantity -= 1
      document.getElementById(`product-price${existingProduct[0].id}`).innerHTML
      = 'R$: ' + (Math.round(+existingProduct[0].price.replace(',', '.'), 4) * (250 - existingProduct[0].quantity))
    }
    
    document.getElementById(`product-quantity${existingProduct[0].id}`).innerHTML = (existingProduct[0].quantity)
    document.getElementById(`user-quantity${existingProduct[0].id}`).innerHTML = (250 - existingProduct[0].quantity)


  } else if (e.target.id == 'subtract') {
    const existingProduct = getProductById(e, 3)

    if (existingProduct[0].quantity < 250) {
      existingProduct[0].quantity += 1
      document.getElementById(`product-price${existingProduct[0].id}`).innerHTML
      = 'R$: ' + (Math.round(+existingProduct[0].price.replace(',', '.'), 4) * (250 - existingProduct[0].quantity))
    }

    
    document.getElementById(`product-quantity${existingProduct[0].id}`).innerHTML = (existingProduct[0].quantity)
    document.getElementById(`user-quantity${existingProduct[0].id}`).innerHTML = (250 - existingProduct[0].quantity)
  }
});
