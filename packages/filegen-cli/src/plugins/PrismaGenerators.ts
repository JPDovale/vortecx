import { GeneratorConfig } from "src/types";

export function prismaGenerators(): GeneratorConfig[] {
  return [
    {
      name: '-{^modules}-PrismaRepository',
      type: 'repository implementation',
      alias: 'ri',
      filename: '-{^modules}-PrismaRepository',
      pattern: './src/infra/database/prisma/-{module}-/',
      imports: [
        {
          imports: ['-{^module}-'],
          from: '@modules/-{module}-/entities/-{^module}-',
        },
        {
          imports: ['-{^modules}-Repository'],
          from: '@modules/-{module}-/repositories/-{^modules}-Repository',
        },
        {
          imports: ['PrismaService'],
          from: '../index.service',
        },
        {
          imports: ['-{^modules}-PrismaMapper'],
          from: './-{^modules}-PrismaMapper',
        },
        {
          imports: ['Injectable'],
          from: '@nestjs/common',
        },
      ],
      annotations: ['Injectable'],
      implements: ['-{^modules}-Repository'],
      test: 'disabled'
    },
    {
      name: '-{^modules}-PrismaMapper',
      type: 'repository implementation mapper',
      alias: 'rim',
      filename: '-{^modules}-PrismaMapper',
      pattern: './src/infra/database/prisma/-{module}-/',
      imports: [
        {
          imports: ['-{^module}-'],
          from: '@modules/-{module}-/entities/-{^module}-',
        },
        {
          imports: ['Prisma', '-{^module}- as -{^module}-Prisma'],
          from: '@prisma/client',
        },
        {
          imports: ['UniqueEntityId'],
          from: '@shared/core/valueObjects/UniqueEntityId',
        },
      ],
      methods: [
        {
          name: 'toEntity',
          properties: [
            {
              name: 'raw',
              type: ['-{^module}-Prisma'],
            },
          ],
          returns: {
            type: ['-{^module}-'],
          },
        },
        {
          name: 'toPrisma',
          properties: [
            {
              name: '-{module}-',
              type: ['-{^module}-'],
            },
          ],
          returns: {
            type: ['Prisma.-{^module}-UncheckedCreateInput'],
          },
        },
      ],
    },
  ]
}