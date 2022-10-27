const $ = (name) => document.querySelector(name);

const inputName = $("#input-name");
const btnCreate = $("#btn-create");
const tbody = $("#tbody");
const formProduct = $("#form-product");
const tbodyProduct = $("#tbody-product");
const selectCategory = $("#select-category");

const data = {};

inputName.onkeyup = function (event) {
    data.name = event.target.value;
    console.log(event.target.value);
};

async function getCategories() {
    try {
        const result = await get("/category");
        result.forEach((category) => renderCategorias(category));
    } catch (error) {
        console.log(error);
    }
}

async function getProducts() {
    try {
        const result = await get("/product");
        result.forEach((product) => renderProducts(product));
    } catch (error) {
        console.log(error);
    }
}


getCategories();
getProducts()

btnCreate.onclick = async function () {
    try {
        const result = await post("/category", data);
        inputName.value = "";
        renderCategorias(result);
    } catch (error) {
        console.log(error);
    }
};

inputName.addEventListener('keypress',() => {
    if (event.key === 'Enter') {
        btnCreate.click();
    }
});

function renderCategorias(category) {
    tbody.innerHTML += `
        <tr>
            <td>${category.id}</td>
            <td>${category.name}</td>
        </tr>
    `;

    selectCategory.innerHTML += `
        <option value="${category.id}">${category.name}</option>
    `;
}

async function renderProducts(product) {

    const categorias = await get("/category");
    const categoria = categorias.find((categoria) => categoria.id === product.category);

    tbodyProduct.innerHTML += `
        <tr>
            <td>${product.id}</td>
            <td>${product.name}</td>
            <td>${product.price} S/.</td>
            <td>${product.category} - ${categoria.name}</td>
            <td>${product.discount}%</td>
            <td><a href="${product.url_image}" target="_blank">${product.url_image}</a></td>
            <td>
                <img src="${product.url_image}" width="50" alt="yara causa">
            </td>
        </tr>
    `;

}

const productData = {}
formProduct.onsubmit = async function (event) {
    event.preventDefault();
    const formData = new FormData(formProduct);
    formData.forEach((value, key) => {
        productData[key] = value;
        if (key === "image") {
            productData[key] = fileInput.files[0];
        }
    });
    productData.price = Number(productData.price);
    productData.discount = Number(productData.discount);
    productData.category = Number(productData.category);
    try {
        if (productData.id) {
            const result = await put(`/product/${productData.id}`, productData);
            renderProducts(result);
            console.log(productData);
            // console.log(result);
        } else {
            const result = await post("/product", productData);
            renderProducts(result);
            console.log(productData);
            // console.log(result);
        }
    } catch (error) {
        console.log(error);
    }
    formProduct.reset();
}
