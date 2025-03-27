
# Node.js API with Express and Sequelize

A RESTful API built with Node.js, Express, and Sequelize ORM with organized database structure.

## Features

- ✅ Express.js backend
- ✅ Sequelize ORM with MySQL/PostgreSQL support
- ✅ Organized database configuration
- ✅ Environment variable configuration
- ✅ Database migrations and seeders
- ✅ CORS support
- ✅ Nodemon for development hot-reloading

## Project Structure

```
├── database/            # All database-related files
│   ├── config/         # Sequelize configuration
│   │   └── config.js   # Database configuration
│   ├── migrations/     # Database migration files
│   ├── models/         # Sequelize models
│   └── seeders/        # Database seed files
├── .env                # Environment variables
├── .sequelizerc        # Sequelize CLI configuration
├── index.js            # Main application entry point
└── package.json        # Project dependencies and scripts
```

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd [project-directory]
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Then edit the `.env` file with your database credentials.

## Database Setup

### Configuration

1. Update `.sequelizerc` to point to the database folder:
   ```js
   const path = require('path');

   module.exports = {
     'config': path.resolve('database', 'config', 'config.js'),
     'migrations-path': path.resolve('database', 'migrations'),
     'seeders-path': path.resolve('database', 'seeders'),
     'models-path': path.resolve('database', 'models')
   };
   ```

2. Configure your database connection in `database/config/config.js`:
   ```js
   require('dotenv').config();

   module.exports = {
     development: {
       username: process.env.DATABASE_USERNAME,
       password: process.env.DATABASE_PASSWORD,
       database: process.env.DATABASE_NAME,
       host: process.env.DATABASE_HOST,
       port: process.env.DATABASE_PORT || 3306,
       dialect: 'mysql'
     },
     test: {
       // test environment config
     },
     production: {
       // production environment config
     }
   };
   ```

### Database Commands

- Create database:
  ```bash
  npx sequelize-cli db:create
  ```

- Run migrations:
  ```bash
  npx sequelize-cli db:migrate
  ```

- Create new migration:
  ```bash
  npx sequelize-cli migration:generate --name migration-name
  ```

- Run seeders:
  ```bash
  npx sequelize-cli db:seed:all
  ```

## Model Creation

To create a new model (example for User model):
```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

This will create:
1. Model file in `database/models`
2. Migration file in `database/migrations`

## Connecting Models

In your application entry point (index.js), add:
```js
const db = require('./database/models');

// Test the connection
db.sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));
```

## Development

1. Start the development server:
   ```bash
   npm run dev
   ```

2. The server will be running at `http://localhost:3000` (or your specified PORT)

## Environment Variables

Create a `.env` file with these variables:

```ini
PORT=3000
DATABASE_NAME=your_db_name
DATABASE_USERNAME=your_db_user
DATABASE_PASSWORD=your_db_password
DATABASE_HOST=localhost
DATABASE_PORT=3306
NODE_ENV=development
```

## Deployment

For production:

1. Set `NODE_ENV=production` in your environment
2. Run migrations:
   ```bash
   npx sequelize-cli db:migrate
   ```
3. Start the server:
   ```bash
   npm start
   ```
 
 # Sequelize Models, Migrations, and Seeders: A Comprehensive Guide

## Understanding Models

Models are like a blueprint for your database table. They define:
- What columns exist in the table
- What type of data each column will store
- Any validation rules
- Default values
- Constraints

### Example Model:

```javascript
// models/User.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    age: {
      type: DataTypes.INTEGER,
      validate: {
        min: 18,
        max: 100
      }
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    registeredAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  }, {
    tableName: 'users',
    timestamps: true
  });

  return User;
};
```

## Understanding Associations

Sequelize allows defining relationships between models, such as:
- One-to-One
- One-to-Many
- Many-to-Many

### Example Associations:

```javascript
// models/index.js
const User = require('./User')(sequelize);
const Post = require('./Post')(sequelize);

User.hasMany(Post, { foreignKey: 'userId' });
Post.belongsTo(User, { foreignKey: 'userId' });
```

## Understanding Migrations

