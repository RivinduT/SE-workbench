from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
from dotenv import load_dotenv
from ai_service import ai_service

# Load environment variables
load_dotenv()

app = FastAPI(
    title="Solution Architect Workbench API",
    description="AI-powered solution architecture generation using Gemini + DeepSeek",
    version="1.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # Alternative port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Models
class QualityGoals(BaseModel):
    responseTime: str
    throughput: str
    expectedUsers: int
    dataVolume: str
    growthRate: str
    uptime: str
    downtimeTolerance: str
    disasterRecovery: str
    securityNeeds: List[str]
    authNeeds: str
    deployFrequency: str
    teamStructure: str
    audience: str
    accessibilityNeeds: str


class BusinessDrivers(BaseModel):
    primaryGoal: Optional[str]
    devBudget: str
    opsBudget: str
    launchDate: str
    geography: str


class TechnicalRules(BaseModel):
    mandatoryTech: List[str]
    teamSkills: str
    integrations: str
    regulations: str
    dataResidency: str


class AdditionalInfo(BaseModel):
    additionalRequirements: str


class ArchitectureRequest(BaseModel):
    projectDescription: str
    qualityGoals: QualityGoals
    businessDrivers: BusinessDrivers
    technicalRules: TechnicalRules
    additionalInfo: AdditionalInfo


# Response Models
class ArchitectureComponent(BaseModel):
    name: str
    description: str
    technology: str
    reasoning: str


class Architecture(BaseModel):
    overview: str
    components: List[ArchitectureComponent]
    patterns: List[str]
    reasoning: str


class ArchitectureResponse(BaseModel):
    architecture: Architecture
    recommendations: List[str]
    tradeoffs: List[str]


# Endpoints
@app.get("/health")
async def health_check():
    """Health check endpoint"""
    return {"status": "healthy", "message": "Solution Architect Workbench API is running"}


@app.post("/api/generate-architecture", response_model=ArchitectureResponse)
async def generate_architecture(request: ArchitectureRequest):
    """
    Generate solution architecture based on user requirements.
    
    Two-stage process:
    1. Gemini API: Enhance user input into detailed, structured prompt
    2. DeepSeek API: Generate comprehensive architecture from enhanced prompt
    """
    try:
        # Convert Pydantic model to dictionary for processing
        request_dict = {
            "projectDescription": request.projectDescription,
            "qualityGoals": request.qualityGoals.model_dump(),
            "businessDrivers": request.businessDrivers.model_dump(),
            "technicalRules": request.technicalRules.model_dump(),
            "additionalInfo": request.additionalInfo.model_dump(),
        }
        
        # Use AI service for two-stage generation
        architecture_data = await ai_service.generate_architecture(request_dict)
        
        # Validate and return response
        return ArchitectureResponse(**architecture_data)
        
    except ValueError as e:
        # API key not configured
        raise HTTPException(
            status_code=500, 
            detail=f"Configuration error: {str(e)}. Please check your API keys in .env file."
        )
    except Exception as e:
        # Other errors
        raise HTTPException(
            status_code=500, 
            detail=f"Error generating architecture: {str(e)}"
        )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
