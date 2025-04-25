* 초기화

```bash
$ npm install
```

* 빌드

```bash
$ npm run build
```

* 실행

```bash
$ npm run start
```

* 디버깅 실행

```bash
$ npm run debug
```

* 배포

```bash
$ npm run deploy
```

* DB 초기화

윈도우의 경우
```bash
> type initdb.sql | docker exec -i log-db psql -U log-getter -d log_db
```

리눅스의 경우
```bash
$ cat initdb.sql | docker exec -i log-db psql -U log-getter -d log_db
```

* 재배포

```bash
$ npm run deploy
```

* 특정 컨테이너 중지 및 시작

```bash
$ npm run stop-log-getter
$ npm run start-log-getter
```
