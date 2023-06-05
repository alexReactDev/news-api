import MockDB from "./mockDB.js";

const mock = new MockDB();
mock.createCategories().then(() => mock.createPosts().then(() => mock.createComments()));