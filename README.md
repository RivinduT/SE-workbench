# Solution Architect Workbench 🌠

An AI-powered tool that generates comprehensive solution architectures from high-level user requirements using a two-stage AI approach.

## 🎯 What It Does

1. **Collects Requirements**: Interactive wizard guides users through 6 steps to gather project details
2. **Enhances with Gemini**: AI refines raw input into detailed, structured prompts
3. **Generates with DeepSeek**: AI creates complete solution architecture with reasoning
4. **Provides Results**: Components, patterns, recommendations, and trade-offs

## 🚀 Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- Gemini API key ([Get one](https://ai.google.dev/))
- DeepSeek API key ([Get one](https://platform.deepseek.com/))

### 1. Clone & Setup

```bash
git clone <your-repo>
cd SE-workbench
```

### 2. Backend Setup

```powershell
cd back
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Add your API keys to .env
# GEMINI_API_KEY=your_key
# DEEPSEEK_API_KEY=your_key

uvicorn main:app --reload
```

✅ Backend: http://localhost:8000

### 3. Frontend Setup

```powershell
cd front
npm install
npm run dev
```

✅ Frontend: http://localhost:5173

## 📚 Documentation

### Getting Started
- 📖 **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - **START HERE** - Overview & quick start
- 📖 **[AI_SETUP_GUIDE.md](AI_SETUP_GUIDE.md)** - Detailed setup instructions
- 📖 **[QUICK_START.md](QUICK_START.md)** - Quick reference guide

### Understanding the System  
- 📖 **[TWO_STAGE_VISUAL_GUIDE.md](TWO_STAGE_VISUAL_GUIDE.md)** - Visual flow diagrams
- 📖 **[DATA_FLOW.md](DATA_FLOW.md)** - Complete data flow explanation
- 📖 **[INTEGRATION_GUIDE.md](INTEGRATION_GUIDE.md)** - Technical integration details

### Troubleshooting
- 🔧 **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** - Common issues & solutions

## 🏗️ Architecture

### Two-Stage AI Pipeline

```
User Input (Wizard)
        ↓
Stage 1: Gemini
  → Enhances requirements into detailed prompt
        ↓
Stage 2: DeepSeek  
  → Generates complete solution architecture
        ↓
Structured Results (JSON)
```

### Tech Stack

**Frontend**:
- React + TypeScript
- Vite
- TailwindCSS
- shadcn/ui components

**Backend**:
- FastAPI (Python)
- Pydantic for validation
- Google Generative AI (Gemini)
- OpenAI SDK (for DeepSeek)

## 📁 Project Structure

```
SE-workbench/
├── front/                      # React frontend
│   ├── src/
│   │   ├── pages/
│   │   │   └── Index.tsx      # Main wizard component
│   │   ├── lib/
│   │   │   └── api.ts         # API client
│   │   └── components/
│   │       └── wizard/        # Wizard step components
│   └── .env                   # Frontend config
│
├── back/                       # FastAPI backend
│   ├── main.py                # API endpoints
│   ├── ai_service.py          # Two-stage AI logic
│   ├── requirements.txt       # Python dependencies
│   └── .env                   # API keys
│
└── docs/                       # Documentation
    ├── IMPLEMENTATION_COMPLETE.md
    ├── AI_SETUP_GUIDE.md
    ├── TWO_STAGE_VISUAL_GUIDE.md
    └── TROUBLESHOOTING.md
```

## 🎨 Features

- ✅ **6-Step Wizard**: Guides users through requirements gathering
- ✅ **AI-Powered**: Gemini + DeepSeek for intelligent architecture generation
- ✅ **Type-Safe**: TypeScript frontend, Pydantic backend
- ✅ **Real-time Feedback**: Loading states and error handling
- ✅ **Comprehensive Output**: Components, patterns, reasoning, recommendations, trade-offs
- ✅ **Cost Effective**: ~$0.01 per generation

## 🎯 Usage

1. Open http://localhost:5173
2. Fill in the wizard:
   - **Step 1**: Project description
   - **Step 2**: Quality goals (performance, scalability, security)
   - **Step 3**: Business drivers (budget, timeline, goals)
   - **Step 4**: Technical rules (technologies, skills, compliance)
   - **Step 5**: Additional requirements
   - **Step 6**: Review and generate
3. Click "Let's Generate My Architecture!"
4. View generated architecture in console (UI display coming soon!)

## 🔬 Example Output

```json
{
  "architecture": {
    "overview": "A cloud-native microservices architecture...",
    "components": [
      {
        "name": "API Gateway",
        "technology": "Kong on Kubernetes",
        "reasoning": "Centralized auth, rate limiting..."
      }
    ],
    "patterns": ["Microservices", "Event-Driven", "CQRS"],
    "reasoning": "Balances scalability and team autonomy..."
  },
  "recommendations": [
    "Implement monitoring from day one",
    "Use feature flags for gradual rollouts"
  ],
  "tradeoffs": [
    "Microservices add complexity but enable scalability"
  ]
}
```

## 💰 Cost

- **Gemini (Stage 1)**: ~$0.0001 per generation
- **DeepSeek (Stage 2)**: ~$0.006 per generation
- **Total**: ~$0.01 per architecture

Very affordable for production use!

## 🧪 Testing

### Backend Test
```powershell
cd back
.\venv\Scripts\Activate.ps1
python test_api.py
```

### API Documentation
http://localhost:8000/docs (Swagger UI)

### Health Check
http://localhost:8000/health

## 🔐 Security

- API keys stored in `.env` (never committed)
- CORS configured for localhost
- Input validation with Pydantic
- For production: Add authentication, HTTPS, rate limiting

## 🛠️ Development

### Backend
```powershell
cd back
.\venv\Scripts\Activate.ps1
uvicorn main:app --reload
```

### Frontend
```powershell
cd front
npm run dev
```

### Environment Variables

**Backend** (`back/.env`):
```bash
GEMINI_API_KEY=your_key
DEEPSEEK_API_KEY=your_key
GEMINI_MODEL=gemini-1.5-flash
DEEPSEEK_MODEL=deepseek-chat
```

**Frontend** (`front/.env`):
```bash
VITE_API_URL=http://localhost:8000
```

## 📝 Next Steps

- [ ] Display architecture in UI (not just console)
- [ ] Add export functionality (PDF, JSON, Markdown)
- [ ] Save architecture history
- [ ] Allow iterative refinement
- [ ] Generate architecture diagrams
- [ ] Add cost estimation
- [ ] Create implementation roadmap

## 🐛 Troubleshooting

See **[TROUBLESHOOTING.md](TROUBLESHOOTING.md)** for common issues and solutions.

Quick checks:
1. API keys in `back/.env`?
2. Backend running on port 8000?
3. Frontend running on port 5173?
4. Dependencies installed?
5. Virtual environment activated?

## 📄 License

[Add your license here]

## 👥 Contributors

[Add contributors here]

## 🙏 Acknowledgments

- **Gemini**: Google's AI for prompt enhancement
- **DeepSeek**: Affordable, powerful architecture generation
- **FastAPI**: Modern Python web framework
- **React**: Frontend framework
- **shadcn/ui**: Beautiful UI components

---

**Ready to generate AI-powered solution architectures!** 🚀

For detailed setup instructions, see [IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)
