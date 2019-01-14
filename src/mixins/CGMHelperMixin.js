const CGMHelperMixin = {
    methods: {
        arrowForDirection (direction) {
            switch (direction) {
                case 'DoubleUp':
                    return '⇈';
                case 'SingleUp':
                    return '↑';
                case 'FortyFiveUp':
                    return '↗';
                case 'Flat':
                    return '→';
                case 'FortyFiveDown':
                    return '↘';
                case 'SingleDown':
                    return '↓';
                case 'DoubleDown':
                    return '⇊';
                case 'NONE':
                default:
                    return '-';
            }
        },
        arrowForTrend (trend) {
            // @TODO implementation
        }
    }
};
export default CGMHelperMixin;
