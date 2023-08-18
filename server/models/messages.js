import { Sequelize, DataTypes, Op } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./instances/database.db",
});

// Access with sequelize.models.User
const Message = sequelize.define(
  "Message",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    sender: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receiver: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contents: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  },
);

/**
 * Add a new message into the database
 * @param {string} [sender] The sender of the message
 * @param {string} [receiver] The receiver of the message
 * @param {string} [contents] The contents of the message
 * @return {Message} A `Message` object if the message was successfully
 * created, or `null` otherwise
 */
export const addMessage = async (sender, receiver, contents) => {
  Message.sync();

  try {
    const message = await Message.create({
      sender: sender,
      receiver: receiver,
      contents: contents,
    });
    return message;
  } catch (e) {
    return null;
  }
};

/**
 * Find all messages between sender and receiver
 * @param {string} [sender] The sender of the message
 * @param {string} [receiver] The receiver of the message
 * @return An array of the messages
 */
export const findMessages = async (sender, receiver) => {
  Message.sync();

  const messages = await Message.findAll({
    where: {
      [Op.or]: [
        {
          sender: sender,
          receiver: receiver,
        },
        {
          sender: receiver,
          receiver: sender,
        }
      ]
    },
    order: sequelize.col('createdAt')
  });

  if (messages)
    return messages;
  return null;
};

export const findAllMessages = async () => {
  Message.sync();
  const messages = await Message.findAll();

  if (messages) {
    return messages;
  }
  return null;
};
