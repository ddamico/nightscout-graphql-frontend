import { shallowMount } from '@vue/test-utils';
import NightscoutDashboard from '@/components/NightscoutDashboard';

describe('NightscoutDashboard.vue', () => {
    const wrapper = shallowMount(NightscoutDashboard, {
        mocks: {
            $apollo: {
            },
        }
    });
    const sampleEntry = {
        "_id": "5c3befdeb599af1a868b93a3",
        "sgv": 280,
        "date": 1547431869000,
        "dateString": "2019-01-14T02:11:09.000Z",
        "trend": 3,
        "direction": "FortyFiveUp"
    };
    const sampleEntry2 = {
      "_id": "5c3bff1ab599af1a868bb336",
      "sgv": 364,
      "date": 1547435769000,
      "dateString": "2019-01-14T03:16:09.000Z",
      "trend": 3,
      "direction": "FortyFiveUp"
    };
    const entries = [sampleEntry, sampleEntry2];
    wrapper.setData({
        entries,
        numberOfEntriesToFetch: 288,
        units: 'mmolL',
        rangeLower: 70,
        rangeUpper: 180,
        urgentLow: 54
    });

    test('should return correct values for computeds relative to most recent entry', () => {
        // test entry transformations
        expect(wrapper.vm.currentEntry.sgv).toEqual(sampleEntry2.sgv);
        expect(wrapper.vm.currentDirection).toEqual(sampleEntry2.direction);
    });

    test('should contain all expected dashboard blocks', () => {
        // expect dashboard blocks to be exist
        // @TODO add tests for displayed values (can check units
        // match in this too)
        expect(wrapper.find('#current-bg').exists()).toBe(true);
        expect(wrapper.find('#mean-bg').exists()).toBe(true);
    });
});