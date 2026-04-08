
import os

target_file = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18nResources.ts'

with open(target_file, 'r', encoding='utf-8') as f:
    content = f.read()

# I will use a more robust replacement strategy.
# Reconstruct the 'ta' section's 'translation' head until 'recipes'.

TA_HOME = """                    "home": {
                        "hero_title": "உங்கள் சமையலறையின் மாயக்காரி",
                        "hero_subtitle": "உங்களிடம் உள்ள பொருட்களைக் கொண்டு சிறந்த உணவை சமைக்கவும்",
                        "select_ingredients": "பொருட்களைத் தேர்ந்தெடுக்கவும்",
                        "search_placeholder": "தேடவும்...",
                        "veg": "🟢 சைவம்",
                        "non_veg": "🔴 அசைவம்",
                        "all": "⭐ அனைத்து பொருட்கள்",
                        "any_meal": "ஏதாவது ஒரு வேளை",
                        "breakfast": "காலை உணவு",
                        "lunch": "மதிய உணவு",
                        "dinner": "இரவு உணவு",
                        "ingredients_btn": "பொருட்கள்",
                        "feed": "உணவு ஊட்டம்",
                        "recommended_for_you": "உங்கள் உணவு முறையின் அடிப்படையில் பரிந்துரைக்கப்படுகிறது",
                        "no_recipes": "உணவு வகைகள் எதுவும் இல்லை. தேடலை மாற்றவும்."
                    },"""

# Replace the existing home block in 'ta'
import re
pattern_ta = re.compile(r'("ta": \{(?:\n\s+)*"translation": \{(?:\n\s+)*"home": \{).*?(\},(?:\n\s+)*"recipes": \{)', re.DOTALL)

def repl_ta(match):
    return match.group(1).rstrip() + "\n" + TA_HOME + "\n" + "                    " + match.group(2).lstrip()

content = pattern_ta.sub(repl_ta, content)

# Also fix the corruption at the end of recipes block in 'ta'
# Find the end of rec-26 and ensure it closes correctly then starts 'nav'
rec26_end_pattern = re.compile(r'("rec-26": \{.*?\n\s+?\})(.*?)("nav": \{)', re.DOTALL)

def fix_rec_end(match):
    # This matches from end of rec-26 to start of nav
    # We want it to be:
    # }
    # },
    # "nav": {
    return match.group(1) + "\n                    },\n                    " + match.group(3)

content = rec26_end_pattern.sub(fix_rec_end, content)

with open(target_file, 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)

print("Comprehensive structural fix for 'ta' section complete.")
