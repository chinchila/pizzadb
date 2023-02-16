# Pizza DB

The stack used to create this app is:

- `mysql` as dbms
- `apollo` for graphql api
- `sequelize` for orm
- `winston` for logs
- `express` as web framework
- `typescript` as programming language

## How to run

The first thing you need to do is to create a .env file at the root of this directory, this file should have its contents as follows:

```bash
DB_HOST="db"
DB_PORT=3306
DB_NAME="pizzadb"
DB_USER="graphql"
DB_PASSWORD="test"
APP_PORT=3001
DB_DIALECT="mysql"
```

Note that you may need to change your `/etc/hosts` and add `127.0.0.1 db` inside it. Or you can use a mysql in another host, this is just to make the migrations run fine.

After creating the file, to run this demo you can type the following commands:

```bash
$ make run
$ make migrate
```

This will start the application at http://localhost:3001 and a mysql instance at `db:3306`

If you have a mysql instance in another host, please use `docker-compose up app` instead of `make run` to just run the app service and proceed with the migration.

To see the logs of the applciation you can run `docker logs pizzaql_app_1 -f`.

## Example of query

```gql
query Query($month: String, $flavour: [String]) {
  orders(month: $month, flavour: $flavour) {
    startDate
    endDate
    costOfIngredients
    ingredientsUsed
    sales
    unitsSold
    profit
    flavour {
      name
      price
    }
  }
}
```

with parameters:

```json
{
  "flavour": ["Pepperoni", "Branco"],
  "month": "Feb"
}
```

There are also `$startDate` and `$endDate` parameters that you must pass a valid date.

## Example response

```gql
{
  "data": {
    "orders": [
      {
        "startDate": "Feb 01 2022",
        "endDate": "Feb 05 2022",
        "costOfIngredients": 1907.4,
        "ingredientsUsed": 16762,
        "sales": 5491,
        "unitsSold": 289,
        "profit": 3583.6,
        "flavour": {
          "name": "Pepperoni",
          "price": 19
        }
      },
      {
        "startDate": "Feb 01 2022",
        "endDate": "Feb 05 2022",
        "costOfIngredients": 2584.88,
        "ingredientsUsed": 29072,
        "sales": 4740,
        "unitsSold": 316,
        "profit": 2155.12,
        "flavour": {
          "name": "Branco",
          "price": 15
        }
      },
      {
        "startDate": "Feb 06 2022",
        "endDate": "Feb 12 2022",
        "costOfIngredients": 2039.4,
        "ingredientsUsed": 17922,
        "sales": 5871,
        "unitsSold": 309,
        "profit": 3831.6,
        "flavour": {
          "name": "Pepperoni",
          "price": 19
        }
      },
      {
        "startDate": "Feb 06 2022",
        "endDate": "Feb 12 2022",
        "costOfIngredients": 2077.72,
        "ingredientsUsed": 23368,
        "sales": 3810,
        "unitsSold": 254,
        "profit": 1732.28,
        "flavour": {
          "name": "Branco",
          "price": 15
        }
      },
      {
        "startDate": "Feb 13 2022",
        "endDate": "Feb 19 2022",
        "costOfIngredients": 3722.4,
        "ingredientsUsed": 32712,
        "sales": 10716,
        "unitsSold": 564,
        "profit": 6993.6,
        "flavour": {
          "name": "Pepperoni",
          "price": 19
        }
      },
      {
        "startDate": "Feb 13 2022",
        "endDate": "Feb 19 2022",
        "costOfIngredients": 3394.7,
        "ingredientsUsed": 38180,
        "sales": 6225,
        "unitsSold": 415,
        "profit": 2830.3,
        "flavour": {
          "name": "Branco",
          "price": 15
        }
      },
      {
        "startDate": "Feb 20 2022",
        "endDate": "Feb 26 2022",
        "costOfIngredients": 1828.2,
        "ingredientsUsed": 16066,
        "sales": 5263,
        "unitsSold": 277,
        "profit": 3434.8,
        "flavour": {
          "name": "Pepperoni",
          "price": 19
        }
      },
      {
        "startDate": "Feb 20 2022",
        "endDate": "Feb 26 2022",
        "costOfIngredients": 3631.92,
        "ingredientsUsed": 40848,
        "sales": 6660,
        "unitsSold": 444,
        "profit": 3028.08,
        "flavour": {
          "name": "Branco",
          "price": 15
        }
      },
      {
        "startDate": "Feb 27 2022",
        "endDate": "Feb 28 2022",
        "costOfIngredients": 1042.8,
        "ingredientsUsed": 9164,
        "sales": 3002,
        "unitsSold": 158,
        "profit": 1959.2,
        "flavour": {
          "name": "Pepperoni",
          "price": 19
        }
      },
      {
        "startDate": "Feb 27 2022",
        "endDate": "Feb 28 2022",
        "costOfIngredients": 220.86,
        "ingredientsUsed": 2484,
        "sales": 405,
        "unitsSold": 27,
        "profit": 184.14,
        "flavour": {
          "name": "Branco",
          "price": 15
        }
      }
    ]
  }
}
```
