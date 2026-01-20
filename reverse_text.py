
def reverse_string(s):
    return s[::-1]

input_file = r'c:\Users\ariel\code\hadash\extracted_content.txt'
output_file = r'c:\Users\ariel\code\hadash\extracted_content_reversed.txt'

with open(input_file, 'r', encoding='utf-8') as f:
    lines = f.readlines()

with open(output_file, 'w', encoding='utf-8') as f:
    for line in lines:
        # Reverse the line but keep newline at the end if it exists
        stripped = line.rstrip('\n')
        reversed_line = reverse_string(stripped)
        f.write(reversed_line + '\n')

print(f"Reversed text saved to {output_file}")
