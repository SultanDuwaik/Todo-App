const express = require('express');
const sequelize = require('./config/database');
const taskRoutes = require('./routes/tasks');
const tagRoutes = require('./routes/tags');
const listRoutes = require('./routes/lists');
const subtaskRoutes = require('./routes/subtasks');
const cors = require('cors');

const app = express();

app.use(cors({
  origin: 'http://localhost:4200'
}));

app.use(express.json());

app.use('/api', taskRoutes);
app.use('/api', listRoutes);
app.use('/api', tagRoutes);
app.use('/api', subtaskRoutes);

const PORT = process.env.PORT || 3000;
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(err => console.error('Unable to connect to the database:', err));
