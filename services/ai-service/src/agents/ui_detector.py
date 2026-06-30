import re
from typing import Dict, List, Any
from bs4 import BeautifulSoup

class UIDetector:
    """Detect UI components and design patterns"""

    async def detect(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect UI components and design system"""
        all_components = []
        all_styles = []

        for page in pages:
            soup = page["soup"]
            components = self.extract_components(soup)
            styles = self.extract_styles(soup)
            all_components.extend(components)
            all_styles.extend(styles)

        # Analyze design system
        design_system = self.analyze_design_system(all_components, all_styles)

        # Detect responsive behavior
        responsive = self.detect_responsive(pages)

        # Detect dark mode
        dark_mode = self.detect_dark_mode(pages)

        # Detect animations
        animations = self.detect_animations(pages)

        return {
            "components": self.categorize_components(all_components),
            "design_system": design_system,
            "responsive": responsive,
            "dark_mode": dark_mode,
            "animations": animations,
            "layout_patterns": self.detect_layout_patterns(pages),
            "color_scheme": self.extract_color_scheme(all_styles),
            "typography": self.extract_typography(all_styles),
        }

    def extract_components(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract UI components from page"""
        components = []

        # Cards
        cards = soup.find_all(['.card', '[class*="card"]'])
        for card in cards:
            components.append({
                "type": "card",
                "classes": card.get("class", []),
                "children": len(card.find_all()),
            })

        # Buttons
        buttons = soup.find_all(['button', '[class*="btn"]'])
        for btn in buttons:
            components.append({
                "type": "button",
                "text": btn.get_text(strip=True),
                "classes": btn.get("class", []),
            })

        # Forms
        forms = soup.find_all('form')
        for form in forms:
            components.append({
                "type": "form",
                "action": form.get("action"),
                "method": form.get("method"),
                "fields": len(form.find_all(['input', 'textarea', 'select'])),
            })

        # Tables
        tables = soup.find_all('table')
        for table in tables:
            components.append({
                "type": "table",
                "rows": len(table.find_all('tr')),
                "columns": len(table.find_all('th')),
            })

        # Modals/Dialogs
        modals = soup.find_all(['[class*="modal"]', '[class*="dialog"]', '[role="dialog"]'])
        for modal in modals:
            components.append({
                "type": "modal",
                "classes": modal.get("class", []),
            })

        # Navigation
        navs = soup.find_all(['nav', '[class*="navbar"]', '[class*="navigation"]'])
        for nav in navs:
            components.append({
                "type": "navigation",
                "items": len(nav.find_all('a')),
            })

        # Sidebar
        sidebars = soup.find_all(['aside', '[class*="sidebar"]'])
        for sidebar in sidebars:
            components.append({
                "type": "sidebar",
                "items": len(sidebar.find_all('a')),
            })

        # Tabs
        tabs = soup.find_all(['[class*="tab"]'])
        for tab in tabs:
            components.append({
                "type": "tab",
                "active": "active" in str(tab.get("class", [])),
            })

        # Charts
        charts = soup.find_all(['canvas', '[class*="chart"]'])
        for chart in charts:
            components.append({
                "type": "chart",
                "library": self.detect_chart_library(chart),
            })

        return components

    def detect_chart_library(self, element) -> str:
        """Detect charting library"""
        classes = element.get("class", [])
        class_str = " ".join(classes).lower()

        if "chart" in class_str:
            return "chart.js"
        if "d3" in class_str:
            return "d3.js"
        if "highchart" in class_str:
            return "highcharts"
        if "echart" in class_str:
            return "echarts"
        return "unknown"

    def extract_styles(self, soup: BeautifulSoup) -> List[Dict]:
        """Extract CSS styles"""
        styles = []

        # Inline styles
        for elem in soup.find_all(style=True):
            styles.append({
                "type": "inline",
                "style": elem.get("style"),
            })

        # Style tags
        for style in soup.find_all('style'):
            styles.append({
                "type": "style_tag",
                "content": style.string,
            })

        # Link stylesheets
        for link in soup.find_all('link', rel='stylesheet'):
            styles.append({
                "type": "stylesheet",
                "href": link.get("href"),
            })

        return styles

    def categorize_components(self, components: List[Dict]) -> Dict[str, List[Dict]]:
        """Categorize components by type"""
        categorized = {}
        for comp in components:
            comp_type = comp["type"]
            if comp_type not in categorized:
                categorized[comp_type] = []
            categorized[comp_type].append(comp)
        return categorized

    def analyze_design_system(self, components: List[Dict], styles: List[Dict]) -> Dict[str, Any]:
        """Analyze design system patterns"""
        return {
            "component_count": len(components),
            "unique_types": len(set(c["type"] for c in components)),
            "has_design_system": len(components) > 10,
            "consistency_score": self.calculate_consistency(components),
        }

    def calculate_consistency(self, components: List[Dict]) -> float:
        """Calculate design consistency score"""
        if not components:
            return 0.0

        # Check for consistent class naming patterns
        class_patterns = {}
        for comp in components:
            classes = comp.get("classes", [])
            for cls in classes:
                prefix = cls.split('-')[0] if '-' in cls else cls
                class_patterns[prefix] = class_patterns.get(prefix, 0) + 1

        # Higher score if consistent prefixes found
        if class_patterns:
            max_pattern = max(class_patterns.values())
            consistency = max_pattern / len(components)
            return round(min(1.0, consistency), 2)
        return 0.5

    def detect_responsive(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect responsive design patterns"""
        has_viewport = False
        has_media_queries = False
        has_flexbox = False
        has_grid = False

        for page in pages:
            html = page["html"]
            if 'viewport' in html:
                has_viewport = True
            if '@media' in html:
                has_media_queries = True
            if 'display: flex' in html or 'flex-' in html:
                has_flexbox = True
            if 'display: grid' in html or 'grid-' in html:
                has_grid = True

        return {
            "is_responsive": has_viewport and has_media_queries,
            "has_viewport_meta": has_viewport,
            "has_media_queries": has_media_queries,
            "uses_flexbox": has_flexbox,
            "uses_grid": has_grid,
        }

    def detect_dark_mode(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect dark mode support"""
        has_dark_mode = False
        dark_mode_method = None

        for page in pages:
            html = page["html"]
            if any(term in html for term in ['dark:', 'dark-mode', 'darkmode', 'prefers-color-scheme']):
                has_dark_mode = True
                if 'prefers-color-scheme' in html:
                    dark_mode_method = "media-query"
                elif 'dark:' in html:
                    dark_mode_method = "tailwind"
                else:
                    dark_mode_method = "class-based"

        return {
            "has_dark_mode": has_dark_mode,
            "method": dark_mode_method,
        }

    def detect_animations(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect animation usage"""
        has_animations = False
        animation_types = []

        for page in pages:
            html = page["html"]
            if 'transition' in html or 'animation' in html:
                has_animations = True
            if '@keyframes' in html:
                animation_types.append("css-keyframes")
            if 'transform' in html:
                animation_types.append("css-transform")
            if 'gsap' in html.lower():
                animation_types.append("gsap")
            if 'framer-motion' in html.lower():
                animation_types.append("framer-motion")

        return {
            "has_animations": has_animations,
            "animation_types": list(set(animation_types)),
        }

    def detect_layout_patterns(self, pages: List[Dict]) -> List[str]:
        """Detect common layout patterns"""
        patterns = []

        for page in pages:
            soup = page["soup"]

            # Dashboard layout
            if soup.find(['.dashboard', '[class*="dashboard"]']):
                patterns.append("dashboard")

            # Sidebar layout
            if soup.find(['aside', '[class*="sidebar"]']):
                patterns.append("sidebar-layout")

            # Card grid
            cards = soup.find_all(['.card', '[class*="card"]'])
            if len(cards) >= 3:
                patterns.append("card-grid")

            # Hero section
            if soup.find(['.hero', '[class*="hero"]']):
                patterns.append("hero-section")

            # Footer
            if soup.find('footer'):
                patterns.append("footer")

        return list(set(patterns))

    def extract_color_scheme(self, styles: List[Dict]) -> Dict[str, Any]:
        """Extract color scheme from styles"""
        colors = set()

        for style in styles:
            content = style.get("content", "") or style.get("style", "")
            # Extract hex colors
            hex_colors = re.findall(r'#([0-9A-Fa-f]{3,6})', content)
            colors.update(hex_colors)

            # Extract rgb/rgba colors
            rgb_colors = re.findall(r'rgba?\([^)]+\)', content)
            colors.update(rgb_colors)

            # Extract CSS variables
            css_vars = re.findall(r'--([\w-]+):\s*([^;]+)', content)
            for var, value in css_vars:
                if 'color' in var or 'bg' in var:
                    colors.add(value.strip())

        return {
            "primary_colors": list(colors)[:10],
            "color_count": len(colors),
            "has_css_variables": any('var(--' in str(s) for s in styles),
        }

    def extract_typography(self, styles: List[Dict]) -> Dict[str, Any]:
        """Extract typography information"""
        fonts = set()
        font_sizes = set()

        for style in styles:
            content = style.get("content", "") or style.get("style", "")

            # Extract font families
            font_families = re.findall(r'font-family:\s*([^;]+)', content)
            for family in font_families:
                fonts.update(f.strip().strip('"'') for f in family.split(','))

            # Extract font sizes
            sizes = re.findall(r'font-size:\s*([^;]+)', content)
            font_sizes.update(sizes)

        return {
            "fonts": list(fonts)[:10],
            "font_sizes": list(font_sizes)[:10],
            "has_custom_fonts": len(fonts) > 2,
        }
