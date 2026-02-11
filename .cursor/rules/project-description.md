---
alwaysApply: true
---

# AI Voice Assistant Project Description

## Overview

This repository contains an AI voice assistant system with:

- A **React + TypeScript** admin frontend (Vite + Tailwind).
- A **Python/Flask** webhook service for Twilio media streams and OpenAI realtime.
- **Terraform** infrastructure for EC2/ECR/SSM and DynamoDB configuration.

## Core Features

### Voice/Webhook Service

- Twilio Media Stream WebSocket endpoint
- OpenAI realtime session orchestration
- Health/metrics endpoints for monitoring

### Admin Frontend

- Admin dashboard and navigation
- Agents configuration UI (static for now)
- Metrics, maintenance, and tickets views

### Infrastructure

- EC2 instance deployment with Docker
- ECR image pull + systemd service
- DynamoDB table for agent configuration storage

## Technical Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Python 3.11, Flask, Gunicorn, WebSockets
- **Infrastructure**: Terraform (AWS EC2, ECR, SSM, DynamoDB)

## Design Considerations

- Runtime stability for voice streaming
- Type-safe frontend patterns (use `import type` for type-only imports)
- Keep infra changes declarative and validated

This is a production-oriented voice assistant stack optimized for reliability and iterative UI development.
