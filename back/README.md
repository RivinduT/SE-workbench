# FastAPI Backend for Solution Architect Workbench

This backend uses a **two-stage AI approach** for generating solution architectures:
1. **Gemini API**: Enhances user input into detailed, structured prompts
2. **DeepSeek API**: Generates comprehensive architecture from enhanced prompts

## Quick Start

### 1. Get API Keys

- **Gemini**: https://ai.google.dev/
- **DeepSeek**: https://platform.deepseek.com/

### 2. Configure Environment

Copy `.env.example` to `.env` and add your API keys:

```bash
GEMINI_API_KEY=your_actual_gemini_key
DEEPSEEK_API_KEY=your_actual_deepseek_key
```

### 3. Install Dependencies

```bash
python -m venv venv
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Windows CMD:
venv\Scripts\activate.bat

pip install -r requirements.txt
```

### 4. Run the Server

```bash
uvicorn main:app --reload
```

The API will be available at `http://localhost:8000`

## API Endpoints

### Health Check
- **GET** `/health`
- Returns the health status of the API

### Generate Architecture (Two-Stage AI)
- **POST** `/api/generate-architecture`
- **Stage 1**: Gemini enhances the user requirements
- **Stage 2**: DeepSeek generates the architecture
- Returns: Structured architecture with reasoning

## Architecture

```
User Request
    ↓
Format Requirements
    ↓
Stage 1: Gemini (Enhancement)
    ↓
Enhanced Prompt
    ↓
Stage 2: DeepSeek (Generation)
    ↓
Architecture Response
```

## Files

- `main.py` - FastAPI application and endpoints
- `AIService/` - Two-stage AI generation package
  - `ai_architect_service.py` - AI generation logic
  - `__init__.py` - Package initialization
  - `README.md` - Package documentation
- `test_api.py` - Test script for backend
- `requirements.txt` - Python dependencies
- `.env` - Your API keys (not committed)

## Testing

```bash
# Test with script
python test_api.py

# Or use Swagger UI
# Open: http://localhost:8000/docs
```

## Development

The backend uses:
- **FastAPI** for the web framework
- **Pydantic** for data validation
- **Google Generative AI** for Gemini integration
- **OpenAI SDK** for DeepSeek integration (DeepSeek uses OpenAI-compatible API)

## CORS Configuration

CORS is enabled for the frontend running on `http://localhost:5173` (Vite default port).

## For Complete Setup Guide

See `../AI_SETUP_GUIDE.md` for detailed instructions on:
- Getting API keys
- Customizing prompts
- Understanding the two-stage process
- Troubleshooting
- Cost estimates
