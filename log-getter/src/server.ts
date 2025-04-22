import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors'; // 변경된 부분
import { Pool, PoolClient, QueryResult } from 'pg';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// PostgreSQL 연결 설정
const pool: Pool = new Pool({
  user: 'log-getter',
  host: 'localhost',
  database: 'log_db',
  password: 'test_password',
  port: 5432,
});

// welcome 메시지
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to the Log Getter API!');
});

// POST 요청 처리 
app.post('/data', async (req: Request, res: Response) => {
  const { sender, content }: { sender: string, content: string } = req.body;

  try {
    const result: QueryResult = await pool.query(
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
const PORT: number = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});