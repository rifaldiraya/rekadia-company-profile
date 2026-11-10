export enum CoreDatagridFilterOperator {
  Equals = 0,
  NotEquals = 1,
  Greater = 2,
  GreaterThanOrEquals = 3,
  LessThan = 4,
  LessThanOrEquals = 5,
  StartsWith = 6,
  NotStartsWith = 7,
  EndsWith = 8,
  NotEndsWith = 9,
  Contains = 10,
  NotContains = 11,
  InList = 12,
  NotInList = 13,
  Exists = 14,
  NotExists = 15,
  Match = 16,
  NotMatch = 17,
  IsNull = 18,
  IsNotNull = 19,
}

export enum CoreDatagridFilterLogic {
  And = 0,
  Or = 1,
}

export enum CoreDatagridSortDirection {
  Asc = 0,
  Desc = 1,
}
