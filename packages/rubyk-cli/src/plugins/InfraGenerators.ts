import { GeneratorConfig } from "src/types";

export function infraGenerators(): GeneratorConfig[] {
  return [
    {
      name: '-{^module}-',
      type: 'entity',
      alias: 'e',
      pattern: './src/modules/-{module}-/entities/',
      filename: '-{^module}-',
      imports: [
        {
          imports: ['Optional'],
          from: '@shared/core/types/Optional',
        },
        {
          imports: ['AggregateRoot'],
          from: '@shared/core/entities/AggregateRoot',
        },
        {
          imports: ['UniqueEntityId'],
          from: '@shared/core/valueObjects/UniqueEntityId',
        },
      ],
      interfaces: [
        {
          name: '-{^module}-Props',
          export: true,
        },
      ],
      extends: [
        {
          name: 'AggregateRoot',
          generics: [
            {
              name: '-{^module}-Props',
            },
          ],
        },
      ],
      methods: [
        {
          name: 'create',
          properties: [
            {
              name: 'props',
              type: [
                {
                  name: 'Optional',
                  generics: [
                    {
                      name: '-{^module}-Props',
                    },
                    {
                      name: "'something'",
                    },
                  ],
                },
              ],
            },
            {
              name: 'id',
              type: ['UniqueEntityId'],
            },
          ],
          returns: {
            type: ['-{^module}-'],
          },
        },
      ],
    },
    {
      name: '-{^modules}-Repository',
      type: 'repository contract',
      alias: 'rc',
      filename: '-{^modules}-Repository',
      pattern: './src/modules/-{module}-/repositories/',
      test: 'disabled',
      imports: [
        {
          imports: ['-{^module}-'],
          from: '../entities/-{^module}-',
        },
      ],
    },
    {
      name: '-{^file}-',
      test: 'disabled',
      type: 'error',
      alias: 'err',
      filename: '-{^file}-',
      pattern: './src/modules/-{module}-/errors/',
      extends: ['Error'],
      implements: ['ServiceError'],
      imports: [
        {
          imports: ['ServiceError'],
          from: '@shared/core/errors/ServiceError',
        },
        {
          imports: ['statusCode'],
          from: '@config/statusCode',
        },
      ],
    },
  ]
}