<template>
    <div v-bind:class="containerClasses">
        <div v-if="$apollo.loading">Fetching entries</div>
        <!-- @TODO extract these into a single component -->
        <div id="current-target-state">{{ this.currentTargetStateAsString }}</div>
        <div class="dashboard-block" id="current-bg">
            <h2>Current BG</h2>
            {{ currentBgInSelectedUnits }}
            <div v-if="currentDirection" class="direction">{{ currentDirectionArrow }}</div>
        </div>
        <div class="dashboard-block" id="mean-bg">
            <h2>Mean BG</h2>
            {{ meanBgInSelectedUnits }}
        </div>
    </div>
</template>

<script>
import gql from 'graphql-tag';
import BGHelperMixin from '../mixins/BGHelperMixin';
import CGMHelperMixin from '../mixins/CGMHelperMixin';

export default {
    name: 'NightscoutDashboard',
    mixins: [
        BGHelperMixin,
        CGMHelperMixin
    ],
    data: () => {
        return {
            entries: [],
            numberOfEntriesToFetch: 288,
            units: 'mmolL',
            rangeLower: 70,// 3.9 mmol/L
            rangeUpper: 180,// 10 mmol/L
            urgentLow: 54
        };
    },
    apollo: {
        entries: {
            query: gql`query Entries ($lastN: Int) {
                entries(lastN: $lastN) {
                    _id,
                    sgv,
                    date,
                    dateString,
                    direction,
                    trend
                }
            }`,
            variables () {
                return {
                    lastN: this.numberOfEntriesToFetch
                };
            },
            pollInterval: (1000 * 60)// every minute, for now
        }
    },
    computed: {
        containerClasses () {
            return {
                'range-low': this.currentTargetState === -1,
                'range-target': this.currentTargetState === 0,
                'range-high': this.currentTargetState === 1
            }
        },
        // returns -1 for low, 0 for in-target, 1 for high
        currentTargetState () {
            if (this.currentSgv <= this.rangeLower) {
                return -1;
            } else if (this.currentSgv >= this.rangeUpper) {
                return 1;
            } else {
                return 0;
            }
        },
        currentTargetStateAsString () {
            const switchObj = {
                [-1]: 'Low',
                [0]: 'In Range',
                [1]: 'High'
            }

            return switchObj[this.currentTargetState]
        },
        entriesByTimestamp () {
            return this.entries.slice().sort((a, b) => (a.date > b.date ? -1 : 1));
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
        currentEntry () {
            return this.entriesByTimestamp[0] ? this.entriesByTimestamp[0] : null;
        },
        currentSgv () {
            return this.currentEntry ? this.currentEntry.sgv : 0;
        },
        currentDirection () {
            return this.currentEntry ? this.currentEntry.direction : '';
        },
        currentBgInSelectedUnits () {
            if (this.units === 'mmolL') {
                return this.mgdlToMmolL(this.currentSgv);
            } else {
                return this.currentSgv;
            }
        },
        currentDirectionArrow () {
            return this.arrowForDirection(this.currentEntry.direction);
        }
    }
};
</script>

<style scoped>
.range-low {
    background-color: red;
}
.range-target {
    background-color: green;
}
.range-high {
    background-color: yellow;
}
</style>