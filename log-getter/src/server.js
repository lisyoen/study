const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL 연결 설정
const pool = new Pool({
  user: 'log-getter',
  host: 'log-db',
  database: 'log_db',
  password: 'test_password',
  port: 5432,
});

// welcome 메시지
app.get('/', (req, res) => {
  res.send('Welcome to the Log Getter API!');
});

// POST 요청 처리
app.post('/data', async (req, res) => {
  const { sender, content } = req.body;

  try {
    const result = await pool.query(
      'INSERT INTO log_table (sender, content) VALUES ($1, $2) RETURNING *',
      [sender, content]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// 서버 시작
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
