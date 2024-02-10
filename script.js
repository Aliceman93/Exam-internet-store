const items = [{
        title: "TOM FORD BLACK ORCHID",
        description: "Яркий аромат с насыщенными глубокими аккордами и соблазнительными нотами черной орхидеи и специй",
        tags: ["мужчинам", "женщинам"],
        price: 500,
        img: "./img/1.jpeg",
        rating: 4.6,
    },
    {
        title: "Montale Wild Pears",
        description: "Аромат для мужчин и женщин, он принадлежит к группе фужерные фруктовые",
        tags: ["мужчинам", "женщинам"],
        price: 516,
        img: "./img/2.jpeg",
        rating: 4.3,
    },
    {
        title: "MAISON FRANCIS KURKDJIAN baccarat rouge 540",
        description: "Изысканная и яркая парфюмерная вода с цветочно-амбровыми и древесными оттенками",
        tags: ["женщинам"],
        price: 1323,
        img: "./img/3.jpeg",
        rating: 4.3,
    },
    {
        title: "Tobacco Vanille Tom Ford",
        description: "Роскошный аромат из категории унисекс.В сердце аромата звучат пряные ноты бобов тонка, какао, сухих фруктов и опопонакса.",
        tags: ["мужчинам", "женщинам"],
        price: 557,
        img: "./img/4.jpeg",
        rating: 5.0,
    },
    {
        title: "Yves Saint Laurent Elle",
        description: "Аромат для женщин, он принадлежит к группе цветочные древесно-мускусные",
        tags: ["женщинам"],
        price: 740,
        img: "./img/5.jpeg",
        rating: 5.0,
    },
    {
        title: "Roberto Cavalli Nero Assoluto",
        description: "Аромат для женщин, он принадлежит к группе восточные цветочные",
        tags: ["женщинам"],
        price: 244,
        img: "./img/6.jpeg",
        rating: 4.7,
    },
    {
        title: "BVLGARI Man In Black",
        description: "Аромат для мужчин, который принадлежит к группе восточные цветочные",
        tags: ["мужчинам"],
        price: 649,
        img: "./img/7.jpeg",
        rating: 4.9,
    },
    {
        title: "Carolina Herrera Bad Boy",
        description: "Аромат для мужчин, он принадлежит к группе восточные пряные",
        tags: ["мужчинам"],
        price: 390,
        img: "./img/8.jpeg",
        rating: 5.0,
    },
    {
        title: "Jo Malone London Orange Blossom",
        description: "Аромат для мужчин и женщин, он принадлежит к группе цветочные",
        tags: ["мужчинам", "женщинам"],
        price: 425,
        img: "./img/9.jpeg",
        rating: 4.8,
    },
    {
        title: "Paco Rabanne Invictus",
        description: "Аромат для мужчин, он принадлежит к группе древесные водяные",
        tags: ["мужчинам"],
        price: 403,
        img: "./img/10.jpeg",
        rating: 4.6,

    },
    {
        title: "Franck Boclet Cocaïne",
        description: "Аромат для мужчин и женщин, он принадлежит к группе фужерные",
        tags: ["мужчинам", "женщинам"],
        price: 270,
        img: "./img/11.jpeg",
        rating: 4.4,
    },
    {
        title: "Christian Dior Sauvage",
        description: "Аромат для мужчин, он принадлежит к группе фужерные",
        tags: ["мужчинам"],
        price: 381,
        img: "./img/12.jpeg",
        rating: 4.8,
    },
];

const shopItems = document.querySelector('#shop-items');
const itemTemplate = document.querySelector('#item-template');
const nothingFound = document.querySelector('#nothing-found');

function prepareShopItem(shopItem) {
    const { title, description, tags, img, price, rating } = shopItem;
    const item = itemTemplate.content.cloneNode(true);
    item.querySelector('h1').textContent = title;
    item.querySelector('p').textContent = description;
    item.querySelector('img').src = img;
    item.querySelector('.price').textContent = `${price} BYN`;

    const ratingContainer = item.querySelector('.rating');
    for (let i = 0; i < rating; i++) {
        const star = document.createElement('i');
        star.classList.add('fa', 'fa-star');
        ratingContainer.append(star);
    }

    const tagsHolder = item.querySelector('.tags');
    tags.forEach((tag) => {
        const element = document.createElement('span');
        element.textContent = tag;
        element.classList.add('tag');
        tagsHolder.append(element);
    });

    return item;
}

let currentState = [...items];

function renderItems(arr) {
    nothingFound.textContent = '';
    shopItems.innerHTML = '';

    arr.forEach((item) => {
        shopItems.append(prepareShopItem(item));
    });

    if (!arr.length) {
        nothingFound.textContent = "Ничего не найдено";
    }
}

renderItems(currentState.sort((a, b) => sortByAlphabet(a, b)));

function sortByAlphabet(a, b) {
    if (a.title > b.title) {
        return 1;
    }
    if (a.title < b.title) {
        return -1;
    }
    return 0;
}

const sortControl = document.querySelector('#sort');

sortControl.addEventListener('change', (event) => {
    const selectedOption = event.target.value;

    switch (selectedOption) {
        case "expensive":
            {
                currentState.sort((a, b) => b.price - a.price);
                break;
            }

        case "cheap":
            {
                currentState.sort((a, b) => a.price - b.price);
                break;
            }

        case "rating":
            {
                currentState.sort((a, b) => b.rating - a.rating);
                break;
            }

        case "alphabet":
            {
                currentState.sort((a, b) => sortByAlphabet(a, b));
                break;
            }
    }

    renderItems(currentState);
});

const searchInput = document.querySelector('#search-input');
const serachButton = document.querySelector('#search-btn');

function applySearch() {
    const searchString = searchInput.value.trim().toLowerCase();

    currentState = items.filter((el) =>
        el.title.toLowerCase().includes(searchString)
    );

    currentState.sort((a, b) => sortByAlphabet(a, b));
    sortControl.selectedIndex = 0;

    renderItems(currentState);
}

serachButton.addEventListener('click', applySearch);
searchInput.addEventListener('search', applySearch);