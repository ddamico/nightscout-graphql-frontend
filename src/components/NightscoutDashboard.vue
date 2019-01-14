<template>
    <div>
        <div class="dashboard-block current-bg">
            {{ currentBgInSelectedUnits }}
        </div>
        <div class="dashboard-block mean-bg">
            {{ meanBgInSelectedUnits }}
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import BGHelperMixin from '../mixins/BGHelperMixin';

export default {
    name: 'NightscoutDashboard',
    mixins: [
        BGHelperMixin
    ],
    data: () => {
        return {
            entries: [],
            numberOfEntriesToFetch: 288,
            units: 'mmolL'
        };
    },
    apollo: {
        entries: {
            query: gql`query Entries ($lastN: Int) {
                entries(lastN: $lastN) {
                    _id,
                    sgv,
                    date,
                    dateString
                }
            }`,
            variables () {
                return {
                    lastN: this.numberOfEntriesToFetch
                }
            },
        },

    },
    computed: {
        entriesByTimestamp () {
            return this.entries.slice().sort((a, b) => (a.date > b.date));
        },
        meanSgv () {
            const totalSgv = this.entries.reduce((accumulator, entry) => accumulator + entry.sgv, 0);
            return totalSgv / this.entries.length;
        },
        meanBgInSelectedUnits () {
            // @TODO extract this conditional into helper, don't repeat below
            // @TODO add formatter, mgdl should be whole, mmolL should be one decimal place
            if (this.units === 'mmolL') {
                return this.mgdlToMmolL(this.meanSgv);
            } else {
                return this.meanSgv;
            }
        },
        currentSgv () {
            return this.entriesByTimestamp[0] ? this.entriesByTimestamp[0].sgv : 0;
        },
        currentBgInSelectedUnits () {
            if (this.units === 'mmolL') {
                return this.mgdlToMmolL(this.currentSgv);
            } else {
                return this.currentSgv;
            }
        }
    }
};
</script>
