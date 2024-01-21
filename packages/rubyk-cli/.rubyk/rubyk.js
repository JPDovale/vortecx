module.exports =  { 
  generators: [
    {
      test: 'unit',
      name: '-{^file}--{^module}--{^type}-',
      filename: '-{^file}--{^module}-.-{type}-',
      pattern: './src/modules/-{module}-/-{type}-s/',
      type: 'service',
      alias: 's',
      annotations: ['Injectable'],
      interfaces: ['Request'],
      methods: [
        {
          name: 'execute',
          properties: [
            {
              name: '{ }',
              type: ['Request'],
            },
          ],
          returns: {
            type: [
              {
                name: 'Promise',
                generics: [
                  {
                    name: 'Response',
                  },
                ],
              },
            ],
          },
        },
      ],
      imports: [
        {
          imports: ['Either'],
          from: '@shared/core/errors',
        },
      ],
      types: [
        {
          name: 'Response',
          receive: [
            {
              name: 'Either',
              generics: ['null', 'null'],
            },
          ],
        },
      ],
    },
    {
      test: 'e2e',
      name: '-{^file}--{^module}--{^type}-',
      filename: '-{^file}--{^module}-.-{type}-',
      pattern: './src/modules/-{module}-/-{type}-s/',
      type: 'controller',
      alias: 'c',
      annotations: ['Controller'],
      methods: [
        {
          name: 'handle',
          annotations: ['HttpCode', 'Post'],
          properties: [
            {
              annotation: 'Body',
              name: 'body',
              type: ['-{^file}--{^module}-Body'],
            },
          ],
        },
      ],
      imports: [
        {
          imports: [
            '-{^file}--{^module}-Body',
            '-{file}--{^module}-BodyValidationPipe',
          ],
          from: '../gateways/-{^file}--{^module}-.gateway',
        },
        {
          imports: ['-{^file}--{^module}-Service'],
          from: '../services/-{^file}--{^module}-.service',
        },
        {
          imports: ['Body', 'Controller', 'Post', 'HttpCode'],
          from: '@nestjs/common',
        },
      ],
    },
    {
      name: '-{^file}-',
      type: 'entity',
      alias: 'e',
      pattern: './src/modules/-{module}-/entities/',
      filename: '-{^file}-',
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
          name: '-{^file}-Props',
          export: true,
        },
      ],
      extends: [
        {
          name: 'AggregateRoot',
          generics: [
            {
              name: '-{^file}-Props',
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
                      name: '-{^file}-Props',
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
            type: ['-{^file}-'],
          },
        },
      ],
    },
    {
      name: '-{^file}--{^module}-Gateway',
      type: 'gateway',
      filename: '-{^file}--{^module}-.gateway',
      alias: 'g',
      pattern: './src/modules/-{module}-/-{type}-s/',
      types: [
        {
          export: true,
          name: '-{^file}--{^module}-Body',
          receive: [
            {
              name: 'z.infer',
              generics: ['typeof  -{file}--{^module}-BodySchema'],
            },
          ],
        },
      ],
      imports: [
        {
          imports: ['z'],
          from: 'zod',
        },
      ],
    },
  ],
}