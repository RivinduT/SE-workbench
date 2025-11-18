/**
 * API configuration and client for communicating with the FastAPI backend
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

export interface ArchitectureRequest {
  projectDescription: string;
  qualityGoals: {
    responseTime: string;
    throughput: string;
    expectedUsers: number;
    dataVolume: string;
    growthRate: string;
    uptime: string;
    downtimeTolerance: string;
    disasterRecovery: string;
    securityNeeds: string[];
    authNeeds: string;
    deployFrequency: string;
    teamStructure: string;
    audience: string;
    accessibilityNeeds: string;
  };
  businessDrivers: {
    primaryGoal: string | null;
    devBudget: string;
    opsBudget: string;
    launchDate: string;
    geography: string;
  };
  technicalRules: {
    mandatoryTech: string[];
    teamSkills: string;
    integrations: string;
    regulations: string;
    dataResidency: string;
  };
  additionalInfo: {
    additionalRequirements: string;
  };
}

export interface ArchitectureResponse {
  architecture: {
    overview: string;
    components: Array<{
      name: string;
      description: string;
      technology: string;
      reasoning: string;
    }>;
    patterns: string[];
    reasoning: string;
  };
  recommendations: string[];
  tradeoffs: string[];
}

/**
 * Generate architecture based on user requirements
 */
export async function generateArchitecture(
  data: ArchitectureRequest
): Promise<ArchitectureResponse> {
  const response = await fetch(`${API_BASE_URL}/api/generate-architecture`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(
      errorData.detail || `API Error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Health check for the backend API
 */
export async function healthCheck(): Promise<{ status: string; message: string }> {
  const response = await fetch(`${API_BASE_URL}/health`);
  
  if (!response.ok) {
    throw new Error('Backend is not responding');
  }
  
  return response.json();
}
