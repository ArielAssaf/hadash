
import os
from pdfminer.high_level import extract_text

files = [
    r'c:\Users\ariel\code\hadash\תקנון חד״ש.pdf',
    r'c:\Users\ariel\code\hadash\دستور الجبهة-1.pdf'
]

output_file = r'c:\Users\ariel\code\hadash\extracted_content.txt'

with open(output_file, 'w', encoding='utf-8') as f:
    for file_path in files:
        print(f"--- Extracting {os.path.basename(file_path)} ---")
        f.write(f"\n\n--- FILE: {os.path.basename(file_path)} ---\n\n")
        if os.path.exists(file_path):
            try:
                text = extract_text(file_path)
                print("Extracted successfully.")
                f.write(text)
            except Exception as e:
                print(f"Error reading {file_path}: {e}")
                f.write(f"ERROR: {e}\n")
        else:
            print(f"File not found: {file_path}")
        print("--------------------------")

print(f"Done. Output saved to {output_file}")
