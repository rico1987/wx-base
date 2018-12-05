<template>
    <div class="myaccount-worklist has-header has-loading">
        <MobileHeader
            defaultLeft
            title="My worklist"
        >
        </MobileHeader>
        <div class="myaccount-worklist__header">
            <span class="switch">
                <span @click="showFilter()">{{ getCurrentFilter() }}</span>
                <ul class="filter" v-show="filterVisible">
                    <li @click="filterByType()">{{ $t("001290") }}</li>
                    <li @click="filterByType(1)">{{ $t("001332") }}</li>
                    <li @click="filterByType(0)">{{ $t("001333") }}</li>
                    <li @click="filterByType(-1)">{{ $t("001337") }}</li>
                </ul>
            </span>
            <span class="submit" @click="showSubmit()">Submit work</span>
        </div>
        <div class="myacccount-work-list__worklist-list" v-if="!loading">
            <div class="myaccount-work-list__worklist" v-for="workList in workListArr" v-bind:key="workList.id">
                <table>
                    <tr>
                        <td class="header">Work number:</td>
                        <td>{{workList.id}}</td>
                    </tr>
                     <tr>
                        <td class="header">Theme:</td>
                        <td>{{workList.problem_subject}}</td>
                    </tr>
                     <tr>
                        <td class="header">Question type:</td>
                        <td>{{TICKET_TYPES[workList.problem_type]}}</td>
                    </tr>
                     <tr>
                        <td class="header">Product:</td>
                        <td>{{workList.pro_name}}</td>
                    </tr>
                     <tr>
                        <td class="header">Submit time:</td>
                        <td>{{workList.submit_time}}</td>
                    </tr>
                     <tr>
                        <td class="header">Status:</td>
                        <td :class="{ 'replied': workList.status === 1 }">{{TICKET_STATES[workList.status]}}</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="no-data" v-if="!loading && workListArr.length === 0">
            <p>没有找到数据！</p>
        </div>
        <div class="loading" v-show="loading">
            <Icon type="spinner spin" />
        </div>
    </div>
</template>

<script>
import MobileHeader from '@/components/MobileHeader.vue';
import Icon from '@/components/Icon.vue';

import { getTickets, } from '@/api/support';

export default {
    name: 'myWorkList',
    components: {
        Icon,
        MobileHeader,
    },
    data() {
        return {
            workListArr: [],
            workListArrCopy: [],
            page: 1,
            size: 10,
            loading: false,
            activeType: null,
            TICKET_STATES: {
                '0': this.$t('001333'),
                '1': this.$t('001332'),
                '-1': this.$t('001337'),
            },
            TICKET_TYPES: {
                1: this.$t('001338'),
                2: this.$t('001339'),
                3: this.$t('001340'),
                4: this.$t('001341'),
                5: this.$t('001342'),
                6: this.$t('001343'),
                7: this.$t('001344'),
                8: this.$t('001345'),
            },
            filterVisible: false,
        };
    },

    created: function() {
        this.getWorkListArr();
    },

    methods: {

        filterByType(type) {
            this.activeType = type;
            if (type === 0) {
                this.workListArr = this.workListArrCopy.filter(ele => ele.type === 0);
            } else if (type === 1) {
                this.workListArr = this.workListArrCopy.filter(ele => ele.type === 1);
            } else if (type === -1) {
                this.workListArr = this.workListArrCopy.filter(ele => ele.type === -1);
            } else {
                this.workListArr = this.workListArrCopy.concat([]);
            }
            this.filterVisible = false;
        },

        getCurrentFilter() {
            if (this.activeType === undefined || this.activeType === null) {
                return this.$t('001290');
            } else {
                return this.TICKET_STATES[this.activeType];
            }
        },

        getWorkListArr() {
            this.loading = true;
            getTickets(this.page, this.size, this.$i18n.locale)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.workListArr = res.data.data.ticket_list;
                        this.workListArrCopy = this.workListArr.concat([]);
                    } else {
                        this.$toast.show({
                            text: '获取工单失败！',
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    if (error === 'timeout of 5000ms exceeded') {
                        this.$toast.show({
                            text: '获取工单超时，请刷新再试！',
                        });
                    } else {
                        this.$toast.show({
                            text: '获取工单失败！',
                        });
                    }
                    this.loading = false;
                });
        },

        showFilter() {
            this.filterVisible = !this.filterVisible;
        },

        showSubmit() {
            this.$router.push({ path: '/submit-ticket', });
        },
    },
};
</script>
