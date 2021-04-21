let carts = {
  products: [],
  quantity: 0,
};
let products = [
  {
    item: 'Teclado Gamer REDRAGON',
    description: 'Gaming RGB wired USB Keyboard',
    quantity: 150,
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
    quantity: 50,
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
    description: 'Webcam Full HD Logitech StreamCam Plus',
    quantity: 250,
    price: 759.90,
    image: 'https://www.logitechstore.com.br/media/catalog/product/cache/1/image/634x545/9df78eab33525d08d6e5fb8d27136e95/s/t/streamcam.png',
    id: 6,
    selected: false
  },

  {
    item: 'Mouse Gamer REDRAGON',
    description: 'Headset Gamer Fallen Morcego Surround Virtual 7.1',
    quantity: 250,
    price: 699.90,
    image: 'https://static.cdnlive.com.br/uploads/602/produto/16148186668419_zoom.jpg',
    id: 7,
  },
];

let inputId;

var modal = document.getElementById('myModal');
var btn = document.getElementById('myBtn');
var span = document.getElementsByClassName('close')[0];

function createHTMLforProducts(product) {
  product.price = product.price.toString().replace('.', ',')

  const productDiv = document.createElement('div');
  productDiv.id = 'product-div'

  const itemNameTag = document.createElement('h2');
  const itemNameText = document.createTextNode(product.item);
  const itemDescriptionTag = document.createElement('p');
  const itemDescriptionText = document.createTextNode(product.description);

  const imageTag = document.createElement("img")
  imageTag.src = product.image

  const paymentDiv = document.createElement('div');
  const itemPriceTag = document.createElement('h5');
  const itemPriceDescription = document.createElement('p')
  itemPriceDescription.innerHTML = 'R$'

  itemPriceTag.appendChild(itemPriceDescription)
  const itemPriceText = document.createTextNode(product.price);

  const inputHidden = document.createElement('input');
  inputHidden.type = 'hidden';
  inputHidden.value = product.id;

  const form = document.createElement('form');
  form.id = 'submit';

  const button = document.createElement('button');
  button.innerHTML = 'COMPRAR';

  form.appendChild(inputHidden);
  form.appendChild(button);

  productDiv.append(imageTag)
  itemNameTag.appendChild(itemNameText);
  productDiv.appendChild(itemNameTag);
  itemDescriptionTag.appendChild(itemDescriptionText);
  productDiv.appendChild(itemDescriptionTag);

  itemPriceTag.appendChild(itemPriceText);
  paymentDiv.appendChild(itemPriceTag);
  productDiv.appendChild(paymentDiv);
  productDiv.appendChild(form);

  document.getElementById('products-container').appendChild(productDiv);
}

products.map((product, index) => {
  createHTMLforProducts(product)
});

document.addEventListener('submit', (e) => {
  e.preventDefault();

  inputId = +e.srcElement.childNodes[0].value;

  const existingProduct = products.filter((item) => item.id === inputId);

  if (!existingProduct) {
    alert('Product does not exists, refresh the page and try again');
    return null
  }

  const quantity = carts.products.length;

  existingProduct[0].quantity -= 1
  carts.products.push(existingProduct[0]);
  carts.quantity = quantity + 1

  modal.style.display = 'block';

  console.log(carts)

  generateHTMLCartShop()
});

document.getElementById("search-input").onkeydown = (e) => {
  const searchString = e.target.value.toLowerCase();

  const filteredProducts = products.filter(product => {
    return (
      product.item.toLowerCase().includes(searchString)
    )
  });

  const existingProductsHTML = document.querySelectorAll("#product-div");
  existingProductsHTML.forEach(product => {
    product.remove()
  })

  filteredProducts.map(product => {
    createHTMLforProducts(product)
  })

}


span.onclick = function () {
  modal.style.display = 'none';
};


window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};

function generateHTMLCartShop() {
  carts.products.map((product) => {
    if (!product.selected) {
      const cartDiv = document.createElement('div');
      cartDiv.id = 'cart-div'

      const productImageDiv = document.createElement('div')
      productImageDiv.id = 'product-image-div'

      const productSectionDiv = document.createElement('div')
      productSectionDiv.id = 'product-section-div'

      const image = document.createElement('img')
      image.src = product.image

      productImageDiv.appendChild(image)

      const productTitle = document.createElement("h1")
      productTitle.innerHTML = product.item

      const productDescription = document.createElement("p")
      productDescription.innerHTML = product.description

      const productQuantity = document.createElement("p")
      productQuantity.innerHTML = 'Quantidade: ' + product.quantity

      const inputHidden = document.createElement('input');
      inputHidden.type = 'hidden';
      inputHidden.value = product.id;

      const buttonAdd = document.createElement("button")
      buttonAdd.innerHTML = '+';
      buttonAdd.id = 'add'

      const buttonSubtract = document.createElement("button")
      buttonSubtract.innerHTML = '-'
      buttonSubtract.id = 'subtract'

      productSectionDiv.appendChild(productTitle)
      productSectionDiv.appendChild(productDescription)
      productSectionDiv.appendChild(productQuantity)
      productSectionDiv.appendChild(buttonAdd)
      productSectionDiv.appendChild(buttonSubtract)
      productSectionDiv.appendChild(inputHidden)

      cartDiv.appendChild(productImageDiv)
      cartDiv.appendChild(productSectionDiv)

      const priceText = document.createElement('p')

      priceText.innerHTML = 'R$ ' + product.price

      cartDiv.appendChild(priceText)

      document.getElementById("cart-products-container").appendChild(cartDiv)
      product.selected = true
    }
  })
}
