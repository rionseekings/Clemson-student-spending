SPENDING_FIELDS = [
    "rent", "groceries", "dining_out", "transportation",
    "subscriptions", "entertainment", "clothing", "personal_care", "misc"
]

VALID_YEARS = {"freshman", "sophomore", "junior", "senior", "graduate"}

SPENDING_MAX = {field: 3000 for field in SPENDING_FIELDS}
SPENDING_MAX["misc"] = 10000


def is_valid(row: dict) -> bool:
    if row.get("year") not in VALID_YEARS:
        return False
    if not row.get("college"):
        return False
    for field, max_val in SPENDING_MAX.items():
        val = row.get(field)
        if not isinstance(val, (int, float)) or val < 0 or val > max_val:
            return False
    return True


def clean(responses: list[dict]) -> list[dict]:
    cleaned = []
    for row in responses:
        # coerce spending fields to float in case DB returns strings
        for field in SPENDING_FIELDS:
            if field in row:
                try:
                    row[field] = float(row[field])
                except (TypeError, ValueError):
                    row[field] = None

        if is_valid(row):
            cleaned.append(row)

    dropped = len(responses) - len(cleaned)
    print(f"Cleaned: {len(cleaned)} valid rows, {dropped} dropped")
    return cleaned