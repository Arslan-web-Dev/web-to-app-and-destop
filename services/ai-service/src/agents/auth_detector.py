import re
from typing import Dict, List, Any

class AuthDetector:
    """Detect authentication mechanisms in a website"""

    AUTH_PATTERNS = {
        'JWT': {
            'indicators': [
                r'Bearer\s+',
                r'jwt',
                r'jsonwebtoken',
                r'access[_-]?token',
                r'refresh[_-]?token',
            ],
            'confidence': 0.9,
        },
        'OAuth2': {
            'indicators': [
                r'oauth',
                r'authorize\?',
                r'access_token=',
                r'refresh_token=',
                r'grant_type',
            ],
            'confidence': 0.95,
        },
        'Session/Cookie': {
            'indicators': [
                r'sessionid',
                r'connect\.sid',
                r'PHPSESSID',
                r'ASPSESSIONID',
                r'csrftoken',
            ],
            'confidence': 0.85,
        },
        'Firebase Auth': {
            'indicators': [
                r'firebaseauth',
                r'firebase-auth',
                r'googleapis\.com/identitytoolkit',
            ],
            'confidence': 0.95,
        },
        'Auth0': {
            'indicators': [
                r'auth0',
                r'\.auth0\.com',
                r'authorize\?client_id',
            ],
            'confidence': 0.95,
        },
        'AWS Cognito': {
            'indicators': [
                r'cognito',
                r'amazoncognito',
                r'cognito-idp',
            ],
            'confidence': 0.9,
        },
        'Supabase Auth': {
            'indicators': [
                r'supabase',
                r'supabase\.co/auth',
            ],
            'confidence': 0.9,
        },
        'Clerk': {
            'indicators': [
                r'clerk',
                r'clerk\.dev',
            ],
            'confidence': 0.9,
        },
        'NextAuth': {
            'indicators': [
                r'next-auth',
                r'nextauth',
                r'/api/auth/',
            ],
            'confidence': 0.95,
        },
        'Passport.js': {
            'indicators': [
                r'passport',
                r'serializeUser',
                r'deserializeUser',
            ],
            'confidence': 0.85,
        },
    }

    async def detect(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect authentication system"""
        all_html = " ".join([page["html"] for page in pages])
        all_scripts = " ".join([
            s.get("content", "") or "" 
            for page in pages 
            for s in page.get("scripts", [])
        ])

        combined_text = all_html + " " + all_scripts

        detected_auth = []
        for auth_type, config in self.AUTH_PATTERNS.items():
            matches = 0
            for indicator in config['indicators']:
                if re.search(indicator, combined_text, re.I):
                    matches += 1

            if matches > 0:
                confidence = min(1.0, config['confidence'] * (matches / len(config['indicators'])))
                detected_auth.append({
                    "type": auth_type,
                    "confidence": round(confidence, 2),
                    "matches": matches,
                })

        # Sort by confidence
        detected_auth.sort(key=lambda x: x["confidence"], reverse=True)

        # Detect login forms
        login_forms = self.detect_login_forms(pages)

        # Detect registration forms
        register_forms = self.detect_register_forms(pages)

        # Detect password reset
        password_reset = self.detect_password_reset(pages)

        return {
            "has_auth": len(detected_auth) > 0 or len(login_forms) > 0,
            "detected_systems": detected_auth,
            "primary_auth": detected_auth[0] if detected_auth else None,
            "login_forms": login_forms,
            "register_forms": register_forms,
            "password_reset": password_reset,
            "features": self.detect_auth_features(pages),
        }

    def detect_login_forms(self, pages: List[Dict]) -> List[Dict]:
        """Detect login forms"""
        forms = []
        for page in pages:
            for form in page.get("forms", []):
                inputs = form.get("inputs", [])
                input_types = [i.get("type", "").lower() for i in inputs]

                if "password" in input_types:
                    has_email = any(t in ["email", "text"] for t in input_types)
                    if has_email:
                        forms.append({
                            "url": page["url"],
                            "action": form.get("action"),
                            "method": form.get("method"),
                            "fields": input_types,
                        })
        return forms

    def detect_register_forms(self, pages: List[Dict]) -> List[Dict]:
        """Detect registration forms"""
        forms = []
        for page in pages:
            for form in page.get("forms", []):
                inputs = form.get("inputs", [])
                input_types = [i.get("type", "").lower() for i in inputs]

                if "password" in input_types and len(inputs) >= 3:
                    forms.append({
                        "url": page["url"],
                        "action": form.get("action"),
                        "method": form.get("method"),
                        "fields": input_types,
                    })
        return forms

    def detect_password_reset(self, pages: List[Dict]) -> List[Dict]:
        """Detect password reset functionality"""
        resets = []
        for page in pages:
            html = page["html"].lower()
            if any(term in html for term in ["forgot password", "reset password", "recover password"]):
                resets.append({"url": page["url"]})
        return resets

    def detect_auth_features(self, pages: List[Dict]) -> Dict[str, bool]:
        """Detect specific auth features"""
        combined = " ".join([p["html"] for p in pages]).lower()

        return {
            "social_login": any(term in combined for term in ["google sign", "facebook login", "github login", "twitter login", "apple sign"]),
            "two_factor": any(term in combined for term in ["2fa", "two factor", "two-factor", "authenticator", "totp"]),
            "magic_link": "magic link" in combined or "sign in link" in combined,
            "biometric": any(term in combined for term in ["fingerprint", "face id", "touch id", "biometric"]),
            "sso": "sso" in combined or "single sign" in combined,
            "role_based": any(term in combined for term in ["admin", "role", "permission", "rbac"]),
            "session_management": any(term in combined for term in ["session", "remember me", "keep me signed"]),
        }
