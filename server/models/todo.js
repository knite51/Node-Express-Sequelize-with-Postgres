

export default (sequelize, DataTypes) => {
  const Todo = sequelize.define('Todo', {
    title: DataTypes.STRING,
    complete: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
  });
  Todo.associate = (models) => {
    Todo.belongsTo(models.User, {
      foreignKey: 'userId',
    });
  };
  return Todo;
};
