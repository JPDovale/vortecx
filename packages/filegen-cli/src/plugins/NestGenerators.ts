import { GeneratorConfig } from "src/types";

export function nestGenerators(): GeneratorConfig[] {
  return [
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
              generics: ['typeof -{file}--{^module}-BodySchema'],
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
    {
      name: '-{^module}-Presenter',
      type: 'presenter',
      alias: 'p',
      filename: '-{^module}-Presenter',
      pattern: './src/modules/-{module}-/-{type}-s/',
      imports: [
        {
          imports: ['-{^module}-'],
          from: '../entities/-{^module}-',
        },
      ],
      methods: [
        {
          name: 'toHTTP',
          properties: [
            {
              name: '-{module}-',
              type: ['-{^module}-'],
            },
          ],
        },
      ],
    },
  ]
}