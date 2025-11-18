"""
AI Service for two-stage architecture generation:
1. Gemini: Enhance user input into detailed prompt
2. DeepSeek: Generate final architecture from enhanced prompt
"""

import os
import json
import google.generativeai as genai
from openai import OpenAI
from typing import Dict, Any


class AIArchitectService:
    def __init__(self):
        # Initialize Gemini
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.gemini_model = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")
        
        if self.gemini_api_key:
            genai.configure(api_key=self.gemini_api_key)
            self.gemini = genai.GenerativeModel(self.gemini_model)
        else:
            self.gemini = None
        
        # Initialize DeepSeek (uses OpenAI-compatible API)
        self.deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")
        self.deepseek_model = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")
        
        if self.deepseek_api_key:
            self.deepseek = OpenAI(
                api_key=self.deepseek_api_key,
                base_url="https://api.deepseek.com"
            )
        else:
            self.deepseek = None
    
    def format_user_requirements(self, request_data: Dict[str, Any]) -> str:
        """Format the collected user data into a readable text format"""
        
        project_desc = request_data.get("projectDescription", "")
        quality_goals = request_data.get("qualityGoals", {})
        business_drivers = request_data.get("businessDrivers", {})
        technical_rules = request_data.get("technicalRules", {})
        additional_info = request_data.get("additionalInfo", {})
        
        formatted = f"""
PROJECT DESCRIPTION:
{project_desc}

QUALITY GOALS & PERFORMANCE REQUIREMENTS:
- Response Time: {quality_goals.get('responseTime', 'Not specified')}
- Throughput: {quality_goals.get('throughput', 'Not specified')}
- Expected Users: {quality_goals.get('expectedUsers', 'Not specified')}
- Data Volume: {quality_goals.get('dataVolume', 'Not specified')}
- Growth Rate: {quality_goals.get('growthRate', 'Not specified')}
- Uptime: {quality_goals.get('uptime', 'Not specified')}
- Downtime Tolerance: {quality_goals.get('downtimeTolerance', 'Not specified')}
- Disaster Recovery: {quality_goals.get('disasterRecovery', 'Not specified')}
- Security Needs: {', '.join(quality_goals.get('securityNeeds', [])) if quality_goals.get('securityNeeds') else 'Not specified'}
- Authentication Needs: {quality_goals.get('authNeeds', 'Not specified')}
- Deploy Frequency: {quality_goals.get('deployFrequency', 'Not specified')}
- Team Structure: {quality_goals.get('teamStructure', 'Not specified')}
- Audience: {quality_goals.get('audience', 'Not specified')}
- Accessibility Needs: {quality_goals.get('accessibilityNeeds', 'Not specified')}

BUSINESS DRIVERS & CONSTRAINTS:
- Primary Goal: {business_drivers.get('primaryGoal', 'Not specified')}
- Development Budget: {business_drivers.get('devBudget', 'Not specified')}
- Operations Budget: {business_drivers.get('opsBudget', 'Not specified')}
- Launch Date: {business_drivers.get('launchDate', 'Not specified')}
- Geography: {business_drivers.get('geography', 'Not specified')}

TECHNICAL RULES & CONSTRAINTS:
- Mandatory Technologies: {', '.join(technical_rules.get('mandatoryTech', [])) if technical_rules.get('mandatoryTech') else 'Not specified'}
- Team Skills: {technical_rules.get('teamSkills', 'Not specified')}
- Required Integrations: {technical_rules.get('integrations', 'Not specified')}
- Regulations: {technical_rules.get('regulations', 'Not specified')}
- Data Residency: {technical_rules.get('dataResidency', 'Not specified')}

ADDITIONAL INFORMATION:
{additional_info.get('additionalRequirements', 'None provided')}
"""
        return formatted.strip()
    
    async def enhance_with_gemini(self, user_requirements: str) -> str:
        """
        Stage 1: Use Gemini to enhance user requirements into a detailed prompt
        """
        
        if not self.gemini:
            raise ValueError("Gemini API key not configured")
        
        # Hardcoded prompt template for Gemini
        enhancement_prompt = f"""You are an expert solution architect prompt engineer. Your task is to take the user's requirements for a software system and transform them into a comprehensive, detailed prompt that can be used to generate a complete solution architecture.

The user has provided the following requirements:

{user_requirements}

Your task is to:
1. Analyze all the provided requirements (performance, business, technical, security, etc.)
2. Identify any implicit requirements or constraints that should be considered
3. Create a detailed, structured prompt that incorporates all requirements
4. The prompt should guide the generation of a complete solution architecture including:
   - System components and their responsibilities
   - Technology stack recommendations with justifications
   - Architectural patterns and design decisions
   - Scalability and performance strategies
   - Security architecture
   - Deployment and infrastructure strategy
   - Trade-offs and decision rationale

Generate a comprehensive prompt that will help create a professional solution architecture document. The prompt should be detailed, specific, and technical.

OUTPUT ONLY THE ENHANCED PROMPT, nothing else. Do not include any preamble or explanation."""

        try:
            response = self.gemini.generate_content(enhancement_prompt)
            enhanced_prompt = response.text
            print("\n" + "="*80)
            print("STAGE 1 - GEMINI ENHANCED PROMPT:")
            print("="*80)
            print(enhanced_prompt)
            print("="*80 + "\n")
            
            return enhanced_prompt
            
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")
    
    async def generate_with_deepseek(self, enhanced_prompt: str) -> Dict[str, Any]:
        """
        Stage 2: Use DeepSeek to generate the final solution architecture
        """
        
        if not self.deepseek:
            raise ValueError("DeepSeek API key not configured")
        
        system_prompt = """You are an expert solution architect with deep knowledge of software architecture patterns, cloud infrastructure, microservices, databases, security, and modern development practices.

Your task is to generate a comprehensive solution architecture based on the provided requirements. 

You must respond with a valid JSON object with the following structure:
{
  "architecture": {
    "overview": "A comprehensive overview of the proposed architecture",
    "components": [
      {
        "name": "Component Name",
        "description": "What this component does",
        "technology": "Specific technology recommendation",
        "reasoning": "Why this component and technology were chosen"
      }
    ],
    "patterns": ["List of architectural patterns used"],
    "reasoning": "Overall architectural reasoning and decision rationale"
  },
  "recommendations": ["List of implementation recommendations"],
  "tradeoffs": ["List of architectural tradeoffs and considerations"]
}

Be specific, technical, and provide clear reasoning for all decisions. Consider scalability, security, cost, maintainability, and team capabilities."""

        try:
            response = self.deepseek.chat.completions.create(
                model=self.deepseek_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": enhanced_prompt}
                ],
                temperature=0.7,
                max_tokens=4000,
                response_format={"type": "json_object"}
            )
            
            result_text = response.choices[0].message.content
            
            print("\n" + "="*80)
            print("STAGE 2 - DEEPSEEK RAW RESPONSE:")
            print("="*80)
            print(result_text)
            print("="*80 + "\n")
            
            # Parse JSON response
            architecture_data = json.loads(result_text)
            
            return architecture_data
            
        except json.JSONDecodeError as e:
            raise Exception(f"Failed to parse DeepSeek response as JSON: {str(e)}")
        except Exception as e:
            raise Exception(f"DeepSeek API error: {str(e)}")
    
    async def generate_architecture(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Full two-stage architecture generation process:
        1. Format user requirements
        2. Enhance with Gemini
        3. Generate architecture with DeepSeek
        """
        
        print("\n" + "="*80)
        print("STARTING TWO-STAGE ARCHITECTURE GENERATION")
        print("="*80)
        
        # Stage 0: Format the user requirements
        print("\nStage 0: Formatting user requirements...")
        formatted_requirements = self.format_user_requirements(request_data)
        
        # Stage 1: Enhance with Gemini
        print("\nStage 1: Enhancing prompt with Gemini...")
        enhanced_prompt = await self.enhance_with_gemini(formatted_requirements)
        
        # Stage 2: Generate with DeepSeek
        print("\nStage 2: Generating architecture with DeepSeek...")
        architecture = await self.generate_with_deepseek(enhanced_prompt)
        
        print("\n" + "="*80)
        print("ARCHITECTURE GENERATION COMPLETE")
        print("="*80 + "\n")
        
        return architecture


# Create a singleton instance
ai_service = AIArchitectService()
