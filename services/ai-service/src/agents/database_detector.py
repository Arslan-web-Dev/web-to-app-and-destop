import re
from typing import Dict, List, Any

class DatabaseDetector:
    """Detect database systems and ORMs used by a website"""

    DB_PATTERNS = {
        'PostgreSQL': {
            'indicators': [
                r'postgresql',
                r'postgres',
                r'pg_',
                r'sequelize.*postgres',
                r'prisma',
                r'supabase',
            ],
            'confidence': 0.9,
        },
        'MySQL': {
            'indicators': [
                r'mysql',
                r'mariaDB',
                r'innodb',
                r'myisam',
            ],
            'confidence': 0.9,
        },
        'MongoDB': {
            'indicators': [
                r'mongodb',
                r'mongoose',
                r'\.find\(',
                r'\.aggregate\(',
                r'ObjectId',
            ],
            'confidence': 0.9,
        },
        'Firebase/Firestore': {
            'indicators': [
                r'firebase',
                r'firestore',
                r'firebase\.firestore',
                r'collection\(',
                r'doc\(',
            ],
            'confidence': 0.95,
        },
        'Supabase': {
            'indicators': [
                r'supabase',
                r'@supabase',
                r'supabase\.co',
            ],
            'confidence': 0.95,
        },
        'SQLite': {
            'indicators': [
                r'sqlite',
                r'\.db',
                r'pragm',
            ],
            'confidence': 0.85,
        },
        'Redis': {
            'indicators': [
                r'redis',
                r'cache.*redis',
                r'ioredis',
            ],
            'confidence': 0.9,
        },
        'DynamoDB': {
            'indicators': [
                r'dynamodb',
                r'dynamo-db',
                r'aws-sdk.*dynamodb',
            ],
            'confidence': 0.9,
        },
        'Cassandra': {
            'indicators': [
                r'cassandra',
                r'cql',
            ],
            'confidence': 0.85,
        },
        'Neo4j': {
            'indicators': [
                r'neo4j',
                r'cypher',
            ],
            'confidence': 0.85,
        },
    }

    ORM_PATTERNS = {
        'Prisma': [r'prisma', r'@prisma/client', r'prisma\.'],
        'Sequelize': [r'sequelize', r'Sequelize', r'\.define\('],
        'TypeORM': [r'typeorm', r'@Entity', r'@Column'],
        'Mongoose': [r'mongoose', r'new Schema', r'\.model\('],
        'Django ORM': [r'django.*models', r'from django.db', r'Models\.'],
        'SQLAlchemy': [r'sqlalchemy', r'declarative_base'],
        'Hibernate': [r'hibernate', r'@Entity', r'@Table'],
        'Entity Framework': [r'entity framework', r'DbContext', r'\.Include\('],
        'ActiveRecord': [r'ActiveRecord', r'has_many', r'belongs_to'],
    }

    async def detect(self, pages: List[Dict]) -> Dict[str, Any]:
        """Detect database systems"""
        combined_text = self.get_combined_text(pages)

        detected_dbs = []
        for db_type, config in self.DB_PATTERNS.items():
            matches = 0
            for indicator in config['indicators']:
                if re.search(indicator, combined_text, re.I):
                    matches += 1

            if matches > 0:
                confidence = min(1.0, config['confidence'] * (matches / len(config['indicators'])))
                detected_dbs.append({
                    "type": db_type,
                    "confidence": round(confidence, 2),
                    "matches": matches,
                })

        detected_dbs.sort(key=lambda x: x["confidence"], reverse=True)

        # Detect ORMs
        detected_orms = []
        for orm, patterns in self.ORM_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, combined_text, re.I):
                    detected_orms.append(orm)
                    break

        return {
            "has_database": len(detected_dbs) > 0,
            "detected_databases": detected_dbs,
            "primary_database": detected_dbs[0] if detected_dbs else None,
            "detected_orms": list(set(detected_orms)),
            "features": self.detect_db_features(pages),
        }

    def get_combined_text(self, pages: List[Dict]) -> str:
        """Combine all text from pages"""
        texts = []
        for page in pages:
            texts.append(page["html"])
            for script in page.get("scripts", []):
                texts.append(script.get("content", "") or "")
                texts.append(script.get("src", "") or "")
        return " ".join(texts)

    def detect_db_features(self, pages: List[Dict]) -> Dict[str, bool]:
        """Detect database features"""
        combined = self.get_combined_text(pages).lower()

        return {
            "migrations": any(term in combined for term in ["migration", "migrate", "schema update"]),
            "seeders": any(term in combined for term in ["seed", "faker", "fixture"]),
            "caching": any(term in combined for term in ["cache", "redis", "memcached"]),
            "replication": any(term in combined for term in ["replica", "master-slave", "cluster"]),
            "search": any(term in combined for term in ["elasticsearch", "algolia", "meilisearch", "full-text"]),
            "realtime": any(term in combined for term in ["realtime", "websocket", "subscription", "live query"]),
        }
