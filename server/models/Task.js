import objectionUnique from 'objection-unique';
import BaseModel from './BaseModel.js';

const unique = objectionUnique({ fields: ['name'] });

class Task extends unique(BaseModel) {
  static get tableName() {
    return 'tasks';
  }

  static get relationMappings() {
    return {
      status: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'Status.js',
        join: {
          from: 'tasks.statusId',
          to: 'statuses.id',
        },
      },
      creator: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User.js',
        join: {
          from: 'tasks.creatorId',
          to: 'users.id',
        },
      },
      executor: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: 'User.js',
        join: {
          from: 'tasks.executorId',
          to: 'users.id',
        },
      },
      labels: {
        relation: BaseModel.ManyToManyRelation,
        modelClass: 'Label.js',
        join: {
          from: 'tasks.id',
          through: {
            from: 'tasksLabels.taskId',
            to: 'tasksLabels.labelId',
          },
          to: 'labels.id',
        },
      },
    };
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'statusId', 'creatorId'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string', minLength: 1 },
        description: { type: 'string' },
        statusId: { type: 'integer' },
        creatorId: { type: 'integer' },
        executorId: { type: 'integer' },
      },
    };
  }

  static modifiers = {
    filterCreator(queryBuilder, creatorId) {
      queryBuilder.where('creatorId', creatorId);
    },
    filterExecutor(queryBuilder, executorId) {
      queryBuilder.where('executorId', executorId);
    },
    filterStatus(queryBuilder, statusId) {
      queryBuilder.where('statusId', statusId);
    },
    filterLabel(queryBuilder, labelId) {
      queryBuilder.where('labelId', labelId);
    },
  };
}

export default Task;
