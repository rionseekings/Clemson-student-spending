import os
import sys
from clean import clean
from analyze import analyze
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

SUPABASE_URL = os.environ["SUPABASE_URL"]
SUPABASE_SERVICE_KEY = os.environ["SUPABASE_SERVICE_KEY"]

supabase = create_client(SUPABASE_URL, SUPABASE_SERVICE_KEY)


def fetch_responses():
    result = supabase.table("survey_responses").select("*").execute()
    return result.data


def upsert_cache(stats: dict):
    supabase.table("analytics_cache").upsert({
        "key": "summary",
        "data": stats,
    }).execute()
    print("analytics_cache updated.")


def main():
    try:
        responses = fetch_responses()
        print(f"Fetched {len(responses)} responses")
        cleaned = clean(responses)
        analyzed = analyze(cleaned)
        upsert_cache(analyzed)
    except Exception as e:
        print(f"Pipeline failed: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
