const sequelize = require('./db');
const { User, Board, Cheese } = require('./models/index');

beforeAll(async () => {
    // will run before any test
    await sequelize.sync({ force: true });
});

beforeEach(async () => {
    // will run before each test
    // await sequelize.sync({ force: true });
});

afterEach(async () => {
    // will run after each test
    await User.sync({ force: true });
    await Board.sync({ force: true });
    await Cheese.sync({ force: true });
});

afterAll(async () => {
    // will run before any test
    await sequelize.drop()
});