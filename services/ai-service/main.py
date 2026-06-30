from fastapi import FastAPI, HTTPException, BackgroundTasks, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from contextlib import asynccontextmanager
import uvicorn
from typing import Optional, List
import asyncio

from src.agents.website_analyzer import WebsiteAnalyzer
from src.agents.native_generator import NativeGenerator
from src.agents.code_optimizer import CodeOptimizer
from src.agents.security_scanner import SecurityScanner
from src.agents.seo_analyzer import SEOAnalyzer
from src.agents.performance_optimizer import PerformanceOptimizer
from src.agents.accessibility_checker import AccessibilityChecker
from src.pipeline.analysis_pipeline import AnalysisPipeline
from src.pipeline.generation_pipeline import GenerationPipeline
from src.config import settings

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    print("🚀 AI Service starting up...")
    await app.state.analyzer.initialize()
    await app.state.generator.initialize()
    yield
    # Shutdown
    print("🛑 AI Service shutting down...")
    await app.state.analyzer.cleanup()
    await app.state.generator.cleanup()

app = FastAPI(
    title="Universal Web to Native - AI Engine",
    description="AI-powered analysis and code generation service",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize agents on app state
@app.on_event("startup")
async def startup_event():
    app.state.analyzer = WebsiteAnalyzer()
    app.state.generator = NativeGenerator()
    app.state.optimizer = CodeOptimizer()
    app.state.security = SecurityScanner()
    app.state.seo = SEOAnalyzer()
    app.state.performance = PerformanceOptimizer()
    app.state.accessibility = AccessibilityChecker()
    app.state.analysis_pipeline = AnalysisPipeline()
    app.state.generation_pipeline = GenerationPipeline()

# Health check
@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "service": "ai-engine",
        "version": "1.0.0",
        "agents": [
            "website_analyzer",
            "native_generator", 
            "code_optimizer",
            "security_scanner",
            "seo_analyzer",
            "performance_optimizer",
            "accessibility_checker"
        ]
    }

# Website Analysis Endpoint
@app.post("/api/v1/analyze/website")
async def analyze_website(
    url: str,
    deep_analysis: bool = False,
    background_tasks: BackgroundTasks = None
):
    """
    Analyze a website and detect framework, structure, features, and issues
    """
    try:
        result = await app.state.analysis_pipeline.run(
            url=url,
            deep_analysis=deep_analysis
        )
        return {
            "status": "success",
            "analysis_id": result["id"],
            "results": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# Generate Native App Endpoint
@app.post("/api/v1/generate/{platform}")
async def generate_native_app(
    platform: str,
    project_id: str,
    analysis_id: str,
    features: Optional[List[str]] = None,
    background_tasks: BackgroundTasks = None
):
    """
    Generate native application code for specified platform
    """
    valid_platforms = ["android", "ios", "desktop_windows", "desktop_macos", "desktop_linux", "pwa"]
    if platform not in valid_platforms:
        raise HTTPException(status_code=400, detail=f"Invalid platform. Must be one of: {valid_platforms}")

    try:
        result = await app.state.generation_pipeline.run(
            platform=platform,
            project_id=project_id,
            analysis_id=analysis_id,
            features=features or []
        )
        return {
            "status": "success",
            "generation_id": result["id"],
            "platform": platform,
            "results": result
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# AI Chat Assistant
@app.post("/api/v1/chat")
async def ai_chat(
    message: str,
    context: Optional[dict] = None,
    project_id: Optional[str] = None
):
    """
    AI Chat Assistant for project help, bug fixes, optimization
    """
    from src.agents.chat_assistant import ChatAssistant
    assistant = ChatAssistant()
    response = await assistant.chat(message, context, project_id)
    return {"response": response}

# Code Optimization
@app.post("/api/v1/optimize/code")
async def optimize_code(
    code: str,
    language: str,
    optimization_type: str = "performance"
):
    """
    AI-powered code optimization
    """
    result = await app.state.optimizer.optimize(code, language, optimization_type)
    return {"optimized_code": result}

# Security Scan
@app.post("/api/v1/scan/security")
async def security_scan(
    url: str,
    scan_type: str = "full"
):
    """
    Security vulnerability scanning
    """
    result = await app.state.security.scan(url, scan_type)
    return {"scan_results": result}

# SEO Analysis
@app.post("/api/v1/analyze/seo")
async def seo_analysis(url: str):
    """
    SEO analysis and recommendations
    """
    result = await app.state.seo.analyze(url)
    return {"seo_report": result}

# Performance Analysis
@app.post("/api/v1/analyze/performance")
async def performance_analysis(url: str):
    """
    Performance analysis and optimization suggestions
    """
    result = await app.state.performance.analyze(url)
    return {"performance_report": result}

# Accessibility Check
@app.post("/api/v1/check/accessibility")
async def accessibility_check(url: str):
    """
    WCAG accessibility compliance check
    """
    result = await app.state.accessibility.check(url)
    return {"accessibility_report": result}

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=8000,
        reload=settings.DEBUG,
        workers=4,
        log_level="info"
    )
