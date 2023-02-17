const sequelize = require('./db');
const { User, Board, Cheese } = require('./models/index');


describe('User, Board and Cheese models', () => {
    
    // beforeAll(async () => {
    //     // will run before any test
    //     await sequelize.sync({ force: true });
    // });
    
    // beforeEach(async () => {
    //     // will run before each test
    //     // await sequelize.sync({ force: true });
    // });
    
    // afterEach(async () => {
    //     // will run after each test
    //     await User.sync({ force: true });
    //     await Board.sync({ force: true });
    //     await Cheese.sync({ force: true });
    // });
    
    // afterAll(async () => {
    //     // will run before any test
    //     await sequelize.drop()
    // });
   
    // User model tests
    test('can create and find a user', async () => {
        // create user
        const user1 = await User.create({
            name: 'Mia',
            email: 'mia@email.com'
        });
        // get user from db and check properties
        const findUser1 = await User.findByPk(user1.id);
        expect(findUser1.name).toBe('Mia');
        expect(findUser1.email).toBe('mia@email.com');
    })

    test('can update a user', async () => {
        // create user
        const user2 = await User.create({
            name: 'Tungay',
            email: 'tungay@email.com'
        });
        // update the user
        await User.update({ email: 'tungay21@email.com' }, { where: { id: user2.id } });
        // retreive updated user from db
        const updatedUser2 = await User.findByPk(user2.id);
        expect(updatedUser2.email).toBe('tungay21@email.com');
        expect(updatedUser2.name).toBe('Tungay');
    })

    test('can delete a user', async () => {
        // create user
        const user3 = await User.create({
            name: 'Liz',
            email: 'liz@email.com'
        });
        // query db for user3
        let findUser3 = await User.findByPk(user3.id);
        // delete user3
        await User.destroy({ where: { id: user3.id } });
        // try to query db for user3 again
        findUser3 = await User.findByPk(user3.id);
        expect(findUser3).toBeNull();
    })

    // Board model tests
    // test('can create a board', async () => {

    // })

    // test('can find a board', async () => {
        
    // })

    // test('can update a board', async () => {
        
    // })

    // test('can delete a board', async () => {
        
    // })

    // Cheese model tests
    // test('can create a cheese', async () => {

    // })

    // test('can find a cheese', async () => {
        
    // })

    // test('can update a cheese', async () => {
        
    // })

    // test('can delete a cheese', async () => {
        
    // })

    // Association tests
    // test('a user has many boards', async () => {

    // })

    // test('a board has one user', async () => {
        
    // })

    // test('a board has many cheese', async () => {
        
    // })

    // test('a cheese has many boards', async () => {
        
    // })
    
});