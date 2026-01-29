# KalStream Decryption API

خدمة API مستقلة لفك تشفير Videasy و Hahoy

## Endpoints

### Videasy Decryption
```
POST /api/dec-videasy
Content-Type: application/json

{
  "text": "encrypted_string",
  "id": "tmdb_id"
}
```

### Hahoy Decryption
```
POST /api/dec-hahoy
Content-Type: application/json

{
  "text": "encrypted_string"
}
```

## Response Format
```json
{
  "status": 200,
  "result": {
    "sources": [...],
    "subtitles": [...]
  }
}
```

## Deployment
```bash
npm install
netlify deploy --prod
```
