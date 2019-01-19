export function getDomain(lang) {
    let langDomainMappings = {
        pt: '.com.br',
        en: '.com',
        zh: '.cn',
        tr: '-tr.com',
        no: '-no.com',
        cs: '.cz',
        da: '.dk',
        ja: '.jp',
        sv: '.se',
        el: '.gr',
    };

    let otherDomains = 'fr de it nl es fi pl tw hu'.split(' ');

    if (!langDomainMappings[lang] && !otherDomains.includes(lang)) {
        lang = 'en';
    }

    let dotcom = langDomainMappings[lang] || `.${lang}`;

    return `https://www.apowersoft${dotcom}`;
};

export function getSupportDomain() {
    return 'https://support.aoscdn.com';
}
