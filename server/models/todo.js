

module.exports = (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    UserId: DataTypes.INTEGER,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        Todo.belongsTo(models.User);
      },
    },
  });
  return Todo;
};
