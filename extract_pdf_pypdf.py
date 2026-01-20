
import os
from pypdf import PdfReader

files = [
    r'c:\Users\ariel\code\hadash\תקנון חד״ש.pdf',
    r'c:\Users\ariel\code\hadash\دستور الجبهة-1.pdf'
]

for file_path in files:
    print(f"--- Extracting {os.path.basename(file_path)} ---")
    if os.path.exists(file_path):
        try:
            reader = PdfReader(file_path)
            text = ""
            for page in reader.pages:
                text += page.extract_text() + "\n"
            print("--- START TEXT ---")
            print(text)
            print("--- END TEXT ---")
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
    else:
        print(f"File not found: {file_path}")
    print("--------------------------")
