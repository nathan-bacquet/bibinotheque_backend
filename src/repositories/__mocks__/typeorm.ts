import {userCollection} from "../../tests/testDataSet";

//noinspection JSUnusedGlobalSymbols
export function getRepository () {
    return {
        find: async() => {
            return userCollection;
        }
    };
}
