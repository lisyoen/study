DROP TABLE IF EXISTS log_table;

CREATE TABLE IF NOT EXISTS log_table (
  log_id SERIAL PRIMARY KEY, -- 자동 증가되는 log_id 필드
  timestamp BIGINT DEFAULT (EXTRACT(EPOCH FROM CURRENT_TIMESTAMP) * 1000), -- 밀리초 단위로 저장
  user_id VARCHAR(100), -- JSON 데이터의 data.userId 필드
  user_agent TEXT, -- JSON 데이터의 data.userAgent 필드
  event_name VARCHAR(100), -- JSON 데이터의 data.eventName 필드
  schema_version VARCHAR(10), -- JSON 데이터의 data.schema 필드
  max_prompt_tokens INT, -- JSON 데이터의 data.maxPromptTokens 필드
  debounce_delay INT, -- JSON 데이터의 data.debounceDelay 필드
  max_suffix_percentage FLOAT, -- JSON 데이터의 data.maxSuffixPercentage 필드
  prefix_percentage FLOAT, -- JSON 데이터의 data.prefixPercentage 필드
  transform BOOLEAN, -- JSON 데이터의 data.transform 필드
  multiline_completions VARCHAR(50), -- JSON 데이터의 data.multilineCompletions 필드
  sliding_window_prefix_percentage FLOAT, -- JSON 데이터의 data.slidingWindowPrefixPercentage 필드
  sliding_window_size INT, -- JSON 데이터의 data.slidingWindowSize 필드
  prompt TEXT, -- JSON 데이터의 data.prompt 필드
  completion TEXT, -- JSON 데이터의 data.completion 필드
  model_provider VARCHAR(100), -- JSON 데이터의 data.modelProvider 필드
  model_name VARCHAR(100), -- JSON 데이터의 data.modelName 필드
  filepath TEXT, -- JSON 데이터의 data.filepath 필드
  git_repo VARCHAR(100), -- JSON 데이터의 data.gitRepo 필드,
  completion_id VARCHAR(100), -- JSON 데이터의 data.completionId 필드
  num_lines INT DEFAULT 0 -- JSON 데이터의 data.numLines 필드, 기본값 0
);

CREATE INDEX idx_log_id ON log_table (log_id);
CREATE INDEX idx_user_id ON log_table (user_id);
