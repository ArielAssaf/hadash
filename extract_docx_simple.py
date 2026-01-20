
import zipfile
import xml.etree.ElementTree as ET
import os

def extract_text_from_docx(docx_path):
    """
    Extracts text from a DOCX file by reading the word/document.xml file directly.
    """
    try:
        with zipfile.ZipFile(docx_path) as zf:
            xml_content = zf.read('word/document.xml')
        
        root = ET.fromstring(xml_content)
        
        # XML namespace for Word
        ns = {'w': 'http://schemas.openxmlformats.org/wordprocessingml/2006/main'}
        
        text_parts = []
        for node in root.iter():
            if node.tag == f"{{{ns['w']}}}p": # Paragraph
                para_text = ""
                for child in node.iter():
                    if child.tag == f"{{{ns['w']}}}t": # Text
                         if child.text:
                            para_text += child.text
                text_parts.append(para_text)
                
        return "\n".join(text_parts)
    except Exception as e:
        return f"Error reading {docx_path}: {e}"

files = [
    r'c:\Users\ariel\code\hadash\תקנון חד״ש.docx',
    r'c:\Users\ariel\code\hadash\دستور الجبهة-1.docx'
]

output_file = r'c:\Users\ariel\code\hadash\extracted_docx_content.txt'

with open(output_file, 'w', encoding='utf-8') as f:
    for file_path in files:
        f.write(f"--- START FILE: {os.path.basename(file_path)} ---\n")
        content = extract_text_from_docx(file_path)
        f.write(content)
        f.write(f"\n--- END FILE: {os.path.basename(file_path)} ---\n\n")

print(f"Extraction complete. Output saved to {output_file}")
