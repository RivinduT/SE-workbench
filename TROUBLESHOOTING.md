# 🔧 Troubleshooting Guide

## Common Issues and Solutions

### 1. Backend Won't Start

#### Error: "Import 'google.generativeai' could not be resolved"
**Cause**: Dependencies not installed

**Solution**:
```powershell
cd back
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Make sure you see:
```
Successfully installed google-generativeai-0.8.3
Successfully installed openai-1.54.3
```

#### Error: "GEMINI_API_KEY not configured"
**Cause**: Missing or incorrect API key in .env

**Solution**:
1. Check `back/.env` file exists
2. Verify it contains: `GEMINI_API_KEY=your_actual_key`
3. Make sure there are no quotes around the key
4. Restart the backend server

**Correct format**:
```bash
GEMINI_API_KEY=AIzaSyABC123def456GHI789jkl
DEEPSEEK_API_KEY=sk-abc123def456
```

**Incorrect format**:
```bash
GEMINI_API_KEY="AIzaSy..."  # ❌ No quotes
GEMINI_API_KEY = AIzaSy...  # ❌ No spaces around =
```

#### Error: "Port 8000 already in use"
**Cause**: Another process using port 8000

**Solution**:
```powershell
# Find what's using port 8000
netstat -ano | findstr :8000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F

# Or use a different port
uvicorn main:app --reload --port 8001
```

---

### 2. Frontend Can't Connect to Backend

#### Error: "Failed to generate architecture. Please check if backend is running"
**Cause**: Backend not running or wrong URL

**Solution**:
1. Check backend is running: http://localhost:8000/health
2. Check `front/.env` has: `VITE_API_URL=http://localhost:8000`
3. Restart frontend dev server after changing .env

#### Error: CORS Policy Error
**Cause**: Frontend URL not in CORS allowed origins

**Solution**:
Edit `back/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # ✅ Add your frontend URL
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

Restart backend after changes.

---

### 3. AI Generation Errors

#### Error: "Gemini API error: API key not valid"
**Cause**: Invalid or expired API key

**Solution**:
1. Go to https://ai.google.dev/
2. Generate a new API key
3. Update `back/.env`
4. Restart backend

#### Error: "DeepSeek API error: Authentication failed"
**Cause**: Invalid or expired API key

**Solution**:
1. Go to https://platform.deepseek.com/
2. Check your API key
3. Generate new one if needed
4. Update `back/.env`
5. Restart backend

#### Error: "Rate limit exceeded"
**Cause**: Too many requests to AI APIs

**Solution**:
- **Gemini Free Tier**: 15 requests/minute
- Wait a minute and try again
- Or upgrade to paid tier

#### Error: "Failed to parse DeepSeek response as JSON"
**Cause**: DeepSeek didn't return valid JSON

**Solution**:
Check backend console for the raw response. The system prompt might need adjustment:

Edit `back/ai_service.py` in `generate_with_deepseek()`:
```python
response = self.deepseek.chat.completions.create(
    model=self.deepseek_model,
    messages=[...],
    temperature=0.7,  # Try lowering to 0.5
    max_tokens=4000,
    response_format={"type": "json_object"}  # ✅ Ensures JSON
)
```

---

### 4. Virtual Environment Issues

#### Error: "venv\Scripts\Activate.ps1 cannot be loaded"
**Cause**: PowerShell execution policy

**Solution**:
```powershell
# Check current policy
Get-ExecutionPolicy

# Set policy (as Administrator)
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser

# Or use this method to activate
python -m venv venv
venv\Scripts\python.exe -m pip install -r requirements.txt
venv\Scripts\python.exe -m uvicorn main:app --reload
```

#### Error: "No module named 'fastapi'"
**Cause**: Virtual environment not activated

**Solution**:
```powershell
cd back
.\venv\Scripts\Activate.ps1  # You should see (venv) in prompt
pip install -r requirements.txt
```

---

### 5. Frontend Issues

#### Error: "Module not found: @/lib/api"
**Cause**: TypeScript path alias not resolved

**Solution**:
```powershell
# Restart the dev server
# Press Ctrl+C to stop
npm run dev
```

If still doesn't work:
```powershell
# Clear cache and reinstall
rm -r node_modules
rm package-lock.json
npm install
npm run dev
```

#### Error: "import.meta.env.VITE_API_URL is undefined"
**Cause**: .env file not loaded

**Solution**:
1. Check `front/.env` exists
2. Restart dev server (Vite only loads .env on startup)
3. Check file is named exactly `.env` not `.env.txt`

---

### 6. Network & Connection Issues

#### Error: "fetch failed" or "ECONNREFUSED"
**Cause**: Network connectivity issues

**Solution**:
```powershell
# Test backend directly
curl http://localhost:8000/health

# Or in PowerShell
Invoke-WebRequest -Uri http://localhost:8000/health

