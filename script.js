let productCount = 0;

function addProduct() {
  productCount++;
  const tableBody = document.getElementById('product-forms');
  const row = document.createElement('tr');
  row.id = `product-form-${productCount}`;
  row.innerHTML = `
      <td><input type="text" class="form-control" id="productName${productCount}" placeholder="Product ${productCount} Name" /></td>
      <td><input type="number" class="form-control" id="productVolume${productCount}" placeholder="Volume" /></td>
      <td><input type="number" class="form-control" id="productPrice${productCount}" placeholder="Price" /></td>
      <td><button class="btn btn-danger" onclick="removeProduct(${productCount})">Remove</button></td>
  `;
  tableBody.appendChild(row);
}
function removeProduct(id) {
  const productForm = document.getElementById(`product-form-${id}`);
  productForm.remove();
}

function compareProducts() {
  const products = [];
  for (let i = 1; i <= productCount; i++) {
    const name = document.getElementById(`productName${i}`)?.value || `Product ${i}`;
    const volume = parseFloat(document.getElementById(`productVolume${i}`)?.value) || 0;
    const price = parseFloat(document.getElementById(`productPrice${i}`)?.value) || 0;
    if (volume > 0 && price > 0) {
      products.push({ name, volume, price });
    }
  }
  if (products.length === 0) {
    document.getElementById('result').textContent = 'Please add at least one product with valid volume and price.';
    return;
  }
  let bestProduct = products[0];
  let bestRatio = products[0].volume / products[0].price;
  let resultHTML = '';
  for (let i = 0; i < products.length; i++) {
    const ratio = products[i].volume / products[i].price;
    resultHTML += `${products[i].name} = (${products[i].volume}/${products[i].price}) = ${ratio.toFixed(2)}<br>`;
    if (ratio > bestRatio) {
      bestProduct = products[i];
      bestRatio = ratio;
    }
  }
  resultHTML += `<br>The best product is ${bestProduct.name}`;
  document.getElementById('result').innerHTML = resultHTML;
}

// Initialize with one product form
addProduct();