Migrations act as a version control system for your database schema. They:
- Create tables
- Modify table structures
- Add or remove columns
- Create relationships between tables

### Example Migration:

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      age: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      isActive: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('Users');
  }
};
```

## Understanding Seeders

Seeders are used to insert initial data into the database. This is useful for:
- Populating default users, roles, or settings
- Testing with predefined datasets
- Setting up a development environment with sample data

### Example Seeder:

```javascript
'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        username: 'johndoe',
        email: 'johndoe@example.com',
        age: 25,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        username: 'janedoe',
        email: 'janedoe@example.com',
        age: 30,
        isActive: false,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
```

## Key Differences

| Feature    | Models | Migrations | Seeders |
|------------|--------|------------|---------|
| Purpose | Defines the structure of a table in code | Modifies the actual database schema | Inserts sample or default data |
| Usage | Used by Sequelize for defining table schema and relationships | Used to create, update, or delete database tables | Used to insert predefined data into the database |
| Versioning | No versioning | Version-controlled | No versioning |
| Rollback | Not applicable | Can be rolled back | Can be undone using `bulkDelete` |

## Practical Workflow (Manual & Command-Line)

1. **Create Model Manually:** Define a new model file in `models/` directory.
   ```javascript
   const User = sequelize.define('User', {
     username: DataTypes.STRING,
     email: DataTypes.STRING
   });
   ```
2. **Generate Migration via CLI:**
   ```bash
   npx sequelize-cli model:generate --name User --attributes username:string,email:string
   ```
3. **Run Migrations:**
   ```bash
   npx sequelize-cli db:migrate
   ```
4. **Create Seeder Manually:** Define a new seeder file in `seeders/` directory.
   ```javascript
   module.exports = {
     up: async (queryInterface, Sequelize) => {
       await queryInterface.bulkInsert('Users', [
         { username: 'testuser', email: 'test@example.com', createdAt: new Date(), updatedAt: new Date() }
       ], {});
     }
   };
   ```
5. **Generate Seeder via CLI:**
   ```bash
   npx sequelize-cli seed:generate --name seed-users
   ```
6. **Run Seeder:**
   ```bash
   npx sequelize-cli db:seed:all
   ```
7. **Undo Last Migration or Seeding:**
   ```bash
   npx sequelize-cli db:migrate:undo
   npx sequelize-cli db:seed:undo --seed seed-users
   ```

## Conclusion

- **Models** define how data should look.
- **Associations** define relationships between tables.
- **Migrations** create or modify the actual database tables.
- **Seeders** insert default or test data into the database.


# Building a User Service with Node.js, Express, and Sequelize

In this guide, we will build a simple User Service API using **Node.js**, **Express**, and **Sequelize** with MySQL as the database.

## 1. Install Dependencies

Before starting, make sure you have **Node.js** installed. Then, initialize a new project and install the required dependencies:

```bash
mkdir user-service
cd user-service
npm init -y
npm install express sequelize mysql2
npm install --save-dev nodemon
```

## 2. Create the User Service (`services/userService.js`)

```javascript
const db = require('../models');

const getAllUsers = async () => {
  return await db.User.findAll();
};

const getUserById = async (id) => {
  return await db.User.findByPk(id);
};

const createUser = async (data) => {
  return await db.User.create(data);
};

const updateUser = async (id, data) => {
  await db.User.update(data, { where: { id } });
  return getUserById(id);
};

const deleteUser = async (id) => {
  return await db.User.destroy({ where: { id } });
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
```

## 3. Create the Controller (`controllers/userController.js`)

```javascript
const userService = require('../services/userService');

const getAllUsers = async (req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
};

const getUserById = async (req, res) => {
  const user = await userService.getUserById(req.params.id);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

const createUser = async (req, res) => {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const user = await userService.updateUser(req.params.id, req.body);
  res.json(user);
};

const deleteUser = async (req, res) => {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
};

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
```

## 4. Define Routes (`routes/userRoutes.js`)

```javascript
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
```

## 5. Setup `index.js`

```javascript
const express = require('express');
const db = require('./models');
const userRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

db.sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}).catch((error) => {
  console.error('Database connection error:', error);
});
```





