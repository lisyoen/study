import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';

type Log = {
  timestamp: number;
  event_name: string;
};

export default function RealtimeChart() {
  const [logs, setLogs] = useState<Log[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/logs/realtime');
        setLogs(res.data.reverse()); // 최신 로그를 시간순 정렬
      } catch (err) {
        console.error('로그 가져오기 실패:', err);
      }
    };

    fetchData(); // 초기 1회

    const interval = setInterval(fetchData, 5000); // 5초마다 갱신
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', height: 400 }}>
      <LineChart width={800} height={400} data={logs}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="timestamp"
          tickFormatter={(ts) => new Date(ts).toLocaleTimeString()}
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="event_name" stroke="#8884d8" />
      </LineChart>
    </div>
  );
}
