"""Quick local test for clean.py and analyze.py using dummy data."""
import json
import sys
import os
sys.path.insert(0, os.path.dirname(__file__))

from clean import clean
from analyze import analyze

DUMMY_RESPONSES = [
    {
        "year": "freshman", "college": "College of Engineering, Computing and Applied Sciences",
        "greek_life": False, "has_job": True, "monthly_income": 800,
        "rent": 600, "groceries": 150, "dining_out": 100, "transportation": 50,
        "subscriptions": 20, "entertainment": 40, "clothing": 30,
        "personal_care": 25, "misc": 60,
    },
    {
        "year": "sophomore", "college": "College of Business",
        "greek_life": True, "has_job": False, "monthly_income": None,
        "rent": 700, "groceries": 120, "dining_out": 200, "transportation": 80,
        "subscriptions": 15, "entertainment": 100, "clothing": 60,
        "personal_care": 30, "misc": 50,
    },
    {
        # invalid row — year is wrong
        "year": "alien", "college": "College of Science",
        "greek_life": False, "has_job": False,
        "rent": 500, "groceries": 100, "dining_out": 80, "transportation": 40,
        "subscriptions": 10, "entertainment": 20, "clothing": 15,
        "personal_care": 10, "misc": 30,
    },
    {
        # invalid row — rent exceeds max
        "year": "junior", "college": "College of Science",
        "greek_life": False, "has_job": True,
        "rent": 9999, "groceries": 100, "dining_out": 80, "transportation": 40,
        "subscriptions": 10, "entertainment": 20, "clothing": 15,
        "personal_care": 10, "misc": 30,
    },
]

cleaned = clean(DUMMY_RESPONSES)
stats = analyze(cleaned)
print(json.dumps(stats, indent=2))
