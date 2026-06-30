import os
import json
import asyncio
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
import openai
import google.generativeai as genai
from anthropic import Anthropic

from src.generators.android_generator import AndroidGenerator
from src.generators.ios_generator import IOSGenerator
from src.generators.desktop_generator import DesktopGenerator
from src.generators.pwa_generator import PWAGenerator

@dataclass
class GenerationConfig:
    platform: str
    framework: str
    features: List[str]
    theme: Dict[str, Any]
    architecture: str = "mvvm"
    include_tests: bool = True
    include_docs: bool = True

class NativeGenerator:
    def __init__(self):
        self.openai = openai.AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))
        genai.configure(api_key=os.getenv("GEMINI_API_KEY"))
        self.anthropic = Anthropic(api_key=os.getenv("CLAUDE_API_KEY"))

        self.platform_generators = {
            "android": AndroidGenerator(),
            "ios": IOSGenerator(),
            "desktop_windows": DesktopGenerator(),
            "desktop_macos": DesktopGenerator(),
            "desktop_linux": DesktopGenerator(),
            "pwa": PWAGenerator(),
        }

    async def initialize(self):
        for generator in self.platform_generators.values():
            await generator.initialize()

    async def cleanup(self):
        for generator in self.platform_generators.values():
            await generator.cleanup()

    async def generate(self, analysis: Dict[str, Any], config: GenerationConfig) -> Dict[str, Any]:
        platform = config.platform

        if platform not in self.platform_generators:
            raise ValueError(f"Unsupported platform: {platform}")

        generator = self.platform_generators[platform]

        project_structure = await generator.generate_structure(analysis, config)
        ui_components = await generator.generate_ui(analysis, config)
        business_logic = await generator.generate_logic(analysis, config)
        data_layer = await generator.generate_data_layer(analysis, config)
        native_features = await generator.generate_native_features(config.features, config)
        tests = await generator.generate_tests(analysis, config) if config.include_tests else None
        docs = await generator.generate_docs(analysis, config) if config.include_docs else None

        return {
            "platform": platform,
            "framework": config.framework,
            "project_structure": project_structure,
            "ui_components": ui_components,
            "business_logic": business_logic,
            "data_layer": data_layer,
            "native_features": native_features,
            "tests": tests,
            "documentation": docs,
            "build_config": await generator.generate_build_config(config),
        }

    async def optimize_with_ai(self, code: str, platform: str, optimization_type: str) -> str:
        prompt = f"""
        Optimize the following {platform} code for {optimization_type}:

        ```
        {code}
        ```

        Provide only the optimized code without explanations.
        """

        try:
            response = await self.openai.chat.completions.create(
                model="gpt-4-turbo-preview",
                messages=[
                    {"role": "system", "content": f"You are an expert {platform} developer. Optimize code for {optimization_type}."},
                    {"role": "user", "content": prompt}
                ],
                temperature=0.1,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"OpenAI optimization failed: {e}")

            try:
                model = genai.GenerativeModel('gemini-pro')
                response = await model.generate_content_async(prompt)
                return response.text
            except Exception as e2:
                print(f"Gemini optimization failed: {e2}")
                return code
