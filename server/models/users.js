import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./instances/database.db",
});

// Access with sequelize.models.User
const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

export const addUser = async (username, password) => {
  // create the table if not already exists
  await User.sync();

  try {
    const user = await User.create({ username: username, password: password });
    return user;
  } catch (e) {
    return null;
  }
};

export const findUser = async (username, password) => {
  await User.sync();

  const users = await User.findAll({
    where: {
      username: username,
      password: password,
    },
  });

  if (users) {
    return users[0];
  }
  return null;
};

export const findOtherUsers = async (username) => {
  await User.sync();

  const users = await User.findAll({
    attributes: ['username'],
    where: {
      username: {
        [Op.ne]: username
      }
    }
  })

  if (users) {
    return users;
  }
  return null;
}

export const findUserExists = async (username) => {
  await User.sync();

  const users = await User.findAll({
    where: {
      username: username,
    },
  });

  if (users) {
    return users[0];
  }
  return null;
}
