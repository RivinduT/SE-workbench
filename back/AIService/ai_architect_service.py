"""
AI Service for two-stage architecture generation using Gemini:
1. Gemini: Enhance user input into detailed prompt
2. Gemini: Generate final architecture from enhanced prompt
"""

import os
import json
from typing import Dict, Any

import google.generativeai as genai


class AIArchitectService:
    def __init__(self):

        # ======================================================
        #                   GEMINI SETUP
        # ======================================================
        self.gemini_api_key = os.getenv("GEMINI_API_KEY")
        self.gemini_model = os.getenv("GEMINI_MODEL", "gemini-1.5-flash")

        if not self.gemini_api_key:
            print("⚠ WARNING: Gemini API key not found!")
            self.gemini = None
        else:
            genai.configure(api_key=self.gemini_api_key)
            try:
                self.gemini = genai.GenerativeModel(self.gemini_model)
            except Exception:
                print("⚠ Gemini model invalid. Falling back to gemini-1.5-flash")
                self.gemini = genai.GenerativeModel("gemini-1.5-flash")

    # ===========================================================
    #               FORMAT USER REQUIREMENTS
    # ===========================================================
    def format_user_requirements(self, request_data: Dict[str, Any]) -> str:

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

    # ===========================================================
    #                     STAGE 1 — GEMINI
    # ===========================================================
    async def enhance_with_gemini(self, user_requirements: str) -> str:

        if not self.gemini:
            raise ValueError("Gemini API not configured")

        enhancement_prompt = f"""
You are an expert prompt engineer and solution architect.

Convert the following user requirements into a perfectly structured and enhanced architecture-generation prompt.

Do NOT include explanations.  
Output ONLY the improved prompt.

USER REQUIREMENTS:
{user_requirements}
"""

        try:
            response = self.gemini.generate_content(enhancement_prompt)
            enhanced_prompt = response.text.strip()

            print("\n========== GEMINI ENHANCED PROMPT ==========")
            print(enhanced_prompt)
            print("=============================================\n")

            return enhanced_prompt

        except Exception as e:
            raise RuntimeError(f"Gemini API error: {str(e)}")

    # ===========================================================
    #                 STAGE 2 — GEMINI (ARCHITECTURE)
    # ===========================================================
    async def generate_architecture_with_gemini(self, enhanced_prompt: str) -> Dict[str, Any]:
        """
        Generate final architecture using Gemini API with optimized prompt.
        """
        if not self.gemini:
            raise ValueError("Gemini API not configured")

        architecture_prompt = f"""
You are an expert software architect with deep knowledge of system design, architecture patterns, and best practices.

Based on the following requirements, generate a comprehensive, production-ready software architecture.

{enhanced_prompt}

IMPORTANT: Respond with ONLY valid JSON in this exact structure (no markdown, no code blocks, no additional text):

{{
  "architecture": {{
    "overview": "A comprehensive overview of the proposed architecture (3-4 sentences)",
    "components": [
      {{
        "name": "Component Name",
        "description": "Detailed description of this component's role and responsibilities",
        "technology": "Specific technology/framework/service to use",
        "reasoning": "Why this technology was chosen for this component"
      }}
    ],
    "patterns": ["List of architectural patterns used, e.g., 'Microservices', 'Event-Driven', 'CQRS'"],
    "reasoning": "Overall architectural reasoning explaining why this architecture best fits the requirements"
  }},
  "recommendations": [
    "Specific actionable recommendations for implementation, deployment, and operations"
  ],
  "tradeoffs": [
    "Key tradeoffs made in this architecture and their implications"
  ]
}}

Generate a thorough architecture with at least 5-8 components covering frontend, backend, database, caching, messaging, monitoring, etc. as appropriate.
"""

        try:
            # Configure generation parameters for better JSON output
            generation_config = {
                "temperature": 0.7,
                "top_p": 0.95,
                "top_k": 40,
                "max_output_tokens": 8192,
            }
            
            response = self.gemini.generate_content(
                architecture_prompt,
                generation_config=generation_config
            )
            
            raw = response.text.strip()

            print("\n========== GEMINI ARCHITECTURE RESPONSE ==========")
            print(raw)
            print("==================================================\n")

            # Clean up response (remove markdown code blocks if present)
            if raw.startswith("```json"):
                raw = raw[7:]
            if raw.startswith("```"):
                raw = raw[3:]
            if raw.endswith("```"):
                raw = raw[:-3]
            raw = raw.strip()

            return json.loads(raw)

        except json.JSONDecodeError as e:
            raise ValueError(f"Gemini returned invalid JSON: {str(e)}")
        except Exception as e:
            raise RuntimeError(f"Gemini architecture generation error: {str(e)}")

    # ===========================================================
    #                      2-STAGE GEMINI PIPELINE
    # ===========================================================
    async def generate_architecture(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Two-stage architecture generation using Gemini:
        1. Enhance user input into structured prompt
        2. Generate comprehensive architecture from enhanced prompt
        """
        print("\n========== STARTING GEMINI 2-STAGE PIPELINE ==========")

        formatted = self.format_user_requirements(request_data)
        enhanced = await self.enhance_with_gemini(formatted)
        final_arch = await self.generate_architecture_with_gemini(enhanced)

        print("\n========== ARCHITECTURE GENERATION COMPLETE ==========\n")

        return final_arch


# Singleton instance
ai_service = AIArchitectService()
