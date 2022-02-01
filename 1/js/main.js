const products = [
    {id: 1, title: 'Notebook', price: 2000},
    {id: 2, title: 'Mouse', price: 20},
    {id: 3, title: 'Keyboard', price: 200},
    {id: 4, title: 'Gamepad', price: 50},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <h3>${product.title}</h3>
                <img src="product02.jpg" alt="product_photo" width="300px"/>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');

};

/*
    По поводу запятой: так как мы в верстку передаем массив, то передается каждый элемент массива (
    строка с карточкой продукта), а также запятые между элементами массива.
    Для избежания этого следует воспользоваться методом массивов join с аргументом пустой строки, 
    чтобы он весь массив превратил в одну строку, что позволит без лишних элементов перенести
    созданную верстку на страницу

*/

renderPage(products);