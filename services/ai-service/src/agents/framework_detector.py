import re
from typing import Dict, List, Any

class FrameworkDetector:
    """Detect web framework and technologies used by a website"""

    FRAMEWORK_SIGNATURES = {
        'React': {
            'indicators': [
                r'data-reactroot',
                r'data-reactid',
                r'react-root',
                r'__REACT__',
                r'react\.js',
                r'react\.production',
                r'react-dom',
            ],
            'confidence_weight': 1.0,
        },
        'Next.js': {
            'indicators': [
                r'__NEXT_DATA__',
                r'_next/static',
                r'next-head',
                r'next-route-announcer',
            ],
            'confidence_weight': 1.2,
        },
        'Vue': {
            'indicators': [
                r'data-v-',
                r'__VUE__',
                r'vue\.js',
                r'vue\.min\.js',
                r'v-app',
            ],
            'confidence_weight': 1.0,
        },
        'Nuxt': {
            'indicators': [
                r'__NUXT__',
                r'_nuxt/',
                r'nuxt-loading',
            ],
            'confidence_weight': 1.2,
        },
        'Angular': {
            'indicators': [
                r'ng-',
                r'_nghost-',
                r'ngcontent-',
                r'angular\.js',
                r'zone\.js',
            ],
            'confidence_weight': 1.0,
        },
        'Svelte': {
            'indicators': [
                r'svelte-',
                r'__SVELTE__',
            ],
            'confidence_weight': 1.0,
        },
        'Laravel': {
            'indicators': [
                r'csrf-token',
                r'laravel_session',
                r'XSRF-TOKEN',
            ],
            'confidence_weight': 1.0,
        },
        'Django': {
            'indicators': [
                r'csrfmiddlewaretoken',
                r'django_admin',
                r'__debug__',
            ],
            'confidence_weight': 1.0,
        },
        'WordPress': {
            'indicators': [
                r'wp-content',
                r'wp-includes',
                r'wp-json',
                r'wordpress',
                r'wp-',
            ],
            'confidence_weight': 1.0,
        },
        'Express': {
            'indicators': [
                r'x-powered-by.*Express',
                r'express\.js',
            ],
            'confidence_weight': 0.8,
        },
        'Ruby on Rails': {
            'indicators': [
                r'csrf-param',
                r'csrf-token',
                r'rails-',
                r'ruby-on-rails',
            ],
            'confidence_weight': 1.0,
        },
        'ASP.NET': {
            'indicators': [
                r'__VIEWSTATE',
                r'__EVENTVALIDATION',
                r'asp.net',
                r'.aspx',
            ],
            'confidence_weight': 1.0,
        },
        'Flask': {
            'indicators': [
                r'werkzeug',
                r'flask\.js',
            ],
            'confidence_weight': 0.8,
        },
    }

    LIBRARY_SIGNATURES = {
        'jQuery': [r'jquery', r'\$\(', r'jQuery'],
        'Bootstrap': [r'bootstrap', r'btn-primary', r'container-fluid'],
        'Tailwind CSS': [r'tailwind', r'class=".*(flex|grid|md:|lg:|sm:).*"'],
        'Material UI': [r'Mui', r'mui-', r'Material-UI'],
        'Chakra UI': [r'chakra-', r'ChakraProvider'],
        'Ant Design': [r'ant-', r'antd', r'AntDesign'],
        'Three.js': [r'three\.js', r'THREE\.'],
        'D3.js': [r'd3\.js', r'd3\.'],
        'Chart.js': [r'chart\.js', r'Chart\('],
        'Socket.io': [r'socket\.io', r'io\('],
        'Redux': [r'redux', r'createStore', r'dispatch'],
        'MobX': [r'mobx', r'observable', r'action'],
        'Apollo': [r'apollo', r'ApolloClient', r'graphql'],
        'Axios': [r'axios', r'axios\.get', r'axios\.post'],
        'Lodash': [r'lodash', r'_\.', r'\.chunk', r'\.debounce'],
    }

    async def detect(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect framework and libraries from crawled pages"""
        all_html = " ".join([page["html"] for page in pages])
        all_scripts = []
        for page in pages:
            all_scripts.extend([s.get("src", "") for s in page.get("scripts", [])])
            all_scripts.extend([s.get("content", "") or "" for s in page.get("scripts", [])])

        # Detect primary framework
        framework_scores = {}
        for framework, config in self.FRAMEWORK_SIGNATURES.items():
            score = 0
            matches = 0

            for indicator in config['indicators']:
                if re.search(indicator, all_html, re.I):
                    matches += 1
                    score += config['confidence_weight']

                for script in all_scripts:
                    if re.search(indicator, script, re.I):
                        matches += 1
                        score += config['confidence_weight'] * 0.5

            if matches > 0:
                framework_scores[framework] = {
                    "score": score,
                    "matches": matches,
                    "confidence": min(1.0, score / 5),
                }

        # Sort by score
        sorted_frameworks = sorted(
            framework_scores.items(),
            key=lambda x: x[1]["score"],
            reverse=True
        )

        primary_framework = sorted_frameworks[0] if sorted_frameworks else None

        # Detect libraries
        libraries = []
        for lib, indicators in self.LIBRARY_SIGNATURES.items():
            for indicator in indicators:
                if re.search(indicator, all_html, re.I):
                    libraries.append(lib)
                    break
                for script in all_scripts:
                    if re.search(indicator, script, re.I):
                        libraries.append(lib)
                        break

        # Detect CSS frameworks
        css_frameworks = self.detect_css_frameworks(all_html)

        # Detect build tools
        build_tools = self.detect_build_tools(all_html, all_scripts)

        return {
            "primary_framework": {
                "name": primary_framework[0] if primary_framework else "Unknown",
                "confidence": primary_framework[1]["confidence"] if primary_framework else 0,
                "score": primary_framework[1]["score"] if primary_framework else 0,
            } if primary_framework else None,
            "all_frameworks": [
                {"name": name, "confidence": data["confidence"], "score": data["score"]}
                for name, data in sorted_frameworks[:5]
            ],
            "libraries": list(set(libraries)),
            "css_frameworks": css_frameworks,
            "build_tools": build_tools,
            "is_static_html": not primary_framework,
            "spa": self.is_spa(pages),
            "ssr": self.is_ssr(pages),
        }

    def detect_css_frameworks(self, html: str) -> List[str]:
        """Detect CSS frameworks"""
        frameworks = []

        patterns = {
            'Tailwind CSS': r'(tailwind|class=".*(flex|grid|md:|lg:|sm:|xl:|2xl:).*)',
            'Bootstrap': r'(bootstrap|container-fluid|row|col-md|btn-primary)',
            'Materialize': r'materialize',
            'Bulma': r'bulma',
            'Foundation': r'foundation',
            'Semantic UI': r'semantic',
            'UIKit': r'uk-',
            'Pure CSS': r'pure-',
        }

        for name, pattern in patterns.items():
            if re.search(pattern, html, re.I):
                frameworks.append(name)

        return frameworks

    def detect_build_tools(self, html: str, scripts: List[str]) -> List[str]:
        """Detect build tools and bundlers"""
        tools = []

        combined = html + " ".join(scripts)

        if re.search(r'webpack', combined, re.I):
            tools.append("Webpack")
        if re.search(r'vite', combined, re.I):
            tools.append("Vite")
        if re.search(r'rollup', combined, re.I):
            tools.append("Rollup")
        if re.search(r'parcel', combined, re.I):
            tools.append("Parcel")
        if re.search(r'esbuild', combined, re.I):
            tools.append("esbuild")
        if re.search(r'turbopack', combined, re.I):
            tools.append("Turbopack")
        if re.search(r'gulp', combined, re.I):
            tools.append("Gulp")
        if re.search(r'grunt', combined, re.I):
            tools.append("Grunt")

        return tools

    def is_spa(self, pages: List[Dict]) -> bool:
        """Detect if Single Page Application"""
        if len(pages) < 2:
            return False

        # Check for client-side routing patterns
        has_router = False
        for page in pages:
            html = page["html"]
            if re.search(r'(react-router|vue-router|@angular/router|next/router)', html, re.I):
                has_router = True
                break

        # Check if pages share same HTML structure (indicating SPA)
        if len(pages) >= 2:
            first_html = pages[0]["html"][:500]
            second_html = pages[1]["html"][:500]
            similarity = self.calculate_similarity(first_html, second_html)
            if similarity > 0.8:
                return True

        return has_router

    def is_ssr(self, pages: List[Dict]) -> bool:
        """Detect Server-Side Rendering"""
        for page in pages:
            html = page["html"]
            # Check for SSR indicators
            if re.search(r'__NEXT_DATA__|__NUXT__|__INITIAL_STATE__', html):
                return True
            # Check if content is rendered in HTML (not just JS)
            if len(page.get("text_content", "")) > 500:
                return True
        return False

    def calculate_similarity(self, str1: str, str2: str) -> float:
        """Calculate simple string similarity"""
        if not str1 or not str2:
            return 0.0

        # Simple Jaccard similarity on words
        words1 = set(str1.lower().split())
        words2 = set(str2.lower().split())

        intersection = words1.intersection(words2)
        union = words1.union(words2)

        return len(intersection) / len(union) if union else 0.0
