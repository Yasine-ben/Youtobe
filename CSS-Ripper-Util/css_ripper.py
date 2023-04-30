import os
import re
import sys

# Get the path to the React file from the command line argument
react_file = sys.argv[1]

# Open the React file and read its contents
with open(react_file, 'r') as file:
    text = file.read()

# Use regular expressions to find all class and id names
pattern = re.compile(r'(?:className|id)=(?:"|\')(\S+)(?:"|\')')
matches = pattern.findall(text)
class_names = set(matches) # convert to set to remove duplicates

# Write the class and id names to a new CSS file in the current directory
with open('output.css', 'w') as file:
    for name in class_names:
        if name.startswith('id'):
            file.write(f'#{name[3:]}{{}}\n') # use # for ids
        else:
            file.write(f'.{name}{{}}\n') # use . for class names