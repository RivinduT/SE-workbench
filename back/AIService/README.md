# AIService Package

This package handles the two-stage AI architecture generation process.

## Structure

```
AIService/
├── __init__.py                  # Package initialization
├── ai_architect_service.py      # Main AI service class
└── README.md                    # This file
```

## Components

### `AIArchitectService` Class

Main class that orchestrates the two-stage generation:

**Methods:**
- `format_user_requirements(request_data)` - Formats user input into readable text
- `enhance_with_gemini(user_requirements)` - Stage 1: Enhances with Gemini
- `generate_with_deepseek(enhanced_prompt)` - Stage 2: Generates architecture
- `generate_architecture(request_data)` - Full orchestration of both stages

### `ai_service` Instance

Singleton instance of `AIArchitectService` ready to use.

## Usage

```python
from AIService import ai_service

# Generate architecture
result = await ai_service.generate_architecture(request_data)
```

## Configuration

Requires environment variables in `.env`:
```bash
GEMINI_API_KEY=your_key
DEEPSEEK_API_KEY=your_key
GEMINI_MODEL=gemini-1.5-flash  # Optional
DEEPSEEK_MODEL=deepseek-chat   # Optional
```

## Two-Stage Process

### Stage 1: Gemini Enhancement
- Takes raw user requirements
- Uses hardcoded prompt template
- Returns detailed, structured prompt

### Stage 2: DeepSeek Generation
- Takes enhanced prompt
- Generates complete architecture
- Returns JSON with components, patterns, reasoning

## Dependencies

- `google-generativeai` - For Gemini API
- `openai` - For DeepSeek API (OpenAI-compatible)
