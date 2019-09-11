import userRepository from "../../../repositories/usersRepository";
import {userCollection} from "../../testDataSet";

jest.mock("typeorm");
jest.mock("../../../models/user");

describe("testing the user repository", () => {
    test("all return an array containing all users", () => {
        return userRepository.all().then(
            (users) => {
                expect(users).toEqual(userCollection);
            }
        );
    });
});
