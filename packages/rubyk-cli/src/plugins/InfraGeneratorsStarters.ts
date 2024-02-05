export interface Starter {
  path: string
  template: string
}

export function infraGeneratorsStarters(): Starter[] {
  return [
    { path: 'src/shared/core/entities/Entity.ts', template: 'entity.ts.ejs' },
    {
      path: 'src/shared/core/entities/AggregateRoot.ts',
      template: 'aggregateRoot.ts.ejs',
    },
    {
      path: 'src/shared/core/entities/ValueObject.ts',
      template: 'valueObject.ts.ejs',
    },
    {
      path: 'src/shared/core/entities/WatchedList.ts',
      template: 'watchedList.ts.ejs',
    },
    { path: 'src/shared/core/errors/Either.ts', template: 'either.ts.ejs' },
    {
      path: 'src/shared/core/events/DomainEvent.ts',
      template: 'domainEvent.ts.ejs',
    },
    {
      path: 'src/shared/core/events/DomainEvents.ts',
      template: 'domainEvents.ts.ejs',
    },
    {
      path: 'src/shared/core/events/EventHandler.ts',
      template: 'eventHandler.ts.ejs',
    },
    { path: 'src/shared/core/types/Optional.ts', template: 'optional.ts.ejs' },
    {
      path: 'src/shared/core/valueObjects/UniqueEntityId.ts',
      template: 'uniqueEntityId.ts.ejs',
    },
  ]
}
