"""
Test script for the Solution Architect Workbench API
Run this to test the backend independently without the frontend
"""

import requests
import json

# API configuration
BASE_URL = "http://localhost:8000"

# Sample test data
test_data = {
    "projectDescription": "An e-commerce platform for selling handmade crafts with real-time inventory management and payment processing",
    "qualityGoals": {
        "responseTime": "< 200ms for API calls",
        "throughput": "1000 requests/second",
        "expectedUsers": 50000,
        "dataVolume": "100GB initial, growing 20% monthly",
        "growthRate": "20% monthly",
        "uptime": "99.9%",
        "downtimeTolerance": "< 1 hour per month",
        "disasterRecovery": "RPO: 1 hour, RTO: 4 hours",
        "securityNeeds": ["PCI-DSS", "GDPR", "Data Encryption"],
        "authNeeds": "OAuth2, Social login, 2FA",
        "deployFrequency": "weekly",
        "teamStructure": "multiple",
        "audience": "public",
        "accessibilityNeeds": "WCAG 2.1 AA compliance"
    },
    "businessDrivers": {
        "primaryGoal": "revenue",
        "devBudget": "$100,000 - $500,000",
        "opsBudget": "$20,000 - $50,000/month",
        "launchDate": "6 months",
        "geography": "multi-region"
    },
    "technicalRules": {
        "mandatoryTech": ["React", "Node.js", "PostgreSQL"],
        "teamSkills": "JavaScript/TypeScript, Python, DevOps, Cloud (AWS/Azure)",
        "integrations": "Stripe, PayPal, Shopify, Email service (SendGrid), SMS notifications",
        "regulations": "PCI-DSS for payment processing, GDPR for EU customers",
        "dataResidency": "multi-region"
    },
    "additionalInfo": {
        "additionalRequirements": "Need mobile app in future, should support multiple languages, analytics dashboard for sellers"
    }
}


def test_health_check():
    """Test the health check endpoint"""
    print("\n" + "="*60)
    print("Testing Health Check Endpoint")
    print("="*60)
    
    try:
        response = requests.get(f"{BASE_URL}/health")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {json.dumps(response.json(), indent=2)}")
        
        if response.status_code == 200:
            print("✅ Health check passed!")
            return True
        else:
            print("❌ Health check failed!")
            return False
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the backend!")
        print("Make sure the FastAPI server is running on http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False


def test_generate_architecture():
    """Test the architecture generation endpoint"""
    print("\n" + "="*60)
    print("Testing Architecture Generation Endpoint")
    print("="*60)
    
    try:
        print("Sending request...")
        response = requests.post(
            f"{BASE_URL}/api/generate-architecture",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"\nStatus Code: {response.status_code}")
        
        if response.status_code == 200:
            print("✅ Architecture generation successful!")
            print("\nGenerated Architecture:")
            print("="*60)
            result = response.json()
            
            # Print architecture overview
            print(f"\nOverview: {result['architecture']['overview']}")
            
            # Print components
            print(f"\nComponents ({len(result['architecture']['components'])}):")
            for i, component in enumerate(result['architecture']['components'], 1):
                print(f"\n  {i}. {component['name']}")
                print(f"     Technology: {component['technology']}")
                print(f"     Description: {component['description']}")
                print(f"     Reasoning: {component['reasoning']}")
            
            # Print patterns
            print(f"\nArchitectural Patterns:")
            for pattern in result['architecture']['patterns']:
                print(f"  - {pattern}")
            
            # Print recommendations
            print(f"\nRecommendations:")
            for rec in result['recommendations']:
                print(f"  - {rec}")
            
            # Print tradeoffs
            print(f"\nTradeoffs:")
            for tradeoff in result['tradeoffs']:
                print(f"  - {tradeoff}")
            
            print("\n" + "="*60)
            print("Full JSON Response:")
            print(json.dumps(result, indent=2))
            
            return True
        else:
            print(f"❌ Request failed!")
            print(f"Response: {response.text}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("❌ Could not connect to the backend!")
        print("Make sure the FastAPI server is running on http://localhost:8000")
        return False
    except Exception as e:
        print(f"❌ Error: {str(e)}")
        return False


def main():
    """Run all tests"""
    print("\n" + "="*60)
    print("Solution Architect Workbench API Test Suite")
    print("="*60)
    
    # Test health check
    health_ok = test_health_check()
    
    if not health_ok:
        print("\n⚠️  Backend is not available. Please start it first:")
        print("   cd back")
        print("   uvicorn main:app --reload")
        return
    
    # Test architecture generation
    arch_ok = test_generate_architecture()
    
    # Summary
    print("\n" + "="*60)
    print("Test Summary")
    print("="*60)
    print(f"Health Check: {'✅ PASS' if health_ok else '❌ FAIL'}")
    print(f"Architecture Generation: {'✅ PASS' if arch_ok else '❌ FAIL'}")
    print("="*60)


if __name__ == "__main__":
    main()
