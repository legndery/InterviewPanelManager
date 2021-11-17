import Sequelize from "sequelize";

export default (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    techStack: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
}