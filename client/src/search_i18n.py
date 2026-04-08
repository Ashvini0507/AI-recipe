
import os

target_file = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18nResources.ts'

with open(target_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

print(f"Total lines: {len(lines)}")

# Search for "no_recipes" in all languages
for i, line in enumerate(lines):
    if "no_recipes" in line:
        print(f"Line {i+1}: {line.strip()}")

# Search for the corruption at 725
print(f"Line 724: {lines[723].strip()}")
print(f"Line 725: {lines[724].strip()}")
print(f"Line 726: {lines[725].strip()}")

# Search for "insight" keys in ta
found_ta = False
for i, line in enumerate(lines):
    if '"ta": {' in line:
        found_ta = True
    if found_ta and '"ml": {' in line:
        break
    if found_ta and "insight" in line:
        print(f"TA Insight Line {i+1}: {line.strip()}")
