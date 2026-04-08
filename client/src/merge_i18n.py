
import os

parts = [
    r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_en.ts.part',
    r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_hi.ts.part',
    r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_ta.ts.part',
    r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18n_ml.ts.part'
]

output_file = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src\i18nResources.ts'

with open(output_file, 'w', encoding='utf-8') as outfile:
    for part in parts:
        if os.path.exists(part):
            with open(part, 'r', encoding='utf-8') as infile:
                outfile.write(infile.read())
        else:
            print(f"Warning: Part {part} not found!")

print("Merge complete with UTF-8 encoding.")
