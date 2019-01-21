// 简单 购买地址
const buylink = {
    worldBuyLink: 'https://secure.2checkout.com/order/checkout.php?PRODS={0}&CART=1&CARD=2{1}',
    cnBuyLink: 'https://www.apowersoft.cn/order?product_id={0}',
    titleM: 'Monthly@@001667',
    titleS: 'Quarterly@@001668',
    titleY: 'Yearly@@001669',
    titleL: 'Lifetime@@001670',
};

function dealUrl(url, ...rest) {
    if (rest.length > 0) {
        let reg;
        for (let i = 0; i < rest.length; i += 1) {
            reg = new RegExp(`\\{${i}\\}`, 'g');
            url = url.replace(reg, rest[i]);
        }
    }
    return url;
};
const priceMap = {
    worldBuyLink: 'https://secure.2checkout.com/order/checkout.php?PRODS={0}&CART=1&CARD=2{1}',
    cnBuyLink: 'https://www.apowersoft.cn/order?product_id={0}_L&SRC=alltop',
    link: {
        cz: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=cs'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=cs'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=cs'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=cs'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        de: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=de'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=de'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=de'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=de'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        dk: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=da'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=da'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=da'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=da'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        en: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', ''),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '$12.95',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', ''),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '$19.95',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', ''),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '$29.95',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', ''),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '$69.95',
            },
        },
        es: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=es'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=es'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=es'),
                pages: 500,
                title: buylink.titleY,
                price: '24.95',
                priceStr: '24.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=es'),
                pages: 1000,
                title: buylink.titleL,
                price: '39.95',
                priceStr: '39.95€',
            },
        },
        fi: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=fi'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=fi'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=fi'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=fi'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        fr: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=fr'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=fr'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=fr'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=fr'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        gr: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=el'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=el'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=el'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=el'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        hu: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=hu'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=hu'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=hu'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=hu'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        it: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=it'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=it'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=it'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=it'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        jp: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=JPY&LANG=ja'),
                pages: 100,
                title: buylink.titleM,
                price: '1490',
                priceStr: '1490円',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=JPY&LANG=ja'),
                pages: 300,
                title: buylink.titleS,
                price: '1990',
                priceStr: '1990円',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=JPY&LANG=ja'),
                pages: 500,
                title: buylink.titleY,
                price: '3390',
                priceStr: '3390円',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=JPY&LANG=ja'),
                pages: 1000,
                title: buylink.titleL,
                price: '7890',
                priceStr: '7890円',
            },
        },
        nl: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=nl'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=nl'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=nl'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=nl'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        no: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=no'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=no'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=no'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=no'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        pl: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=pl'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=pl'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=pl'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=pl'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        pt: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&LANG=pt'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '$12.95',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&LANG=pt'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '$19.95',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&LANG=pt'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '$29.95',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&LANG=pt'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '$69.95',
            },
        },
        se: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=sv'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=sv'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=sv'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=sv'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        tr: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=EUR&LANG=tr'),
                pages: 100,
                title: buylink.titleM,
                price: '12.95',
                priceStr: '12.95€',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=EUR&LANG=tr'),
                pages: 300,
                title: buylink.titleS,
                price: '19.95',
                priceStr: '19.95€',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=EUR&LANG=tr'),
                pages: 500,
                title: buylink.titleY,
                price: '29.95',
                priceStr: '29.95€',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=EUR&LANG=tr'),
                pages: 1000,
                title: buylink.titleL,
                price: '69.95',
                priceStr: '69.95€',
            },
        },
        tw: {
            '1': {
                link: dealUrl(buylink.worldBuyLink, '13812402', '&CURRENCY=TWD&LANG=zy'),
                pages: 100,
                title: buylink.titleM,
                price: '390',
                priceStr: 'NT$390',
            },
            '2': {
                link: dealUrl(buylink.worldBuyLink, '14885180', '&CURRENCY=TWD&LANG=zy'),
                pages: 300,
                title: buylink.titleS,
                price: '490',
                priceStr: 'NT$490',
            },
            '3': {
                link: dealUrl(buylink.worldBuyLink, '113812404', '&CURRENCY=TWD&LANG=zy'),
                pages: 500,
                title: buylink.titleY,
                price: '690',
                priceStr: 'NT$690',
            },
            '4': {
                link: dealUrl(buylink.worldBuyLink, '13812406', '&CURRENCY=TWD&LANG=zy'),
                pages: 1000,
                title: buylink.titleL,
                price: '1790',
                priceStr: 'NT$1790',
            },
        },
        cn: {
            '1': {
                link: dealUrl(buylink.cnBuyLink, '18180244_M', '&CURRENCY=TWD&LANG=zy'),
                pages: 10,
                title: buylink.titleM,
                price: '39',
                priceStr: '￥39',
            },
            '2': {
                link: dealUrl(buylink.cnBuyLink, '18180217', '&CURRENCY=TWD&LANG=zy'),
                pages: 50,
                title: buylink.titleS,
                price: '59',
                priceStr: '￥59',
            },
            '3': {
                link: dealUrl(buylink.cnBuyLink, '18180218', '&CURRENCY=TWD&LANG=zy'),
                pages: 100,
                title: buylink.titleY,
                price: '79',
                priceStr: '￥79',
            },
            '4': {
                link: dealUrl(buylink.cnBuyLink, '18180219', '&CURRENCY=TWD&LANG=zy'),
                pages: 1000,
                title: buylink.titleL,
                price: '99',
                priceStr: '￥99',
            },
        },

    },

};

export default priceMap;