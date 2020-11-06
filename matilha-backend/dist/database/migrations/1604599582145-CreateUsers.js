"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _typeorm = require('typeorm');

 class CreateUsers1604599582145  {
   async up(queryRunner) {
    await queryRunner.createTable(
      new (0, _typeorm.Table)({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'password',
            type: 'varchar',
          },
          {
            name: 'carga_horaria',
            type: 'float',
          },
          {
            name: 'setor',
            type: 'varchar',
          },
          {
            name: 'ativo',
            type: 'boolean',
            default: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
  }

   async down(queryRunner) {
    await queryRunner.dropTable('users');
  }
} exports.default = CreateUsers1604599582145;
