# API Documentation Template (React + Flask)

## Endpoint Summary

| Field | Value |
| --- | --- |
| Name | `<Human-readable action>` |
| Method | `GET/POST/PUT/PATCH/DELETE` |
| URL | `/v1/<resource>` |
| Auth | `<Bearer token / none>` |
| Description | `<One sentence>` |

## Request

### Headers
- `Content-Type: application/json`
- `Authorization: Bearer <token>` (if required)

### Body
```json
{}
```

## Response

### Success
```json
{
  "data": {}
}
```

### Error
```json
{
  "error": {
    "code": "invalid_request",
    "message": "Readable message",
    "details": {}
  }
}
```

## Notes
- List validation rules and edge cases.