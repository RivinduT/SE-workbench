# Two-Stage Architecture Generation - Visual Guide

## 🎯 The Two-Stage Process

```
┌────────────────────────────────────────────────────────────────────────┐
│                          USER FILLS WIZARD                             │
│  Step 1-6: Project description, quality goals, business drivers, etc. │
└────────────────────────────────────────────────────────────────────────┘
                                    ↓
                    Clicks "Let's Generate My Architecture!"
                                    ↓
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Index.tsx)                            │
│  • Collects all wizard data                                            │
│  • Calls generateArchitecture() API                                    │
│  • Shows loading state                                                 │
└────────────────────────────────────────────────────────────────────────┘
                                    ↓
                          POST /api/generate-architecture
                                    ↓
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (main.py)                               │
│  • Receives request                                                    │
│  • Validates data with Pydantic                                        │
│  • Passes to AI Service                                                │
└────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌────────────────────────────────────────────────────────────────────────┐
│                    AI SERVICE (ai_service.py)                          │
│                                                                         │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  STAGE 0: FORMAT USER REQUIREMENTS                           │    │
│  │  • Extract all wizard data                                   │    │
│  │  • Format into readable text structure                       │    │
│  │  • Include all quality goals, business drivers, etc.         │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                    ↓                                    │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  STAGE 1: GEMINI PROMPT ENHANCEMENT                          │    │
│  │  ╔═══════════════════════════════════════════════════════╗  │    │
│  │  ║  HARDCODED ENHANCEMENT PROMPT                         ║  │    │
│  │  ║  "You are an expert solution architect prompt         ║  │    │
│  │  ║   engineer. Transform these requirements into a       ║  │    │
│  │  ║   comprehensive prompt that will generate a           ║  │    │
│  │  ║   complete solution architecture..."                  ║  │    │
│  │  ╚═══════════════════════════════════════════════════════╝  │    │
│  │                          +                                   │    │
│  │              Formatted User Requirements                     │    │
│  │                          ↓                                   │    │
│  │                   🤖 GEMINI API 🤖                          │    │
│  │                          ↓                                   │    │
│  │  OUTPUT: Enhanced, Detailed, Structured Prompt              │    │
│  │  Example:                                                    │    │
│  │  "Design a highly scalable e-commerce architecture          │    │
│  │   supporting 50,000 concurrent users with <200ms response   │    │
│  │   time. Include microservices for inventory, payments,      │    │
│  │   user management. Must comply with PCI-DSS for payment     │    │
│  │   processing. Consider multi-region deployment..."          │    │
│  └──────────────────────────────────────────────────────────────┘    │
│                                    ↓                                    │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  STAGE 2: DEEPSEEK ARCHITECTURE GENERATION                   │    │
│  │  ╔═══════════════════════════════════════════════════════╗  │    │
│  │  ║  SYSTEM PROMPT                                        ║  │    │
│  │  ║  "You are an expert solution architect. Generate     ║  │    │
│  │  ║   a comprehensive architecture with components,      ║  │    │
│  │  ║   technologies, patterns, and detailed reasoning.    ║  │    │
│  │  ║   Respond in JSON format..."                         ║  │    │
│  │  ╚═══════════════════════════════════════════════════════╝  │    │
│  │                          +                                   │    │
│  │              Enhanced Prompt from Gemini                     │    │
│  │                          ↓                                   │    │
│  │                  🤖 DEEPSEEK API 🤖                         │    │
│  │                          ↓                                   │    │
│  │  OUTPUT: Complete Architecture (JSON)                       │    │
│  │  {                                                           │    │
│  │    "architecture": {                                         │    │
│  │      "overview": "...",                                      │    │
│  │      "components": [...],                                    │    │
│  │      "patterns": [...],                                      │    │
│  │      "reasoning": "..."                                      │    │
│  │    },                                                        │    │
│  │    "recommendations": [...],                                 │    │
│  │    "tradeoffs": [...]                                        │    │
│  │  }                                                           │    │
│  └──────────────────────────────────────────────────────────────┘    │
└────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (main.py)                               │
│  • Validates response structure                                       │
│  • Returns ArchitectureResponse                                       │
└────────────────────────────────────────────────────────────────────────┘
                                    ↓
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Index.tsx)                            │
│  • Receives architecture                                               │
│  • Shows success toast                                                │
│  • Logs to console                                                    │
│  • (Future: Display in UI)                                            │
└────────────────────────────────────────────────────────────────────────┘
```

## 🔑 Why Two Stages?

### Stage 1: Gemini - The Enhancer
**Role**: Transform raw user input into expert-level architectural requirements

**Input**: 
- Raw wizard data (may be incomplete or vague)
- Example: "Build an e-commerce site, needs to be fast"

**Output**: 
- Detailed, structured prompt
- Example: "Design a microservices-based e-commerce platform supporting 50K users with sub-200ms response times, PCI-DSS compliance, multi-region deployment, considering team skills in Node.js..."

**Why Gemini?**
- Excellent at understanding context
- Good at structured thinking
- Fast and cost-effective
- Great for prompt engineering

### Stage 2: DeepSeek - The Architect
**Role**: Generate comprehensive solution architecture

**Input**: 
- Enhanced prompt from Gemini
- Already well-structured and detailed

**Output**: 
- Complete architecture specification
- Components with technology choices
- Architectural patterns
- Detailed reasoning
- Recommendations and tradeoffs

**Why DeepSeek?**
- Excellent technical reasoning
- Strong coding and architecture knowledge
- Very cost-effective
- Good JSON output
- Detailed explanations

