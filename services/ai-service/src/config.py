from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    # API Keys
    OPENAI_API_KEY: str = ""
    GEMINI_API_KEY: str = ""
    CLAUDE_API_KEY: str = ""

    # Service Config
    DEBUG: bool = False
    CORS_ORIGINS: List[str] = ["http://localhost:3000", "https://app.universalwebtonative.com"]

    # Redis
    REDIS_URL: str = "redis://localhost:6379"

    # S3
    AWS_ACCESS_KEY_ID: str = ""
    AWS_SECRET_ACCESS_KEY: str = ""
    AWS_S3_BUCKET: str = "universal-web-to-native"
    AWS_REGION: str = "us-east-1"

    # Analysis Config
    MAX_CRAWL_DEPTH: int = 3
    MAX_PAGES: int = 100
    REQUEST_TIMEOUT: int = 30
    CONCURRENT_REQUESTS: int = 10

    # Generation Config
    DEFAULT_FRAMEWORK_ANDROID: str = "jetpack_compose"
    DEFAULT_FRAMEWORK_IOS: str = "swiftui"
    DEFAULT_FRAMEWORK_DESKTOP: str = "tauri"

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"

settings = Settings()
