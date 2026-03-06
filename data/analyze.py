from statistics import mean

SPENDING_FIELDS = [
    "rent", "groceries", "dining_out", "transportation",
    "subscriptions", "entertainment", "clothing", "personal_care", "misc"
]


def avg_spending(rows: list[dict]) -> dict:
    """Average spend per category across all rows."""
    if not rows:
        return {}
    return {
        field: round(mean(r[field] for r in rows), 2)
        for field in SPENDING_FIELDS
    }


def total_per_row(row: dict) -> float:
    return sum(row[f] for f in SPENDING_FIELDS)


def breakdown_by(rows: list[dict], key: str) -> dict:
    groups = {}                                                                                                                                                                                             
    for row in rows:                                                                                                                                                                                        
        val = row.get(key)                                                                                                                                                                                  
        groups.setdefault(val, []).append(row)                                                                                                                                                              
    return {val: avg_spending(group_rows) for val, group_rows in groups.items()} 


def analyze(rows: list[dict]) -> dict:
    return {
        "response_count": len(rows),
        "overall": avg_spending(rows),
        "by_year": breakdown_by(rows, "year"),
        "by_college": breakdown_by(rows, "college"),
        "by_greek_life": breakdown_by(rows, "greek_life"),
        "by_has_job": breakdown_by(rows, "has_job"),
        "avg_total_spending": round(mean(total_per_row(r) for r in rows), 2) if rows else 0,
    }