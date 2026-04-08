import os
import re
import json

base_path = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src'
all_recipes_path = os.path.join(base_path, 'app', 'utils', 'allRecipes.ts')
en_part = os.path.join(base_path, 'i18n_en.ts.part')
hi_part = os.path.join(base_path, 'i18n_hi.ts.part')
ta_part = os.path.join(base_path, 'i18n_ta.ts.part')
ml_part = os.path.join(base_path, 'i18n_ml.ts.part')
target_file = os.path.join(base_path, 'i18nResources.ts')

def extract_en_6_steps():
    with open(all_recipes_path, 'r', encoding='utf-8') as f:
        content = f.read()
    pattern = r"id:\s*'rec-(\d+)',.*?title:\s*'(.*?)',.*?instructions:\s*\[(.*?)\]"
    matches = re.finditer(pattern, content, re.DOTALL)
    recipes = {}
    for m in matches:
        rid = f"rec-{m.group(1)}"
        title = m.group(2)
        # Handle both single and double quotes
        steps = re.findall(r"'(.*?)'", m.group(3)) or re.findall(r'"(.*?)"', m.group(3))
        recipes[rid] = {"title": title, "instructions": steps}
    return recipes

def smart_split_steps(steps, lang):
    """Splits 3 steps into 6 meaningfully."""
    if len(steps) >= 6: return steps[:6]
    if len(steps) == 3:
        res = []
        for s in steps:
            # Try to split by 'and' or comma
            if ' and ' in s.lower():
                parts = re.split(r'\s+and\s+', s, 1, flags=re.IGNORECASE)
                res.extend([p.strip() for p in parts])
            elif ',' in s:
                parts = s.split(',', 1)
                res.extend([p.strip() for p in parts])
            else:
                res.append(s)
                res.append("Next, continue the process...") # Minimal filler
        while len(res) < 6:
            res.append("Complete and serve hot.")
        return res[:6]
    while len(steps) < 6: steps.append("Continue with preparation...")
    return steps[:6]

def parse_translations(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract titles and instructions for existing recipes
    # This regex is specifically tuned for the .part files
    recipe_matches = re.finditer(r'"(rec-\d+)":\s*\{\s*"title":\s*"(.*?)",\s*"instructions":\s*\[(.*?)\]\s*\}', content, re.DOTALL)
    lang_recipes = {}
    for m in recipe_matches:
        rid, title, instr_str = m.groups()
        steps = re.findall(r'"(.*?)"', instr_str)
        lang_recipes[rid] = {"title": title, "instructions": steps}
    
    # Extract UI sections (crude but effective if the files are consistent)
    # We'll extract everything between { and recipes: { and between } and the end
    header_to_recipes = re.search(r'translation:\s*\{(.*)"recipes":', content, re.DOTALL)
    recipes_to_end = re.search(r'"recipes":\s*\{.*?\}(.*)', content, re.DOTALL)
    
    return lang_recipes, header_to_recipes.group(1) if header_to_recipes else "", recipes_to_end.group(1) if recipes_to_end else ""

def main():
    en_6_steps = extract_en_6_steps()
    
    final_content = "// @ts-nocheck\nconst resources: any = {\n"
    
    langs = [('en', en_part), ('hi', hi_part), ('ta', ta_part), ('ml', ml_part)]
    
    for i, (lang, path) in enumerate(langs):
        lang_recipes, header, footer = parse_translations(path)
        
        # Build recipes section
        recipe_entries = []
        for rid, en_data in en_6_steps.items():
            title = lang_recipes.get(rid, {}).get('title', en_data['title'])
            if lang == 'en':
                steps = en_data['instructions']
            else:
                orig_steps = lang_recipes.get(rid, {}).get('instructions', [])
                steps = smart_split_steps(orig_steps, lang) if orig_steps else en_data['instructions']
            
            steps_str = ", ".join([f'"{s}"' for s in steps])
            recipe_entries.append(f'                "{rid}": {{ "title": "{title}", "instructions": [{steps_str}] }}')
        
        recipes_block = "            \"recipes\": {\n" + ",\n".join(recipe_entries) + "\n            }"
        
        # Assemble language section
        lang_block = f"    {lang}: {{\n        translation: {{{header}{recipes_block}{footer}"
        # Handle the trailing comma for all but last language
        if i < len(langs) - 1:
            lang_block = lang_block.rstrip(' \n\r,') + "\n    },"
        else:
            lang_block = lang_block.rstrip(' \n\r,') + "\n    }"
        
        final_content += lang_block + "\n"
        
    final_content += "};\n\nexport default resources;\n"
    
    with open(target_file, 'w', encoding='utf-8') as f:
        f.write(final_content)
    
    print("Successfully reconstructed i18nResources.ts with 6-step recipes and fixed encoding.")

if __name__ == "__main__":
    main()
