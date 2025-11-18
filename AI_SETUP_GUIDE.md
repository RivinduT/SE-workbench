# Two-Stage AI Architecture Generation Setup

## Overview

This implementation uses a **two-stage approach** for generating solution architectures:

### Stage 1: Gemini API - Prompt Enhancement
- Takes raw user requirements from the frontend
- Uses a hardcoded enhancement prompt to transform the requirements
- Generates a detailed, comprehensive prompt for architecture generation
- Output: Enhanced, structured prompt

### Stage 2: DeepSeek API - Architecture Generation  
- Takes the enhanced prompt from Stage 1
- Generates the complete solution architecture
- Provides components, patterns, recommendations, and tradeoffs
- Output: Structured JSON with full architecture details

## Why This Approach?

1. **Better Quality**: Gemini refines and structures the user input
2. **Cost Effective**: DeepSeek is more affordable for the heavy generation
3. **Separation of Concerns**: Each AI does what it's best at
4. **Flexibility**: Easy to swap out either stage if needed

## Setup Instructions

### 1. Get API Keys

#### Gemini API Key
1. Go to [Google AI Studio](https://ai.google.dev/)
2. Click "Get API Key"
3. Create a new API key
4. Copy the key

#### DeepSeek API Key
1. Go to [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new API key
5. Copy the key

### 2. Configure Environment Variables

Edit `back/.env` file:

```bash
# Required API Keys
GEMINI_API_KEY=your_actual_gemini_api_key_here
DEEPSEEK_API_KEY=your_actual_deepseek_api_key_here

# Optional: Model configurations (defaults shown)
GEMINI_MODEL=gemini-1.5-flash
DEEPSEEK_MODEL=deepseek-chat
```

**Important**: Replace `your_actual_gemini_api_key_here` and `your_actual_deepseek_api_key_here` with your real API keys!

### 3. Install Dependencies

```powershell
cd back
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

This will install:
- `fastapi` - Web framework
- `uvicorn` - ASGI server
- `pydantic` - Data validation
- `python-dotenv` - Environment variable loading
- `google-generativeai` - Gemini API client
- `openai` - DeepSeek API client (DeepSeek uses OpenAI-compatible API)

### 4. Run the Backend

```powershell
cd back
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

You should see:
```
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
INFO:     Started reloader process
INFO:     Started server process
INFO:     Waiting for application startup.
INFO:     Application startup complete.
```

### 5. Test the Backend

Option 1 - Using the test script:
```powershell
cd back
.\venv\Scripts\Activate.ps1
python test_api.py
```

Option 2 - Using the API docs:
1. Open browser: `http://localhost:8000/docs`
2. Try the `/health` endpoint
3. Try the `/api/generate-architecture` endpoint with sample data

### 6. Run the Frontend

In a separate terminal:
```powershell
cd front
npm install
npm run dev
```

Open `http://localhost:5173` in your browser.

## How It Works

### Data Flow

```
User fills wizard steps 1-6
        ↓
Frontend collects all data
        ↓
Clicks "Let's Generate My Architecture!"
        ↓
POST request to /api/generate-architecture
        ↓
Backend receives request
        ↓
┌─────────────────────────────────────────┐
│  STAGE 1: Gemini Prompt Enhancement     │
├─────────────────────────────────────────┤
│ 1. Format user requirements             │
│ 2. Create enhancement prompt            │
│ 3. Send to Gemini API                   │
│ 4. Receive enhanced prompt              │
└─────────────────────────────────────────┘
        ↓
Enhanced, detailed prompt
        ↓
┌─────────────────────────────────────────┐
│  STAGE 2: DeepSeek Architecture Gen     │
├─────────────────────────────────────────┤
│ 1. Send enhanced prompt to DeepSeek     │
│ 2. DeepSeek generates architecture      │
│ 3. Parse JSON response                  │
│ 4. Validate structure                   │
└─────────────────────────────────────────┘
        ↓
Complete architecture with:
- Components & technologies
- Patterns & reasoning
- Recommendations
- Tradeoffs
        ↓
Return to frontend
        ↓
Display success + console log
```

## File Structure

```
back/
├── main.py              # FastAPI app and endpoints
├── AIService/           # Two-stage AI generation package
│   ├── ai_architect_service.py  # AI generation logic
│   ├── __init__.py              # Package initialization
│   └── README.md                # Package documentation
├── requirements.txt     # Python dependencies
├── .env                 # Your API keys (DO NOT COMMIT)
├── .env.example         # Template for .env
├── test_api.py          # Backend testing script
└── README.md            # Backend documentation
```

## The AI Service (AIService Package)

### Package Structure

```
AIService/
├── __init__.py                  # Package exports
├── ai_architect_service.py      # Main AI logic
└── README.md                    # Package docs
```

### Key Functions

#### `format_user_requirements(request_data)`
Formats the collected wizard data into a readable text format for Gemini.

#### `enhance_with_gemini(user_requirements)`
**Stage 1**: Sends user requirements + hardcoded enhancement prompt to Gemini.
Returns an enhanced, detailed prompt.

#### `generate_with_deepseek(enhanced_prompt)`
**Stage 2**: Sends enhanced prompt to DeepSeek.
Returns structured JSON with complete architecture.

#### `generate_architecture(request_data)`
**Main orchestrator**: Runs both stages in sequence.

## Customizing the Enhancement Prompt

The hardcoded prompt for Gemini is in `AIService/ai_architect_service.py` at the `enhance_with_gemini` method:

```python
enhancement_prompt = f"""You are an expert solution architect prompt engineer...
```

You can modify this prompt to:
- Change the focus areas
- Add specific requirements
- Adjust the output format
- Include additional context

## Console Output

When generating architecture, you'll see detailed console output:

```
================================================================================
STARTING TWO-STAGE ARCHITECTURE GENERATION
================================================================================

Stage 0: Formatting user requirements...

Stage 1: Enhancing prompt with Gemini...
================================================================================
STAGE 1 - GEMINI ENHANCED PROMPT:
================================================================================
[Enhanced prompt content here]
================================================================================

Stage 2: Generating architecture with DeepSeek...
================================================================================
STAGE 2 - DEEPSEEK RAW RESPONSE:
================================================================================
[Architecture JSON here]
================================================================================

================================================================================
ARCHITECTURE GENERATION COMPLETE
================================================================================
```

This helps you debug and understand what's happening at each stage.

## Error Handling

### "GEMINI_API_KEY not configured"
- Check your `.env` file has the correct key
- Make sure you've activated the virtual environment
- Restart the server after adding the key

### "DEEPSEEK_API_KEY not configured"
- Check your `.env` file has the correct key
- Make sure you've activated the virtual environment
- Restart the server after adding the key

### "Import 'google.generativeai' could not be resolved"
- Run `pip install -r requirements.txt` in your virtual environment
- Make sure the virtual environment is activated

### CORS errors
- Ensure frontend is running on `http://localhost:5173`
- Check CORS configuration in `main.py`

## API Rate Limits

### Gemini (Free Tier)
- 15 requests per minute
- 1,500 requests per day
- 1 million tokens per minute

### DeepSeek
- Check [DeepSeek pricing](https://platform.deepseek.com/pricing)
- Generally affordable, about $0.14 per million tokens

## Cost Estimate

For typical architecture generation:
- **Gemini Stage 1**: ~1,000 tokens (essentially free)
- **DeepSeek Stage 2**: ~4,000 tokens output (very low cost)
- **Total per generation**: < $0.01

## Testing

### Test Health Check
```bash
curl http://localhost:8000/health
```

### Test Architecture Generation
```bash
python test_api.py
```

### Test via Swagger UI
1. Open `http://localhost:8000/docs`
2. Expand `/api/generate-architecture`
3. Click "Try it out"
4. Modify the example JSON
5. Click "Execute"

## Troubleshooting

### Backend won't start
1. Check virtual environment is activated
2. Check all dependencies installed: `pip list`
3. Check .env file exists and has API keys
4. Check port 8000 is not in use

### Frontend can't connect
1. Check backend is running on port 8000
2. Check CORS settings in main.py
3. Check .env in frontend has correct API URL

### AI generation fails
1. Verify API keys are correct
2. Check API rate limits
3. Check console output for detailed error
4. Verify internet connection

### JSON parsing error
1. Check DeepSeek response in console
2. Ensure response_format is set correctly
3. May need to adjust system prompt

## Next Steps

1. **Test with your API keys** - Get real AI-generated architectures
2. **Customize prompts** - Adjust the enhancement prompt for your needs
3. **Add result display** - Show the architecture nicely in the frontend
4. **Add export feature** - Let users download as PDF/JSON
5. **Add history** - Store and retrieve previous generations
6. **Add iterations** - Allow refining the architecture

## Security Notes

- **Never commit .env file** - It's in .gitignore
- **Rotate API keys** regularly
- **Use environment-specific keys** for production
- **Add rate limiting** for production deployment
- **Add authentication** to protect your API

## Support

- **Gemini Documentation**: https://ai.google.dev/docs
- **DeepSeek Documentation**: https://platform.deepseek.com/docs
- **FastAPI Documentation**: https://fastapi.tiangolo.com/

---

**You're ready to generate AI-powered solution architectures! 🚀**
