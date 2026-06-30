import asyncio
import aiohttp
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from typing import Dict, List, Optional, Any
import json
import re
from dataclasses import dataclass

from src.agents.framework_detector import FrameworkDetector
from src.agents.auth_detector import AuthDetector
from src.agents.database_detector import DatabaseDetector
from src.agents.api_detector import APIDetector
from src.agents.ui_detector import UIDetector

@dataclass
class AnalysisResult:
    url: str
    framework: Dict[str, Any]
    pages: List[Dict]
    routes: List[str]
    navigation: Dict
    auth: Dict
    database: Dict
    apis: Dict
    ui: Dict
    performance: Dict
    security: Dict
    seo: Dict
    accessibility: Dict
    recommendations: List[Dict]
    raw_data: Dict

class WebsiteAnalyzer:
    def __init__(self):
        self.session: Optional[aiohttp.ClientSession] = None
        self.visited_urls: set = set()
        self.detectors = {
            'framework': FrameworkDetector(),
            'auth': AuthDetector(),
            'database': DatabaseDetector(),
            'api': APIDetector(),
            'ui': UIDetector(),
        }

    async def initialize(self):
        self.session = aiohttp.ClientSession(
            timeout=aiohttp.ClientTimeout(total=30),
            headers={
                'User-Agent': 'UniversalWebToNative-Bot/1.0 (Analysis Engine)'
            }
        )

    async def cleanup(self):
        if self.session:
            await self.session.close()

    async def analyze(self, url: str, deep_analysis: bool = False) -> AnalysisResult:
        """Main analysis pipeline"""
        print(f"🔍 Starting analysis of {url}")

        # Phase 1: Crawl and collect pages
        pages = await self.crawl_website(url, deep_analysis)

        # Phase 2: Parallel detection
        results = await asyncio.gather(
            self.detectors['framework'].detect(pages),
            self.detectors['auth'].detect(pages),
            self.detectors['database'].detect(pages),
            self.detectors['api'].detect(pages),
            self.detectors['ui'].detect(pages),
            self.analyze_performance(url, pages),
            self.analyze_security(url, pages),
            self.analyze_seo(pages),
            self.check_accessibility(pages),
        )

        framework, auth, database, apis, ui, performance, security, seo, accessibility = results

        # Phase 3: Generate recommendations
        recommendations = self.generate_recommendations(
            framework, auth, database, apis, ui, performance, security, seo, accessibility
        )

        # Phase 4: Extract routes and navigation
        routes = self.extract_routes(pages)
        navigation = self.extract_navigation(pages)

        return AnalysisResult(
            url=url,
            framework=framework,
            pages=pages,
            routes=routes,
            navigation=navigation,
            auth=auth,
            database=database,
            apis=apis,
            ui=ui,
            performance=performance,
            security=security,
            seo=seo,
            accessibility=accessibility,
            recommendations=recommendations,
            raw_data={"total_pages": len(pages), "crawl_depth": 3 if deep_analysis else 1}
        )

    async def crawl_website(self, url: str, deep: bool = False) -> List[Dict]:
        """Crawl website and extract page data"""
        pages = []
        to_visit = [url]
        max_pages = 100 if deep else 20

        while to_visit and len(pages) < max_pages:
            current_url = to_visit.pop(0)
            if current_url in self.visited_urls:
                continue

            self.visited_urls.add(current_url)

            try:
                async with self.session.get(current_url) as response:
                    if response.status == 200:
                        html = await response.text()
                        soup = BeautifulSoup(html, 'html.parser')

                        page_data = {
                            "url": current_url,
                            "title": soup.title.string if soup.title else "",
                            "meta": self.extract_meta(soup),
                            "headers": dict(response.headers),
                            "html": html,
                            "soup": soup,
                            "scripts": self.extract_scripts(soup),
                            "styles": self.extract_styles(soup),
                            "links": self.extract_links(soup, current_url),
                            "forms": self.extract_forms(soup),
                            "images": self.extract_images(soup, current_url),
                            "text_content": soup.get_text(),
                        }
                        pages.append(page_data)

                        # Add new links to visit
                        if deep:
                            for link in page_data["links"]:
                                if link not in self.visited_urls and len(pages) < max_pages:
                                    to_visit.append(link)

            except Exception as e:
                print(f"Error crawling {current_url}: {e}")
                continue

        return pages

    def extract_meta(self, soup: BeautifulSoup) -> Dict:
        """Extract meta tags"""
        meta = {}
        for tag in soup.find_all('meta'):
            name = tag.get('name') or tag.get('property')
            content = tag.get('content')
            if name and content:
                meta[name] = content
        return meta

    def extract_scripts(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract script information"""
        scripts = []
        for script in soup.find_all('script'):
            script_data = {
                "src": script.get('src'),
                "type": script.get('type'),
                "async": script.get('async') is not None,
                "defer": script.get('defer') is not None,
                "content": script.string if not script.get('src') else None,
            }
            scripts.append(script_data)
        return scripts

    def extract_styles(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract style information"""
        styles = []
        for style in soup.find_all('style'):
            styles.append({"content": style.string})
        for link in soup.find_all('link', rel='stylesheet'):
            styles.append({"href": link.get('href')})
        return styles

    def extract_links(self, soup: BeautifulSoup, base_url: str) -> List[str]:
        """Extract all links"""
        links = []
        for a in soup.find_all('a', href=True):
            href = urljoin(base_url, a['href'])
            if urlparse(href).netloc == urlparse(base_url).netloc:
                links.append(href)
        return list(set(links))

    def extract_forms(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract form information"""
        forms = []
        for form in soup.find_all('form'):
            form_data = {
                "action": form.get('action'),
                "method": form.get('method', 'get').upper(),
                "inputs": [],
            }
            for input_tag in form.find_all(['input', 'textarea', 'select']):
                form_data["inputs"].append({
                    "type": input_tag.get('type', 'text'),
                    "name": input_tag.get('name'),
                    "required": input_tag.get('required') is not None,
                })
            forms.append(form_data)
        return forms

    def extract_images(self, soup: BeautifulSoup, base_url: str) -> List[Dict]:
        """Extract image information"""
        images = []
        for img in soup.find_all('img'):
            src = img.get('src')
            if src:
                images.append({
                    "src": urljoin(base_url, src),
                    "alt": img.get('alt', ''),
                    "width": img.get('width'),
                    "height": img.get('height'),
                })
        return images

    def extract_routes(self, pages: List[Dict]) -> List[str]:
        """Extract application routes"""
        routes = []
        for page in pages:
            path = urlparse(page["url"]).path
            if path and path not in routes:
                routes.append(path)
        return sorted(routes)

    def extract_navigation(self, pages: List[Dict]) -> Dict:
        """Extract navigation structure"""
        nav = {"menus": [], "sidebar": None, "footer": None}

        for page in pages:
            soup = page["soup"]

            # Main navigation
            nav_elements = soup.find_all(['nav', 'header'])
            for elem in nav_elements:
                links = []
                for a in elem.find_all('a'):
                    links.append({
                        "text": a.get_text(strip=True),
                        "href": a.get('href'),
                    })
                if links:
                    nav["menus"].append({
                        "type": "main",
                        "links": links,
                    })

            # Sidebar
            sidebar = soup.find(['aside', '.sidebar', '[class*="sidebar"]'])
            if sidebar:
                nav["sidebar"] = {
                    "items": [a.get_text(strip=True) for a in sidebar.find_all('a')]
                }

        return nav

    async def analyze_performance(self, url: str, pages: List[Dict]) -> Dict:
        """Analyze website performance"""
        total_size = 0
        total_requests = 0

        for page in pages:
            html_size = len(page["html"].encode('utf-8'))
            total_size += html_size
            total_requests += 1

            # Count resources
            total_requests += len(page["scripts"]) + len(page["styles"]) + len(page["images"])

        avg_page_size = total_size / len(pages) if pages else 0

        return {
            "score": self.calculate_performance_score(avg_page_size, total_requests),
            "avg_page_size_kb": round(avg_page_size / 1024, 2),
            "total_requests": total_requests,
            "pages_analyzed": len(pages),
            "recommendations": self.get_performance_recommendations(pages),
        }

    def calculate_performance_score(self, avg_size: float, requests: int) -> float:
        """Calculate performance score (0-100)"""
        score = 100
        if avg_size > 500000:  # 500KB
            score -= 20
        elif avg_size > 200000:  # 200KB
            score -= 10
        if requests > 50:
            score -= 15
        elif requests > 30:
            score -= 5
        return max(0, score)

    def get_performance_recommendations(self, pages: List[Dict]) -> List[str]:
        """Generate performance recommendations"""
        recs = []
        for page in pages:
            if len(page["scripts"]) > 10:
                recs.append(f"Reduce JavaScript files on {page['url']}")
            if len(page["images"]) > 20:
                recs.append(f"Optimize images on {page['url']}")
        return recs

    async def analyze_security(self, url: str, pages: List[Dict]) -> Dict:
        """Analyze security posture"""
        issues = []
        score = 100

        for page in pages:
            # Check for HTTPS
            if not page["url"].startswith('https'):
                issues.append({"severity": "high", "issue": "Page not served over HTTPS"})
                score -= 20

            # Check for security headers
            headers = page.get("headers", {})
            if 'content-security-policy' not in headers:
                issues.append({"severity": "medium", "issue": "Missing Content-Security-Policy header"})
                score -= 5
            if 'x-frame-options' not in headers:
                issues.append({"severity": "medium", "issue": "Missing X-Frame-Options header"})
                score -= 5

            # Check for exposed sensitive data
            html = page["html"]
            if re.search(r'(api[_-]?key|password|secret|token)\s*[:=]\s*["'][^"']+', html, re.I):
                issues.append({"severity": "critical", "issue": "Potential sensitive data exposure in HTML"})
                score -= 30

        return {
            "score": max(0, score),
            "issues": issues,
            "recommendations": [issue["issue"] for issue in issues],
        }

    async def analyze_seo(self, pages: List[Dict]) -> Dict:
        """Analyze SEO"""
        score = 100
        issues = []

        for page in pages:
            meta = page.get("meta", {})

            if not meta.get('description'):
                issues.append(f"Missing meta description on {page['url']}")
                score -= 5
            if not meta.get('og:title'):
                issues.append(f"Missing Open Graph title on {page['url']}")
                score -= 2
            if not page.get("title"):
                issues.append(f"Missing page title on {page['url']}")
                score -= 10

        return {
            "score": max(0, score),
            "issues": issues,
            "recommendations": issues,
        }

    async def check_accessibility(self, pages: List[Dict]) -> Dict:
        """Check WCAG accessibility"""
        score = 100
        issues = []

        for page in pages:
            soup = page["soup"]

            # Check for alt text on images
            for img in soup.find_all('img'):
                if not img.get('alt'):
                    issues.append(f"Missing alt text on image in {page['url']}")
                    score -= 2

            # Check for form labels
            for input_tag in soup.find_all('input'):
                if not soup.find('label', {'for': input_tag.get('id')}):
                    if not input_tag.get('aria-label') and not input_tag.get('placeholder'):
                        issues.append(f"Missing label for input in {page['url']}")
                        score -= 2

            # Check for heading hierarchy
            headings = soup.find_all(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
            if headings and headings[0].name != 'h1':
                issues.append(f"Page doesn't start with h1 in {page['url']}")
                score -= 5

        return {
            "score": max(0, score),
            "issues": issues,
            "recommendations": issues,
        }

    def generate_recommendations(self, framework, auth, database, apis, ui, performance, security, seo, accessibility) -> List[Dict]:
        """Generate comprehensive recommendations"""
        recommendations = []

        # Performance recommendations
        if performance.get("score", 100) < 80:
            recommendations.append({
                "category": "performance",
                "severity": "high",
                "title": "Performance Optimization Needed",
                "description": f"Current score: {performance['score']}/100",
                "suggestion": "Optimize images, minify assets, implement lazy loading",
            })

        # Security recommendations
        for issue in security.get("issues", []):
            recommendations.append({
                "category": "security",
                "severity": issue["severity"],
                "title": "Security Issue",
                "description": issue["issue"],
                "suggestion": "Implement proper security headers and HTTPS",
            })

        # SEO recommendations
        if seo.get("score", 100) < 90:
            recommendations.append({
                "category": "seo",
                "severity": "medium",
                "title": "SEO Improvements",
                "description": f"Current score: {seo['score']}/100",
                "suggestion": "Add meta descriptions, Open Graph tags, structured data",
            })

        # Accessibility recommendations
        if accessibility.get("score", 100) < 90:
            recommendations.append({
                "category": "accessibility",
                "severity": "medium",
                "title": "Accessibility Improvements",
                "description": f"Current score: {accessibility['score']}/100",
                "suggestion": "Add alt text, labels, ARIA attributes, ensure keyboard navigation",
            })

        return recommendations
