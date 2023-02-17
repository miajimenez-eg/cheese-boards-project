const {User} = require('./models/User')
const {Board} = require('./models/Board')
const {Cheese} = require('./models/Cheese')

User.hasMany(Board);
Board.belongsTo(User);
Board.belongsToMany(Cheese, {through: 'cheese_board'});
Cheese.belongsToMany(Board, {through: 'cheese_board'});

module.exports = {
    User,
    Board,
    Cheese
}