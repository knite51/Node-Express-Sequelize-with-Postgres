
export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
  }, {
    classMethods: {
      associate(models) {
        // associations can be defined here
        User.hasMany(models.Todo);
      },
    },
  });
  return User;
};
