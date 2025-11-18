"""
AI Service for two-stage architecture generation:
1. Gemini: Enhance user input into detailed prompt
2. DeepSeek: Generate final architecture from enhanced prompt
"""

import os
import json
from typing import Dict, Any

import google.generativeai as genai
from openai import OpenAI


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

        # ======================================================
        #                   DEEPSEEK SETUP
        # ======================================================
        self.deepseek_api_key = os.getenv("DEEPSEEK_API_KEY")
        self.deepseek_model = os.getenv("DEEPSEEK_MODEL", "deepseek-chat")

        if not self.deepseek_api_key:
            print("⚠ WARNING: DeepSeek API key not found!")
            self.deepseek = None
        else:
            # DeepSeek is OpenAI compatible
            self.deepseek = OpenAI(
                api_key=self.deepseek_api_key,
                base_url="https://api.deepseek.com/v1"
            )

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
            raise Exception(f"Gemini API error: {str(e)}")

    # ===========================================================
    #                 STAGE 2 — DEEPSEEK
    # ===========================================================
    async def generate_with_deepseek(self, enhanced_prompt: str) -> Dict[str, Any]:

        if not self.deepseek:
            raise ValueError("DeepSeek API not configured")

        system_prompt = """
You are an expert software architect. 
Generate a detailed architecture in valid JSON using this structure:

{
  "architecture": {
    "overview": "",
    "components": [
      { "name": "", "description": "", "technology": "", "reasoning": "" }
    ],
    "patterns": [],
    "reasoning": ""
  },
  "recommendations": [],
  "tradeoffs": []
}
"""

        try:
            response = self.deepseek.chat.completions.create(
                model=self.deepseek_model,
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": enhanced_prompt}
                ],
                max_tokens=4000,
                temperature=0.7,
                response_format={"type": "json_object"}
            )

            raw = response.choices[0].message.content

            print("\n========== DEEPSEEK RAW RESPONSE ==========")
            print(raw)
            print("==========================================\n")

            return json.loads(raw)

        except json.JSONDecodeError:
            raise Exception("DeepSeek returned invalid JSON.")
        except Exception as e:
            raise Exception(f"DeepSeek API error: {str(e)}")

    # ===========================================================
    #                      2-STAGE PIPELINE
    # ===========================================================
    async def generate_architecture(self, request_data: Dict[str, Any]) -> Dict[str, Any]:

        print("\n========== STARTING ARCHITECTURE PIPELINE ==========")

        formatted = self.format_user_requirements(request_data)
        enhanced = await self.enhance_with_gemini(formatted)
        final_arch = await self.generate_with_deepseek(enhanced)

        print("\n========== ARCHITECTURE GENERATION COMPLETE ==========\n")

        return final_arch


# Singleton instance
ai_service = AIArchitectService()
