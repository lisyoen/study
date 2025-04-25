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
  host: process.env.POSTGRES_HOSTNAME ?? 'localhost',
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
  const data = req.body.data;
  const email = req.query.email as string;
  const userId = req.query.userid as string; // userid 쿼리 파라미터 추가

  try {
    const timestamp = data.timestamp ? new Date(data.timestamp).getTime() : null; // timestamp 변환
    const maxPromptTokens = data.maxPromptTokens ? parseInt(data.maxPromptTokens, 10) : null; // 정수 변환
    const debounceDelay = data.debounceDelay ? parseFloat(data.debounceDelay) : null; // 실수 변환
    const maxSuffixPercentage = data.maxSuffixPercentage ? parseFloat(data.maxSuffixPercentage) : null; // 실수 변환
    const prefixPercentage = data.prefixPercentage ? parseFloat(data.prefixPercentage) : null; // 실수 변환
    const slidingWindowPrefixPercentage = data.slidingWindowPrefixPercentage ? parseFloat(data.slidingWindowPrefixPercentage) : null; // 실수 변환
    const slidingWindowSize = data.slidingWindowSize ? parseInt(data.slidingWindowSize, 10) : null; // 정수 변환

    const values = [
      timestamp, userId ?? data.userId ?? null, data.userAgent ?? null, 
      data.eventName ?? null, data.schema ?? null, maxPromptTokens, 
      debounceDelay, maxSuffixPercentage, prefixPercentage, 
      data.transform ?? null, data.multilineCompletions ?? null, slidingWindowPrefixPercentage, 
      slidingWindowSize, data.prompt ?? null, data.completion ?? null, 
      data.modelProvider ?? null, data.modelName ?? null, data.filepath ?? null, 
      data.gitRepo ?? null, data.completionId ?? null
    ];

    // 입력할 필드를 콘솔에 출력
    console.log('Inserting the following data into log_table:', values);

    const query = `
      INSERT INTO log_table (
        timestamp, user_id, user_agent, event_name, schema_version, max_prompt_tokens, debounce_delay, 
        max_suffix_percentage, prefix_percentage, transform, multiline_completions, 
        sliding_window_prefix_percentage, sliding_window_size, prompt, completion, 
        model_provider, model_name, filepath, git_repo, completion_id
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
      ) RETURNING *;
    `;

    const result: QueryResult = await pool.query(query, values);
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