# Check if backend is actually running
netstat -ano | findstr :8000
```

---

### 7. Python Version Issues

#### Error: "Python was not found"
**Cause**: Python not installed or not in PATH

**Solution**:
1. Download Python 3.9+ from https://www.python.org/
2. During installation, check "Add Python to PATH"
3. Verify: `python --version`

#### Error: "async/await syntax error"
**Cause**: Python version too old

**Solution**:
```powershell
python --version  # Should be 3.7+
```

If too old, install newer Python version.

---

### 8. Package Installation Issues

#### Error: "Could not find a version that satisfies the requirement"
**Cause**: Package version not available

**Solution**:
```powershell
# Update pip first
python -m pip install --upgrade pip

# Then install requirements
pip install -r requirements.txt

# If specific package fails, try without version pin
pip install fastapi uvicorn pydantic python-dotenv google-generativeai openai
```

---

### 9. Testing Issues

#### Error: "test_api.py fails"
**Cause**: Backend not running or dependencies missing

**Solution**:
```powershell
# Make sure backend is running in another terminal
cd back
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload

# Then in new terminal
cd back
.\venv\Scripts\Activate.ps1
python test_api.py
```

---

### 10. API Response Issues

#### Error: "Architecture result is empty"
**Cause**: Frontend not storing result properly

**Solution**:
Check browser console for errors. The result should be logged:
```javascript
console.log("Generated Architecture:", result);
```

If you see the result in console but `architectureResult` state is null, check:
```typescript
setArchitectureResult(result); // This should be called
```

---

## 🔍 Debugging Tips

### 1. Enable Verbose Logging

In `back/ai_service.py`, the code already logs each stage:
```python
print("\n" + "="*80)
print("STAGE 1 - GEMINI ENHANCED PROMPT:")
print("="*80)
print(enhanced_prompt)
```

### 2. Check Browser DevTools

**Console Tab**: Shows frontend errors and logs
**Network Tab**: Shows API requests/responses
**Application Tab**: Shows environment variables

### 3. Check Backend Console

Shows:
- Request received
- Stage 1 output
- Stage 2 output
- Any errors

### 4. Test API Directly

Using PowerShell:
```powershell
$body = @{
    projectDescription = "Test project"
    qualityGoals = @{
        responseTime = "Fast"
        throughput = "High"
        expectedUsers = 1000
        dataVolume = "Large"
        growthRate = "20%"
        uptime = "99.9%"
        downtimeTolerance = "Low"
        disasterRecovery = "Yes"
        securityNeeds = @("Encryption")
        authNeeds = "OAuth2"
        deployFrequency = "weekly"
        teamStructure = "single"
        audience = "public"
        accessibilityNeeds = "WCAG"
    }
    businessDrivers = @{
        primaryGoal = "revenue"
        devBudget = "$100k"
        opsBudget = "$20k"
        launchDate = "6 months"
        geography = "single"
    }
    technicalRules = @{
        mandatoryTech = @("React", "Node.js")
        teamSkills = "JavaScript"
        integrations = "None"
        regulations = "GDPR"
        dataResidency = "none"
    }
    additionalInfo = @{
        additionalRequirements = "None"
    }
} | ConvertTo-Json -Depth 10

Invoke-WebRequest -Uri "http://localhost:8000/api/generate-architecture" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

### 5. Check File Permissions

Make sure `.env` file is readable:
```powershell
# Check if file exists
Test-Path back\.env

# View content (masks will show actual keys)
Get-Content back\.env
```

---

## 📋 Pre-flight Checklist

Before running, verify:

- [ ] Python 3.9+ installed: `python --version`
- [ ] Node.js installed: `node --version`
- [ ] Virtual environment created: `back/venv/` exists
- [ ] Dependencies installed: `pip list` shows all packages
- [ ] API keys in `back/.env`
- [ ] Frontend env in `front/.env`
- [ ] Backend running on port 8000
- [ ] Frontend running on port 5173
- [ ] No CORS errors in browser console
- [ ] `/health` endpoint returns success

---

## 🆘 Still Having Issues?

### Check These Files

1. **Backend Configuration**
   - `back/.env` - API keys present and valid?
   - `back/main.py` - CORS settings correct?
   - `back/ai_service.py` - No syntax errors?

2. **Frontend Configuration**
   - `front/.env` - API URL correct?
   - `front/src/lib/api.ts` - Endpoint paths correct?
   - `front/src/pages/Index.tsx` - handleSubmit calls API?

3. **Dependencies**
   - `back/requirements.txt` - All packages listed?
   - `front/package.json` - All dependencies present?

### Verify Installation

```powershell
# Backend
cd back
.\venv\Scripts\Activate.ps1
pip list | findstr "fastapi google-generativeai openai"

# Frontend
cd front
npm list | findstr "react vite"
```

### Start Fresh (Last Resort)

```powershell
# Backend
cd back
rm -r venv
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Frontend
cd front
rm -r node_modules
npm install
```

---

## 📞 Error Code Reference

| Error Code | Meaning | Solution |
|------------|---------|----------|
| 500 | Internal Server Error | Check backend logs |
| 422 | Validation Error | Check request data format |
| 404 | Not Found | Check API URL in .env |
| 403 | Forbidden | Check CORS settings |
| 401 | Unauthorized | Check API keys |

---

**Most issues are solved by**:
1. Checking API keys in `.env`
2. Restarting backend/frontend
3. Reinstalling dependencies
4. Checking console logs

Good luck! 🍀
