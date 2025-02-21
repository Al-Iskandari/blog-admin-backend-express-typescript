'use strict';
/** @type {import('sequelize-cli').Migration} */

const StatusType = {
  active : 'active',
  pending : 'pending',
  cancelled : 'cancelled',
  inactive : 'inactive',
}

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      serviceId: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      project_name: {
        type: Sequelize.STRING
      },
      progress: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      customer: {
        type: Sequelize.STRING
      },
      budget_plan: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.ENUM,
        values:[...Object.values(StatusType)],
        defaultValue: StatusType.active,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Projects');
  }
};