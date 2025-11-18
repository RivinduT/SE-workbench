from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional
import os
from dotenv import load_dotenv


 
# Load environment variables
load_dotenv()

from AIService import ai_service

app = FastAPI(
    title="Solution Architect Workbench API",
    description="AI-powered solution architecture generation using Gemini",
    version="2.0.0"
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",  # Vite default port
        "http://localhost:3000",  # Alternative port
        "http://localhost:8080",  # Current Vite port
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Request Models - All fields optional except projectDescription
class QualityGoals(BaseModel):
    responseTime: Optional[str] = ""
    throughput: Optional[str] = ""
    expectedUsers: Optional[int] = 1
    dataVolume: Optional[str] = ""
    growthRate: Optional[str] = ""
    uptime: Optional[str] = "standard"
    downtimeTolerance: Optional[str] = ""
    disasterRecovery: Optional[str] = ""
    securityNeeds: Optional[List[str]] = []
    authNeeds: Optional[str] = ""
    deployFrequency: Optional[str] = "monthly"
    teamStructure: Optional[str] = "single"
    audience: Optional[str] = "public"
    accessibilityNeeds: Optional[str] = ""


class BusinessDrivers(BaseModel):
    primaryGoal: Optional[str] = None
    devBudget: Optional[str] = ""
    opsBudget: Optional[str] = ""
    launchDate: Optional[str] = ""
    geography: Optional[str] = "single"


class TechnicalRules(BaseModel):
    mandatoryTech: Optional[List[str]] = []
    teamSkills: Optional[str] = ""
    integrations: Optional[str] = ""
    regulations: Optional[str] = ""
    dataResidency: Optional[str] = "none"


class AdditionalInfo(BaseModel):
    additionalRequirements: Optional[str] = ""


class ArchitectureRequest(BaseModel):
    projectDescription: str
    qualityGoals: Optional[QualityGoals] = QualityGoals()
    businessDrivers: Optional[BusinessDrivers] = BusinessDrivers()
    technicalRules: Optional[TechnicalRules] = TechnicalRules()
    additionalInfo: Optional[AdditionalInfo] = AdditionalInfo()


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
    
    Two-stage Gemini process:
    1. Gemini API: Enhance user input into detailed, structured prompt
    2. Gemini API: Generate comprehensive architecture from enhanced prompt
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
