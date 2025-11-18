# Integration Guide - Frontend to Backend

This guide explains how the frontend sends data to the FastAPI backend for architecture generation.

## Overview

The Solution Architect Workbench collects user requirements through a multi-step wizard and sends all collected data to the FastAPI backend for AI-powered architecture generation.

## Architecture Flow

1. **Frontend (React + Vite)**: Collects user requirements through 6 wizard steps
2. **API Layer** (`src/lib/api.ts`): Handles HTTP communication with backend
3. **Backend (FastAPI)**: Processes requirements and generates architecture
4. **Response**: Returns structured architecture with reasoning

## Data Collection Steps

### Step 1: The Spark (Project Description)
- Collects the main project description
- Stored in: `projectDescription` (string)

### Step 2: The Orbit (Quality Goals)
- Performance requirements (response time, throughput)
- Scalability metrics (expected users, data volume, growth rate)
- Reliability needs (uptime, disaster recovery)
- Security requirements
- Deployment frequency and team structure
- Stored in: `qualityGoals` object

### Step 3: The Mission (Business Drivers)
- Primary business goal
- Budget constraints (dev and ops)
- Launch timeline
- Geographic distribution
- Stored in: `businessDrivers` object

### Step 4: The Vessel (Technical Rules)
- Mandatory technologies
- Team skills and expertise
- Required integrations
- Compliance and regulations
- Data residency requirements
- Stored in: `technicalRules` object

### Step 5: The Extras (Additional Information)
- Any additional requirements or context
- Stored in: `additionalInfo` object

### Step 6: The Blueprint (Review)
- Review all collected information
- Submit button triggers API call

## API Integration Details

### Environment Configuration

**.env file** (Frontend):
```
VITE_API_URL=http://localhost:8000
```

This can be changed for production deployment.

### API Client (`src/lib/api.ts`)

The API client provides:
- Type-safe request/response interfaces
- Error handling
- Centralized API configuration

**Main Functions:**
- `generateArchitecture(data)`: Sends collected data to backend
- `healthCheck()`: Verifies backend connectivity

### Request Format

```typescript
{
  projectDescription: string,
  qualityGoals: {
    responseTime: string,
    throughput: string,
    expectedUsers: number,
    dataVolume: string,
    growthRate: string,
    uptime: string,
    downtimeTolerance: string,
    disasterRecovery: string,
    securityNeeds: string[],
    authNeeds: string,
    deployFrequency: string,
    teamStructure: string,
    audience: string,
    accessibilityNeeds: string
  },
  businessDrivers: {
    primaryGoal: string | null,
    devBudget: string,
    opsBudget: string,
    launchDate: string,
    geography: string
  },
  technicalRules: {
    mandatoryTech: string[],
    teamSkills: string,
    integrations: string,
    regulations: string,
    dataResidency: string
  },
  additionalInfo: {
    additionalRequirements: string
  }
}
```

### Response Format

```typescript
{
  architecture: {
    overview: string,
    components: [
      {
        name: string,
        description: string,
        technology: string,
        reasoning: string
      }
    ],
    patterns: string[],
    reasoning: string
  },
  recommendations: string[],
  tradeoffs: string[]
}
```

## Updated Index.tsx Features

### New State Management
- `isGenerating`: Tracks API call status for loading UI
- `architectureResult`: Stores the generated architecture response

### Enhanced Submit Handler
The `handleSubmit` function now:
1. Sets loading state (`isGenerating = true`)
2. Calls `generateArchitecture()` API
3. Handles success: stores result, shows success toast
4. Handles errors: displays error toast with details
5. Resets loading state

### UI Improvements
- **Loading State**: Shows spinner and "Generating..." text during API call
- **Disabled State**: Button disabled during generation to prevent duplicate requests
- **Error Handling**: User-friendly error messages via toast notifications
- **Success Feedback**: Confirmation when architecture is generated

## Testing the Integration

### 1. Start the Backend

```bash
cd back
python -m venv venv
.\venv\Scripts\Activate.ps1  # Windows PowerShell
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`

### 2. Start the Frontend

```bash
cd front
npm install  # or: bun install
npm run dev  # or: bun dev
```

Frontend will run on `http://localhost:5173`

### 3. Test the Flow

1. Open `http://localhost:5173` in your browser
2. Fill in the wizard steps
3. Click "Let's Generate My Architecture!" on the final step
4. Watch the console for the API request/response
5. Check the toast notification for success/error

### 4. Verify Backend

Visit `http://localhost:8000/docs` to see the interactive API documentation (Swagger UI).

## Error Handling

The integration handles several error scenarios:

1. **Backend Not Running**: Shows "Backend is not responding" message
2. **Network Error**: Displays network-related error details
3. **Validation Error**: Shows validation errors from backend
4. **Server Error**: Displays server error messages

## Next Steps

### For Backend Development:
1. Integrate with your LLM service (OpenAI, Claude, etc.)
2. Implement the actual architecture generation logic
3. Add authentication if needed
4. Add database for storing generated architectures
5. Implement rate limiting

### For Frontend Development:
1. Display the generated architecture in a nice format
2. Add ability to download/export the architecture
3. Add ability to iterate on the architecture
4. Add history of generated architectures
5. Add comparison between different architecture options

## Troubleshooting

### CORS Errors
- Ensure backend CORS middleware includes your frontend URL
- Default: `http://localhost:5173`

### Connection Refused
- Check if backend is running on port 8000
- Verify VITE_API_URL in .env matches backend URL

### Type Errors
- Ensure frontend types match backend Pydantic models
- Check API response structure matches TypeScript interfaces

## Security Considerations

For production deployment:
1. Use HTTPS for all API calls
2. Implement proper authentication (JWT, OAuth)
3. Add rate limiting to prevent abuse
4. Validate and sanitize all user inputs
5. Use environment variables for sensitive config
6. Enable CORS only for trusted domains
