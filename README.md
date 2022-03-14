# Wonder Table

A simple table used for HRNet on OpenClassRoom's course
I tried to recreate "DataTables" Jquery's plugin in a React package ( https://datatables.net/ )

## Installation

```
npm i wonder-table
```

## How to use

This package was built to be used like a React component.

In your project import the package

```
import Table from "wonder-table";
```

Then use it

```
<Table list={your list} />
```

## Parameters

- "list" = The data, must be provided as an Array of object : [{},{},{}]
- pageNum = Number, able to open the table directly on other pages ( it's a zero based) / default : "0"
- width = Css value for the width of the table / default : "100%"
- height = Css value for the height of the table / default : "auto"

## Providing data

Your data can be as long as you want, without limit of categories, but it must respect some structure :

- It must be composed only with objects inside an array
- the property name inside the object must be writing using underscore instead of space

And example

```
[
{
my_first_category : "my first value",
my_second_category : "my second value",
end_of_object : "1"
},
{
my_first_category : "my first value",
my_second_category : "my second value",
maybe_other_category : "other value",
end_of_object : "2"
},
]
```
