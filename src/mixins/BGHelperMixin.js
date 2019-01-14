const BGHelperMixin = {
    methods: {
        mgdlToMmolL (valueInMgdl) {
            return valueInMgdl * 0.0555;
        },
        mmolLToMgdl (valueInMmolL) {
            return valueInMgdl * 18.0182;
        }
    }
};
export default BGHelperMixin;
