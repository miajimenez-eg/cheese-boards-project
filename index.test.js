const {sequelize} = require('./db');
const { User, Board, Cheese } = require('./models/index');


describe('User, Board and Cheese models', () => {
    
    beforeAll(async () => {
        // will run before any test
        await sequelize.sync({ force: true });
    });
    
    beforeEach(async () => {
        // will run before each test
        await sequelize.sync({ force: true });
    });
    
    afterEach(async () => {
        // will run after each test
        await User.sync({ force: true });
        await Board.sync({ force: true });
        await Cheese.sync({ force: true });
    });
    
    afterAll(async () => {
    //     // will run before any test
        await sequelize.drop()
    });
   
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
    test('can create and find a board', async () => {
        // create board
        const board1 = await Board.create({
            type: 'Regional French Cheese Board',
            description: 'A plethera of cheeses from all over France',
            rating: 4
        });
        // retreive board from db
        const findBoard1 = await Board.findByPk(board1.id);
        expect(findBoard1.type).toBe('Regional French Cheese Board');
        expect(findBoard1.description).toBe('A plethera of cheeses from all over France');
        expect(findBoard1.rating).toBe(4);
    })

    test('can update a board', async () => {
        // create board
        const board2 = await Board.create({
            type: 'Vegan Cheese Board',
            description: 'A variety of vegan cheese made from ingredients like nuts, soy or coconut milk',
            rating: 2
        });
        // update the board
        await Board.update({ rating: 1 }, { where: { id: board2.id } });
        // query the db for the updated board
        const findBoard2 = await Board.findByPk(board2.id);
        expect(findBoard2.type).toBe('Vegan Cheese Board');
        expect(findBoard2.description).toBe('A variety of vegan cheese made from ingredients like nuts, soy or coconut milk');
        expect(findBoard2.rating).toBe(1);
    })

    test('can delete a board', async () => {
        // create board
        const board3 = await Board.create({
            type: 'Smoked Cheese Board',
            description: 'This features smoked cheeses, such as smoked gouda and smoked cheddar',
            rating: 4
        });
        // get the board from the db
        let findBoard3 = await Board.findByPk(board3.id);
        // delete board3
        await Board.destroy({ where: { id: board3.id } });
        // try to retreive board3 from the db
        findBoard3 = await Board.findByPk(board3.id);
        expect(findBoard3).toBeNull();

    })

    // Cheese model tests
    test('can create and find a cheese', async () => {
        // create cheese
        const cheese1 = await Cheese.create({
            title: 'Gouda',
            description: 'A semi-hard cheese that originates from the Netherlands'
        });
        // query the db for cheese1
        const findCheese1 = await Cheese.findByPk(cheese1.id);
        expect(findCheese1.title).toBe('Gouda');
        expect(findCheese1.description).toBe('A semi-hard cheese that originates from the Netherlands');
    })

    test('can update a cheese', async () => {
        // create cheese
        const cheese2 = await Cheese.create({
            title: 'Mozzarella',
            description: 'A soft, mild cheese that originates from Spain'
        });
        // update cheese2
        await Cheese.update({ description: 'A soft, mild cheese that originates from Italy'}, { where: { id: cheese2.id } });
        // query the db for updated cheese
        const findUpdatedCheese2 = await Cheese.findByPk(cheese2.id);
        expect(findUpdatedCheese2.title).toBe('Mozzarella');
        expect(findUpdatedCheese2.description).toBe('A soft, mild cheese that originates from Italy');
    })

    test('can delete a cheese', async () => {
        // create cheese4
        const cheese3 = await Cheese.create({
            title: 'Feta',
            description: 'A soft, crumbly cheese that originates from Greece'
        });
        // query the db for cheese3
        let findCheese3 = await Cheese.findByPk(cheese3.id);
        // delete cheese3
        await Cheese.destroy({ where: { id: cheese3.id } });
        // try to get cheese3 from db
        findCheese3 = await Cheese.findByPk(cheese3.id);
        expect(findCheese3).toBeNull();
    })

    // Association tests
    test('a user has many boards', async () => {
        // create user
        const user4 = await User.create({
            name: 'Muezza',
            email: 'muezza@email.com'
        });
        // get user from db
        const findUser4 = await User.findByPk(user4.id);
        // create 2 boards
        const board4 = await Board.create({
            type: 'Dessert Cheese Board',
            description: 'Features sweet cheeses like mascarpone and ricotta',
            rating: 3
        });

        const board5 = await Board.create({
            type: 'Summer Cheese Board',
            description: 'Highlights seasonal flavours and ingredients such as fresh berries and herbs',
            rating: 4
        });
        // add boards to user4
        await user4.addBoard(board4);
        await user4.addBoard(board5);
        // query db for boards associated with user4
        const userWithBoards = await Board.findAll( { where: { userId: user4.id } } );

        // console.log(userWithBoards[0]);
        // console.log(user4);

        expect(userWithBoards[0].type).toBe('Dessert Cheese Board');
        expect(userWithBoards[0].description).toBe('Features sweet cheeses like mascarpone and ricotta');
        expect(userWithBoards[0].rating).toBe(3);
        expect(userWithBoards[1].type).toBe('Summer Cheese Board');
        expect(userWithBoards[1].description).toBe('Highlights seasonal flavours and ingredients such as fresh berries and herbs');
        expect(userWithBoards[1].rating).toBe(4);
    })

    test('a board has one user', async () => {
        // create new user
        const user5 = await User.create({
            name: 'Bella',
            email: 'bella@email.com'
        });
        // create new board
        const board6 = await Board.create({
            type: 'Winter Cheese Board',
            description: 'Highlights seasonal flavours and ingredients, such as roasted nuts and dried fruits',
            rating: 3
        });
        // add user to board
        await board6.setUser(user5);
        // query db for user associated with board6
        const boardWithUser = await Board.findOne({
            where: { id: board6.id },
            include: User
        })

        expect(boardWithUser.user.name).toBe('Bella');
        expect(boardWithUser.user.email).toBe('bella@email.com');
    })

    test('a board has many cheeses', async () => {
        // create board
        const board7 = await Board.create({
            type: 'Mediterrranean Cheese Board',
            description: 'Features cheeses and accompaniments that are commonly found in Mediterranean cuisine',
            rating: 5
        });
        
        // get board from db
        // const findBoard7 = await Board.findByPk(board7.id);
        // create 2 cheeses
        const cheese4 = await Cheese.create({
            title: 'Manchego',
            description: 'A semi-hard cheese made from sheeps milk, that originates from La Mancha region of Spain'
        });
    
        const cheese5 = await Cheese.create ({
            title: 'Castelo Branco',
            description: 'A soft cheese made from sheeps and goats milk, that originates from the Castelo Branco region of Portugal'
        });
        
        // add cheeses to board
        await board7.addCheese(cheese4);
        await board7.addCheese(cheese5);
        // query db for board associated with cheeses
        const boardWithCheeses = await Board.findByPk(board7.id, {
            include: [{
              model: Cheese
            }]
          });

        // console.log(boardWithCheeses[0]);

        expect(boardWithCheeses.cheeses[0].title).toBe('Manchego');
        expect(boardWithCheeses.cheeses[0].description).toBe('A semi-hard cheese made from sheeps milk, that originates from La Mancha region of Spain');
        expect(boardWithCheeses.cheeses[1].title).toBe('Castelo Branco');
        expect(boardWithCheeses.cheeses[1].description).toBe('A soft cheese made from sheeps and goats milk, that originates from the Castelo Branco region of Portugal');
    })

    test('a cheese belongs to many boards', async () => {
        // create cheese
        const cheese6 = await Cheese.create({
            title: 'Bitto',
            description: 'A semi-hard cheese made from sheeps milk, that originates from La Mancha region of Spain'
        });
        
        // create 2 boards
        const board8 = await Board.create({
            type: 'Grilled Cheese Board',
            description: 'Features a variety of cheeses that are perfect for making grilled cheese sandwiches',
            rating: 3
        });
    
        const board9 = await Board.create({
            type: 'Artisanal Cheese Board',
            description: 'A bunch of artisanal cheeses that are made by small, independent producers',
            rating: 4
        });
        
        
        // add boards to cheese
        await cheese6.addBoard(board8);
        await cheese6.addBoard(board9);
        // query db for cheese associated with boards
        const cheeseWithBoards = await Cheese.findByPk(cheese6.id, {
            include: [{
              model: Board
            }]
        });

        // console.log(cheeseWithBoards.boards)

        expect(cheeseWithBoards.boards[0].type).toBe('Grilled Cheese Board');
        expect(cheeseWithBoards.boards[0].description).toBe('Features a variety of cheeses that are perfect for making grilled cheese sandwiches');
        expect(cheeseWithBoards.boards[0].rating).toBe(3);
        expect(cheeseWithBoards.boards[1].type).toBe('Artisanal Cheese Board');
        expect(cheeseWithBoards.boards[1].description).toBe('A bunch of artisanal cheeses that are made by small, independent producers');
        expect(cheeseWithBoards.boards[1].rating).toBe(4);
    })

});