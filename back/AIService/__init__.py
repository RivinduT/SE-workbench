"""
AIService Package - Two-Stage Architecture Generation

This package provides AI-powered solution architecture generation using:
- Stage 1: Gemini API for prompt enhancement
- Stage 2: DeepSeek API for architecture generation
"""

from AIService.ai_architect_service import AIArchitectService, ai_service

__all__ = ['AIArchitectService', 'ai_service']
