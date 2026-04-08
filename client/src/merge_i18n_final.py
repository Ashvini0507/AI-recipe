import os

def merge_i18n():
    parts = ['i18n_en.ts.part', 'i18n_hi.ts.part', 'i18n_ta.ts.part', 'i18n_ml.ts.part']
    output_file = 'i18nResources.ts'
    
    # Base directory
    base_dir = r'c:\Users\ashvi\OneDrive\Desktop\Documents\Ashvini (2)\Ashvini\Aireciperecommendationapp\client\src'
    
    with open(os.path.join(base_dir, output_file), 'w', encoding='utf-8') as outfile:
        for part in parts:
            part_path = os.path.join(base_dir, part)
            if os.path.exists(part_path):
                with open(part_path, 'r', encoding='utf-8') as infile:
                    outfile.write(infile.read())
                    outfile.write('\n')
            else:
                print(f"Warning: {part} not found.")

if __name__ == '__main__':
    merge_i18n()
    print("Successfully merged i18n resources.")