## 💡 Example Flow

### User Input (Raw)
```
Project: Online marketplace for handmade crafts
Expected Users: 50,000
Response Time: Fast
Security: Need payment processing
```

### After Stage 1 (Gemini Enhanced)
```
Design a scalable marketplace architecture for handmade crafts with the following requirements:

PERFORMANCE:
- Support 50,000 concurrent users
- Target response time: <200ms for API calls
- Handle 1000 requests/second throughput
- Data volume: 100GB initial, 20% monthly growth

SECURITY & COMPLIANCE:
- PCI-DSS compliance for payment processing
- GDPR compliance for EU customers
- OAuth2 authentication with social login
- 2FA support
- End-to-end encryption for sensitive data

ARCHITECTURE REQUIREMENTS:
- Microservices-based for team scalability
- Multi-region deployment for global reach
- 99.9% uptime requirement
- RPO: 1 hour, RTO: 4 hours
- Support weekly deployments

INTEGRATIONS:
- Stripe and PayPal for payments
- Email service (SendGrid)
- SMS notifications
- Analytics dashboard

CONSTRAINTS:
- Team skills: JavaScript/TypeScript, Python, AWS
- Budget: $100K-$500K dev, $20K-$50K/month ops
- Launch timeline: 6 months
- Must support future mobile app

Please provide a comprehensive solution architecture including:
1. System components and their responsibilities
2. Technology stack with justifications
3. Architectural patterns
4. Scalability strategies
5. Security architecture
6. Deployment strategy
7. Trade-offs and decision rationale
```

### After Stage 2 (DeepSeek Generated)
```json
{
  "architecture": {
    "overview": "A cloud-native, microservices-based marketplace platform designed for scalability, security, and global reach...",
    "components": [
      {
        "name": "API Gateway (Kong)",
        "description": "Central entry point for all client requests",
        "technology": "Kong Gateway on AWS EKS",
        "reasoning": "Provides authentication, rate limiting, routing, and supports the 1000 req/s throughput requirement. Kong's plugin ecosystem enables PCI-DSS compliance features."
      },
      {
        "name": "User Service",
        "description": "Handles user authentication, profiles, and authorization",
        "technology": "Node.js (Express) + PostgreSQL",
        "reasoning": "Leverages team's TypeScript expertise. PostgreSQL ensures ACID compliance for user data. Integrates OAuth2 and supports social login requirements."
      },
      // ... more components
    ],
    "patterns": [
      "Microservices Architecture",
      "API Gateway Pattern",
      "CQRS with Event Sourcing",
      "Database per Service",
      "Circuit Breaker Pattern"
    ],
    "reasoning": "This architecture prioritizes scalability (50K users), security (PCI-DSS/GDPR), and team velocity (weekly deployments)..."
  },
  "recommendations": [
    "Implement comprehensive monitoring with Prometheus and Grafana from day one",
    "Use feature flags (LaunchDarkly) for gradual rollouts",
    "Set up multi-region active-active deployment for 99.9% uptime",
    // ... more recommendations
  ],
  "tradeoffs": [
    "Microservices add operational complexity but enable team autonomy and independent deployments",
    "Multi-region deployment increases costs but ensures global performance and disaster recovery",
    // ... more tradeoffs
  ]
}
```

## 🎨 Console Output Example

When you run the backend, you'll see:

```
================================================================================
STARTING TWO-STAGE ARCHITECTURE GENERATION
================================================================================

Stage 0: Formatting user requirements...

Stage 1: Enhancing prompt with Gemini...
================================================================================
STAGE 1 - GEMINI ENHANCED PROMPT:
================================================================================
Design a scalable marketplace architecture for handmade crafts with...
[Full enhanced prompt]
================================================================================

Stage 2: Generating architecture with DeepSeek...
================================================================================
STAGE 2 - DEEPSEEK RAW RESPONSE:
================================================================================
{
  "architecture": {
    "overview": "A cloud-native, microservices-based...",
    ...
  }
}
================================================================================

================================================================================
ARCHITECTURE GENERATION COMPLETE
================================================================================
```

## 📊 Performance & Cost

### Typical Request
- **Stage 1 (Gemini)**: ~1-2 seconds, ~1,000 tokens
- **Stage 2 (DeepSeek)**: ~5-10 seconds, ~4,000 tokens output
- **Total Time**: ~7-12 seconds
- **Total Cost**: < $0.01 per generation

### Rate Limits
- **Gemini Free Tier**: 15 requests/minute
- **DeepSeek**: Check your plan

## 🔧 Customization Points

### 1. Enhancement Prompt (ai_service.py)
Modify the hardcoded prompt in `enhance_with_gemini()`:
```python
enhancement_prompt = f"""You are an expert solution architect...
```

### 2. System Prompt for DeepSeek (ai_service.py)
Modify in `generate_with_deepseek()`:
```python
system_prompt = """You are an expert solution architect...
```

### 3. Model Selection (.env)
```bash
GEMINI_MODEL=gemini-1.5-pro  # More powerful but slower
DEEPSEEK_MODEL=deepseek-chat  # Current model
```

## 🚀 Ready to Use!

1. Add your API keys to `.env`
2. Install dependencies: `pip install -r requirements.txt`
3. Run backend: `uvicorn main:app --reload`
4. Run frontend: `npm run dev`
5. Fill the wizard and generate!

See `AI_SETUP_GUIDE.md` for detailed setup instructions.
