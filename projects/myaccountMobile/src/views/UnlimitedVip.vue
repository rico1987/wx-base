<template>
    <div class="myaccount-unlimited-vip has-header">
        <MobileHeader
            defaultLeft
            title="Unlimited Vip"
        >
        </MobileHeader>
        <div class="myaccount-unlimited-vip__vip-header" v-if="isVip">
            <p class="title">Unlimited VIP</p>
            <div class="avatar">
                <img v-if="userInfo && userInfo.avatar" :src="userInfo.avatar" />
                <div v-if="!userInfo || !userInfo.avatar" class="default-avatar"></div>
                <span v-if="isVip"></span>
            </div>
            <p class="validity">{{ getLicenseType() }}</p>
        </div>
        <div class="myaccount-unlimited-vip__no-vip-header" v-if="!isVip">
            <p>{{ $t('001800') }}</p>
        </div>
        <div class="myaccount-unlimited-vip__privilege">
            <h2>{{ $t('001801') }}</h2>
            <p>{{ $t('001802') }}</p>
            <p>{{ $t('001803') }}<a :href="unlimitedLink" target="_blank">Check>></a></p>
            <p>{{ $t('001804') }}</p>
            <p>{{ $t('001805') }}</p>
        </div>
        <div class="myaccount-unlimited-vip__rights">
            <h2>{{ $t('001806') }}</h2>
            <p>{{ $t('001807') }}</p>
            <p>{{ $t('001808') }}</p>
            <p>{{ $t('001809') }}</p>
        </div>
        <div class="myaccount-unlimited-vip__buy-link" v-if="!isVip">
            <div class="left">
                <p>{{ getMonthText() }}</p>
            </div>
            <div class="right">
                <p>{{ getYearText() }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import MobileHeader from '@/components/MobileHeader.vue';
import { getDomain, } from '@/utils/index';

export default {
    name: 'unlimitedVip',
    components: {
        MobileHeader,
    },
    data() {
        return {
            isVip: false,
            userInfo: null,
            licenseInfo: null,
            unlimitedLink: null,
            buyText: {
                'zh': ['￥39/月', '￥199/年', ],
                'en': ['$9.9/month', '$99/year', ],
                'cs': ['€9.9/měsíc', '€99/rok', ],
                'da': ['€9.9/måned', '€99/år', ],
                'de': ['9,9€/Monat', '99€/Jahr', ],
                'el': ['€9.9/mήνη', '€99/έτος', ],
                'es': ['9.9€/mes', '99€/año', ],
                'fi': ['€9.9/kuukausi', '€99/vuosi', ],
                'fr': ['9,9€/mois', '99€/an', ],
                'hu': ['€9.9/hónap', '€99/év', ],
                'it': ['€9.9/mese', '€99/anno', ],
                'ja': ['1290円/月間', '12790円/年', ],
                'nl': ['€9.9/maand', '€99/jaar', ],
                'no': ['€9.9/måned', '€99/år', ],
                'pl': ['€9.9/miesiąc', '€99/rok', ],
                'pt': ['R$39/mês', 'R$199/ano', ],
                'sv': ['€9.9/månad', '€99/år', ],
                'tr': ['€9.9/ay', '€99/yıllık', ],
                'tw': ['NT$390/月', 'NT$2990/年', ],
            },
        };
    },

    created: function() {
        this.getAvatarUrl();
        this.getLincenseInfo();
        let language = this.$i18n.locale;
        this.unlimitedLink = getDomain(language);
        if (this.$i18n.locale === 'zh') {
            this.unlimitedLink = 'https://www.apowersoft.cn/all-apowersoft';
        } else {
            this.unlimitedLink = 'https://www.apowersoft.com/all-apowersoft';
        }
    },

    methods: {

        getMonthText() {
            let language = this.$i18n.locale;
            return this.buyText[language][0];
        },

        getYearText() {
            let language = this.$i18n.locale;
            return this.buyText[language][1];
        },

        getAvatarUrl() {
            let saveData = Cookies.get('userInfo');
            try {
                this.userInfo = JSON.parse(saveData);
            } catch (error) {
            }
        },
        getLincenseInfo() {
            let licenseInfo = Cookies.get('license_info');
            try {
                this.licenseInfo = JSON.parse(licenseInfo);
                this.isVip = this.licenseInfo.is_activated === '1';
            } catch (error) {
            }
        },
        getLicenseType() {
            if (this.licenseInfo.passport_license_type === 'lifetime') {
                return this.$t('001247');
            } else if (this.licenseInfo.is_activated === '1') {
                let remainDays = parseInt(this.licenseInfo.remain_days, 10);
                let deadline = new Date(new Date().getTime() + (24 * 60 * 60 * 1000 * remainDays));
                return `${this.$t('001210')}: ${deadline.toLocaleDateString()}`;
            }
        },
    },
};
</script>
