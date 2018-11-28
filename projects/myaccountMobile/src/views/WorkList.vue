<template>
    <div class="myaccount-worklist has-header has-loading">
        <MobileHeader
            defaultLeft
            title="My worklist"
        >
        </MobileHeader>
        <div class="myaccount-worklist__header">
            <span class="switch" @click="showFilter()">All tickets</span>
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
            page: 1,
            size: 10,
            loading: false,
            TICKET_STATES: {
                '0': 'Pending',
                '1': 'Replied',
                '-1': 'Resolved',
            },
            TICKET_TYPES: {
                1: 'Purchase and security',
                2: 'Registration and key code',
                3: 'Using the product',
                4: 'Technical issue',
                5: 'Refund',
                6: 'Suggestion or complaints',
                7: 'Business cooperation',
                8: 'Others',
            },
        };
    },

    created: function() {
        this.getWorkListArr();
    },

    methods: {
        getWorkListArr() {
            this.loading = true;
            getTickets(this.page, this.size)
                .then((res) => {
                    if (res.data.status === 1) {
                        this.workListArr = res.data.data.ticket_list;
                    } else {
                        this.$toast.show({
                            text: '获取工单失败!',
                        });
                    }
                    this.loading = false;
                })
                .catch((error) => {
                    if (error === 'timeout of 5000ms exceeded') {
                        this.$toast.show({
                            text: '获取工单超时，请刷新再试!',
                        });
                    } else {
                        this.$toast.show({
                            text: '获取工单失败!',
                        });
                    }
                    this.loading = false;
                });
        },

        showFilter() {

        },

        showSubmit() {

        },
    },
};
</script>
