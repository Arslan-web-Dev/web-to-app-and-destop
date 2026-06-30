import re
from typing import Dict, List, Any
from urllib.parse import urlparse

class APIDetector:
    """Detect APIs and backend services"""

    API_PATTERNS = {
        'REST': {
            'indicators': [
                r'GET\s+/',
                r'POST\s+/',
                r'PUT\s+/',
                r'DELETE\s+/',
                r'PATCH\s+/',
                r'\.get\(',
                r'\.post\(',
                r'\.put\(',
                r'\.delete\(',
                r'fetch\(',
                r'axios\.(get|post|put|delete)',
                r'Content-Type.*application/json',
            ],
            'confidence': 0.9,
        },
        'GraphQL': {
            'indicators': [
                r'graphql',
                r'query\s+\{',
                r'mutation\s+\{',
                r'subscription\s+\{',
                r'apollo',
                r'urql',
                r'relay',
            ],
            'confidence': 0.95,
        },
        'WebSocket': {
            'indicators': [
                r'websocket',
                r'ws://',
                r'wss://',
                r'Socket\.IO',
                r'socket\.io',
                r'new WebSocket',
            ],
            'confidence': 0.9,
        },
        'gRPC': {
            'indicators': [
                r'grpc',
                r'protobuf',
                r'\.proto',
            ],
            'confidence': 0.85,
        },
        'tRPC': {
            'indicators': [
                r'trpc',
                r'@trpc',
                r'\.router\(',
            ],
            'confidence': 0.9,
        },
        'Serverless': {
            'indicators': [
                r'aws lambda',
                r'azure function',
                r'google cloud function',
                r'vercel function',
                r'netlify function',
            ],
            'confidence': 0.8,
        },
    }

    async def detect(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect API architecture"""
        combined_text = self.get_combined_text(pages)

        detected_apis = []
        for api_type, config in self.API_PATTERNS.items():
            matches = 0
            for indicator in config['indicators']:
                if re.search(indicator, combined_text, re.I):
                    matches += 1

            if matches > 0:
                confidence = min(1.0, config['confidence'] * (matches / len(config['indicators'])))
                detected_apis.append({
                    "type": api_type,
                    "confidence": round(confidence, 2),
                    "matches": matches,
                })

        detected_apis.sort(key=lambda x: x["confidence"], reverse=True)

        # Detect API endpoints
        endpoints = self.detect_endpoints(pages)

        # Detect external services
        external_services = self.detect_external_services(pages)

        return {
            "has_api": len(detected_apis) > 0,
            "detected_apis": detected_apis,
            "primary_api": detected_apis[0] if detected_apis else None,
            "endpoints": endpoints,
            "external_services": external_services,
            "features": self.detect_api_features(pages),
        }

    def get_combined_text(self, pages: List[Dict]) -> str:
        texts = []
        for page in pages:
            texts.append(page["html"])
            for script in page.get("scripts", []):
                texts.append(script.get("content", "") or "")
        return " ".join(texts)

    def detect_endpoints(self, pages: List[Dict]) -> List[Dict]:
        """Detect API endpoints"""
        endpoints = []
        endpoint_pattern = r'(https?://[^\s"']+)?(/api/[^\s"']+|/v\d+/[^\s"']+|/graphql[^\s"']*)'

        for page in pages:
            for script in page.get("scripts", []):
                content = script.get("content", "") or ""
                matches = re.findall(endpoint_pattern, content)
                for match in matches:
                    url = match[0] or match[1]
                    if url and url not in [e["url"] for e in endpoints]:
                        endpoints.append({
                            "url": url,
                            "method": self.infer_method(url, content),
                        })

        return endpoints[:50]  # Limit to 50 endpoints

    def infer_method(self, url: str, content: str) -> str:
        """Infer HTTP method from context"""
        context = content[max(0, content.find(url) - 100):content.find(url) + 100]
        if re.search(r'\.get\(|GET\s', context, re.I):
            return "GET"
        elif re.search(r'\.post\(|POST\s', context, re.I):
            return "POST"
        elif re.search(r'\.put\(|PUT\s', context, re.I):
            return "PUT"
        elif re.search(r'\.delete\(|DELETE\s', context, re.I):
            return "DELETE"
        elif re.search(r'\.patch\(|PATCH\s', context, re.I):
            return "PATCH"
        return "GET"

    def detect_external_services(self, pages: List[Dict]) -> List[Dict]:
        """Detect external API services"""
        services = []
        combined = self.get_combined_text(pages)

        service_patterns = {
            'Stripe': r'stripe',
            'PayPal': r'paypal',
            'AWS': r'aws\.amazon|amazonaws',
            'Google Cloud': r'googleapis|cloud\.google',
            'Azure': r'azure|microsoft\.com',
            'SendGrid': r'sendgrid',
            'Twilio': r'twilio',
            'Mapbox': r'mapbox',
            'Google Maps': r'google.*maps|maps\.google',
            'Algolia': r'algolia',
            'Sentry': r'sentry',
            'Datadog': r'datadog',
            'Mixpanel': r'mixpanel',
            'Amplitude': r'amplitude',
            'Segment': r'segment',
        }

        for service, pattern in service_patterns.items():
            if re.search(pattern, combined, re.I):
                services.append({
                    "name": service,
                    "type": "external_service",
                })

        return services

    def detect_api_features(self, pages: List[Dict]) -> Dict[str, bool]:
        """Detect API features"""
        combined = self.get_combined_text(pages).lower()

        return {
            "authentication": any(term in combined for term in ["bearer", "api-key", "x-api-key", "authorization"]),
            "rate_limiting": any(term in combined for term in ["rate limit", "throttle", "429", "too many requests"]),
            "pagination": any(term in combined for term in ["page=", "limit=", "offset=", "cursor="]),
            "caching": any(term in combined for term in ["cache-control", "etag", "last-modified", "if-none-match"]),
            "versioning": any(term in combined for term in ["/v1/", "/v2/", "api-version", "version="]),
            "documentation": any(term in combined for term in ["swagger", "openapi", "api docs", "/docs"]),
            "webhooks": "webhook" in combined,
            "sse": any(term in combined for term in ["event-source", "text/event-stream", "sse"]),
        }
