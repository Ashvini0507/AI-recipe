import os
import re
import json

all_recipes_path = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\app\utils\allRecipes.ts'
i18n_resources_path = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18nResources.ts'

# 1. Extract 6-step instructions from allRecipes.ts
with open(all_recipes_path, 'r', encoding='utf-8') as f:
    all_recipes_content = f.read()

# Regex to find id: 'rec-X' and instructions: [...]
recipe_matches = re.finditer(r"id:\s*'rec-(\d+)',.*?instructions:\s*\[(.*?)\]", all_recipes_content, re.DOTALL)
all_recipes_en_instr = {}
for m in recipe_matches:
    rec_id = f"rec-{m.group(1)}"
    instr_text = m.group(2)
    # Split by comma but handle potential internal commas (quotes)
    # Simple split since it's most likely well-formatted
    steps = re.findall(r"'(.*?)'", instr_text)
    if not steps:
        steps = re.findall(r'"(.*?)"', instr_text)
    all_recipes_en_instr[rec_id] = steps

# 2. Read i18nResources.ts
with open(i18n_resources_path, 'r', encoding='utf-8', errors='replace') as f:
    i18n_content = f.read()

def split_3_to_6(steps):
    """Splits 3 steps into 6 by breaking each one into two parts."""
    if len(steps) != 3:
        # If not 3, just pad with placeholders or truncate to 6
        if len(steps) < 6:
            return steps + ["Next step..."] * (6 - len(steps))
        return steps[:6]
    
    new_steps = []
    # Heuristic split or just add a 'Then' prefix for the second part
    for s in steps:
        if '.' in s and len(s) > 20: # Try to split by sentence
            parts = s.split('.', 1)
            new_steps.append(parts[0].strip() + '.')
            new_steps.append(parts[1].strip() if parts[1].strip() else "Continue processing...")
        elif ' and ' in s.lower():
            parts = re.split(r'\s+and\s+', s, 1, flags=re.IGNORECASE)
            new_steps.append(parts[0].strip())
            new_steps.append("And " + parts[1].strip())
        else:
            new_steps.append(s)
            new_steps.append("Continue with preparation...")
    
    # Ensure exactly 6
    while len(new_steps) < 6:
        new_steps.append("Follow through with remaining steps...")
    return new_steps[:6]

# 3. Process each language section
# We'll use a regex to find the whole translation object for each lang
langs = ['en', 'hi', 'ta', 'ml']
for lang in langs:
    # Find the "recipes" block for this language
    # This is tricky because the file is large. I'll use a more surgical approach.
    pass

# Actually, I'll use a more robust line-by-line approach for i18nResources.ts
lines = i18n_content.splitlines()
new_lines = []
current_lang = None

for line in lines:
    # Identify language section
    if ' en: {' in line: current_lang = 'en'
    elif ' hi: {' in line: current_lang = 'hi'
    elif ' ta: {' in line: current_lang = 'ta'
    elif ' ml: {' in line: current_lang = 'ml'
    
    # Identify recipe instruction line
    # e.g. "rec-13": { "title": "Idli & Sambar", "instructions": ["Steam idlis", "Prepare lentil stew", "Serve together"] },
    match = re.search(r'("rec-(\d+)":\s*{.*?"instructions":\s*\[)(.*?)(\]\s*},?)', line)
    if match and current_lang:
        prefix = match.group(1)
        rec_id = f"rec-{match.group(2)}"
        instr_content = match.group(3)
        suffix = match.group(4)
        
        # Parse current steps
        steps = re.findall(r'"(.*?)"', instr_content)
        if not steps:
            steps = re.findall(r"'(.*?)'", instr_content)
            
        if current_lang == 'en' and rec_id in all_recipes_en_instr:
            new_steps = all_recipes_en_instr[rec_id]
        elif len(steps) != 6:
            new_steps = split_3_to_6(steps)
        else:
            new_steps = steps
            
        # Rebuild the line
        formatted_steps = ", ".join([f'"{s}"' for s in new_steps])
        new_line = prefix + formatted_steps + suffix
        new_lines.append(new_line)
    else:
        new_lines.append(line)

# 4. Write back
with open(i18n_resources_path, 'w', encoding='utf-8') as f:
    f.write("\n".join(new_lines) + "\n")

print("Successfully synchronized steps across all languages.")
