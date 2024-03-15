// Node.js/Express backend
const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'yourusername',
  password: 'yourpassword',
  database: 'yourdatabase'
});

connection.connect();

app.get('/data', (req, res) => {
  connection.query('SELECT * FROM your_table', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

// React.js frontend
class App extends React.Component {
  state = { data: [] };

  componentDidMount() {
    fetch('http://localhost:3000/data')
      .then(response => response.json())
      .then(data => this.setState({ data }));
  }

  render() {
    return (
      <div>
        {this.state.data.map(item => (
          <div key={item.id}>
            <p>{item.column1}</p>
            <p>{item.column2}</p>
            // ... other columns
          </div>
        ))}
      </div>
    );
  }
}